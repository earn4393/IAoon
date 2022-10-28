import {StyleSheet} from 'react-native'
const regStyles = StyleSheet.create({
  container : {
    flex:1,
    backgroundColor:'#EEFCDC'
  },
  inputContainer : {
    borderTopLeftRadius:40,
    borderBottomRightRadius:40,
    backgroundColor:'#E8EAE6',
    paddingVertical:0,
    paddingHorizontal:20,
  },
  inputBox:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    paddingLeft:20,
    borderWidth:1,
    borderColor:'gray',
    borderRadius:40,
    backgroundColor: "#9AD3DA",
    fontFamily:(Platform.OS === 'ios')? 'AppleSDGothicNeo-Thin' : 'Roboto',
  }
})

export default regStyles