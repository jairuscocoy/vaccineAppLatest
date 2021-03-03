import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from  './screens/loginScreen'
import MainScreen from  './screens/mainScreen'
import RegisterScreen from  './screens/registerScreen'
import ResolveAuthScreen from '../src/screens/resolveAuthScreen'

import { setNavigator } from '../src/navigationRef'

import {Provider as RegisterProvider} from './context/registerContext'
import {Provider as AuthProvider} from './context/AuthContext'

const switchNavigator = createSwitchNavigator({
    authScreen : ResolveAuthScreen,
    loginFlow: createStackNavigator({
        Login : LoginScreen,
        Register : RegisterScreen,
      }),
      mainFlow :createStackNavigator({
        Main : MainScreen,
      })
       
})

const App= createAppContainer(switchNavigator)

export default () =>{
    return(
      <AuthProvider>
        <RegisterProvider>
           <App ref={(navigator)=>{setNavigator(navigator)}}/>
        </RegisterProvider>
      </AuthProvider>
    )
}