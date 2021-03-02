/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';

const LoadingComponent = ()=>{
    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading...</Text>
        </View>
    )
};

const styles = StyleSheet.create({});

export default LoadingComponent;
