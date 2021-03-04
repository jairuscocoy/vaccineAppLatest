import createDataContext from './createDataContext'
import axios from '../api/baseURL'
import { navigate } from '../navigationRef'
import AsyncStorage from '@react-native-async-storage/async-storage';

const authReducer = (state, action) =>{
    switch (action.type){
        case 'add error':
            return {...state, errorMessage: action.payload.error, loading: action.payload.loading}
        case 'isReading':
            return { ...state, loading: action.payload}
        default :
            return state
    }
}

const resolving = dispatch => async() =>{
    const token = await AsyncStorage.getItem('token')
    // alert('This is the token: '+token)
    if(!token){
        // dispatch({type: 'signin', payload: token})
        navigate('mainFlow')
    }else{
        navigate('loginFlow')
    }
    
}

const login = (dispatch) => async ({ username, password })=>{
    
    try{
        dispatch({type:'isReading', payload:true})

        const response = await axios.get(`/signIn.php?username=${username}&password=${password}`)

        // await AsyncStorage.setItem('token', response.data.owwaid)
        
        
        if(!response.data.success){
            dispatch({type:'isReading', payload:false})
            alert("Wrong Username or password")
        }
        else{

            dispatch({type: 'signin', payload: {token : response.data.id, loading : false}})
            await AsyncStorage.setItem('token', response.data.id)
            navigate('mainFlow')
        }
        // 
    }catch (err){
        console.log(err)
        alert('Oops! something went wrong :(')
        dispatch({
            type:'add error',
            payload : {error: 'Something went wrong', loading: false}
        })
    }
    
    
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { login, resolving},
    {token : null, errorMessage:'',loading: false}
)