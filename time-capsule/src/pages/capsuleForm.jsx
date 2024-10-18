import { useField } from "../hooks/index";

const CapsuleForm = () => {
    const content = useField('content')
    const date = useField('date')
    const image = useField('image', 'file')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({ content, date })
    }

    return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Capsule Content</label> <br/>
                <textarea
                    {...content.input}
                />
            </div> <br/>
            <div>
                <input 
                    type="date"
                    {...date.input}
                />
            </div> <br/>
            <div>
                <input 
                    type="file"
                    accept="image/*"
                    {...image.input}
                />
            </div>
            <button type="submit">Submit</button>
        </form>        
    </div>
    )
}

export default CapsuleForm