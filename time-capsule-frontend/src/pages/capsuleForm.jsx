import { useRef } from 'react'
import { useState } from 'react'
import { useCapsule } from '../context/capsuleContext'

const CapsuleForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [sendTo, setSendTo] = useState('')
  const [date, setDate] = useState('')
  const fileInput = useRef()
  const today = new Date().toISOString().split('T')[0]
  const { addCapsule } = useCapsule()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Form submitted')
    const file = fileInput.current.files[0]

    if (file) {
      console.log(file.type)
    }

    const capsuleObject = {
      title,
      content,
      sendTo,
      date,
      fileInput: file,
    }
    console.log('Capsule object:', capsuleObject)

    await addCapsule(capsuleObject)
    setTitle('')
    setContent('')
    setSendTo('')
    setDate('')
    fileInput.current.value = ''
  }

  const handleReset = () => {
    setTitle('')
    setContent('')
    setSendTo('')
    setDate('')
    fileInput.current.value = ''
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
              onChange={(e) => setContent(e.target.value)}
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
            />
          </label>
        </div>

        <div className="button-container">
          <button type="submit">Submit</button> <></>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}

export default CapsuleForm
