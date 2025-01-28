import './footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <h2 className="footer-title">
          Building memories that
          <br /> last a lifetime.
        </h2>
      </div>
      <div className="footer-nav">
        <Link
          className="footer-link"
          to="/about"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          About
        </Link>
        <Link
          to="/contact"
          className="footer-link"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Contact
        </Link>
        <Link className="footer-link" to="https://github.com/nartkosova">
          GitHub
        </Link>
        <Link
          to="https://www.linkedin.com/in/nart-kosova-38b12a2aa/"
          className="footer-link"
        >
          LinkedIn
        </Link>
        <i></i>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Nart Kosova. All Rights Reserved.</p>
        <p>Designed by Nart Kosova.</p>
      </div>
    </footer>
  )
}

export default Footer
