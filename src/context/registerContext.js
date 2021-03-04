import createDataContext from './createDataContext'
import axios from '../api/baseURL'
import { navigate } from '../navigationRef'

const registerReducer = (state, action) =>{
    switch (action.type){
        case 'add error':
            return {...state, errorMessage: action.payload.error, loading: action.payload.loading}
        case 'isReading':
            return { ...state, loading: action.payload}
        case 'viewJobsite':
            return {...state,loading:action.payload.loading, getJobsite: action.payload.getJobsite}
        case 'viewVaccine':
            return {...state,loading:action.payload.loading, getVaccine: action.payload.getVaccine}
        case 'viewProvince':
            return {...state,loading:action.payload.loading, getProvince: action.payload.getProvince}
        case 'viewMe':
            return {...state,loading:action.payload.loading, getMe: action.payload.getMe}
        case 'viewBrgy':
            return {...state,loading:action.payload.loading, getBrgy: action.payload.getBrgy}
                 
        default :
        return state
    }
}

const getJobsite = dispatch => async() =>{
    try{
        dispatch({type:'isReading', payload:true})

        const response = await axios.get('/jobsite.php')
        // alert(JSON.stringify(response.data.data))
        dispatch({type: 'viewJobsite', payload: {getJobsite : response.data.data, loading:false}})

    }catch (err){
        // alert(JSON.stringify(err))
        alert('Something went wrong, maybe find a strong internet connection')
       
    }
    
}


const getProvince = dispatch => async() =>{
    try{
        dispatch({type:'isReading', payload:true})

        const response = await axios.get('/province.php')
        // alert(JSON.stringify(response.data.data))
        dispatch({type: 'viewProvince', payload: {getProvince : response.data.data, loading:false}})

    }catch (err){
        // alert(JSON.stringify(err))
        alert('Something went wrong, maybe find a strong internet connection')
       
    }
    
}

const getMe = dispatch => async({province}) =>{
    // alert('tyrr')
    try{
        // dispatch({type:'isReading', payload:true})

        const response = await axios.get(`/municipality.php?addressId=${province}`)
        // alert(JSON.stringify(response.data.data))
        dispatch({type: 'viewMe', payload: {getMe : response.data.data, loading:false}})

    }catch (err){
        // alert(JSON.stringify(err))
        alert('Something went wrong, maybe find a strong internet connection')
       
    }
    
}

const getBrgy = dispatch => async({municipality}) =>{
    try{
        // dispatch({type:'isReading', payload:true})

        const response = await axios.get(`/brgy.php?addressId=${municipality}`)
        // alert(JSON.stringify(response.data.data))
        dispatch({type: 'viewBrgy', payload: {getBrgy : response.data.data, loading:false}})

    }catch (err){
        // alert(JSON.stringify(err))
        alert('Something went wrong, maybe find a strong internet connection')
       
    }
    
}

const getVaccine = dispatch => async() =>{
    try{
        dispatch({type:'isReading', payload:true})

        const response = await axios.get('/vaccine.php')
        // alert(JSON.stringify(response.data.data))
        dispatch({type: 'viewVaccine', payload: {getVaccine : response.data.data, loading:false}})

    }catch (err){
        // alert(JSON.stringify(err))
        alert('Something went wrong, maybe find a strong internet connection')
       
    }
    
}

const registerInfo = dispatch => async({
        lastName,
        firstName,
        middleName,
        birthdate,
        email,
        province,
        municipality,
        brgy,
        jobsite,
        vaccine,
        firstDose,
        secondDose,
        msg,
        imageUrl,
        username
    }) =>{

        try{
            dispatch({type:'isReading', payload:true})
            const response = await axios.get(`/verifyUsername.php?username=${username}`)

            if(response.data.success){
                dispatch({type:'isReading', payload:false})
                alert("Username already exist, Please try another one")
            }
            else{

                try{
                    dispatch({type:'isReading', payload:true})
            
            
                    const response = await axios.get(`/verifyAccount.php?lastname=${lastName}&firstname=${firstName}&middlename=${middleName}&birthdate=${birthdate}`)
                
                    if(response.data.success){
                        dispatch({type:'isReading', payload:false})
                        alert("Account already exist")
                    }
                    else{
            
                        try{
                        const response = await axios.get(`/register.php?lastname=${lastName}&firstname=${firstName}&middlename=${middleName}&birthdate=${birthdate}&email=${email}&province=${province}&municipality=${municipality}&brgy=${brgy}&jobsite=${jobsite}&vaccine=${vaccine}&firstDose=${firstDose}&secondDose=${secondDose}&msg=${msg}&imageUrl=${imageUrl}&username=${username}`)
                        // alert(JSON.stringify(response.data.data))
                            if(response.data){
                                // dispatch({type:'isReading', payload:false})
                            // alert('success')
                            // alert(JSON.stringify(response.data))
                            try{
                                // dispatch({type:'isReading', payload:true})
                        
                                const responses = await axios.post(`https://owwa.gov.ph/owwa_mobile_app/owwa_app/sendgrid/vaccine_app/?ofwid=${username}&fullname=${lastName}, ${firstName} ${middleName}&email=${email}&birthdate=${birthdate}`)
                                    // alert(JSON.stringify(responses))
                                if(responses.data === "Success"){
                                        dispatch({type:'isReading', payload:false})
                                        alert(JSON.stringify("Successfully registered! Please wait for an email regarding of your password."))
                                        navigate.pop()
                                        // alert(JSON.stringify(responses))
                                    }else{
                                        dispatch({type:'isReading', payload:false})
                                        alert('Something went wrong')
                                    }
                               
                        
                            }catch (err){
                                // alert(JSON.stringify(err))
                                alert('Something went wrong, maybe find a strong internet connection')
                                dispatch({type:'isReading', payload:false})
                               
                            }
                            }
                            else{
                                dispatch({type:'isReading', payload:false})
                                alert("try again later")
                            }
                        }catch(err){
                            dispatch({type:'isReading', payload:false})
                            alert("Something went wrong, please try again later")
                        }
                   
                        
                    }
                    
            
                }catch (err){
                    // alert(JSON.stringify(err))
                    dispatch({type:'isReading', payload:false})
                    alert(err)
                   
                }


            }
        }catch(err){
            dispatch({type:'isReading', payload:false})
            alert("Something went wrong, try again later...")
        }
    
    
}

export const { Provider, Context } = createDataContext(
    registerReducer,
    { getJobsite, getVaccine, registerInfo, getProvince, getMe, getBrgy},
    {errorMessage:'',loading: false, getJobsite:[], getVaccine:[],getProvince:[], getMe:[], getBrgy:[]}
)