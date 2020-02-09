import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  Image,
  AsyncStorage,
  Linking,
  ToastAndroid,
  BackHandler,
  Animated,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import { styleHome, styleList } from './style'
import Icon from 'react-native-vector-icons/MaterialIcons'

const search = <Icon name='search' size={28} style={{ marginRight: 15 }} />
const more_vert = <Icon name='menu' size={28} />
const clear = <Icon name='clear' size={20} />
const call = <Icon name='call' size={30} color='#000' />
const message = <Icon name='message' size={30} color='#000' />
const contact = <Icon name='contact' size={30} color='#000' />
const add = <Icon name='add' size={50} color='#00c5f0' />

class HomeScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      Data: [],
      //=======
      ModalSet: false,
      ModalImagePP: false,
      //========
      searchOrNo: false,
      id: '',
      //===========
      idDia: '',
      image: '',
      nama: '',
      no_telp: '',
      email: '',
      isLoading: true,
      //====animation===
      SlideInRight: new Animated.Value(0),
      opacity: new Animated.Value(0),
    }
    this.arrayHolder
  }
  componentDidMount () {
    AsyncStorage.getItem('id').then(value => {
      this.setState({ id: value })
      this.getData(value)
    })
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
  }
  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
  }
  handleBackButton () {
    BackHandler.removeEventListener()
    return true
  }
  ModalSet = () => {
    this.setState({ ModalSet: !this.state.ModalSet })
  }
  ModalImagePP = item => {
    this.setState({
      ModalImagePP: !this.state.ModalImagePP,
      image: item.avatar,
      nama: item.name,
      no_telp: item.no_telp,
      idDia: item.id,
      email: item.email
    })
    this._Start()
  }
  //get data
  getData = () => {
    // alert('ss')
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
        this.setState({ Data: res, isLoading: false })
        this.arrayHolder = res
      })
      .catch(err => {
        Alert.alert(err)
        this.setState({ isLoading: false })
      })
  }

  chatScreen = detailItem => {
    this.props.navigation.navigate('Chat', { detail: detailItem })
  }
  chatScreenPP = detailItem => {
    this.setState({ ModalImagePP: false })
    this.props.navigation.navigate('Chat', { detail: detailItem })
  }

  renderItem = ({ item }) => {
    return (
      <View style={styleList.itemComponent}>
        <TouchableOpacity
          style={styleList.TouchImage}
          activeOpacity={0.7}
          onPress={() => this.ModalImagePP(item)}
        >
          {item.avatar != null ? (
            <Image source={{ uri: item.avatar }} style={styleList.imagePP} />
          ) : (
            <Image
              source={{
                uri:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSljHokqdVBEldKHyLeWMD7ICoYJ-zq7M8VdBIxRRZWHHum7dikvQ&s'
              }}
              style={styleList.imagePP}
            />
          )}
        </TouchableOpacity>
        {item.avatar === null ? (
          <TouchableOpacity
            style={styleList.TouchDes}
            activeOpacity={0.7}
            onPress={() =>
              this.chatScreen([
                `${item.id}`,
                `${item.no_telp}`,
                `${item.name}`,
                `${'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSljHokqdVBEldKHyLeWMD7ICoYJ-zq7M8VdBIxRRZWHHum7dikvQ&s'}`,
                `${item.email}`
              ])
            }
          >
            <Text style={styleList.textUser}>{item.username}</Text>
            <Text style={styleList.textConnection}>connection...</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styleList.TouchDes}
            activeOpacity={0.7}
            onPress={() =>
              this.chatScreen([
                `${item.id}`,
                `${item.no_telp}`,
                `${item.name}`,
                `${item.avatar}`,
                `${item.email}`
              ])
            }
          >
            <Text style={styleList.textUser}>{item.username}</Text>
            <Text style={styleList.textConnection}>connection...</Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }

  //search
  searchOrNo = () => {
    this.setState({ searchOrNo: !this.state.searchOrNo })
    this._Start
  }

  conditionSearch = () => {
    if (this.state.searchOrNo === true) {
      return (
        <View style={styleHome.viewSearch}>
          <View style={styleHome.viewSearchRow}>
            <TextInput
              style={styleHome.textInputSearch}
              placeholder='type search...'
              onChangeText={text => this.SearchFilterFunction(text)}
            />
            <TouchableOpacity
              style={{
                width: '15%',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={this.searchOrNo}
            >
              {clear}
            </TouchableOpacity>
          </View>
        </View>
      )
    } else {
      return (
        <View style={styleHome.rowHeader}>
          <TouchableOpacity onPress={this.searchOrNo}>
            {search}
          </TouchableOpacity>
          <TouchableOpacity onPress={this.ModalSet}>
            {more_vert}
          </TouchableOpacity>
        </View>
      )
    }
  }
  SearchFilterFunction (text) {
    const newData = this.arrayHolder.filter(function (item) {
      const itemData = item.username.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })
    this.setState({
      Data: newData,
      text: text
    })
  }

  Setting = () => {
    this.setState({ ModalSet: false })
    this.props.navigation.navigate('Setting')
  }

  PP = detailItem => {
    this.setState({ ModalImagePP: false })
    this.props.navigation.navigate('PPOrang', { detail: detailItem })
  }

  //Animated
  _Start = () => {
    Animated.timing(this.state.SlideInRight, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start()
  }
  _Start1 = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear
    }).start()
  }
  render () {
    const { idDia, nama, no_telp, image, email } = this.state
    return (
      <View style={styleHome.component}>
      <Modal visible={this.state.isLoading} transparent={true}>
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
        {/* ==========modalSet========== */}
        <Modal visible={this.state.ModalSet} transparent={true}>
          <TouchableOpacity
            style={styleHome.ModalSet}
            activeOpacity={1.5}
            onPress={this.ModalSet}
          >
            <View style={styleHome.viewModalSet}>
              <TouchableOpacity onPress={this.Setting}>
                <Text style={styleHome.textModalSet}>Setting</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
        {/* ==========modalSet========== */}
        {/* ==========modalImagePP========== */}
        <Modal
          visible={this.state.ModalImagePP}
          transparent={true}
          animationType='slide'
        >
          <Animated.View
            style={{
              transform: [
                {
                  translateY: this.state.SlideInRight.interpolate({
                    inputRange: [0, 1],
                    outputRange: [600, 0]
                  })
                }
              ],
              width: '100%'
            }}
          >
            <TouchableOpacity
              style={styleHome.ModalImagePP}
              activeOpacity={1.5}
              onPress={this.ModalImagePP}
            >
              <View style={styleHome.viewModalPP}>
                <View style={styleHome.ImgPP}>
                  {this.state.image === null ? (
                    <Image
                      source={{
                        uri:
                          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSljHokqdVBEldKHyLeWMD7ICoYJ-zq7M8VdBIxRRZWHHum7dikvQ&s'
                      }}
                      style={{ width: '100%', height: '100%' }}
                    />
                  ) : (
                    <Image
                      source={{ uri: this.state.image }}
                      style={{ width: '100%', height: '100%' }}
                    />
                  )}
                </View>
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    justifyContent: 'flex-end'
                  }}
                >
                  <View style={styleHome.ModalPPDesc}>
                    <TouchableOpacity
                      style={styleHome.touchMPPD}
                      onPress={() =>
                        this.chatScreenPP([
                          `${idDia}`,
                          `${no_telp}`,
                          `${nama}`,
                          `${image}`,
                          `${email}`
                        ])
                      }
                    >
                      {message}
                    </TouchableOpacity>
                    {image === null ? (
                      <TouchableOpacity
                        style={styleHome.touchMPPD}
                        onPress={() =>
                          this.PP([
                            `${no_telp}`,
                            `${nama}`,
                            `${'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSljHokqdVBEldKHyLeWMD7ICoYJ-zq7M8VdBIxRRZWHHum7dikvQ&s'}`,
                            `${email}`
                          ])
                        }
                      >
                        {contact}
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={styleHome.touchMPPD}
                        onPress={() =>
                          this.PP([
                            `${no_telp}`,
                            `${nama}`,
                            `${image}`,
                            `${email}`
                          ])
                        }
                      >
                        {contact}
                      </TouchableOpacity>
                    )}

                    <TouchableOpacity
                      style={styleHome.touchMPPD}
                      onPress={() => Linking.openURL(`tel:${no_telp}`)}
                    >
                      {call}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </Modal>
        {/* ==========modalImagePP========== */}
        <View style={styleHome.header}>
          <View>
            <Text style={styleHome.textTitle}>Chat App</Text>
          </View>
          {this.conditionSearch()}
        </View>
          <ScrollView style={styleHome.cardComponent1}>
            <View style={styleHome.cardComponent}>
              <FlatList
                data={this.state.Data}
                keyExtractor={index => index.toString()}
                renderItem={this.renderItem}
                onRefresh={this.getData}
                refreshing={this.state.isLoading}
              />
            </View>
          </ScrollView>
        {/* <View style={styleHome.viewAbsolute}>
          <TouchableOpacity
            style={styleHome.TouchAdd}
            onPress={() => this.props.navigation.navigate('ListChat')}
          >
            {add}
          </TouchableOpacity>
        </View> */}
      </View>
    )
  }
}
export default HomeScreen
