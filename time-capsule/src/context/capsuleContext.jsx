import { createContext, useContext, useEffect, useState } from "react";
import capsuleService from "../services/capsuleService";

const CapsuleContext = createContext()

export const useCapsule = () => useContext(CapsuleContext)

export const CapsuleProvider = ({ children }) => {
    const [capsules, setCapsules] = useState ([])

    const fetchCapsules = async () => {
        try {
            const response = await capsuleService.getAll()
            setCapsules(response)
        } catch (error){
            console.error("Error is:", error)
        }
    }
    useEffect(() =>{
    fetchCapsules()
}, [])
    const addCapsule = async (capsuleObject) => {
        try {
          const returnedCapsule = await capsuleService.createCapsule( capsuleObject)
          setCapsules((prevCapsules) => [...prevCapsules, returnedCapsule])
          console.log("New capsule created:", returnedCapsule)
        } catch (error) {
            console.log("error", error)
        }
    }
    const deleteCapsule = async (id) => {
        try {
            await capsuleService.deleteCapsule(id)
            setCapsules(capsules.filter(capsule => capsule.id !==id))
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <CapsuleContext.Provider value={{ capsules, fetchCapsules, addCapsule, deleteCapsule }}>
            {children}
        </CapsuleContext.Provider>
    );
}

export default CapsuleContext