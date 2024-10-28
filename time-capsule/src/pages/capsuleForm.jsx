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
            date: date.value,
            image: file,
        }
        console.log("Capsule object:", capsuleObject);
          await addCapsule(capsuleObject)
            title.reset()
            content.reset()
            date.reset()
            fileInput.current.value = ''
            navigate('/')

    }

    const handleReset = () => {
        title.reset()
        content.reset()
        date.reset()
        fileInput.current.value = ''
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
                Select Date: <br/>
                <input 
                type="date"
                {...date.input}
                min={today}
                />
            </div> <br/>
            <div style={padding}>
                <input 
                type="file"
                accept="image/*,video/*,audio/*"
                ref={fileInput}
                />
            </div>
            <button type="submit">Submit</button>
            <button type="button" onClick={handleReset}>Reset</button>
        </form>        
    </div>
    )
}

export default CapsuleForm