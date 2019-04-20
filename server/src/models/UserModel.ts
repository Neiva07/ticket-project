import * as Sequelize from "sequelize";
import { BaseModalInterface } from "../interfaces/BaseModalInterface";
import { hashSync, genSaltSync, compareSync } from "bcryptjs";
import { ModelsInterface } from "../interfaces/ModelsInterface";

export interface UserAttributes extends Sequelize.Model<UserAttributes> {
  readonly id: number;
  name?: string;
  email?: string;
  password?: string;
  photo?: string;
  created_at?: string;
  updated_at?: string;
  course?: string;
  degree?: string;
}

export interface UserInstance extends Sequelize.Model<UserAttributes> {
  isPassword: (password: string, encodedPassword: string) => boolean;
}

export type UserModel = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): UserInstance;
} & BaseModalInterface;

export default (sequelize: Sequelize.Sequelize): UserModel => {
  const User = <UserModel>sequelize.define(
    "User",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING(128),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(128),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(128),
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      photo: {
        type: Sequelize.BLOB({ length: "long" }),
        allowNull: true,
        defaultValue: null
      },
      course: {
        type: Sequelize.STRING(128),
        allowNull: true,
        defaultValue: null
      },
      degree: {
        type: Sequelize.STRING(128),
        allowNull: true,
        defaultValue: null
      }
    },
    {
      tableName: "users",
      hooks: {
        beforeCreate: (
          user: UserAttributes,
          options: Sequelize.CreateOptions
        ): void => {
          const salt = genSaltSync();
          user.password = hashSync(user.password, salt);
        }
      }
    }
  );
  User.prototype.isPassword = (
    encodedPassowrd: string,
    password: string
  ): boolean => {
    return compareSync(password, encodedPassowrd);
  };
  User.associate = (models: ModelsInterface): void => {};
  return User;
};
