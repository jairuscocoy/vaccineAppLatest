
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
import moment from 'moment';

import Colors from '../assets/Colors'
import BackComponent from '../components/backComponent'
import LoadingComponent from '../components/loadingComponent'

import {Context as RegisterContext} from '../context/registerContext'

const RegisterScreen = ({navigation})=>{

    const { state, getJobsite, getVaccine,registerInfo, getProvince, getMe, getBrgy } = useContext(RegisterContext)

    const [username,setUsername] = useState('')
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
    const [province, setProvince] = useState('')
    const [municipality, setMunicipality] = useState('')
    const [brgy, setBrgy] = useState('')

    const [imageUrl, setImageUrl] = useState('')
    const [imageData, setData] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [upload, setUpload] = useState(false);
    const [filename, setFilename] = useState('')
    const bearProfile = require('../assets/images/cloud.png')

    const _back =()=>{
        navigation.pop()
    }

    useEffect(()=>{
        getJobsite()
        getVaccine()
        getProvince()
        
    },[])

    useEffect(()=>{
        getMe({province})
    },[province])

    useEffect(()=>{
        getBrgy({municipality})
    },[municipality])

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


    const uploadImage = async()=> {
        // alert('nagupload')
        state.loading =true
        if(!lastName){
            alert('Please input your Last name')
        }
        else if(!firstName){
            alert('Please input your First name')
        }
        else if(!middleName){
            alert('Please input your Middle name')
        }
        else if(!birthdate){
            alert('Please input your Birthday')
        }
        else if(!email){
            alert('Please input your Email')
        }
        else if(!province){
            alert('Please input your Province')
        }
        else if(!municipality){
            alert('Please input your Municipality')
        }
        else if(!brgy){
            alert('Please input your Barangay')
        }
        else if(!jobsite){
            alert('Please input your Jobsite')
        }
        else if(!vaccine){
            alert('Please input the name of your vaccine')
        }
        else if(!firstDose){
            alert('Please input your First Dose')
        }
        else if(!secondDose){
            alert('Please input your Second Dose')
        }
        else if(!msg){
            alert('Please input an adverse reaction')
        }
        else{
            let dateStamp = moment().format('x')
            RNFetchBlob.fetch('POST', 'https://bap.owwa.gov.ph/cocoy/upload_image.php', {
                otherHeader : "foo",
                'Content-Type' : 'multipart/form-data',
            }, [
                { name : 'image', filename : dateStamp+'_owwa.jpeg',type:'image/jpeg', data: imageData},
            
            ]).then((resp) => {
                // alert(JSON.stringify(resp.data))
                
                if(resp.data){
                    const imageUrl = `https://bap.owwa.gov.ph/cocoy/vaccine_photos/${dateStamp}.owwa.jpeg`
                    registerInfo({
                        lastName,
                        firstName,
                        middleName,
                        birthdate,
                        province,
                        municipality,
                        brgy,
                        jobsite,
                        vaccine,
                        firstDose,
                        secondDose,
                        msg,
                        imageUrl,
                        email,
                        username
                    })
                    // alert('success image')
                    // alert(dateStamp)
                }else{
                    
                    alert('Something went wrong, try again later :(')
                }
            })
        }
       
        
    }

    if(state.loading){
        return(
            <LoadingComponent/>
        )
      }else{
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
                                <View style={styles.thumbnailStyle}>
                                    <Thumbnail style={styles.thumbnailStyleImage} square size ={1200} source={!imageUrl ? bearProfile : {uri: imageUrl}} />
                                    <Text style={{fontWeight:'bold', color:'gray'}}>Upload your photo here</Text>
                                </View>
                                
                            </TouchableOpacity>

                            <Text style={styles.label}> Username </Text>
                            <TextInput
                                placeholder ='Username'
                                style={styles.txtInput}
                                onChangeText={setUsername}
                            />
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

                            <Text style={styles.label}> Email </Text>
                            <TextInput
                                placeholder ='Email'
                                style={styles.txtInput}
                                onChangeText={setEmail}
                            />

                            <Text style={styles.label}>Province</Text>
                            <Picker
                                mode="dropdown"
                                placeholder="Select province"
                                placeholderStyle={{ color: "#bfbfbf"}}
                                placeholderIconColor="#007aff"
                                style={[styles.txtInput]}
                                selectedValue={province}
                                onValueChange={setProvince}
                            >
                                <Picker.Item style ={{color:'red'}} label="Select Province" value=""/>
                                {
                                    state.getProvince.map(item=>(
                                        <Picker.Item label={item.provinceName} value={item.provinceId} />
                                    ))
                                }
                            </Picker>

                            <Text style={styles.label}>Municipality</Text>
                            <Picker
                                mode="dropdown"
                                placeholder="Select municipality"
                                placeholderStyle={{ color: "#bfbfbf"}}
                                placeholderIconColor="#007aff"
                                style={[styles.txtInput]}
                                selectedValue={municipality}
                                onValueChange={setMunicipality}
                            >
                                <Picker.Item style ={{color:'red'}} label="Select Municipality" value=""/>
                                {
                                    state.getMe.map(item=>(
                                        <Picker.Item label={item.muniName} value={item.muniId} />
                                    ))
                                }
                            </Picker>

                            <Text style={styles.label}>Barangay</Text>
                            <Picker
                                mode="dropdown"
                                placeholder="Select barangay"
                                placeholderStyle={{ color: "#bfbfbf"}}
                                placeholderIconColor="#007aff"
                                style={[styles.txtInput]}
                                selectedValue={brgy}
                                onValueChange={setBrgy}
                            >
                                <Picker.Item style ={{color:'red'}} label="Select Barangay" value=""/>
                                {
                                    state.getBrgy.map(item=>(
                                        <Picker.Item label={item.brgyName} value={item.brgyId} />
                                    ))
                                }
                            </Picker>

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
                        {
                            imageData.length > 0 ?
                                <TouchableOpacity onPress={()=> uploadImage()}>
                                    <View style={[styles.submitBtn]}>
                                        <Text style={styles.btnLabel}>
                                            Register
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            :

                            <TouchableOpacity onPress={()=> alert('Must upload an image!')}>
                                <View style={[styles.submitBtn]}>
                                    <Text style={styles.btnLabel}>
                                        Register
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        }
                        

                        </ScrollView>

                    </KeyboardAvoidingView> 
                </View>
            </SafeAreaView> 
        )
      }
        
  
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
        },
        thumbnailStyle:{
            alignItems:'center', 
            marginBottom:30, 
            borderWidth:1, 
            borderColor:'gray',
            width:width/2.5,
            height: width/2.5,
            justifyContent:'center'
        },

        thumbnailStyleImage:{
            alignItems:'center', 
            width:width/2.7,
            height: width/2.7,
            justifyContent:'center'
        },

        submitBtn:{
            width: width * 0.8,
            height: 60,
            backgroundColor:Colors.blue,
            borderRadius:12,
            justifyContent:'center',
            alignItems:'center',
        },
        btnLabel:{
            color:'white',
            fontSize: 16
        },
});

export default RegisterScreen