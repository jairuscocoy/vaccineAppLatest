
import React,{useState, useContext, useEffect} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
    ScrollView
} from 'react-native'


 
const LoginScreen = ({navigation})=>{

        return (
            <View style={styles.container}>
                <Text>
                    Login Screen
                </Text>

                <TouchableOpacity onPress={()=> navigation.navigate('Register')}>
                    <View>
                        <Text>
                            Register here
                        </Text>
                    </View>
                </TouchableOpacity>
            </View> 
        )
  
}
 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoginScreen