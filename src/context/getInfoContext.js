import createDataContext from './createDataContext'
import axios from '../api/baseURL'
import { navigate } from '../navigationRef'
import AsyncStorage from '@react-native-async-storage/async-storage';

const infoReducer = (state, action) =>{
    switch (action.type){
        case 'add error':
            return {...state, errorMessage: action.payload.error, loading: action.payload.loading}
        case 'isReading':
            return { ...state, loading: action.payload}
        case 'getInfo':
            return {...state, loading: action.payload.loading, getInfo: action.payload.getInfo}
        default :
            return state
    }
}

const getInfo = dispatch => async ()=>{
    // alert('test')
    const token = await AsyncStorage.getItem('token')
    try{
        const response = await axios.get(`/getInfo.php?id=${token}`)
        // alert(JSON.stringify(response.data))
        dispatch({type:'getInfo', payload: {loading:false, getInfo: response.data}})
        // dispatch({type:'loading', payload: false})
    }catch(err){
        alert('Something went wrong, maybe find a strong internet connection')
        dispatch({type:'loading', payload: false})
    }
}

export const { Provider, Context } = createDataContext(
    infoReducer,
    { getInfo},
    {errorMessage:'',loading: false, getInfo:''}
)