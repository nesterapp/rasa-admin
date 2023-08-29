import axios from 'axios';
import { API_URL } from './config'

class RasaAdminAPI {

    static getChats = async () => {
        let response = await axios.get(`${API_URL}/chats`)
        const { data } = response;
        return data
    }

    static getChat = async (sender_id) => {
        let response = await axios.get(`${API_URL}/chats/${sender_id}`)
        const { data } = response;
        return data
    }

}

export default RasaAdminAPI