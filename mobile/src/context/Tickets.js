import React from "react";
import { AuthContext } from "./Auth";

export const TicketContext = React.createContext({});

export class TicketProvider extends React.PureComponent {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      tickets: []
    };
  }

  getTickets = async () => {
    console.log(this.context.state.user)

    const url = `api/users/${this.context.state.user.id}/tickets`;

    try {
      const response = await this.context.action.request("GET", url);
      console.log(response.data);

      if (response.success) {
        this.setState({ tickets: response.data });
        console.log(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  createTickets = async data => {
    console.log(this.context.state.user)
    const url = `api/users/${this.context.state.user.id}/tickets`;

    try {
      const response = await this.context.action.request("POST", url, {
        purchase: data.details.purchase_units[0],
        buyer: data.details.payer,
        orderId: data.details.id,
        created_at: data.details.created_at
      });
      if (response.success) {
        const newTickets = response.data;
        if (newTickets.length > 0) {
          this.setState({ tickets: [...this.state.tickets, newTickets] });
          console.log(response.data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const value = {
      state: { ...this.state },
      action: {
        getTickets: this.getTickets,
        createTickets: this.createTickets
      }
    };
    return <TicketContext.Provider value={value} {...this.props} />;
  }
}
