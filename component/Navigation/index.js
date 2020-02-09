import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Animated, Button, View, Text, Easing, StyleSheet } from 'react-native';

import LoginScreen from '../screen/login&register/login'
import RegisterScreen from '../screen/login&register/Register'
import HomeSreen from '../screen/Home/home'
import ListChat from '../screen/Home/listChat'
import ChatScreen from '../screen/chat'
import SettingScreen from '../screen/setting'
import SetProfileScreen from '../screen/setting/setProfile'
import SettingPP from '../screen/setting/setIngPP'
import ChangePass from '../screen/setting/changePass'
import ProfileOrang from '../screen/user'

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 500,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps

      const thisSceneIndex = scene.index
      const width = layout.initWidth

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [-width, 0],
        extrapolate: 'clamp'
      })

      return {
        transform: [{ translateX }]
      }
    }
  }
}


const Route = createStackNavigator(
  {
    Home: {
      screen: HomeSreen,
      navigationOptions: {
        headerShown: false
      }
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: {
        headerShown: false
      }
    },
    ListChat: {
      screen: ListChat,
      navigationOptions: {
        headerShown: false
      }
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        headerShown: false
      }
    },
    Chat: {
      screen: ChatScreen,
      navigationOptions: {
        headerShown: false
      }
    },
    Setting: {
      screen: SettingScreen,
      navigationOptions: {
        headerShown: false
      }
    },
    SetProfile: {
      screen: SetProfileScreen,
      navigationOptions: {
        headerShown: false
      }
    },
    SettingPP: {
      screen: SettingPP,
      navigationOptions: {
        headerShown: false
      }
    },
    ChangePass: {
      screen: ChangePass,
      navigationOptions: {
        headerShown: false
      }
    },
    PPOrang: {
      screen: ProfileOrang,
      navigationOptions: {
        headerShown: false,
      }
      
    }
  },
  {
    initialRouteName: 'Login',
  }
)

export default createAppContainer(Route)
