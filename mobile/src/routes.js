import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import Profile from './pages/Profile';


const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        Profile,
    })
);

export default Routes;