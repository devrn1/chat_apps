import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Modal,
  ActivityIndicator
} from 'react-native'
import { styleSettingPP } from './style'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icons from 'react-native-vector-icons/SimpleLineIcons'

const arrow = <Icons name='arrow-left' size={25} style={{marginLeft:10}} />
const call = <Icon name='call' size={30} />

const Email = <Icon name='email' size={30} />
const person = <Icon name='person' size={30} />


class SettingPP extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      no_telp: '',
      email: '',
      id: '',
      lottie:false
      //===========
    }
  }
  componentDidMount () {
    AsyncStorage.getItem('id').then(value => {
      if (value != null) {
        this.setState({ id: value })
      }
    })
    AsyncStorage.getItem('no_telp').then(value => {
      if (value != null) {
        this.setState({ no_telp: value })
      }
    })
    AsyncStorage.getItem('email').then(value => {
      if (value != null) {
        this.setState({ email: value })
      }
    })
    AsyncStorage.getItem('name').then(value => {
      if (value != null) {
        this.setState({ name: value })
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
    const { id, name, no_telp, email } = this.state
    const url = 'https://calm-mesa-84057.herokuapp.com/user/edit'
    fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        name: name,
        no_telp: no_telp,
        email: email
      })
    })
      .then(res => res.json())
      .then(res => {
        alert('success')
        this.setState({lottie:false})
        this.getData()
      })
      .catch(err => {
        alert(err)
        this.setState({lottie:false})
      })
  }
  //imageGet
  render () {
    const {name, email, id, no_telp} = this.state
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
          <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>{arrow}</TouchableOpacity>
        </View>
        <View style={styleSettingPP.viewCard}>
          <View style={styleSettingPP.viewRow}>
            <View style={styleSettingPP.viewIcon}>{person}</View>
            <View style={styleSettingPP.viewInput}>
              <TextInput
                style={styleSettingPP.textInput}
                placeholder='username'
                onChangeText={text => this.setState({ name: text })}
                value={name}
              />
            </View>
          </View>
          <View style={styleSettingPP.viewRow}>
            <View style={styleSettingPP.viewIcon}>{call}</View>
            <View style={styleSettingPP.viewInput}>
              <TextInput
                style={styleSettingPP.textInput}
                placeholder='no_telephone'
                onChangeText={text => this.setState({ no_telp: text })}
                value={no_telp}
              />
            </View>
          </View>
          <View style={styleSettingPP.viewRow}>
            <View style={styleSettingPP.viewIcon}>{Email}</View>
            <View style={styleSettingPP.viewInput}>
              <TextInput
                style={styleSettingPP.textInput}
                placeholder='E-mail'
                onChangeText={text => this.setState({ email: text })}
                value={email}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styleSettingPP.Button}
            onPress={this.UpdateData}
          >
            <Text>Change Profile</Text>
          </TouchableOpacity>
          <Text>{this.state.token}</Text>
        </View>
      </View>
    )
  }
}
export default SettingPP
