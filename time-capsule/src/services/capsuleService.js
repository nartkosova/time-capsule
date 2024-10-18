import axios from 'axios'

const baseUrl = '/api/capsules'

const createCapsule = async (capsuleData) => {
    const response= await axios.post(baseUrl, capsuleData)
    return response.data
}

export default { createCapsule }