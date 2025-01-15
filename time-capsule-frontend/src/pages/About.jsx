import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])
  return (
    <div>
      <section data-aos="fade-right">
        <p>
          The <strong>Time Capsule</strong> project is developed as part of the{' '}
          <a href="https://fullstackopen.com/en/">Full Stack Open</a> course,
          which focuses on modern web application development. The course
          emphasizes mastering the <strong>MERN stack</strong>, a powerful
          combination of technologies for building full-stack web applications:
        </p>
        <blockquote>
          <li>
            MongoDB: A NoSQL database for storing data in JSON-like documents.
          </li>
          <li>
            Express: A backend framework for building APIs and server-side
            functionality.
          </li>
          <li>
            React: A frontend JavaScript library for creating dynamic and
            interactive user interfaces.
          </li>
          <li>
            Node.js: A runtime environment for executing JavaScript code on the
            server.
          </li>
        </blockquote>
      </section>
      <section data-aos="fade-left">
        <p>
          The Time Capsule project showcases the integration of frontend and
          backend technologies to build a robust and interactive application.
          The concept is to allow users to create &quot;time capsules&quot; that
          can store personal notes or memories. These capsules can only be
          accessed on the date selected to be opened.
        </p>
      </section>
      <section data-aos="fade-right">
        <h2>Project Requirements</h2>

        <p>
          As part of the <strong>Full Stack Open</strong> course, the project
          adheres to specific requirements:
        </p>

        <h3>1. Frontend Development</h3>
        <blockquote>
          <li>
            Built using <strong>React</strong> to handle the user interface.
          </li>
          <li>
            Implements <strong>React Router</strong> for navigation between
            pages (e.g., home, create, login, about).
          </li>
          <li>
            Utilizes responsive design principles to ensure the app works across
            devices.
          </li>
        </blockquote>

        <h3>2. Backend Development</h3>
        <blockquote>
          <li>
            Powered by <strong>Node.js</strong> and <strong>Express</strong>,
            providing a RESTful API for communication with the frontend.
          </li>
          <li>
            Handles routing, middleware, and secure communication between the
            server and the client.
          </li>
          <li>
            Uses <strong>JSON Web Tokens (JWT)</strong> for user authentication,
            ensuring that only authenticated users can create, view, or manage
            time capsules.
          </li>
        </blockquote>

        <h3>3. Database Integration</h3>
        <blockquote>
          <li>
            Stores user data and capsule information in <strong>MongoDB</strong>
            .
          </li>
          <li>
            Implements proper data validation and sanitization to ensure
            consistency and security.
          </li>
        </blockquote>

        <h3>4. Full Stack Features</h3>
        <blockquote>
          <li>
            <strong>CRUD Operations:</strong> Users can create, read, update,
            and delete their time capsules.
          </li>
          <li>
            <strong>User Authentication:</strong> Users can register, log in,
            and manage their profiles.
          </li>
          <li>
            <strong>Responsive Design:</strong> The application scales across
            devices to provide a seamless user experience.
          </li>
        </blockquote>

        <h3>5. Deployment</h3>
        <p>
          The app can be deployed through a cloud platform like{' '}
          <strong>Render</strong> or something similar.
        </p>
      </section>
    </div>
  )
}

export default About
