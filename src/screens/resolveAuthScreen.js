import React, {useEffect, useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
// import codePush from 'react-native-code-push'

import {Context as AuthContext} from '../context/AuthContext'

const AuthScreen = ()=>{
    const {state,resolving} = useContext(AuthContext)

useEffect(()=>{
    resolving()
})
    return null
};

const styles = StyleSheet.create({});

// const codePushOptions ={
//     checkFrequency: codePush.CheckFrequency.ON_APP_START
// }
// export default codePush(codePushOptions)(AuthScreen);
export default AuthScreen