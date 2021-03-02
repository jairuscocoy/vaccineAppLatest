import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
}from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';

import Colors from '../assets/Colors'

Icon.loadFont()

const BackComponent = ({onSubmit}) =>{
    return(
        <TouchableOpacity onPress={()=>onSubmit()}>
        <View style={styles.compBack}>
            <Text style={styles.txtBack}>
                <Icon name= 'left' size = {30}/>
            </Text>
            <Text style={styles.txtBack}>
                Back
            </Text>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    txtBack:{
        color:Colors.blue,
        fontSize:21

    },
    compBack:{
        flexDirection:'row',
        alignItems:'center'
    }

})

export default BackComponent