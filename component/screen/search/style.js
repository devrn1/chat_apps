import { Dimensions, StyleSheet } from "react-native";

const {width, height} = Dimensions.get('window')

export const style_serach = StyleSheet.create({
    component:{
        width:width,
        height:height,
        flex:1,
        backgroundColor:'#fff'
    },
    header:{
        width:'100%',
        height:height / 18,
        flexDirection:'row',
        justifyContent:''
    }
})