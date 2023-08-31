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

	static sendMessage = async (sender_id, text) => {
		await axios.post(`${API_URL}/chats/${sender_id}/message`,
			{ text },
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
	};
}

export default RasaAdminAPI