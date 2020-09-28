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
import { stylePP } from '../setting/style'

const arrow = <Icons name='arrow-left' size={25} />
const call = <Icon name='call' size={35} />
const Email = <Icon name='email' size={35} />
const share = <Icon name='share' size={30} style={{ marginRight: 10 }} />
const person = <Icon name='person' size={35} />

class ProfileOrang extends React.Component {
  onShare = async () => {
    try {
      const result = await Share.share({
        message: this.props.navigation.state.params.detail[0]
      })

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message)
    }
  }
  render () {
    const name = this.props.navigation.state.params.detail[1]
    const email = this.props.navigation.state.params.detail[3]
    const no_telp = this.props.navigation.state.params.detail[0]
    const image = this.props.navigation.state.params.detail[2]
    return (
      <View style={stylePP.component}>
        <View style={stylePP.header}>
          <View style={stylePP.cpHeader}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
            >
              {arrow}
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onShare}>{share}</TouchableOpacity>
          </View>
          <View style={stylePP.compoHeader}>
            <View style={stylePP.viewImage}>
                <Image
                  style={stylePP.imgPP}
                  source={{
                    uri: image
                  }}
                />
            </View>
          </View>
        </View>
        <View style={stylePP.viewCard}>
          {/* <Text>{this.props.navigation.state.params.detail[2]}</Text> */}
          <View style={{ flexDirection: 'row' }}>
            <View style={stylePP.viewIcon}>{person}</View>
            <View style={stylePP.textDesc}>
              <Text style={{ fontSize: 17, fontWeight: '500' }}>{name}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={stylePP.viewIcon}>{call}</View>
            <View style={stylePP.textDesc}>
              <Text style={{ fontSize: 17, fontWeight: '500' }}>{no_telp}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={stylePP.viewIcon}>{Email}</View>
            <View style={stylePP.textDesc}>
              <Text style={{ fontSize: 17, fontWeight: '500' }}>{email}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
export default ProfileOrang
