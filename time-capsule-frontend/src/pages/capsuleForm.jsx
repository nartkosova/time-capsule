import { useRef } from "react";
import { useField } from "../hooks/index";
import { useNavigate } from "react-router-dom";
import { useCapsule } from "../context/capsuleContext";

const padding = {
    paddingTop:10
}

const CapsuleForm =  () => {
    const title = useField('title')
    const content = useField('content')
    const date = useField('date')
    const sendTo = useField('sendTo')
    const fileInput = useRef()
    const navigate = useNavigate()
    const today = new Date().toISOString().split('T')[0]
    const {addCapsule} = useCapsule()    

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Form submitted");
        const file = fileInput.current.files[0]

        if (file) {
            console.log(file.type)
        }

        const capsuleObject = {
            title: title.value, 
            content: content.value,
            sendTo: sendTo.value,
            date: date.value,
            fileInput: file,
        }
        console.log("Capsule object:", capsuleObject);
          await addCapsule(capsuleObject)
            title.reset()
            content.reset()
            sendTo.reset()
            date.reset()
            fileInput.current.value = ''
            navigate('/')

    }

    const handleReset = () => {
        title.reset()
        content.reset()
        sendTo.reset()
        date.reset()
        fileInput.current.value = ''
    }

    return (
<div style={padding}>
    <form onSubmit={handleSubmit}>
        <fieldset style={padding}>
            <legend>Submit a Capsule</legend>
            
            <div style={padding}>
                <label htmlFor="title">Title:</label>
                <input 
                    type="text"
                    id="title"
                    {...title.input}
                />
            </div>

            <div style={padding}>
                <label htmlFor="content">Capsule Content:</label> <br/>
                <textarea
                    id="content"
                    {...content.input}
                />
            </div>

            <div style={padding}>
                <label htmlFor="sendTo">To (Write Email):</label>
                <input
                    type="email"
                    id="sendTo"
                    {...sendTo.input}
                    placeholder="example@example.com"
                />
            </div>

            <div style={padding}>
                <label htmlFor="date">Select Date:</label>
                <input 
                    type="date"
                    id="date"
                    {...date.input}
                    min={today}
                />
            </div>

            <div style={padding}>
                <label htmlFor="fileInput">Upload File:</label>
                <input 
                    type="file"
                    id="fileInput"
                    accept="image/*,video/*,audio/*"
                    ref={fileInput}
                />
            </div>
            
            <div style={padding}>
                <button type="submit">Submit</button> <></>
                <button type="button" onClick={handleReset}>Reset</button>
            </div>
        </fieldset>
    </form>
</div>
    )
}

export default CapsuleForm