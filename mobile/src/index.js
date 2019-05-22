import React from "react";
import { AuthProvider } from "./context/Auth";
import Routes from "./routes";

// import { Container } from './styles';

const App = () => (
  <AuthProvider>
    <Routes />
  </AuthProvider>
);

export default App;
