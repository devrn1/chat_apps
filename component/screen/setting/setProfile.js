import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Share,
  AsyncStorage
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icons from 'react-native-vector-icons/SimpleLineIcons'
import { stylePP } from './style'
import ImagePicker from 'react-native-image-picker'

const arrow = <Icons name='arrow-left' size={25} />
const call = <Icon name='call' size={35} />
const Email = <Icon name='email' size={35} />
const create = <Icon name='create' size={30} style={{ marginRight: 10 }} />
const person = <Icon name='person' size={35} />
const add = <Icon name='add-a-photo' size={30} />


class SetProfileScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      name: '',
      email: '',
      no_telp: '',
      avatar: null,
      idYou: '',
      ImageSource: null,
      TextInput_avatar: null,
      id:''
    }
  }
  componentDidMount = () => {
    this.AsyncStorage()
  }
  AsyncStorage = () => {
    AsyncStorage.getItem('avatar').then(value => {
      this.setState({ avatar: value })
    })
    AsyncStorage.getItem('username').then(value => {
      this.setState({ username: value })
    })
    AsyncStorage.getItem('name').then(value => {
      this.setState({ name: value })
    })
    AsyncStorage.getItem('no_telp').then(value => {
      this.setState({ no_telp: value })
    })
    AsyncStorage.getItem('email').then(value => {
      this.setState({ email: value })
    })
    AsyncStorage.getItem('id').then(value => {
      this.setState({ id: value })
    })
  }
  isiImageBG = () => {
    return (
      <View>
        <View style={stylePP.header}></View>
        <View style={stylePP.headerRow}>
          <View style={stylePP.headerRow2}>
            <TouchableOpacity>{arrow}</TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('SettingPP')}
            >
              {create}
            </TouchableOpacity>
          </View>
          <View style={stylePP.viewShare}>
            <View style={stylePP.header2}>
              <TouchableOpacity onPress={this.onShare} activeOpacity={0.9}>
                {this.shareKu()}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
  imageBG = () => {
    if (this.state.avatar === null) {
      return (
        <View style={stylePP.viewImage}>
          <Image
            style={stylePP.imgPP}
            source={{
              uri:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSljHokqdVBEldKHyLeWMD7ICoYJ-zq7M8VdBIxRRZWHHum7dikvQ&s'
            }}
          />
          <View style={stylePP.viewAdd}>
            <TouchableOpacity style={stylePP.viewAddImage} activeOpacity={0.9} onPress={this.selectPhotoTapped}>
              {add}
            </TouchableOpacity>
          </View>
        </View>
      )
    } else {
      return (
        <View style={stylePP.viewImage}>
          <Image
            style={stylePP.imgPP}
            source={{
              uri: this.state.avatar
            }}
          />
          <View style={stylePP.viewAdd}>
            <TouchableOpacity style={stylePP.viewAddImage} activeOpacity={0.9} onPress={this.selectPhotoTapped}>
              {add}
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }

  //image
   selectPhotoTapped =()=>{
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    }

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled photo picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        let source = { uri: response.uri }
        this.ImageToServer(response)
      }
    })
  }

  ImageToServer = (response) => {
    fetch('https://calm-mesa-84057.herokuapp.com/avatar/edit', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id,
        avatar:`data:image/gif;base64, ${response.data}`
        // avatar: this.state.TextInput_avatar
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        AsyncStorage.setItem('avatar', `data:image/gif;base64, ${response.data}`)
        this.setState({avatar:`data:image/gif;base64, ${response.data}`})
        alert('success')        
      })
      .catch(error => {
        console.error(error)
        // this.setState({ visible: false })
        alert('error')
      })
  }
  render () {
    return (
      <View style={stylePP.component}>
        <View style={stylePP.header}>
          <View style={stylePP.cpHeader}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Setting')}>{arrow}</TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('SettingPP')}>{create}</TouchableOpacity>
          </View>
          <View style={stylePP.compoHeader}>{this.imageBG()}</View>
        </View>
        <View style={stylePP.viewCard}>
          <View style={{flexDirection:'row'}}>
            <View style={stylePP.viewIcon}>
            {person}
            </View>
            <View style={stylePP.textDesc}>
            <Text style={{fontSize:17, fontWeight:'500'}}>{this.state.name}</Text>
            </View>
          </View>
          <View style={{flexDirection:'row'}}>
            <View style={stylePP.viewIcon}>
            {call}
            </View>
            <View style={stylePP.textDesc}>
            <Text style={{fontSize:17, fontWeight:'500'}}>{this.state.no_telp}</Text>
            </View>
          </View>
          <View style={{flexDirection:'row'}}>
            <View style={stylePP.viewIcon}>
            {Email}
            </View>
            <View style={stylePP.textDesc}>
            <Text style={{fontSize:17, fontWeight:'500'}}>{this.state.email}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
export default SetProfileScreen
