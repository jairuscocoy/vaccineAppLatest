
import React,{useState, useContext, useEffect} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    ImageBackground,
    Image
} from 'react-native'

import Colors from '../assets/Colors'
import LoadingComponent from '../components/loadingComponent'
 
import {Context as InfoContext} from '../context/getInfoContext'

const MainScreen = ()=>{

    const { state, getInfo} = useContext(InfoContext)

    useEffect(()=>{
        getInfo()
    },[])
        return (
            <View style={styles.container}>
               <ImageBackground
                    source={require('../assets/images/ecardBG.png')}
                    style={styles.image}>
                    <ScrollView>
                        <SafeAreaView>
                            <View style={styles.headerContainer}>
                                <Image
                                    source={require('../assets/images/POEALogo.png')}
                                    style={styles.LogoP}

                                />
                                <View style={styles.headerTextContainer}>
                                    <Text style={styles.header} adjustsFontSizeToFit={true}> Republic of the Philippines</Text>
                                    <Text style={styles.header} adjustsFontSizeToFit={true}> Department of Labor and Employment</Text>
                                    <Text style={styles.header} adjustsFontSizeToFit={true}> Overseas Workers Welfare Administration</Text>
                                </View>
                                <Image
                                    source={require('../assets/images/owwaLogo.png')}
                                    style={styles.LogoP}

                                />
                            </View>
                            <View style={styles.titleHeader}>
                                <Text style={styles.covidText}> COVID-19</Text>
                                <Text style ={styles.covidSubText}> Vaccine Certificate</Text>
                            </View>

                            <Image
                                style={styles.profileImage}
                                source={{uri: state.getInfo.twobytwopicture}}
                                />
                        </SafeAreaView>
                    </ScrollView>
                </ImageBackground>
            </View> 
        )
  
}
 

MainScreen.navigationOptions = {
    headerShown: false
}

const width = Dimensions.get('window').width
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
      },
      image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },

      headerContainer:{
          flex:1,
          flexDirection:'row',
          justifyContent:'space-evenly',
          alignItems:'center'
      },

      LogoP:{
          width:width/5.5,
          height:width/5.5,
          resizeMode: 'contain'
      },

      headerTextContainer:{
          flexDirection:'column',
          alignItems:'center',
          justifyContent:'center'
      },

      header:{
          fontSize:width/40,
          fontWeight:'bold'
      },

      titleHeader:{
          justifyContent:'center',
          flexDirection:'column',
          alignItems:'center',
          marginVertical: 10
      },
      covidText:{
          fontWeight:'bold',
          fontSize:width/10
      },
      covidSubText:{
          fontWeight:'bold',
          color: Colors.red,
          fontSize:width/20
      },

      profileImage:{
            width: 50,
            height: 50,
      }
});

export default MainScreen