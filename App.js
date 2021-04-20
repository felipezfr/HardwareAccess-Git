import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import BluePage from './src/pages/BluePage';

const AppNavigator = createStackNavigator(
  {

    'Main': {
      screen: BluePage,
      navigationOptions: {
        headerShown: false,
      }
    },
  }

);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;




