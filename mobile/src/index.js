import React from "react";
import { AuthProvider } from "./context/Auth";
import Routes from "./routes";
import { TicketProvider } from "./context/Tickets";

// import { Container } from './styles';
const App = () => (
  <AuthProvider>
    <TicketProvider>
      <Routes />
    </TicketProvider>
  </AuthProvider>
);

export default App;
