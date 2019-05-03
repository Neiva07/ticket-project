import { ErrorHandler } from "@interfaces/errorHandler";
import { Codes } from "@utils/constants/codes";
import { HttpStatus } from "@utils/constants/httpStatus";

interface ErrorMessageCodeAndHttpStatus {
  code: Codes;
  status: HttpStatus;
  message: string;
}

type UniqueErrorMessageAndCode = Exclude<
  ErrorMessageCodeAndHttpStatus,
  "status"
>;

const getUniqueErrorMessageAndCode = (
  err: ErrorHandler
): UniqueErrorMessageAndCode => {
  const output = {} as UniqueErrorMessageAndCode;

  try {
    let begin = 0;
    if (err.errmsg.lastIndexOf(".$") !== -1) {
      begin = err.errmsg.lastIndexOf(".$") + 2;
    } else {
      begin = err.errmsg.lastIndexOf("index: ") + 7;
    }
    const fieldName = err.errmsg.substring(begin, err.errmsg.lastIndexOf("_1"));
    output.message = `${fieldName.charAt(0).toUpperCase() +
      fieldName.slice(1)} "already exists"`;

    output.code = Codes.AUTH__UNIQUE_ALREADY_IN_USE;
  } catch (ex) {
    output.code = Codes.AUTH__UNIQUE_ALREADY_IN_USE;
    output.message = "Unique Field already exists";
  }

  return output;
};

export const getErrorMessageCodeAndHttpStatus = (err: ErrorHandler) => {
  let code = Codes.UNKNOWN_ERROR;
  let status = HttpStatus.INTERNAL_SERVER_ERROR;

  console.log(err.errors);
  let message = "Something went wrong. Try again in a few minutes";
  if (err.code) {
    switch (err.code) {
      case 11001:
        const uniqueError = getUniqueErrorMessageAndCode(err);
        code = uniqueError.code;
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        break;
      case Codes.AUTH__BLACKLIST_PASSWORD:
        code = Codes.AUTH__BLACKLIST_PASSWORD;
        message = "Your password is in our blacklist passwords";
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        break;
      case "UNSUPPORTED_MEDIA_TYPE":
        code = Codes.MEDIA__UNSUPPORTED_MEDIA_TYPE;
        message = "Unsupported filetype";
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        break;
      case "LIMIT_UNEXPECTED_FILE":
        code = Codes.MEDIA__LIMIT_UNEXPECTED_FILE;
        message = 'Missing "newProfilePicture" field';
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        break;
    }
  } else if (err.message && !err.errors) {
    message = err.message;
  } else {
    const snbe = [];

    for (const errName in err.errors) {
      // if (err.errors[errName]) {

      // }
      console.log(errName);
      console.log(err.errors[errName].message);
      if (
        // @ts-ignore
        err.errors[errName].name === "ValidatorError" &&
        typeof err.errors[errName].message === "object"
      ) {
        // @ts-ignore
        code = err.errors[errName].message.code;
        // @ts-ignore
        message = err.errors[errName].message.message;
        // @ts-ignore
        status = err.errors[errName].message.status;
        break;
      }
      if (err.errors[errName].message === "should not be empty") {
        // @ts-ignore
        snbe.push(err.errors[errName].path);
      }

      // @ts-ignore
      console.log(err.errors[errName].name);
      // if (err.errors[errName].message) {
      //   message = err.errors[errName].message;
      // }
    }

    if (snbe.length > 0) {
      const fields = snbe.join(",").replace(/,([^,]*)$/, " and $1");
      const _message = `${fields} should be in the request`;
      code = Codes.MYSQL__MISSING_DATA;
      message = _message;
      status = HttpStatus.UNPROCESSABLE_ENTITY;
    }
  }

  return {
    code,
    message,
    status
  };
};
