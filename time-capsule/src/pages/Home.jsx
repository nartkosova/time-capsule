import React from "react";
import { Link } from "react-router-dom";
import Capsules from "../components/Capsules";
import { CapsuleProvider } from "../context/capsuleContext";

const Home = () => {
    return (
    <div>
        <h1>Welcome to Time Capsule</h1>
        <p>
        Create your personal digital time capsule and immortalize your most cherished memories. 
        Write heartfelt letters, upload photos, or record videos, 
        and set a future date for when your time capsule will be unlocked. Whether it's for yourself or someone special, 
        our platform ensures that your memories remain safely stored, waiting to be rediscovered when the time is right.
        Start your journey today—capture the present, for a future that awaits.
        </p>
        <h2>Create a capsule now!</h2>
        <p>
        <Link to="/create">Create</Link>
        </p>       
      <div>
        <Capsules />
      </div>
        </div>
    )
}

export default Home