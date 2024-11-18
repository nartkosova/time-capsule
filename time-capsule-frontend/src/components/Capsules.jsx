import { useEffect } from 'react'
import { useCapsule } from '../context/capsuleContext'
import capsuleService from '../services/capsuleService'

const Capsules = () => {
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

  if (!capsules.length && userId) {
    return <p>No capsules found, create one now!</p>
  } else if (!token) {
    return <p>Login or Register to create a capsule!</p>
  }

  return (
    <div>
      <h2>Your Capsules:</h2>
      <ul>
        {capsules.map((capsule) => (
          <li key={capsule.id}>
            <h3>{capsule.title}:</h3> <br />
            {capsule.content} <br />
            Opens on: ({capsule.date}) <br />
            Capsule was sent on: ({capsule.sent})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Capsules
