
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
import moment from 'moment';

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
                            <View style={styles.profileContainer}>
                                <Image
                                    style={styles.profileImage}
                                    source={{uri: state.getInfo.twobytwopicture}}
                                    />
                                <View style={styles.infoContainer}>
                                    <Text style={styles.label}>Name:</Text>
                                    <Text style={styles.value}>{state.getInfo.firstname} {state.getInfo.middlename} {state.getInfo.lastname}
                                    </Text>

                                    <Text style={styles.label}>Date of Birth:</Text>
                                    <Text style={styles.value}>{moment(state.getInfo.birthdate).format("MMMM DD YYYY")}
                                    </Text>
                                    <Text style={styles.label}>Jobsite:</Text>
                                    <Text style={styles.value}>{state.getInfo.country}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.vaccineContainer}>
                                <Text style={styles.label}>Name of Vaccine</Text>
                                <Text style={styles.valueV}>{state.getInfo.vaccine_name}</Text>

                                <Text style={styles.label}>Date vaccine given</Text>
                                <Text style={styles.valueV}>{moment(state.getInfo.datevaccine1).format("YYYY - MMM - DD")}</Text>

                                <Text style={styles.label}>Address</Text>
                                <Text style={styles.valueV}>{state.getInfo.streetaddress}</Text>

                                <View style={styles.bottomContainer}>
                                    <View style={{alignItems:'center'}}>
                                        <Text style={styles.label}>1st Dose</Text>
                                        <Text style={styles.valueV}>{moment(state.getInfo.datevaccine1).format("YYYY - MMM - DD")}</Text>
                                    </View>

                                    <View style={{alignItems:'center'}}>
                                        <Text style={styles.label}>2nd Dose</Text>
                                        <Text style={styles.valueV}>{moment(state.getInfo.datevaccine2).format("YYYY - MMM - DD")}</Text>
                                    </View>
                                </View>
                            </View>
                            
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
const height = Dimensions.get('window').height
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
            width: width/2.5,
            height: height/4.3,
      },

      profileContainer:{
          flexDirection:'row',
          justifyContent:'space-between',
          marginHorizontal:10
      },

      infoContainer:{
          flexDirection:'column',
          justifyContent:'flex-start',
          flex:1,
          paddingLeft:30,
      },

      label:{
          fontSize: 16
      },
      value:{
          fontWeight:'bold',
          fontSize: 16,
          textAlign:'left',
          marginTop:10,
          marginBottom:20,
          paddingLeft:10
      },

      valueV:{
        fontWeight:'bold',
        fontSize: 19,
        marginTop:10,
        marginBottom:25,
        textAlign:'center'
    },

      vaccineContainer:{
          backgroundColor:'rgba(125,150,253,0.22)',
          margin:10,
          alignItems:'center',
          flex:1,
          flexDirection:'column',
          borderRadius:5,
          padding:20
      },

      bottomContainer:{
          flexDirection:'row',
          justifyContent:'space-between',
          width:width * 0.9
      }
});

export default MainScreen