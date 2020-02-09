import { StyleSheet } from 'react-native'

export const styleLogin = StyleSheet.create({
  component: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    // backgroundColor: '#fff',
    justifyContent: 'center'
  },
  textInputUser: {
    width: '85%',
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderColor: '#d3d3d3',
    marginVertical:3,
  },
  textInputPass: {
    width: '85%',
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16
  },
  ViewPass: {
    width: '85%',
    height: 50,
    flexDirection: 'row',
    marginTop: 3,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderColor: '#d3d3d3'
  },
  TouchIcon: {
    width: '15%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  TouchLogin: {
    width: '60%',
    height: 50,
    backgroundColor: '#00c5f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    borderRadius: 5
  },
  LYM: {
    fontSize: 16,
    fontWeight: '500',
    paddingBottom: 20,
    borderBottomWidth: 2,
    width: '90%',
    borderBottomColor: '#d3d3d3'
  },
  viewCard: {
    width: '95%',
    backgroundColor: '#ededed',
    elevation: 10,
    paddingBottom: 30,
    alignItems: 'center',
    opacity:0.9
  },
  viewRow: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 30,
    backgroundColor: '#fff',
  },
  rowText: {
    width: '75%',
    height: 100,
    paddingHorizontal: 10,
    justifyContent: 'center'
  },
  rowIcon: {
    width: '25%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageIcon: {
    width: 45,
    height: 45
  },
  textLTOS: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 5
  },
  textEnterUser: {
    fontSize: 15,
    textAlign: 'left',
    color: '#bdbdbd'
  },
  textCYA: {
    color: '#7e7e7e',
    fontStyle: 'italic',
    fontSize: 15,
    marginRight: 5
  },
  textReg: {
    fontSize: 15,
    borderBottomWidth: 1,
    color: '#01dfd7',
    borderColor: '#01dfd7',
  }
})

export const styleRegister = StyleSheet.create({
  component: {
    flex: 1,
    width: '100%',
    height: '100%'
  }
})
