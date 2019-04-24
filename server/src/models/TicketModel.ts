import * as Sequelize from "sequelize";
import { BaseModalInterface } from "../interfaces/BaseModalInterface";
import { ModelsInterface } from "../interfaces/ModelsInterface";

export interface TicketAttributes extends Sequelize.Model<TicketAttributes> {
  readonly id: number;
  readonly created_at: string;
  readonly bought_by: string; //isn't string, user
  owner: string; //isn't string, user
  readonly qr_code: string;
  updated_at: string;
}

export interface TicketInstance extends Sequelize.Model<TicketAttributes> {
  checkQRCode: (clientQRCode: string, databaseQRCode: string) => boolean;
}

export type TicketModel = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): TicketInstance;
} & BaseModalInterface;

export default (
  sequelize: Sequelize.Sequelize,
  DataTypes: typeof Sequelize.DataTypes
): TicketModel => {
  const Ticket = <TicketModel>sequelize.define(
    "Ticket",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      qr_code: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true
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
      tableName: "tickets",
      hooks: {
        beforeCreate: (): void => {},
        afterUpdate: (
          ticket: TicketAttributes,
          options: Sequelize.UpdateOptions
        ): void => {
          ticket.updated_at = Sequelize.NOW.toString();
        }
      }
    }
  );
  Ticket.prototype.checkQRCode = (
    clientQRCode: string,
    databaseQRCode: string
  ): boolean => {
    return clientQRCode === databaseQRCode;
  };
  Ticket.associate = (models: ModelsInterface): void => {};
  return Ticket;
};
