import { StyleSheet } from 'react-native'

export const styleList = StyleSheet.create({
  component: {
    flex: 1,
    height: '100%',
    width: '100%'
  },
  itemComponent: {
    width: '100%',
    height: 70,
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: 1.5,
    paddingBottom: 3,
    marginVertical: 1,
    flexDirection: 'row'
  },
  TouchImage: {
    width: '23%',
    height: '100%',
    // backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  TouchDes: {
    width: '77%',
    height: '100%',
    paddingHorizontal: 5,
    // backgroundColor:'green',
    justifyContent: 'center'
  },
  inputList: {
    width: '100%',
    height: 40,
    fontSize: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10
  },
  imagePP: {
    width: '70%',
    height: '85%',
    borderRadius: 130,
    borderWidth: 2,
    borderColor: '#d3d3d3'
  },
  textUser: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  textConnection: {
    fontSize: 14,
    fontStyle: 'italic'
  }
})

export const styleHome = StyleSheet.create({
  component: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#00c5f0'
  },
  header: {
    width: '100%',
    paddingBottom: 15,
    paddingHorizontal: 10,
    height: 70,
    elevation: 5,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent:"space-between"
  },
  viewAbsolute: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  TouchAdd: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#fff',
    marginRight: 20,
    marginBottom: 25,
    elevation: 10,
    borderColor:'#d3d3d3',
    
  },
  cardComponent: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: '#fff',
    marginBottom:'10%',
    paddingHorizontal: 5,
  },
  cardComponent1: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: '#fff',
    paddingTop: 25,
    
  },
  textTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  rowHeader: {
    height: '100%',
    flexDirection: 'row',
    paddingTop: 8,
    paddingLeft:10
  },
  ModalSet: {
    width: '100%',
    height: '100%',
    paddingRight: 8,
    paddingTop: 10,
    alignItems: 'flex-end'
  },
  viewModalSet: {
    width: '40%',
    paddingVertical: '3.5%',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 5
  },
  textModalSet: { fontSize: 16, fontWeight: '100' },
  ModalImagePP: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewModalPP: {
    width: '75%',
    height: '50%',
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 10
  },
  ImgPP: {
    width: '100%',
    height: '100%',
    backgroundColor: '#d3d3d3'
  },
  ModalPPDesc: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    height: '15%',
    backgroundColor: '#00c5f0',
    opacity: 0.6
  },
  viewSearch: {
    width: '100%',
    position: 'absolute',
    height: '100%',
    paddingLeft: 15
  },
  viewSearchRow: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#d3d3d3'
  },
  textInputSearch: {
    width: '85%',
    height: 40,
    paddingHorizontal: 5,
    fontSize: 15
  },
  touchMPPD:{
      height:'100%',
      justifyContent:'center'
  }
})
