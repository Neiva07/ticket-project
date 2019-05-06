import { body, oneOf } from "express-validator/check";
import { HttpStatus } from "../../../utils/constants/httpStatus";
import { Codes } from "../../../utils/constants/codes";
import middlewareValidation from "../../../utils/middlewares/validations";

export const edit = [
  body("first_name")
    .not()
    .matches(/\d/)
    .optional()
    .withMessage("First name cannot contain numbers!"),
  body("last_name")
    .not()
    .matches(/\d/)
    .optional()
    .withMessage("Last name cannot contain numbers!"),
  middlewareValidation
];

export const signup = [
  body("enrollment_number")
    .not()
    .matches(/^[0-9]+$/)
    .isLength({ min: 12, max: 12 })
    .withMessage(() => ({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      code: Codes.AUTH__INVALID_ENROLLMENT_NUMBER,
      message: "Invalid Enrollment Number. The field must have 12 numbers."
    })),
  body("email")
    .isEmail()
    .withMessage(() => ({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      code: Codes.AUTH__INVALID_EMAIL,
      message: "Please, type a valid email adress"
    })),
  body("password")
    .isLength({ min: 6 })
    .not()
    .isEmpty()
    .withMessage(() => ({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      code: Codes.AUTH__WEAK_PASSWORD,
      message: "Weak Password. Try again with another one."
    })),
  body("degree")
    .not()
    .isEmpty()
    .withMessage("Degree should not be empty"),
  body("course")
    .not()
    .isEmpty()
    .withMessage("Course should not be empty"),
  body("created_at")
    .isEmpty()
    .withMessage("Should be empty"),
  body("updated_at")
    .isEmpty()
    .withMessage("Should be empty"),
  body("tickets")
    .isEmpty()
    .withMessage("Should be empty"),
  middlewareValidation
];
export const signin = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("should not be empty")
    .isEmail()
    .withMessage({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      code: Codes.AUTH__INVALID_EMAIL,
      message: "The email you passed is not a valid one"
    }),
  // password must be at least 5 chars long
  body("password")
    .not()
    .isEmpty()
    .withMessage("should not be empty")
    .isLength({ min: 6 })
    .withMessage({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      code: Codes.AUTH__WEAK_PASSWORD,
      message: "Password should have at least 6 caracteres"
    }),
  middlewareValidation
];
export const changePassword = [
  // username must be an email
  body("currentPassword")
    .not()
    .isEmpty()
    .withMessage("should not be empty"),
  // password must be at least 5 chars long
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      code: Codes.AUTH__WEAK_PASSWORD,
      message: "Password should have at least 6 caracteres"
    })
    .not()
    .isEmpty()
    .withMessage("should not be empty"),
  // password must be at least 5 chars long
  body("verifyPassword")
    .not()
    .isEmpty()
    .withMessage("should not be empty"),
  middlewareValidation
];
