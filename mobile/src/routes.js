import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Login from "./pages/Login/Indexhooks";
import Profile from "./pages/Profile";

const Routes = createAppContainer(
  createSwitchNavigator({
    Login,
    Profile
  })
);

export default Routes;
