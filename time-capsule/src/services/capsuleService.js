import axios from 'axios'
const baseUrl = '/api/capsules'

let dummyCapsules = [
    { id: 1, title: "Test Capsule 1", content: "This is a test capsule", date: "2024-11-12", image: null },
    { id: 2, title: "Test Capsule 2", content: "This is a test capsule 2", date: "2024-11-13", image: null }
];

let token = null

const config = {
    headers: { Authorization: token },
  }

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(dummyCapsules);
        }, 100);
    });
};


const createCapsule = async (newCapsule) => {
    const newId = dummyCapsules.length > 0 
    ? Math.max(...dummyCapsules.map(capsule => capsule.id)) + 1 
    : 1; 
    const dummyCapsule = {
        ...newCapsule,
        id: newId
    }
    dummyCapsules.push(dummyCapsule);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(dummyCapsule);
        }, 100);
    });
};

// const createCapsule = async (capsuleData) => {
//     const response= await axios.post(baseUrl, capsuleData, config)
//     return response.data
// }
const updateCapsule = async (id, capsuleData) => {
    const request = axios.put(`${ baseUrl }/${id}`, capsuleData, config)
    return request.then(response => response.data)
  }
const deleteCapsule = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`, config);
    const response = await request
    return response.data
  };

export default { createCapsule, deleteCapsule, updateCapsule, setToken, getAll }