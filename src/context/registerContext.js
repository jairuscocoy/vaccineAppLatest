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
        address,
        jobsite,
        vaccine,
        firstDose,
        secondDose,
        msg,
        imageUrl
    }) =>{
    try{
        dispatch({type:'isReading', payload:true})


        const response = await axios.get(`/verifyAccount.php?lastname=${lastName}&firstname=${firstName}&middlename=${middleName}&birthdate=${birthdate}`)
    
        if(response.data.success){
            dispatch({type:'isReading', payload:false})
            alert("Account already exist")
        }
        else{

            try{
            const response = await axios.get(`/register.php?lastname=${lastName}&firstname=${firstName}&middlename=${middleName}&birthdate=${birthdate}&email=${email}&address=${address}&jobsite=${jobsite}&vaccine=${vaccine}&firstDose=${firstDose}&secondDose=${secondDose}&msg=${msg}&imageUrl=${imageUrl}`)
            // alert(JSON.stringify(response.data.data))
                if(response.data){
                    dispatch({type:'isReading', payload:false})
                alert('success')
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

export const { Provider, Context } = createDataContext(
    registerReducer,
    { getJobsite, getVaccine, registerInfo},
    {errorMessage:'',loading: false, getJobsite:[], getVaccine:[]}
)