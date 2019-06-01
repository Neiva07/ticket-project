import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";

import Login from "./pages/Login/Indexhooks";
import Profile from "./pages/Profile";
import AuthLoadingScreen from "./pages/AuthLoading";
import RedeemTicket from "./pages/RedeemTicket";
import Payment from "./pages/Payment";

// const AppStack = createStackNavigator({ Home: Profile /* add more*/ });
// const AuthStack = createStackNavigator({ SignIn: Login });

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: Profile,
      Auth: Login,
      Payment,
      RedeemTicket
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);

export default Routes;
