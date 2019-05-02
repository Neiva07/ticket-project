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
  course?: string;
  degree?: string;
  tickets?: number;
  enrollment_number: number;
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
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
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
      enrollment_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
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
