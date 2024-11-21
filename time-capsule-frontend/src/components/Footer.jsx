import './footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
<footer>
  <div className="footer-content">
    <h2 className='footer-title'>Building memories that last a lifetime.</h2>
    <div className="footer-nav">
      <Link className="footer-link" to="/about" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>About</Link>
      <a className="footer-link">Contact</a>
    </div>
  </div>
  <div className="footer-bottom">
    <p>&copy; 2024 Nart Kosova. All Rights Reserved.</p>
    <p>Designed by Nart Kosova.</p>
  </div>
</footer>

  )
}

export default Footer
