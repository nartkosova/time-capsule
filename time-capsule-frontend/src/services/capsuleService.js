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
  const response = await axios.get(`${baseUrl}`, config)
  return response.data
}

const getCapsulesByUser = async (userId) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(`${baseUrl}/user/${userId}`, config)
  return response.data
}

const getCapsuleByID = async (id) => {
  const storedUser = JSON.parse(localStorage.getItem('loggedCapsuleappUser'))
  const token = storedUser?.token

  if (!token) {
    throw new Error('User is not authenticated')
  }
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(`${baseUrl}/${id}`, config)
  return response.data
}

export default {
  createCapsule,
  deleteCapsule,
  updateCapsule,
  getCapsule,
  setToken,
  getCapsulesByUser,
  getCapsuleByID,
}
