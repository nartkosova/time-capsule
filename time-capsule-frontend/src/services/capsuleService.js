/* eslint-disable no-unused-vars */
import axios from 'axios'

const baseUrl = '/api/capsules'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
  localStorage.setItem('authToken', token)
}

const getAuthConfig = () => {
  token = localStorage.getItem('authToken')
  return {
    headers: { Authorization: token },
  }
}

const createCapsule = async (capsuleData) => {
  const config = getAuthConfig()
  const response = await axios.post(baseUrl, capsuleData, config)
  return response.data
}

const updateCapsule = async (id, capsuleData) => {
  const config = getAuthConfig()
  const response = await axios.put(`${baseUrl}/${id}`, capsuleData, config)
  return response.data
}

const deleteCapsule = async (id) => {
  const config = getAuthConfig()
  const request = axios.delete(`${baseUrl}/${id}`, config)
  const response = await request
  return response.data
}

const getCapsule = async () => {
  const config = getAuthConfig()
  const response = await axios.get(`${baseUrl}`, config)
  return response.data
}

const getCapsulesByUser = async (userId) => {
  const config = getAuthConfig()
  const response = await axios.get(`${baseUrl}/user/${userId}`, config)
  return response.data
}

const getCapsuleByID = async (id) => {
  const config = getAuthConfig()
  const response = await axios.get(`${baseUrl}/${id}`, config)
  return response.data
}

const getCapsulesByRecipient = async () => {
  const config = getAuthConfig()
    const response = await axios.get(`${baseUrl}/my-capsules`, config);
    return response.data; 
};

export default {
  createCapsule,
  deleteCapsule,
  updateCapsule,
  getCapsule,
  setToken,
  getCapsulesByUser,
  getCapsuleByID,
  getCapsulesByRecipient,
}
