import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const ContactForm = () => {
  const navigate = useNavigate()
  return (
    <div>
      <form action="https://api.web3forms.com/submit" method="POST">
        <input
          type="hidden"
          name="access_key"
          value="12439b0a-c030-47a6-89b1-98e423de2b49"
        />
        <label>
          Name:
          <input
            name="first_name"
            data-testid="name"
            placeholder="Name"
            required
            type="text"
          />
        </label>

        <label>
          Surname:
          <input
            name="last_name"
            data-testid="surname"
            placeholder="Surname"
            required
            type="text"
          />
        </label>

        <label>
          Email:
          <input
            name="email"
            data-testid="email"
            placeholder="Email"
            required
            type="text"
          />
        </label>

        <label htmlFor="content">
          Message:
          <textarea
            name="message"
            data-testid="message"
            rows="4"
            id="Message"
            required
            onChange={(e) => {
              e.target.style.height = 'auto'
              e.target.style.height = `${e.target.scrollHeight}px`
            }}
            placeholder="Write your message"
          />
        </label>

        <div className="button-container">
          <button
            type="submit"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
              navigate('/')
            }}
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  )
}
ContactForm.propTypes = {
  handleContact: PropTypes.func,
  handleUser: PropTypes.func,
}
export default ContactForm
