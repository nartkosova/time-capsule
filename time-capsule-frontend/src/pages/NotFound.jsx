import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section
      className="how-it-works"
      style={{ marginTop: '7rem', marginBottom: '7rem' }}
    >
      <h1 className="section-title">404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Go back to Home</Link>
    </section>
  )
}

export default NotFound
