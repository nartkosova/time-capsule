import { useRef, useState } from 'react'
import { useCapsule } from '../context/capsuleContext'

const CapsuleForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [sendTo, setSendTo] = useState('')
  const [date, setDate] = useState('')
  const fileInput = useRef()
  const today = new Date().toISOString().split('T')[0]
  const { addCapsule } = useCapsule()
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadError, setUploadError] = useState(null)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = (event) => {
    const file = event.target.files && event.target.files[0]

    const allowedTypes = ['image/', 'video/', 'audio/']
    if (!allowedTypes.some((type) => file.type.startsWith(type))) {
      setUploadError(
        'Invalid file type. Please upload an image, video, or audio file.'
      )
      return
    }

    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      setUploadError('File size exceeds 20MB. Please upload a smaller file.')
      return
    }
    setUploadError(null)
    setSelectedFile(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('title', title)
      formData.append('content', content)
      formData.append('sendTo', sendTo)
      formData.append('date', date)


      await addCapsule(formData)

      handleReset()

      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      console.error('Error submitting capsule:', error)
    } finally {
      setUploading(false)
    }
  }
  const handleReset = () => {
    setTitle('')
    setContent('')
    setSendTo('')
    setDate('')
    setSelectedFile(null)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">
            Title:
            <input
              data-testid="title"
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
          </label>
        </div>
        <div>
          <label htmlFor="content">
            Capsule Content:
            <textarea
              data-testid="content"
              rows="4"
              id="content"
              value={content}
              onChange={(e) => {
                setContent(e.target.value)
                e.target.style.height = 'auto'
                e.target.style.height = `${e.target.scrollHeight}px`
              }}
              placeholder="Write your time capsule"
            />
          </label>
        </div>

        <div>
          <label htmlFor="sendTo">
            To (Write Email):
            <input
              data-testid="toemail"
              type="email"
              id="sendTo"
              value={sendTo}
              onChange={(e) => setSendTo(e.target.value)}
              placeholder="example@example.com"
            />
          </label>
        </div>

        <div>
          <label htmlFor="date">
            Select Date:
            <input
              data-testid="date"
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={today}
            />
          </label>
        </div>

        <div>
          <label htmlFor="fileInput" className="file-upload">
            Upload File:
            <input
              type="file"
              data-testid="fileinput"
              id="fileInput"
              accept="image/*,video/*,audio/*"
              ref={fileInput}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </label>
          {!selectedFile && <label>Upload files up to 10Mb</label>}
          {selectedFile && <label>Selected file: {selectedFile.name}</label>}
          {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
        </div>
        <div className="button-container">
          <button
            style={{ marginRight: '0.5rem' }}
            type="submit"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Submit'}
          </button>{' '}
          <></>
          <button
            style={{ marginLeft: '0.5rem' }}
            type="button"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}

export default CapsuleForm
