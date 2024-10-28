import { useEffect } from "react"
import { useCapsule } from "../context/capsuleContext"
import capsuleService from "../services/capsuleService"

const Capsules = () => {
    const { capsules, setCapsules } = useCapsule()

    useEffect(() => {
        capsuleService.getCapsule().then(capsules =>
          setCapsules( capsules )
        )  
      }, [setCapsules])
      
    if (!capsules.length) {
        return <p>No capsules found</p>
    }

    return (
        <div>
            <h2>Your Capsules:</h2>
            <ul>
                {capsules.map(capsule => (
                    <li key={capsule.id}>
                        {capsule.title}: {capsule.content} (Opens on: {capsule.date})
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Capsules
