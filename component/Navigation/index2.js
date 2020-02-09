import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from '../screen/home/home'
import InputData from '../screen/addData/index'
import Dashboard from '../screen/home/dashboard'
import editType from '../screen/fitur/editType'
import Laporan from '../screen/home/laporan'
import history from '../screen/history/history'
import grafikHistory from '../screen/history/grafikHistory'
import dayPDF from '../screen/fitur/DayPDF'
import LaporanData from '../screen/laporan/laporanData'

import { Animated, Button, View, Text, Easing, StyleSheet } from 'react-native'
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

const Route = createStackNavigator({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      header: null
    }
  },
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
  InputData: {
    screen: InputData,
    navigationOptions: {
      header: null
    }
  },
  LaporanData: {
    screen: LaporanData,
    navigationOptions: {
      header: null
    }
  },
  editType: {
    screen: editType,
    navigationOptions: {
      header: null
    }
  },
  laporan: {
    screen: Laporan,
    navigationOptions: {
      header: null
    }
  },
  history: {
    screen: history,
    navigationOptions: {
      header: null
    }
  },
  grafikHistory: {
    screen: grafikHistory,
    navigationOptions: {
      header: null
    }
  },
  PDF: {
    screen: PDF,
    navigationOptions: {
      header: null
    }
  },
  dayPDF: {
    screen: dayPDF,
    navigationOptions: {
      header: null
    }
  }
})

export default createAppContainer(Route)
