import { Link, Outlet } from "react-router-dom";

function HomePage({exitEvent}) {
    return (
        <div className="home-page">
            <button onClick={exitEvent}>Exit</button>
            <Link to='/home/day/today'><button>Home</button></Link>
            <Link to='/home/stats'><button>Stats</button></Link>
            <div>Home</div>
            <Outlet />
        </div>
      );
}

export default HomePage;