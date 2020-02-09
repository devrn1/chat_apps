import React, { Component } from 'react'
import { Animated, Easing, Platform } from 'react-native'
import LoginScreen from './component/screen/login&register/login'
import RegisterScreen from './component/screen/login&register/Register'
import HomeSreen from './component/screen/Home/home'
import ListChat from './component/screen/Home/listChat'
import ChatScreen from './component/screen/chat'
import SettingScreen from './component/screen/setting'
import SetProfileScreen from './component/screen/setting/setProfile'
import SettingPP from './component/screen/setting/setIngPP'
import ChangePass from './component/screen/setting/changePass'
import ProfileOrang from './component/screen/user'

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

let SlideFromRight = (index, position, width) => {
  const translateX = position.interpolate({
    inputRange: [index - 1, index],
    outputRange: [width, 0]
  })

  return { transform: [{ translateX }] }
}

let SlideFromBottom = (index, position, height) => {
  const translateY = position.interpolate({
    inputRange: [index - 1, index],
    outputRange: [height, 0]
  })

  return { transform: [{ translateY }] }
}

let CollapseTransition = (index, position) => {
  const opacity = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [0, 1, 1]
  })

  const scaleY = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [0, 1, 1]
  })

  return {
    opacity,
    transform: [{ scaleY }]
  }
}

const TransitionConfiguration = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps
      const width = layout.initWidth
      const height = layout.initHeight
      const { index, route } = scene
      const params = route.params || {} // <- That's new
      const transition = params.transition || 'default' // <- That's new
      return {
        default: SlideFromRight(index, position, width),
        bottomTransition: SlideFromBottom(index, position, height),
        collapseTransition: CollapseTransition(index, position)
      }[transition]
    }
  }
}

const RootStack = createStackNavigator(
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
    headerMode: 'screen',
    transitionConfig: TransitionConfiguration
  }
)

// export default TransitionApp
const AppContainer = createAppContainer(RootStack)

export default class TransitionApp extends Component {
  render () {
    return (

        <AppContainer />

    )
  }
}