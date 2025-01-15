import { useEffect } from 'react'
import { useCapsule } from '../context/capsuleContext'
import capsuleService from '../services/capsuleService'
import { Link } from 'react-router-dom'
// const capsules = [
//   {
//   id: 1,
//   title: 'My First CapsuleMy First CapsuleMy First CapsuleMy First Capsuleddd ',
//   content: 'This is my first capsule!',
//   date: '2026-12-31',
//   fileInput: ''
// },
// {
//   id: 2,
//   title: 'My Second Capsule',
//   content: 'This is my second capsule!This is my second capsule!This is my second capsule!This is my second capsule!This is my second capsule!This is my second capsule!',
//   date: '2025-12-31',
//   fileInput: 'https://e58xmzy5vzj.exactdn.com/wp-content/uploads/2023/11/EV0B0151-1-2-1365x2048.jpg?strip=all&lossy=1&ssl=1'
// },
//  {
//   id: 3,
//   title: 'My Third Capsule',
//   content: 'This is my third capsule!',
//   date: '2025-12-31',
//   fileInput: 'https://i.ytimg.com/vi/FRC26fruV-o/maxresdefault.jpg'
//  },
//   {
//     id: 4,
//   title: 'My First CapsuleMy First CapsuleMy First CapsuleMy First Capsule',
//   content: 'This is my first capsule!',
//   date: '2026-12-31',
//   fileInput: 'https://i.ytimg.com/vi/qH07aMO-ENk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB3TU9ULoTv_vhQDZdgrkYmX1bFPw'
// },
// {
//   id: 5,
//   title: 'My Second Capsule',
//   content: 'This is my second capsule!This is my second capsule!This is my second capsule!This is my second capsule!This is my second capsule!This is my second capsule!',
//   date: '2025-12-31',
//   fileInput: 'https://cdn.mos.cms.futurecdn.net/iC7HBvohbJqExqvbKcV3pP-1200-80.jpg'
// },
//  {
//   id: 6,
//   title: 'My Third Capsule',
//   content: 'This is my third capsule!',
//   date: '2025-12-31',
//   fileInput: 'https://media.istockphoto.com/id/1368628035/photo/brooklyn-bridge-at-sunset.jpg?s=612x612&w=0&k=20&c=hPbMbTYRAVNYWAUMkl6r62fPIjGVJTXzRURCyCfoG08='
//  }
// ]
const Capsules = () => {
  const { capsules, setCapsules } = useCapsule()

  const token = localStorage.getItem('loggedCapsuleappUser')
  let userId = null
  let isAdmin = null

  if (token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1]))
    userId = decodedToken.id
    isAdmin = decodedToken.role === 'admin'
  }

  useEffect(() => {
    const fetchUserCapsules = async () => {
      try {
        const storedUser = JSON.parse(
          localStorage.getItem('loggedCapsuleappUser')
        )
        const token = storedUser?.token

        if (!token) {
          console.error('Token missing!')
          return
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        if (isAdmin) {
          const allCapsules = await capsuleService.getCapsule(config)
          setCapsules(allCapsules)
        } else {
          const userCapsules = await capsuleService.getCapsulesByUser(
            userId,
            config
          )
          setCapsules(userCapsules)
        }
      } catch (error) {
        console.error(
          'Error fetching capsules:',
          error.response?.data || error.message
        )
      }
    }

    if (userId) {
      fetchUserCapsules()
    }
  }, [setCapsules, userId, isAdmin])

  if (!capsules.length && userId) {
    return <p>No capsules found, create one now!</p>
  } else if (!token) {
    return <p>Login or Register to create a capsule!</p>
  }

  return (
    <div>
      <h2 className="section-title">Your Capsules:</h2>
      <ul className="features">
        {capsules.map((capsule) => (
          // eslint-disable-next-line react/jsx-key
          <Link
            to={`/capsule-preview/${capsule.id}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            key={capsule.id}
          >
            <li key={capsule.id} className="small-capsule">
              <h3 className="content">{capsule.title}</h3>
              <p className="content">{capsule.content}</p>
              <p>Opens on: {capsule.date}</p>
              <div>
                {!capsule.fileInput ? null : (
                  <img
                    src={`${capsule.fileInput}`}
                    alt="Capsule Image"
                    className="small-image"
                  />
                )}
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default Capsules
