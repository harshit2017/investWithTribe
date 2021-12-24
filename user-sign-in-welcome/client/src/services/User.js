import axios from 'axios'
const baseUrl = '/api/register'

let token = null



export const createUser = async newObject => {

    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data


}


