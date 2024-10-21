import axios from 'axios'

let dummyCapsules = [
    { id: 1, title: "Test Capsule 1", content: "This is a test capsule", date: "2024-11-12", image: null },
    { id: 2, title: "Test Capsule 2", content: "This is a test capsule 2", date: "2024-11-13", image: null }
];

const getAll = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(dummyCapsules);
        }, 100);
    });
};

const baseUrl = '/api/capsules'

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
//     const response= await axios.post(baseUrl, capsuleData)
//     return response.data
// }
const deleteCapsule = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    const response = await request
    return response.data
  };

export default { createCapsule, deleteCapsule, getAll }