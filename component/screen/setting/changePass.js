import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  Modal,
  ActivityIndicator
} from 'react-native'
import { styleSettingPP } from './style'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icons from 'react-native-vector-icons/SimpleLineIcons'

const arrow = <Icons name='arrow-left' size={25} />
const call = <Icon name='call' size={30} />
const person = <Icon name='person' size={30} />
const visibility = <Icon name='visibility' size={25} />
const visibility_of = <Icon name='visibility-off' size={25} />
const lock = <Icon name='lock' size={30} />


class ChangePass extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      id: '',
      //===========
      security: true,
      lottie:false
    }
  }
  componentDidMount () {
    AsyncStorage.getItem('id').then(value => {
      if (value != null) {
        this.setState({ id: value })
      }
    })
  }
  getData = () => {
    const url = 'https://calm-mesa-84057.herokuapp.com/tampil'
    fetch(url)
      .then(res => res.json())
      .then(res => {
        res.filter(value => {
          if (value.id === parseInt(this.state.id)) {
            AsyncStorage.setItem('username', value.username)
            AsyncStorage.setItem('name', value.name)
            AsyncStorage.setItem('no_telp', JSON.stringify(value.no_telp))
            AsyncStorage.setItem('email', value.email)
            AsyncStorage.setItem('avatar', value.avatar)
          }
        })
      })
  }
  UpdateData = () => {
    this.setState({lottie:true})
    if (this.state.username != '' && this.state.password != '') {
      const { id, username, password } = this.state
      const url = 'https://calm-mesa-84057.herokuapp.com/private/edit'
      fetch(url, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id,
          username: username,
          password: password
        })
      })
        .then(res => res.json())
        .then(res => {
          alert('success')
          this.setState({lottie:false})
          this.getData()
        })
        .catch(err => {
          this.setState({lottie:false})
          alert(err)
        })
    } else {
      this.setState({lottie:false})
      Alert.alert('harap isi kolom terlebih dahulu')
    }
  }
  //imageGet
  pass = () => {
    if (this.state.security === true) {
      return (
        <TouchableOpacity
          onPress={() => this.setState({ security: !this.state.security })}
        >
          {visibility}
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity
          onPress={() => this.setState({ security: !this.state.security })}
        >
          {visibility_of}
        </TouchableOpacity>
      )
    }
  }
  render () {
    return (
      <View style={styleSettingPP.component}>
       <Modal visible={this.state.lottie} transparent={true}>
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
          <View style={{width:100, height:100, backgroundColor:'#fff', justifyContent:'center', alignItems:'center', elevation:8}}>
            <ActivityIndicator size="large" />
            <Text style={{marginTop:5, fontSize:13}}>loading...</Text>
            </View>
          </View>
        </Modal>
        <View style={styleSettingPP.header}>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Setting')}>{arrow}</TouchableOpacity>
        </View>
        <View style={styleSettingPP.viewCard}>
          <View style={styleSettingPP.viewRow}>
            <View style={styleSettingPP.viewIcon}>{person}</View>
            <View style={styleSettingPP.viewInput}>
              <TextInput
                style={styleSettingPP.textInput}
                placeholder='username'
                onChangeText={text => this.setState({ username: text })}
              />
            </View>
          </View>
          <View style={styleSettingPP.viewRow}>
            <View style={styleSettingPP.viewIcon}>{lock}</View>
            <View style={styleSettingPP.viewInput1}>
              <TextInput
                style={styleSettingPP.textInput1}
                placeholder='password'
                onChangeText={text => this.setState({ password: text })}
                secureTextEntry={this.state.security}
              />
              <View style={{width:'15%', height:50, justifyContent:'center',alignItems:'flex-start'}}>{this.pass()}</View>
            </View>
          </View>
          <TouchableOpacity
            style={styleSettingPP.Button}
            onPress={this.UpdateData}
          >
            <Text>Change Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
export default ChangePass
