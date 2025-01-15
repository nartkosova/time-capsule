import Capsules from '../components/Capsules'
import './home.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [isAdmin, setIsAdmin] = useState(false)
  const navigate = useNavigate()

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
  return (
    <div>
      <section className="how-it-works">
        <Capsules />
      </section>
    </div>
  )
}

export default AdminPage
