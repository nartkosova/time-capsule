/* eslint-disable no-unused-vars */
import './home.css'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCapsule } from '../context/capsuleContext'
import capsuleService from '../services/capsuleService'
const AdminPage = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const { capsules, setCapsules } = useCapsule()
  const navigate = useNavigate()
  const token = localStorage.getItem('loggedCapsuleappUser')
  let userId = null

  if (token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1]))
    userId = decodedToken.id
  }
  useEffect(() => {
    const token = localStorage.getItem('loggedCapsuleappUser')
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]))
      if (decodedToken.role !== 'admin') {
        navigate('/404', { replace: true })
      } else {
        setIsAdmin(true)
      }
    } else {
      navigate('/404', { replace: true })
    }
  }, [navigate])
  useEffect(() => {
    const fetchUserCapsules = async () => {
      try {
        const storedUser = JSON.parse(
          localStorage.getItem('loggedCapsuleappUser')
        )
        const token = storedUser?.token

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        const userCapsules = await capsuleService.getCapsule(userId, config)
        setCapsules(userCapsules)
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
  }, [setCapsules, userId])
  return (
    <div>
      <section className="how-it-works">
        <ul className="features">
          {capsules.map((capsule) => (
            <Link
              to={`/capsule-preview/${capsule.id}`}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              key={capsule.id}
              aria-label={`View details for ${capsule.title}`}
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
      </section>
    </div>
  )
}

export default AdminPage
