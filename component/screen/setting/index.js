import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  AsyncStorage
} from 'react-native'
import { styleSetting } from './style'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icons from 'react-native-vector-icons/SimpleLineIcons'

const arrow = <Icons name='arrow-left' size={25} style={{marginLeft:10}} />
const exit = <Icon name='exit-to-app' color="red" size={30} style={{ marginRight: 5 }} />

class SettingScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [
        {
          nama: 'Personal Info',
          onPress: 'SetProfile',
          icon: 'person'
        },
        {
          nama: 'Change Password',
          onPress: 'ChangePass',
          icon: 'lock'
        },
        {
          nama: 'About',
          onPress: '',
          icon: 'help'
        }
      ]
    }
  }
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styleSetting.touchComponent}
        onPress={() => this.props.navigation.navigate(item.onPress)}
      >
        <Icon name={item.icon} size={30} style={{ marginRight: 5 }} />
        <Text style={{ fontSize: 16 }}>{item.nama}</Text>
      </TouchableOpacity>
    )
  }
  exit = () => {
    AsyncStorage.removeItem('username')
    AsyncStorage.removeItem('name')
    AsyncStorage.removeItem('no_telp')
    AsyncStorage.removeItem('email')
    AsyncStorage.removeItem('avatar')
    AsyncStorage.removeItem('token')
    AsyncStorage.removeItem('id')
    this.props.navigation.navigate('Login')
  }
  render () {
    return (
      <View style={styleSetting.component}>
        <View style={styleSetting.header}>
          <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{width:50}}>{arrow}</TouchableOpacity>
        </View>
        <View style={styleSetting.cardComponent}>
          <FlatList
            data={this.state.data}
            keyExtractor={index => index.toString()}
            renderItem={this.renderItem}
          />
        </View>

        <View style={styleSetting.viewDescription}>
          <TouchableOpacity style={styleSetting.viewExit} onPress={this.exit}>
            {exit}
            <Text style={{ fontSize: 20, fontWeight: '500', color: 'red' }}>
              logout
            </Text>
          </TouchableOpacity>
          <Text style={{color:"gray"}}>Chat App Beta.</Text>
          <Text style={{color:"gray"}}>@copyRight 2020 MyApp.co.id</Text>
        </View>
      </View>
    )
  }
}
export default SettingScreen
