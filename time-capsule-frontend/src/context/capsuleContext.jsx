import { createContext, useContext, useState } from "react"
// import { useNavigate } from "react-router-dom"
import capsuleService from "../services/capsuleService"
import PropTypes from "prop-types"
// import Notification from "../components/Notification"

const CapsuleContext = createContext()


// eslint-disable-next-line react-refresh/only-export-components
export const useCapsule = () => useContext(CapsuleContext)

export const CapsuleProvider = ({ children}) => {
    // const navigate = useNavigate()
    const [capsules, setCapsules] = useState([])
    // const [notification, setNotification] = useState(null)
    // const [isError, setIsError] = useState(false)

    const addCapsule = async (capsuleObject) => {
        try {
            const returnedCapsule = await capsuleService.createCapsule(capsuleObject)
            if (returnedCapsule) {
                setCapsules(prevCapsules => [...prevCapsules, returnedCapsule])
                console.log("New capsule created:", returnedCapsule)
            }
            // navigate('/')
        } catch (error) {
            // setNotification('Failed to login', error)
            // console.log(error)
            // setIsError(true)
            // setTimeout(() => {
            //   setNotification(null)
            // }, 5000);
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
CapsuleProvider.propTypes = {
    children: PropTypes.any.isRequired,
  };
  
export default CapsuleContext
