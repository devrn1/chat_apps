import { StyleSheet } from 'react-native'

export const styleSetting = StyleSheet.create({
  component: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#00c5f0'
  },
  header: {
    width: '100%',
    height: 60,
    justifyContent: 'center'
  },
  cardComponent: {
    width: '100%',
    paddingVertical: 20,
    backgroundColor: '#fff',
    elevation: 3,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 10
  },              
  touchComponent: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
    height: 40,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  viewExit: {
    flexDirection: 'row',
    height: 30,
    alignItems: 'flex-end',
    marginBottom: 15
  },
  viewDescription: {
    width: '100%',
    alignItems: 'center',
    height: '100%',
    paddingTop: '35%',
    backgroundColor: '#fff'
  }
})

export const stylePP = StyleSheet.create({
  component: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#00c5f0'
  },
  header: {
    width: '100%',
    height: '55%'
  },
  viewCard: {
    width: '100%',
    height: '45%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 15,
    paddingTop: 40
  },
  cpHeader: {
    width: '100%',
    height: '20%',
    // backgroundColor:'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    paddingBottom: 15
  },
  compoHeader: {
    width: '100%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '15%',
    // backgroundColor:'green'
  },
  imgPP: {
    width: 170,
    height: 170,
    borderRadius: 100
  },
  
  viewAdd: {
    width: '100%',
    height: '100%',
    // backgroundColor:'red',
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: '15%',
    paddingBottom: '3%'
  },
  viewImage: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'green'
  },
  viewAddImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#fff',
    opacity:0.9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewIcon: {
    width: '15%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5
  },
  textDesc: {
    width: '85%',
    height: 50,
    justifyContent: 'center',
    marginBottom: 5
  }
})

export const styleSettingPP = StyleSheet.create({
  component: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#00c5f0'
  },
  header: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    paddingHorizontal: 15
  },
  viewCard: {
    width: '100%',
    height: '90%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  viewRow: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'flex-end'
  },
  viewIcon: {
    width: '17%',
    height: 50,
    marginRight: 3,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewInput: {
    width: '83%',
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center'
  },
  viewInput1: {
    width: '83%',
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    alignItems:'center',
    flexDirection:"row"
  },
  textInput: {
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    fontSize: 15
  },
  textInput1: {
    width: '85%',
    height: 50,
    paddingHorizontal: 10,
    fontSize: 15
  },
  Button: {
    width: '60%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00c5f0',
    borderRadius: 5,
    marginTop: 35
  },
  CF: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 5
  }
})
