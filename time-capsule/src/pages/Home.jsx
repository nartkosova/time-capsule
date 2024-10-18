import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Time Capsule</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Accusantium aperiam esse, aliquam harum ab nemo in, 
                architecto nostrum voluptates repudiandae, dolore deleniti! Illo vitae aperiam 
                accusantium sit ab nostrum rem.
                </p>
            <h2>Create a capsule now!</h2>
            <p>
            <Link to="/create">Create</Link>
            </p>
        </div>
    )
}

export default Home