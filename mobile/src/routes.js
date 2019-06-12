import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";

import Login from "./pages/Login/Indexhooks";
import Profile from "./pages/Profile";
<<<<<<< HEAD
import Signup from './pages/Signup'
const Routes = createAppContainer(
  createSwitchNavigator({
    Signup,
    Login,
    Profile
  })
=======
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
>>>>>>> 50d468c4f3a9d48bdaf42849eb4599d5eb6f2dc4
);

export default Routes;
