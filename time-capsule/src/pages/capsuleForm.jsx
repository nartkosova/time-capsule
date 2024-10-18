import { useRef } from "react";
import { useField } from "../hooks/index";
import capsuleService from "../services/capsuleService";
import { useNavigate } from "react-router-dom";

const padding = {
    paddingTop:10
}

const CapsuleForm =  ({ addNew }) => {
    const title = useField('title')
    const content = useField('content')
    const date = useField('date')
    const image = useField('image')
    const fileInput = useRef()
    const navigate = useNavigate()

    const today = new Date().toISOString().split('T')[0]

    const createCapsule = async (capsuleObject) => {
        try {
          const returnedCapsule = await capsuleService.createCapsule( capsuleObject)
          addNew(returnedCapsule)
          console.log("New capsule created:", returnedCapsule)
          navigate('/')
        } catch (error) {
            console.log("error", error)
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const capsuleObject = {
            title: title.value,
            content: content.value,
            date: date.value,
            image: fileInput.current.files[0],
          }

          await createCapsule(capsuleObject)

          title.reset
          content.reset()
          date.reset()
          image.reset()
    }

    const handleReset = () => {
        content.reset()
        date.reset()
        image.reset()
    }

    return (
    <div style={padding}>
        <form onSubmit={handleSubmit}>
            <div style={padding}>
                Title: 
                <input 
                type="text"
                {...title.input}
                />
            </div>
            <div style={padding}> 
                <label>Capsule Content</label> <br/>
                <textarea
                {...content.input}
                />
            </div> <br/>
            <div>
                <input 
                type="date"
                {...date.input}
                min={today}
                />
            </div> <br/>
            <div style={padding}>
                <input 
                type="file"
                accept="image/*"
                ref={fileInput}
                {...image.input}
                />
            </div>
            <button type="submit">Submit</button>
            <button type="button" onClick={handleReset}>Reset</button>
        </form>        
    </div>
    )
}

export default CapsuleForm