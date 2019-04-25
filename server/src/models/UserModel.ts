import * as Sequelize from "sequelize";
import { BaseModalInterface } from "../interfaces/BaseModalInterface";
import { hashSync, genSaltSync, compareSync } from "bcryptjs";
import { ModelsInterface } from "../interfaces/ModelsInterface";

export interface UserAttributes extends Sequelize.Model<UserAttributes> {
  readonly id: number;
  name: string;
  email: string;
  password: string;
  photo?: string;
  created_at: string;
  updated_at: string;
  course?: string;
  degree?: string;
  tickets?: number;
}

export interface UserInstance extends Sequelize.Model<UserAttributes> {
  isPassword: (password: string, encodedPassword: string) => boolean;
}

export type UserModel = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): UserInstance;
} & BaseModalInterface;

export default (
  sequelize: Sequelize.Sequelize,
  DataTypes: typeof Sequelize.DataTypes
): UserModel => {
  const User = <UserModel>sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(128),
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      photo: {
        type: DataTypes.BLOB({ length: "long" }),
        allowNull: true,
        defaultValue: null
      },
      course: {
        type: DataTypes.STRING(128),
        allowNull: true,
        defaultValue: null
      },
      degree: {
        type: DataTypes.STRING(128),
        allowNull: true,
        defaultValue: null
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
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
        },
        afterUpdate: (
          user: UserAttributes,
          options: Sequelize.UpdateOptions
        ): void => {
          user.updated_at = Sequelize.NOW.toString();
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
  User.associate = (models: ModelsInterface): void => {
    User.hasMany(models.Ticket, {
      foreignKey: {
        field: "tickets",
        name: "tickets"
      }
    });
  };
  return User;
};
