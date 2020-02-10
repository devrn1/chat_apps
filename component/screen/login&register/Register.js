import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  ActivityIndicator,
  Modal
} from 'react-native'
import { styleLogin } from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'

const visibility = <Icon name='visibility' size={25} />
const visibility_of = <Icon name='visibility-off' size={25} />

class RegisterScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      //=================
      username: '',
      name: '',
      password: '',
      email: '',
      no_telephone: '',
      //=================
      PwwCondition: true,
      lottie:false
    }
  }

  hiddenOrNo = () => {
    if (this.state.PwwCondition) {
      return <Text>{visibility}</Text>
    } else {
      return <Text>{visibility_of}</Text>
    }
  }

  Register = () => {
    this.setState({lottie:true})
    const { username, password, email, no_telephone, name } = this.state
    const url = 'https://calm-mesa-84057.herokuapp.com/register'
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        name: name,
        no_telp: no_telephone,
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.access_token) {
          //   AsyncStorage.setItem('token', res.access_token)
          this.props.navigation.navigate('Login')
          this.setState({lottie:false})
          // alert(res.access_token)
        }
      })
      .catch(err => {
        Alert.alert(err)
        this.setState({lottie:false})
      })
  }

  //===============================render=====================================
  render () {
    const { PwwCondition } = this.state
    console.disableYellowBox = true
    return (
      <ImageBackground
        source={require('../../../asset/b2c82a893170af07075ea5dca5c1d3e7_blue2-images-blue-cloud-background-hd-wallpaper-and-background-_1920-986.jpeg')}
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
        <View style={styleLogin.viewCard}>
          <View style={styleLogin.viewRow}>
            <View style={styleLogin.rowText}>
              <Text style={styleLogin.textLTOS}>Sign Up now</Text>
              <Text style={styleLogin.textEnterUser}>
                Fill in the from below to get instant access.
              </Text>
            </View>
            <View style={styleLogin.rowIcon}>
              <Image
                source={require('../../../asset/images1.png')}
                style={{
                  width: 60,
                  height: 60,
                  marginBottom: 20,
                  marginLeft: 5
                }}
              />
            </View>
          </View>
          <TextInput
            style={styleLogin.textInputUser}
            placeholder='username'
            selectionColor='000'
            onChangeText={text => this.setState({ username: text })}
          />
          <TextInput
            style={styleLogin.textInputUser}
            placeholder='name'
            selectionColor='000'
            onChangeText={text => this.setState({ name: text })}
          />
          <TextInput
            style={styleLogin.textInputUser}
            placeholder='no telephone'
            selectionColor='000'
            onChangeText={text => this.setState({ no_telephone: text })}
          />
          <TextInput
            style={styleLogin.textInputUser}
            placeholder='email'
            selectionColor='000'
            onChangeText={text => this.setState({ email: text })}
          />
          <View style={styleLogin.ViewPass}>
            <TextInput
              style={styleLogin.textInputPass}
              placeholder='password'
              selectionColor='000'
              onChangeText={text => this.setState({ password: text })}
              secureTextEntry={this.state.PwwCondition}
            />
            <TouchableOpacity activeOpacity = {0.8}
              onPress={() => this.setState({ PwwCondition: !PwwCondition })}
              style={styleLogin.TouchIcon}
            >
              {this.hiddenOrNo()}
            </TouchableOpacity>
          </View>
          <TouchableOpacity activeOpacity={0.8}
            style={styleLogin.TouchLogin}
            onPress={this.Register}
          >
            <Text>Create Account</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Text style={styleLogin.textCYA}>Already your Account</Text>
          <Text
            onPress={() => this.props.navigation.navigate('Login')}
            style={styleLogin.textReg}
          >
            Login
          </Text>
        </View>
      </ImageBackground>
    )
  }
}
export default RegisterScreen
