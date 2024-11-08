import { useRef } from "react";
import { useState } from "react";
import { useCapsule } from "../context/capsuleContext";

const padding = {
    paddingTop:10
}

const CapsuleForm =  () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [sendTo, setSendTo] = useState('');
    const [date, setDate] = useState('');
    const fileInput = useRef();
    const today = new Date().toISOString().split('T')[0];
    const { addCapsule } = useCapsule();  

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted");
        const file = fileInput.current.files[0];

        if (file) {
            console.log(file.type);
        }

        const capsuleObject = {
            title, 
            content,
            sendTo,
            date,
            fileInput: file,
        }
        console.log("Capsule object:", capsuleObject);

        await addCapsule(capsuleObject)
        setTitle('');
        setContent('');
        setSendTo('');
        setDate('');
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
<div style={padding}>
    <form onSubmit={handleSubmit}>
        <fieldset style={padding}>
            <legend>Submit a Capsule</legend>
            
            <div style={padding}>
                        <label htmlFor="title">Title:</label>
                        <input 
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div style={padding}>
                        <label htmlFor="content">Capsule Content:</label> <br/>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>

                    <div style={padding}>
                        <label htmlFor="sendTo">To (Write Email):</label>
                        <input
                            type="email"
                            id="sendTo"
                            value={sendTo}
                            onChange={(e) => setSendTo(e.target.value)}
                            placeholder="example@example.com"
                        />
                    </div>

                    <div style={padding}>
                        <label htmlFor="date">Select Date:</label>
                        <input 
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
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