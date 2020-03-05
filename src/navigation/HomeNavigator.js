import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from '../screens/Home'
import SnapScreen from '../screens/Snap'
import Preloading from '../screens/Preloading'
import SelectLanguage from '../screens/SelectLanguage'

const HomeNavigator = createStackNavigator(
  {
    Preloading: {
      screen: Preloading,
      navigationOptions: {
        headerShown: false,
      }
    },
    SelectLanguage: {
      screen: SelectLanguage,
      navigationOptions: {
        headerShown: false,
      }
    },
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
