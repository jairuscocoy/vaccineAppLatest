
import React,{useState, useContext, useEffect} from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Modal
} from 'react-native'
import DatePicker from 'react-native-datepicker'
import {Thumbnail, Picker} from "native-base";
import RNFetchBlob from 'rn-fetch-blob'
import ImagePicker from 'react-native-image-crop-picker'
import Colors from '../assets/Colors'
import BackComponent from '../components/backComponent'
 
import {Context as RegisterContext} from '../context/registerContext'

const RegisterScreen = ({navigation})=>{

    const { state, getJobsite, getVaccine } = useContext(RegisterContext)

    
    const [lastName,setLastname] = useState('')
    const [firstName,setFirstname] = useState('')
    const [middleName,setMiddlename] = useState('')
    const [birthdate,setBirthdate] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [jobsite, setJobsite] = useState('')
    const [vaccine, setVaccine] = useState('')
    const [firstDose, setFirstDose] = useState('')
    const [secondDose, setSecondDose] = useState('')
    const [msg, setMsg] = useState('')

    const [imageUrl, setImageUrl] = useState('')
    const [imageData, setData] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [upload, setUpload] = useState(false);
    const [filename, setFilename] = useState('')
    const bearProfile = require('../assets/images/bear.png')

    const _back =()=>{
        navigation.pop()
    }

    useEffect(()=>{
        getJobsite()
        getVaccine()
        
    },[])

    const uploadPhoto = ()=>{
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64 : true,
          }).then(image => {
            console.log(image.creationDate);
            setImageUrl(image.path)
            setFilename(image.modificationDate)
            setData(image.data)
            setUpload(true)
            setModalVisible(!modalVisible)
          });
    }
        return (
            <SafeAreaView style={styles.container}>
                <BackComponent
                    onSubmit={_back}
                />
                <View style={{flex:1}}>

                <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible)
                        }}
                    >
                        <View style={{flex:1}}>
                            <View style={{flex:2}}>

                            </View>
                            <View style={styles.modal}>
                                <TouchableOpacity onPress={()=> uploadPhoto()}>
                                   <View style={[styles.modalBtn]}>
                                        <Text style={styles.modalTxt}>
                                            Upload Photo
                                        </Text>
                                   </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> setModalVisible(!modalVisible)}>
                                   <View style={[styles.modalBtn]}>
                                        <Text style={styles.modalTxt}>
                                            Cancel
                                        </Text>
                                   </View>
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                </Modal>

                    <KeyboardAvoidingView 
                        style={styles.container} 
                        behavior= {Platform.OS === 'ios' ? 'padding' : 'height'}
                        keyboardVerticalOffset = {30}
                    > 
                        <ScrollView 
                            contentContainerStyle = {styles.containerScroll}
                        >

                            <Text style={styles.regTxt}>
                                Registration Form
                            </Text>
                            
                            <TouchableOpacity onPress={()=> setModalVisible(!modalVisible)}>
                                <View style={{alignItems:'center', marginBottom:30}}>
                                    <Thumbnail size ={300} large source={!imageUrl ? bearProfile : {uri: imageUrl}} />
                                </View>
                            
                            </TouchableOpacity>

                            <Text style={styles.label}> Last name </Text>
                            <TextInput
                                placeholder ='Last name'
                                style={styles.txtInput}
                                onChangeText={setLastname}
                            />

                            <Text style={styles.label}> First name </Text>
                            <TextInput
                                placeholder ='First name'
                                style={styles.txtInput}
                                onChangeText={setFirstname}
                            />

                            <Text style={styles.label}> Middle name </Text>
                            <TextInput
                                placeholder ='Middle name'
                                style={styles.txtInput}
                                onChangeText={setMiddlename}
                            />

                            <Text style={styles.label}> Birth date</Text>
                            <DatePicker
                                style={styles.txtInput}
                                date={birthdate}
                                mode="date"
                                placeholder="Birthdate"
                                format="YYYY-MM-DD"
                                minDate="1900-05-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                androidMode="spinner"
                                customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                                // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => {setBirthdate(date)}}
                            />
                            

                            <Text style={styles.label}>Address</Text>
                            <TextInput
                                placeholder ='Address'
                                style={styles.txtInput}
                                onChangeText={setAddress}
                            />

                            <Text style={styles.label}>Jobsite</Text>
                            <Picker
                                mode="dropdown"
                                placeholder="Select gender"
                                placeholderStyle={{ color: "#bfbfbf"}}
                                placeholderIconColor="#007aff"
                                style={[styles.txtInput]}
                                selectedValue={jobsite}
                                onValueChange={setJobsite}
                            >
                                <Picker.Item style ={{color:'red'}} label="Select Jobsite" value=""/>
                                {
                                    state.getJobsite.map(item=>(
                                        <Picker.Item label={item.jobsite} value={item.jobsite} />
                                    ))
                                }
                            </Picker>

                            <Text style={styles.label}>Name of Vaccine</Text>
                            <Picker
                                mode="dropdown"
                                placeholder="Select vaccine"
                                placeholderStyle={{ color: "#bfbfbf"}}
                                placeholderIconColor="#007aff"
                                style={[styles.txtInput]}
                                selectedValue={vaccine}
                                onValueChange={setVaccine}
                            >
                                <Picker.Item style ={{color:'red'}} label="Select Vaccine" value=""/>
                                {
                                    state.getVaccine.map(item=>(
                                        <Picker.Item label={item.vaccine} value={item.vaccine} />
                                    ))
                                }
                            </Picker>

                            <Text style={styles.label}>Date of first dose</Text>
                            <DatePicker
                                style={styles.txtInput}
                                date={firstDose}
                                mode="date"
                                placeholder="Date of First Dose"
                                format="YYYY-MM-DD"
                                minDate="1900-05-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                androidMode="spinner"
                                customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                                // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => {setFirstDose(date)}}
                            />

                            <Text style={styles.label}>Date of second dose</Text>
                            <DatePicker
                                style={styles.txtInput}
                                date={secondDose}
                                mode="date"
                                placeholder="Date of Second Dose"
                                format="YYYY-MM-DD"
                                minDate="1900-05-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                androidMode="spinner"
                                customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                                // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => {setSecondDose(date)}}
                            />

                            <Text style={styles.label}>Adverse reaction</Text>
                            <TextInput 
                                style= {styles.textArea}
                                multiline={true}
                                returnKeyType={'done'}
                                value = {msg}
                                placeholder='Type here...'
                                onChangeText = {setMsg}
                            />
                        </ScrollView>

                    </KeyboardAvoidingView> 
                </View>
            </SafeAreaView> 
        )
  
}
 
