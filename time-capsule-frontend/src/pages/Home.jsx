import { Link } from "react-router-dom";
import Capsules from "../components/Capsules";

const Home = () => {
    return (
      <main>
        <h1>Welcome to Time Capsule</h1>
        <p className="text-lg mb-6">
            Create your personal digital time capsule and immortalize your most cherished memories. 
            Write heartfelt letters, upload photos, or record videos, 
            and set a future date for when your time capsule will be unlocked. Whether it&apos;s for yourself or someone special, 
            our platform ensures that your memories remain safely stored, waiting to be rediscovered when the time is right.
            Start your journey today—capture the present, for a future that awaits.
        </p>
        <h2>Create a capsule now!</h2>
        <p>
            <Link to="/create">
                <button>
                    Create
                </button>
            </Link>
        </p>       
        <section>
            <Capsules />
        </section>
      </main>
    )
}

export default Home
