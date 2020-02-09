import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  Image,
  ImageBackground,
  StatusBar,
  Modal,
  ActivityIndicator
} from 'react-native'
import { styleLogin } from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import LottieView from 'lottie-react-native'
import AnimatedLoader from 'react-native-animated-loader'

const visibility = <Icon name='visibility' size={25} />
const visibility_of = <Icon name='visibility-off' size={25} />

class LoginScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      PwwCondition: true,
      role: true,
      loading: false,
      lottie: false
    }
  }
  componentDidMount () {
    AsyncStorage.getItem('token').then(value => {
      if (value != null) {
        this.props.navigation.navigate('Home')
      }
    })
  }
  hiddenOrNo = () => {
    if (this.state.PwwCondition) {
      return <Text>{visibility}</Text>
    } else {
      return <Text>{visibility_of}</Text>
    }
  }

  Login = () => {
    this.setState({ lottie: true })
    const { username, password } = this.state
    const url = 'https://calm-mesa-84057.herokuapp.com/login'
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.access_token) {
          AsyncStorage.setItem('id', JSON.stringify(res.user.id))
          AsyncStorage.setItem('token', res.access_token)
          this.setState({ lottie: false })
          this.props.navigation.navigate('Home')
          // alert(res.user.id)
        }
      })
      .catch(err => {
        this.setState({ lottie: false })
        Alert.alert(err)
      })
  }
  render () {
    const { PwwCondition } = this.state
    console.disableYellowBox = true
    setTimeout(() => {
      this.setState({ role: false })
    }, 3000)
    if (this.state.role) {
      return (
        <ImageBackground
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          source={{
            uri:
              'https://cdn.clipart.email/b2c82a893170af07075ea5dca5c1d3e7_blue2-images-blue-cloud-background-hd-wallpaper-and-background-_1920-986.jpeg'
          }}
        >
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              marginBottom: 20
            }}
          />
          <Text>Beta Chat App</Text>
        </ImageBackground>
      )
    }
    return (
      <ImageBackground
        source={{
          uri:
            'https://cdn.clipart.email/b2c82a893170af07075ea5dca5c1d3e7_blue2-images-blue-cloud-background-hd-wallpaper-and-background-_1920-986.jpeg'
        }}
        style={styleLogin.component}
      >
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
        <StatusBar backgroundColor='#00c5f0' barStyle='light-content' />
        <View style={styleLogin.viewCard}>
          <View style={styleLogin.viewRow}>
            <View style={styleLogin.rowText}>
              <Text style={styleLogin.textLTOS}>Login to our site</Text>
              <Text style={styleLogin.textEnterUser}>
                Enter username and password to login.
              </Text>
            </View>
            <View style={styleLogin.rowIcon}>
              <Image
                source={{
                  uri:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIOh2b05mNpWmw9cKIZ_zIv2_lPoECw8wGOeCoCczaDl-y97nd&s'
                }}
                style={styleLogin.imageIcon}
              />
            </View>
          </View>
          <TextInput
            style={styleLogin.textInputUser}
            placeholder='username'
            selectionColor='000'
            onChangeText={text => this.setState({ username: text })}
          />
          <View style={styleLogin.ViewPass}>
            <TextInput
              style={styleLogin.textInputPass}
              placeholder='password'
              selectionColor='000'
              onChangeText={text => this.setState({ password: text })}
              secureTextEntry={this.state.PwwCondition}
            />
            <TouchableOpacity
              onPress={() => this.setState({ PwwCondition: !PwwCondition })}
              style={styleLogin.TouchIcon}
            >
              {this.hiddenOrNo()}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styleLogin.TouchLogin}
            onPress={this.Login}
            activeOpacity={0.7}
          >
            <Text>MyAccount</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 50 }}>
          <Text style={styleLogin.textCYA}>Create your Account</Text>
          <Text
            onPress={() => this.props.navigation.navigate('Register')}
            style={styleLogin.textReg}
          >
            Register
          </Text>
        </View>
      </ImageBackground>
    )
  }
}
export default LoginScreen
