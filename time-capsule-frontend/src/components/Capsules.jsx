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

  const reformatDate = (dateString) => {
    const [day, month, year] = dateString.split('/')
    return `${year}-${month}-${day}`
  }

  const getTimeRemaining = (dateString) => {
    const formattedDate = dateString.includes('/')
      ? reformatDate(dateString)
      : dateString

    const now = new Date()
    const target = new Date(formattedDate)

    if (isNaN(target.getTime())) {
      return 'Invalid date format!'
    }

    if (target <= now) {
      return 'The capsule is already open!'
    }

    let years = target.getFullYear() - now.getFullYear()
    let months = target.getMonth() - now.getMonth()
    let days = target.getDate() - now.getDate()

    if (days < 0) {
      months -= 1
      const lastMonth = new Date(target.getFullYear(), target.getMonth(), 0)
      days += lastMonth.getDate()
    }

    if (months < 0) {
      years -= 1
      months += 12
    }

    if (years) {
      return `${years} Years, ${months} Months, ${days} Days.`
    } else if (!years) {
      return `${months} Months, ${days} Days.`
    } else if (!months) {
      return `${days} Days.`
    }
  }

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
          <li key={capsule.id} className='capsule'>
            <h3>{capsule.title}</h3>
            <p>{capsule.content}</p>
            <p>Opens on: {capsule.date}</p>
            <p>Time remaining: {getTimeRemaining(capsule.date)}</p>
            <p>Capsule was sent on: {capsule.dateSent}</p>
            {/* <img
            src={`/api/capsules/file/${capsule.id}`}
            alt='Capsule Image'
            ></img> */}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Capsules
