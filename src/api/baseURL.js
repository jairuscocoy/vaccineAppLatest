import axios from 'axios'

export default axios.create({
    baseURL:'http://ds.owwa.gov.ph/vaccine_app/'
})