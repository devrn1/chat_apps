import { StyleSheet } from 'react-native'

export const styleChat = StyleSheet.create({
  component: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  header: {
    width: '100%',
    height: 60,
    borderBottomWidth: 2,
    borderBottomColor: '#00c5f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  viewAbsolute: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    position: 'absolute'
  },
  absoluteRow: {
    width: '100%',
    flexDirection: 'row',
    paddingBottom: 8,
    paddingTop: 10,
    backgroundColor: '#00c5f0',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  textInput: {
    width: '85%',
    maxHeight: 100,
    minHeight: 40,
    // height:40,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderColor: '#d3d3d3',
    fontSize: 15,
    paddingHorizontal: 5
  },
  rowAdd: {
    width: '12%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowSend: {
    width: '15%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInputTrue: {
    width: '85%',
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderColor: '#d3d3d3',
    fontSize: 15,
    paddingHorizontal: 5
  },
  imgPP: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginLeft: 10,
    marginRight: 5
  },
  headerRow: { flexDirection: 'row', height: '100%', alignItems: 'center' },
  modal: {
    width: '100%',
    height: '100%',
    alignItems: 'flex-end',
    paddingRight: 8,
    paddingTop: 10
  },
  modalCompo: {
    width: '45%',
    // backgroundColor: '#fff',
    paddingHorizontal: 5,
    borderRadius: 5
  },
  touchModal: {
    paddingVertical: 13,
    borderBottomWidth: 1,
    marginTop: 5,
    borderBottomColor: '#d3d3d3',
    backgroundColor: '#fff',
    elevation: 3,
    borderRadius: 5,
    paddingHorizontal: 10
  },
  modalDel: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    paddingHorizontal:11,
    paddingBottom:8,
    position:'absolute'
  },
  cardDel: {
    width: '100%',
    height: 170,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    elevation: 20,
    borderRadius: 5,
  },
  delDes: {
    width: '100%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  delButton: {
    width: '100%',
    flexDirection: 'row',
    height: '30%',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#d3d3d3',
    
  },
  delDel: {
    width: '49.5%',
    height: '100%',
    backgroundColor: 'white',
    justifyContent:'center',
    alignItems:"center"
  }
})
