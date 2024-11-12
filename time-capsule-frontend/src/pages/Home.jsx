import { Link } from "react-router-dom";
import Capsules from "../components/Capsules";

const Home = () => {
    return (
      <main className="m-10 bg-gray-900 text-gray-800 font-sans p-100">
        <h1 className="text-3xl font-bold mb-4">Welcome to Time Capsule</h1>
        <p className="text-lg mb-6">
            Create your personal digital time capsule and immortalize your most cherished memories. 
            Write heartfelt letters, upload photos, or record videos, 
            and set a future date for when your time capsule will be unlocked. Whether it&apos;s for yourself or someone special, 
            our platform ensures that your memories remain safely stored, waiting to be rediscovered when the time is right.
            Start your journey today—capture the present, for a future that awaits.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Create a capsule now!</h2>
        <p className="mb-10">
            <Link to="/create">
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
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
