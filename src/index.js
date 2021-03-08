import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
    Home,
    List,
    Form,
  } from './screens';

const Router = createStackNavigator(
  {
    Home,
    List,
    Form
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);
