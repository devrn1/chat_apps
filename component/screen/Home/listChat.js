import React from 'react'
import {
  View,
  Text,
  Alert,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native'
import { styleList } from './style'

class ListChat extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      Data: []
    }
    this.arrayHolder
  }
  componentDidMount () {
    this.getData()
  }

  getData = () => {
    alert('otw')
    const url = 'https://calm-mesa-84057.herokuapp.com/tampil'
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({ Data: res })
        // this.arrayHolder(res)
        alert(res)
      })
      .catch(err => {
        Alert.alert(err)
      })
  }

  chatScreen=(detailItem)=>{
    this.props.navigation.navigate("Chat", {detail:detailItem})
  }

  renderItem = ({ item }) => {
    return (
      <View style={styleList.itemComponent}>
        <TouchableOpacity style={styleList.TouchImage} activeOpacity={0.7} onPress={this.ModalImagePP}>
          {item.avatar != null ? (
            <Image source={{ uri: item.avatar }} style={styleList.imagePP} />
          ) : (
            <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSljHokqdVBEldKHyLeWMD7ICoYJ-zq7M8VdBIxRRZWHHum7dikvQ&s" }} style={styleList.imagePP} />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styleList.TouchDes} activeOpacity={0.7} onPress={()=>this.chatScreen(`${item.id}`,`${item.no_telp}`,`${item.username}`)}>
          <Text style={styleList.textUser}>{item.username}</Text>
          <Text style={styleList.textConnection}>connection...</Text>
        </TouchableOpacity>
      </View>
    )
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
  render () {
    return (
      <View style={styleList.component}>
        {/* <TextInput
          style={styleList.inputList}
          placeholder='search'
          onChangeText={text => this.SearchFilterFunction(text)}
        /> */}
        <FlatList
          data={this.state.Data}
          keyExtractor={index => index.toString()}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}
export default ListChat
