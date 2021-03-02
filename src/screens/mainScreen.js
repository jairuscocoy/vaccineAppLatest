
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


 
const MainScreen = ()=>{

        return (
            <View style={styles.container}>
                <Text>
                    Main Screen
                </Text>
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

export default MainScreen