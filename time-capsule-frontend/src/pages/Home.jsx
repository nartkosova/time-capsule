import { Link } from 'react-router-dom'
import Capsules from '../components/Capsules'

const Home = () => {
  return (
    <>
      <div className="hero">
        <div className="hero-conent">
        <div className="welcome-container">
          <h1 className='welcome'>Welcome to</h1>
          <h1 className='tc'>Time Capsule</h1>
          <h2 className='hero-text'>Preserve your memories for the future safe, secure, and digital</h2>
          <div className="button-container">
            <Link to="/create">
              {/* <button className='create'>Create your Time Capsule</button> */}
            </Link>
          </div>
          </div>
        </div>
      </div>

      <section>
        <h2>Why Choose Time Capsule?</h2>
        <div>
          <h3>Write Letters</h3>
          <p>Send messages to your future self or loved ones.</p>
        </div>
        <div>
          <h3>Upload Memories</h3>
          <p>Store photos, videos, and more in your personal vault.</p>
        </div>
        <div>
          <h3>Set a Future Date</h3>
          <p>Unlock your memories when the time is right.</p>
        </div>
      </section>

      <section>
        <h2>How It Works</h2>
        <p>Write a capsule, select date and send!</p>
      </section>
      <section>
        <Capsules />
      </section>
    </>
  )
}

export default Home
