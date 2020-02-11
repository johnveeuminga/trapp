import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from '../screens/Home'
import SnapScreen from '../screens/Snap'

const HomeNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: true,
      }
    },
    Snap: {
      screen: SnapScreen,
    }
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    }
  }
)

export default HomeNavigator
