import { useEffect } from "react";
import { useCapsule } from "../context/capsuleContext";

const Capsules = () => {
    const { capsules, fetchCapsules } = useCapsule();

    useEffect(() => {
        console.log(capsules.map(capsule => capsule.id))
        fetchCapsules();  
    }, [fetchCapsules]);
    
    return (
        <div>
            <h2>Your capsules:</h2>
            <ul>
            {capsules.map((capsule) => (
           <li key={capsule.id}>
                {capsule.title}: {capsule.content} (Opens on: {capsule.date})
             </li>
            ))}
            </ul>
        </div>
    );
}

export default Capsules;