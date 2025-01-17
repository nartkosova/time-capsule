import { Link } from 'react-router-dom'
import Capsules from '../components/Capsules'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import './home.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
const Home = ({ user }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])
  return (
    <>
      <div className="hero">
        <div className="hero-conent">
          <div className="welcome-container">
            <h1 className="welcome">Welcome to</h1>
            <h1 className="tc">Time Capsule</h1>
            <h2
              className="hero-text"
              data-aos="fade-up"
              data-aos-duration="2000"
              data-aos-delay="800"
            >
              Preserve your memories for the future safe, secure, and digital
            </h2>
            <div
              className="button-container"
              data-aos="fade-up"
              data-aos-duration="2000"
              data-aos-delay="1600"
            >
              {!user ? (
                <>
                  <Link to="/register">
                    <button
                      className="create"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }
                    >
                      Register to Start Creating
                    </button>
                  </Link>
                </>
              ) : (
                <Link to="/create">
                  <button
                    className="create"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                  >
                    Start Creating
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <section className="how-it-works" data-aos="fade-up">
        <h2 className="section-title">How It Works</h2>
        <p>
          Create an account, write a capsule, select a date, and send! It’s that
          simple. Time Capsule allows you to preserve your thoughts, feelings,
          and memories for a future moment or a loved one.
        </p>
        <p>
          Imagine writing a message to your future self: Words of encouragement,
          your current goals, or even predictions about your life. Set the
          capsule to open in five, ten, or even fifty years and rediscover your
          journey.
        </p>
        <p>
          You can use Time Capsule to leave heartfelt messages for your loved
          ones. Whether it’s a note for a future milestone like a birthday or an
          anniversary, or simply a reminder of how much you care, your message
          will arrive exactly when it’s meant to.
        </p>
        <p>
          Sometimes, we need a way to say things we can’t say out loud today.
          Use Time Capsule to confess your feelings, apologize, or share secrets
          with your future self or others when the time feels right.
        </p>
        <p>
          Leave a legacy for your children by capturing stories, advice, and
          cherished moments they can treasure forever. Your words will serve as
          a timeless gift for the ones you hold dear.
        </p>
        <p>
          Time Capsule can also provide a way to leave a message that lives on
          after you. Write a farewell note, share your wisdom, or simply say
          goodbye in your own words, knowing it will reach your loved ones in
          the future.
        </p>
        <p>
          Rest assured, your messages are encrypted and secure. No one but you
          will have access to your capsules until the scheduled date. Your
          privacy and the integrity of your messages are our top priorities.
        </p>
      </section>

      <section className="why-choose" data-aos="fade-left">
        <h2 className="section-title">Why Choose Time Capsule?</h2>
        <div className="features">
          <div className="feature-card">
            <span className="icon">✉️</span>
            <h3>Write Letters</h3>
            <p>Send messages to your future self or loved ones.</p>
          </div>
          <div className="feature-card">
            <span className="icon">📷</span>
            <h3>Upload Memories</h3>
            <p>Store photos, videos, and more in your personal vault.</p>
          </div>
          <div className="feature-card">
            <span className="icon">⏳</span>
            <h3>Set a Future Date</h3>
            <p>Unlock your memories when the time is right.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works" data-aos="fade-right">
        <Capsules />
      </section>
    </>
  )
}
Home.propTypes = {
  user: PropTypes.object,
}

export default Home
