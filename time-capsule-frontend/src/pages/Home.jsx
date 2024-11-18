import { Link } from 'react-router-dom'
import Capsules from '../components/Capsules'

const Home = () => {
  return (
    <>
      <div className="hero">
        <div className="hero-conent">
          <h1>Welcome to Time Capsule</h1>
          <p>Your digital time machine to the future.</p>
          <div className="button-container">
            <Link to="/create">
              <button>Create your Time Capsule</button>
            </Link>
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
