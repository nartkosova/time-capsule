import { useEffect } from 'react'
import { useCapsule } from '../context/capsuleContext'
import capsuleService from '../services/capsuleService'

const CapsulePreview = () => {
  const { capsules, setCapsules } = useCapsule()

  const token = localStorage.getItem('loggedCapsuleappUser')
  let userId = null

  if (token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1]))
    userId = decodedToken.id
  }

  useEffect(() => {
    const fetchUserCapsules = async () => {
      if (userId) {
        const userCapsules = await capsuleService.getCapsulesByUser(userId)
        setCapsules(userCapsules)
      }
    }
    fetchUserCapsules()
  }, [setCapsules, userId])

  return (
    <div>
      <h2>Your Capsules:</h2>
      <ul>
        {capsules.map((capsule) => (
          <li key={capsule.id} className="capsule">
            <h3>{capsule.title}</h3>
            <p>{capsule.content}</p>
            <p>Opens on: {capsule.date}</p>
            <p>Time remaining: {capsule.date}</p>
            <p>Capsule was sent on: {capsule.dateSent}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CapsulePreview
