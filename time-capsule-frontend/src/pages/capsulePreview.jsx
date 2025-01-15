/* eslint-disable no-unused-vars */
import capsuleService from '../services/capsuleService'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
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

  const token = localStorage.getItem('loggedCapsuleappUser')
  let userId = null

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
    </section>
  )
}

export default CapsulePreview
