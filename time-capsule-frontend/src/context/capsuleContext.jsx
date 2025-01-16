/* eslint-disable no-unused-vars */
import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import capsuleService from '../services/capsuleService'
import PropTypes from 'prop-types'
import Notification from '../components/Notification'

const CapsuleContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useCapsule = () => useContext(CapsuleContext)

export const CapsuleProvider = ({ children }) => {
  const navigate = useNavigate()
  const [capsules, setCapsules] = useState([])
  const [notification, setNotification] = useState(null)
  const [isError, setIsError] = useState(false)

  const addCapsule = async (capsuleObject) => {
    try {
      const returnedCapsule = await capsuleService.createCapsule(capsuleObject)
      if (returnedCapsule) {
        setCapsules((prevCapsules) => [...prevCapsules, returnedCapsule])
      }
      navigate('/')
    } catch (error) {
      setNotification(error.response.data.error)
      setIsError(true)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      console.error('Error adding capsule:', error)
    }
  }

  const deleteCapsule = async (id) => {
    if (window.confirm(`Are you sure you want to delete this capsule?`))
      try {
        await capsuleService.deleteCapsule(id)
        setCapsules((prevCapsules) =>
          prevCapsules.filter((capsule) => capsule.id !== id)
        )
        navigate('/')
        setNotification('Capsule deleted successfully!')
        setIsError(false)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      } catch (error) {
        setNotification(error.response.data.error)
        setIsError(true)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
  }

  return (
    <CapsuleContext.Provider
      value={{ capsules, setCapsules, addCapsule, deleteCapsule }}
    >
      <Notification message={notification} isError={isError} />
      {children}
    </CapsuleContext.Provider>
  )
}
CapsuleProvider.propTypes = {
  children: PropTypes.any.isRequired,
}

export default CapsuleContext
