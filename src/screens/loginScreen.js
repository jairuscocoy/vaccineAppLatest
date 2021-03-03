import React,{useState, useContext} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    SafeAreaView, 
    Image,
    TextInput,
    KeyboardAvoidingView,
} from 'react-native'


import Colors from '../assets/Colors'
import LoadingComponent from '../components/loadingComponent'

import {Context as AuthContext} from '../context/AuthContext'


const LoginScreen = ({navigation}) =>{

    const {state, login} = useContext(AuthContext)
    const [username,setUsername] = useState('')
    const [password, setPassword] = useState('')

    if(state.loading){
        return(
            <LoadingComponent/>
        )
    }
    else{
            return(
                
                <View  style={styles.linearGradient}>
                    <KeyboardAvoidingView behavior='height'>
                    <View style={{marginVertical:30,alignItems:'center'}}>
                            <Image
                                    source={require('../assets/images/owwaLogo.png')}
                                    style={styles.imageContainer}
                                    resizeMode='stretch'
                                />
                            
                            <Text style={styles.owwa}>OWWA</Text>
                            <Text style={styles.signInText}>Sign in to continue</Text> 
                    </View> 
                        <View style={styles.inputView}>
                            <TextInput
                                placeholder='Username'
                                style={styles.txtInput}
                                onChangeText={setUsername}
                                placeholderTextColor='#D5D5D5'
                            />
                            <TextInput
                                placeholder='Password'
                                style={styles.txtInput}
                                onChangeText={setPassword}
                                placeholderTextColor='#D5D5D5'
                                secureTextEntry
                            />

                        <TouchableOpacity onPress={()=> login({username,password})}>
                            <View style={styles.signInBtn}>
                                    <Text style={styles.logintxt}>
                                        Sign in
                                    </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=> navigation.navigate('Register')}>
                            
                                    <Text style={styles.registerText}>
                                        Register here if you dont have an account
                                    </Text>
                        </TouchableOpacity>

                        </View>
                        
                        </KeyboardAvoidingView>
                </View>
        )
    }
    
}

LoginScreen.navigationOptions = {
    headerShown: false
}

const width = Dimensions.get('window').width
const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        justifyContent:'space-around',
        paddingHorizontal:40,
        paddingTop:width * 0.1,
        paddingBottom: width * 0.4,
        backgroundColor:'white'
      },
      container:{
        flex: 1,
        justifyContent:'space-around'
      },
      buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent', 
      },

      imageContainer:{
        width:width * 0.23,
        height:width * 0.2,
    },
    owwa:{
        color:Colors.blue,
        fontWeight:'bold',
        fontSize: 32,
    },
    signInText:{
        color:Colors.darkCyan,
        fontSize:18
    },
    txtInput:{
        width: width * 0.8,
        fontSize:22,
        borderBottomColor:Colors.darkCyan,
        borderBottomWidth: 2,
        color:'black',
        marginBottom:50
    },

    signInBtn:{
        width:208,
        height:60,
        borderRadius:30,
        backgroundColor:Colors.blue,
        justifyContent:'center',
        alignItems:'center',
    },

    logintxt:{
        color:'white',
        fontSize:26
    },

    registerText:{
        color:Colors.darkCyan,
        fontSize:14,
        marginTop:50,
        borderBottomColor:Colors.darkCyan,
        borderBottomWidth:1
    },

    inputView:{
        alignItems:'center'
    }
    
})

export default LoginScreen