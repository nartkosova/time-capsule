import { useEffect } from 'react'
import { useCapsule } from '../context/capsuleContext'
import capsuleService from '../services/capsuleService'
import { Link } from 'react-router-dom'

const Capsules = () => {
  const { capsules, setCapsules } = useCapsule()
  const Scroll = () => {
    window.scrollTo({ top: 0 })
  }
  const token = localStorage.getItem('loggedCapsuleappUser')
  let userId = null
  let userEmail = null

  if (token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1]))
    userId = decodedToken.id
    userEmail = decodedToken.email
  }

  useEffect(() => {
    const fetchCapsules = async () => {
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
        const userCapsules = await capsuleService.getCapsulesByUser(
          userId,
          config
        )
        const sentToCapsules = await capsuleService.getCapsulesByRecipient(
          userEmail,
          config
        )
        setCapsules({
          created: userCapsules || [],
          received: sentToCapsules || [],
        })
      } catch (error) {
        console.error(
          'Error fetching capsules:',
          error.response?.data || error.message
        )
      }
    }

    if (userId) {
      fetchCapsules()
    }
  }, [setCapsules, userId, userEmail])

   if (!capsules.created && userId) {
     return (
       <section className="how-it-works">
         <p>
           No capsules found,{' '}
           <Link to="/create" onClick={Scroll}>
             Create
           </Link>{' '}
           one now!
         </p>
       </section>
    )
  } else if (!token) {
    return (
      <section className="how-it-works">
        <p>
          <Link to="/login" onClick={Scroll}>
            Login
          </Link>{' '}
          or{' '}
          <Link to="/register" onClick={Scroll}>
            Register
          </Link>{' '}
          to create or view if you have been sent a capsule!
        </p>
      </section>
    )
  }

  return (
      <div> 
    <section className="how-it-works">
        <h2 className="section-title">Your Capsules:</h2>
        <p>Click on a capsule to view more details.</p>
        <ul className="features">
          {capsules.created.map((capsule) => (
            <Link
              to={`/capsule-preview/${capsule.id}`}
              onClick={Scroll}
              key={capsule.id}
              aria-label={`View details for ${capsule.title}`}
            >
              <li className="small-capsule">
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
    <section className="how-it-works">
  <h2 className="section-title">Capsules Sent to You:</h2>
  <ul className="features">
    {capsules.received?.length ? (
      capsules.received
        .filter((capsule) => capsule.sent) 
        .map((capsule) => (
              <Link
                to={`/capsule-preview/${capsule.id}`}
                onClick={Scroll}
                key={capsule.id}
                aria-label={`View details for ${capsule.title}`}
              >
          <li className="small-capsule">
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
        ))
    ) : (
      <p>You haven&apos;t been sent any capsules yet...</p>
    )}
  </ul>
</section>
      </div>
  )
}

export default Capsules
