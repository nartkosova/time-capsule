import { useState, useEffect } from 'react'
import { useCapsule } from '../context/capsuleContext'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const UpdateCapsuleForm = () => {
  const { capsules, updateCapsule } = useCapsule()
  const { id } = useParams()
  const capsule = capsules.find((c) => c.id === id)
  const navigate = useNavigate()
  const [updatedTitle, setUpdatedTitle] = useState('')
  const [updatedContent, setUpdatedContent] = useState('')
  const [updatedDate, setUpdatedDate] = useState('')

  useEffect(() => {
    if (capsule) {
      setUpdatedTitle(capsule.title)
      setUpdatedContent(capsule.content)
      setUpdatedDate(capsule.date)
    }
  }, [capsule])

  const handleUpdate = async (e) => {
    e.preventDefault()
    const updatedData = {
      title: updatedTitle,
      content: updatedContent,
      date: updatedDate,
    }

    try {
      await updateCapsule(id, updatedData)
      navigate(`/capsule-preview/${capsule.id}`)
    } catch (error) {
      console.error('Failed to update capsule:', error)
    }
  }

  return (
    <form onSubmit={handleUpdate}>
      <label>
        Title:
        <input
          data-testid="title"
          type="text"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          placeholder="Edit the title of your time capsule"
        />
      </label>
      <label>
        Content:
        <textarea
          data-testid="content"
          rows="4"
          value={updatedContent}
          onChange={(e) => {
            setUpdatedContent(e.target.value)
            e.target.style.height = 'auto'
            e.target.style.height = `${e.target.scrollHeight}px`
          }}
          placeholder="Edit the content of your time capsule"
        />
      </label>
      <label>
        Date:
        <input
          data-testid="date"
          type="date"
          value={updatedDate}
          onChange={(e) => setUpdatedDate(e.target.value)}
          placeholder="Edit the date of your time capsule"
        />
      </label>
      <div className="button-container">
        <button
          type="submit"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Update Capsule
        </button>
      </div>
    </form>
  )
}

export default UpdateCapsuleForm
