import axios from 'axios'
const baseUrl = '/api/users'

const createUser = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const getAllUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const updateUser = async (id, updatedData) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedData)
  return response.data
}

const deleteUser = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

export default { createUser, getAllUsers, updateUser, deleteUser }
