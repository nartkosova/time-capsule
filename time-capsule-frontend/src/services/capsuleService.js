import axios from 'axios'

const baseUrl = '/api/capsules'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const createCapsule = async (capsuleData) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, capsuleData, config)
  return response.data
}

const updateCapsule = async (id, capsuleData) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/${id}`, capsuleData, config)
  return request.then((response) => response.data)
}

const deleteCapsule = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  const response = await request
  return response.data
}

const getCapsule = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get('/api/capsules', config)
  return response.data
}

const getCapsulesByUser = async (userId) => {
  const response = await axios.get(`${baseUrl}/user/${userId}`)
  return response.data
}

export default {
  createCapsule,
  deleteCapsule,
  updateCapsule,
  getCapsule,
  setToken,
  getCapsulesByUser,
}
