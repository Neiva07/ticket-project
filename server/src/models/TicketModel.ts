import * as Sequelize from "sequelize";
import { BaseModalInterface } from "../interfaces/BaseModalInterface";
import { ModelsInterface } from "../interfaces/ModelsInterface";

export interface TicketAttributes extends Sequelize.Model<TicketAttributes> {
  id: number;
  created_at: string;
  bought_by: number; //save only the id of the User.
  qr_code: string;
  updated_at: string;
  status: "valid" | "invalid";
}

export interface TicketInstance extends TicketAttributes {
  checkQRCode: (clientQRCode: string, databaseQRCode: string) => boolean;
}

export type TicketModel = typeof Sequelize.Model & {
  new (values?: object, options?: Sequelize.BuildOptions): TicketModel;
} & BaseModalInterface &
  TicketInstance;

export default (
  sequelize: Sequelize.Sequelize,
  DataTypes: typeof Sequelize.DataTypes
): TicketModel => {
  const Ticket = <TicketModel>sequelize.define(
    "Ticket",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4
      },
      qr_code: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        defaultValue: DataTypes.UUIDV4
      },
      status: {
        type: DataTypes.STRING(128),
        allowNull: false,
        defaultValue: "valid"
      }
    },
    {
      tableName: "tickets"
    }
  );

  Ticket.prototype.checkQRCode = (
    clientQRCode: string,
    databaseQRCode: string
  ): boolean => {
    return clientQRCode === databaseQRCode;
  };
  Ticket.associate = (models: ModelsInterface): void => {
    Ticket.belongsTo(models.User, {
      foreignKey: {
        field: "owner",
        name: "owner"
      }
    });
    Ticket.belongsTo(models.User, {
      foreignKey: {
        field: "bought_by",
        name: "bought_by"
      }
    });
  };

  return Ticket;
};
