import React from 'react'
import {
  View,
  Text,
  TextInput,
  Alert,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Linking,
  AsyncStorage,
  TouchableHighlight,
  ToastAndroid,
  Animated,
  Easing
} from 'react-native'
import { styleChat } from './style'
import Icon from 'react-native-vector-icons/MaterialIcons'

const menu = <Icon name='menu' size={25} style={{ marginLeft: 25 }} />
const call = <Icon name='call' size={25} />
const arrow = <Icon name='arrow-back' size={25} />
const photo_library = <Icon name='photo-library' size={30} />
const send = <Icon name='send' size={30} />
const clear = <Icon name='clear' size={20} />

class ChatScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      textInput: '',
      sender_id: '',
      Data: [],
      Modal: false,
      modalSearch: false,
      image: '',
      role: true,
      ModalDelet: false,
      CD: true,
      id: '',
      isLoading:true,
      //============
      SlideInLeft: new Animated.Value(0)
    }
    this.arrayHolder,
    this.animatedValue = new Animated.Value(0)
  }
  componentDidMount () {
    AsyncStorage.getItem('id').then(value => {
      this.setState({ sender_id: value })
      this.getData()
    })
  }
  componentDidUpdate () {
    setTimeout(() => {
      this.getData()
    }, 10000)
  }
  //=========================================================
  getData = () => {
    // alert('tunggu')
    const { sender_id } = this.state
    const receiver_id = this.props.navigation.state.params.detail[0]
    const url =
      'https://calm-mesa-84057.herokuapp.com/message/' +
      sender_id +
      '/' +
      receiver_id
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ Data: res.message })
        this.arrayHolder = res.message
        this.setState({isLoading:false})
      })
  }
  //=========================================================
  sendMessage = () => {
    const { textInput, sender_id } = this.state
    const receiver_id = this.props.navigation.state.params.detail[0]
    //============
    const url = 'https://calm-mesa-84057.herokuapp.com/message/send'
    //============
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sender_id: sender_id,
        receiver_id: receiver_id,
        text: textInput
      })
    })
      .then(res => {
        this.setState({
          textInput: ""
        })
        ToastAndroid.show('success', ToastAndroid.SHORT)
        this.getData()
      })
      .catch(err => {
        Alert.alert(err)
        ToastAndroid.show('tidak terkirim', ToastAndroid.SHORT)
      })
  }
  //=========================================================
  conditionText = () => {
    // if (this.state.text != '') {
    return (
      <View style={{ width: '88%', flexDirection: 'row' }}>
        <TextInput
          placeholder='Type a message...'
          value={this.state.textInput}
          style={styleChat.textInput}
          onChangeText={data => this.setState({ textInput: data })}
          multiline={true}
        />
        <TouchableOpacity style={styleChat.rowSend} onPress={this.sendMessage}>
          {send}
        </TouchableOpacity>
      </View>
    )
    // } else {
    //   return (
    //     <TextInput
    //       placeholder='Type a message...'
    //       style={styleChat.textInputTrue}
    //       onChangeText={text => this.setState({ text: text })}
    //     />
    //   )
    // }
  }

  renderItem = ({ item }) => {
    if (item.sender_id === parseInt(this.state.sender_id)) {
      return (
        <View
          style={{
            width: '100%',
            justifyContent: 'flex-end',
            paddingLeft: '25%',
            paddingRight: 15,
            flexDirection: 'row',
            marginVertical: 5
          }}
        >
          <TouchableOpacity
            // onPress={()=>this.ModalDelete(item)}
            onLongPress={()=>this.ModalDelete(item)}
            delayLongPress={1000}
            style={{
              paddingHorizontal: 15,
              paddingVertical: 10,
              backgroundColor: '#d3d3d3',
              borderRadius: 10
            }}
            // onPress={()=>this.setState({CD:true, id:item.id})}
          >
            <Text>{item.text}</Text>
            <Text style={{ fontSize: 11, fontStyle: 'italic', marginTop: 3 }}>
              {item.updated_at}
            </Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View
          style={{
            width: '100%',
            alignItems: 'flex-start',
            paddingLeft: 15,
            paddingRight: '25%'
          }}
        >
          <View
            style={{
              paddingHorizontal: 15,
              paddingVertical: 10,
              backgroundColor: '#00c5f0',
              marginVertical: 4,
              borderRadius: 10
            }}
          >
            <Text>{item.text}</Text>
            <Text style={{ fontSize: 11, fontStyle: 'italic', marginTop: 3 }}>
              {item.updated_at}
            </Text>
          </View>
        </View>
      )
    }
  }

  ModalDelete = (item)=>{
    this.setState({ ModalDelet: true, id: item.id })
    this.animate()
  }
  SearchFilterFunction (text) {
    const newData = this.arrayHolder.filter(function (item) {
      const itemData = item.text.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })
    this.setState({
      Data: newData,
      text: text
    })
  }
  //delete pesan
  deleteData = () => {
    const id = this.state.id
    const url = 'https://calm-mesa-84057.herokuapp.com/message/delete/' + id
    fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(data => {
        this.setState({ ModalDelet: false })
        ToastAndroid.show('success', ToastAndroid.SHORT)
      })
      .catch(err => {
        console.log(err)
        ToastAndroid.show('gagal', ToastAndroid.SHORT)
      })
  }

  PP = detailItem => {
    this.setState({ Modal: false })
    this.props.navigation.navigate('PPOrang', { detail: detailItem })
  }

  animate () {
  this.animatedValue.setValue(0)
  Animated.timing(
    this.animatedValue,
    {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear
    }
  ).start()
}
  button = () => {
    this.setState({ Modal: true })
  }
  render () {
    const username = this.props.navigation.state.params.detail[2]
    const image = this.props.navigation.state.params.detail[3]
    const no_telp = this.props.navigation.state.params.detail[1]
    const email = this.props.navigation.state.params.detail[4]
    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 5]
    })
    return (
      <View style={styleChat.component}>
        {/* ===============Modal================ */}
        <Modal visible={this.state.Modal} transparent={true}>
          <TouchableOpacity
            style={styleChat.modal}
            activeOpacity={1.5}
            onPress={() => this.setState({ Modal: false })}
          >
            <View style={styleChat.modalCompo}>
              <TouchableOpacity
                style={styleChat.touchModal}
                onPress={() =>
                  this.PP([`${no_telp}`, `${username}`, `${image}`, `${email}`])
                }
              >
                <Text>Info Kontak</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styleChat.touchModal}
                onPress={() =>
                  this.setState({ Modal: false, modalSearch: true })
                }
              >
                <Text>Cari</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
        {/* ===============Modal================ */}
        <Modal visible={this.state.ModalDelet} transparent={true}>
          <Animated.View
            style={{
              opacity,
              width:'100%',
              height:'100%'
            }}
          >
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#000',
                opacity: 0.3
              }}
            ></View>
            <View style={styleChat.modalDel}>
              <View style={styleChat.cardDel}>
                <View style={styleChat.delDes}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      marginBottom: '4%'
                    }}
                  >
                    Hapus?
                  </Text>
                  <Text style={{ fontSize: 15 }}>Hapus pesan ini?</Text>
                </View>
                <View style={styleChat.delButton}>
                  <TouchableOpacity
                    style={styleChat.delDel}
                    onPress={() => this.setState({ ModalDelet: false })}
                  >
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: '#d3d3d3',
                        fontSize: 16
                      }}
                    >
                      Batal
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{ borderWidth: 1, borderColor: '#d3d3d3' }}
                  ></View>
                  <TouchableOpacity
                    style={styleChat.delDel}
                    onPress={() => this.deleteData()}
                  >
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: '#00c5f0',
                        fontSize: 16
                      }}
                    >
                      Hapus
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Animated.View>
        </Modal>
        {/* ===============Modal================ */}

        <View style={styleChat.header}>
          <View style={styleChat.headerRow}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
            >
              {arrow}
            </TouchableOpacity>
            <Image
              source={{
                uri: image
              }}
              style={styleChat.imgPP}
            />
            <View>
              <Text style={{ fontSize: 18, fontWeight: '800' }}>
                {username}
              </Text>
              <Text style={{ fontSize: 12 }}>online</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            {/* <Text>{this.state.id}</Text> */}
            <TouchableOpacity onPress={() => Linking.openURL(`tel:${no_telp}`)}>
              {call}
            </TouchableOpacity>
            <TouchableOpacity onPress={this.button}>{menu}</TouchableOpacity>
          </View>
        </View>
        <View style={{ width: '100%', height: '100%', paddingBottom: 130 }}>
          <FlatList
            data={this.state.Data}
            keyExtractor={index => index.toString()}
            renderItem={this.renderItem}
            onRefresh={this.getData}
            refreshing={this.state.isLoading}
          />
        </View>
        <View style={styleChat.viewAbsolute}>
          <View style={styleChat.absoluteRow}>
            <View style={styleChat.rowAdd}>
              <TouchableOpacity>{photo_library}</TouchableOpacity>
            </View>
            {this.conditionText()}
          </View>
        </View>
        {this.state.modalSearch === true ? (
          <View
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              position: 'absolute'
            }}
          >
            <View style={{ width: '90%', marginTop: 10 }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  height: 45,
                  alignItems: 'center',
                  borderWidth: 1,
                  backgroundColor: '#fff',
                  elevation: 5,
                  borderRadius: 5,
                  borderColor: '#d3d3d3'
                }}
              >
                <TextInput
                  style={{ width: '90%', height: 40, paddingHorizontal: 10 }}
                  placeholder='type search...'
                  // onChangeText={(text)=>this.SearchFilterFunction(text)}
                />
                <TouchableOpacity
                  onPress={() => this.setState({ modalSearch: false })}
                >
                  {clear}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View></View>
        )}
      </View>
    )
  }
}
export default ChatScreen
