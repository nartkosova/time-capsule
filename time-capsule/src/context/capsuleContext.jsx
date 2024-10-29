import { createContext, useContext, useEffect, useState } from "react"
import capsuleService from "../services/capsuleService"

const CapsuleContext = createContext()

export const useCapsule = () => useContext(CapsuleContext)

export const CapsuleProvider = ({ children }) => {
    const [capsules, setCapsules] = useState([])

    const addCapsule = async (capsuleObject) => {
        try {
            const returnedCapsule = await capsuleService.createCapsule(capsuleObject)
            if (returnedCapsule) {
                setCapsules(prevCapsules => [...prevCapsules, returnedCapsule])
                console.log("New capsule created:", returnedCapsule)
            }
        } catch (error) {
            console.error("Error adding capsule:", error)
        }
    }

    const deleteCapsule = async (id) => {
        try {
            await capsuleService.deleteCapsule(id)
            setCapsules(prevCapsules => prevCapsules.filter(capsule => capsule.id !== id))
        } catch (error) {
            console.error("Error deleting capsule:", error)
        }
    }

    return (
        <CapsuleContext.Provider value={{ capsules, setCapsules, addCapsule, deleteCapsule }}>
            {children}
        </CapsuleContext.Provider>
    )
}

export default CapsuleContext
