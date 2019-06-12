import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Login from "./pages/Login/Indexhooks";
import Profile from "./pages/Profile";
import Signup from './pages/Signup'
const Routes = createAppContainer(
  createSwitchNavigator({
    Signup,
    Login,
    Profile
  })
);

export default Routes;
