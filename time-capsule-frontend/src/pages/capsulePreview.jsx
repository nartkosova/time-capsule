/* eslint-disable no-unused-vars */
import capsuleService from '../services/capsuleService'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useCapsule } from '../context/capsuleContext'
import { useNavigate } from 'react-router-dom'
const CapsulePreview = () => {
  const { id } = useParams()
  const {
    data: capsule,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['capsule', id],
    queryFn: () => capsuleService.getCapsuleByID(id),
  })
  const { deleteCapsule } = useCapsule()
  // const [title, setTitle] = useState(capsule.title);
  // const [content, setContent] = useState(capsule.content);
  // const [date, setDate] = useState(capsule.date);
  const token = localStorage.getItem('loggedCapsuleappUser')
  let userId = null
  const navigate = useNavigate()

  if (token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1]))
    userId = decodedToken.id
  }

  const reformatDate = (dateString) => {
    const [day, month, year] = dateString.split('/')
    return `${year}-${month}-${day}`
  }

  const getTimeRemaining = (dateString) => {
    const formattedDate = dateString.includes('/')
      ? reformatDate(dateString)
      : dateString

    const now = new Date()
    const target = new Date(formattedDate)

    if (isNaN(target.getTime())) {
      return 'Invalid date format!'
    }

    if (target <= now) {
      return 'The capsule is already open!'
    }

    let years = target.getFullYear() - now.getFullYear()
    let months = target.getMonth() - now.getMonth()
    let days = target.getDate() - now.getDate()

    if (days < 0) {
      months -= 1
      const lastMonth = new Date(target.getFullYear(), target.getMonth(), 0)
      days += lastMonth.getDate()
    }

    if (months < 0) {
      years -= 1
      months += 12
    }

    if (years) {
      return `${years} Years, ${months} Months, ${days} Days.`
    } else if (!years) {
      return `${months} Months, ${days} Days.`
    } else if (!months) {
      return `${days} Days.`
    }
  }

  if (isLoading) {
    return (
      <section style={{ marginTop: '12rem', marginBottom: '12rem' }}>
        <p>Loading...</p>
      </section>
    )
  }

  if (isError) {
    return (
      <section style={{ marginTop: '12rem', marginBottom: '12rem' }}>
        <p>Error: {error.message}</p>
      </section>
    )
  }

  if (!capsule) {
    return (
      <section style={{ marginTop: '12rem', marginBottom: '12rem' }}>
        <p>Capsule not found.</p>
      </section>
    )
  }

  return (
    <section>
      {/* <h2 className="section-title">Lorem Ipsum is simply</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut aperiam incidunt natus expedita, nobis officia tenetur, veniam nesciunt pariatur odio similique aliquid eum quibusdam mollitia aspernatur itaque quod dolor deleniti?</p>
      <blockquote>
        <li>Opens on: 15/02/2037</li>
        <li>Time remaining: 12 Years 1 Month 3 Days</li>
        <li>Capsule was sent on: 12/02/2024</li>
      </blockquote>
        <img
          src={'https://e58xmzy5vzj.exactdn.com/wp-content/uploads/2023/11/EV0B0151-1-2-1365x2048.jpg?strip=all&lossy=1&ssl=1'}
          alt="Capsule Image"
          className="capsule-image"
        /> */}

      <h2 className="section-title">{capsule.title}</h2>
      <p>{capsule.content}</p>
      <blockquote>
        <li>Opens on: {capsule.date}</li>
        <li>Time remaining: {getTimeRemaining(capsule.date)}</li>
        <li>Capsule was sent on: {capsule.dateSent}</li>
      </blockquote>
      {!capsule.fileInput ? null : (
        <img
          src={`${capsule.fileInput}`}
          alt="Capsule Image"
          className="capsule-image"
        />
      )}
      <div className="button-container" style={{ marginTop: '1rem' }}>
        <button
          style={{ marginRight: '0.5rem' }}
          type="submit"
          onClick={() => {
            navigate(`/edit/${capsule.id}`)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          Edit
        </button>
        <button
          style={{ marginLeft: '0.5rem' }}
          type="button"
          onClick={() => {
            deleteCapsule(capsule.id)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          Delete
        </button>
      </div>
    </section>
  )
}

export default CapsulePreview
