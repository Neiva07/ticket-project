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

  render() {
    const value = {
      state: { ...this.state },
      action: {
        getTickets: this.getTickets
      }
    };
    return <TicketContext.Provider value={value} {...this.props} />;
  }
}