RegisterScreen.navigationOptions = {
    headerShown: false
}

const width = Dimensions.get('window').width
const styles = StyleSheet.create({
   
        container:{
            flex:1,
            backgroundColor: 'white',
        },  

        containerScroll:{
            //borderColor:'red',
            //borderWidth:1,
            alignItems:'center',
            padding:10,
            marginBottom:20
        },

        regTxt:{
            color: Colors.cyan,
            fontSize:25,
            fontWeight:'bold',
            marginBottom: 30
        },

        txtInput:{
            backgroundColor:'white',
            fontSize: width /20,
            textAlign:'center',
            height:width /9,
            width: width * 0.8,
            marginBottom:30,
            borderColor:'black',
            borderWidth: 1,
            borderRadius:10,
            justifyContent:'center',
            alignContent:'center'
        },

        textArea:{
            backgroundColor:'white',
            fontSize: width /25,
            textAlign:'left',
            height:width /2.5,
            width: width * 0.8,
            marginBottom:30,
            borderColor:'black',
            borderWidth: 1,
            borderRadius:10,
            justifyContent:'center',
            alignContent:'center',
            padding: 20
        },

        label:{
            fontSize: 19,
            fontWeight:'bold',
            color: Colors.darkCyan,
            alignSelf:'flex-start',
            paddingLeft:20,
            marginBottom:5
        },
        modal:{
            flex:1,
            backgroundColor:'white',
            justifyContent:'center',
            alignItems:'center',
            padding:20,
            borderColor:Colors.gray,
            borderWidth:1,
            borderTopStartRadius:40,
            borderTopEndRadius:40,
            marginHorizontal:5
        },
        modalBtn:{
            width: width * 0.75,
            height:50,
            borderRadius:5,
            backgroundColor:Colors.red,
            justifyContent:'center',
            alignItems:'center',
            marginVertical:5
        },
        modalTxt:{
            color:'white',
            fontSize:20
        }
});

export default RegisterScreen