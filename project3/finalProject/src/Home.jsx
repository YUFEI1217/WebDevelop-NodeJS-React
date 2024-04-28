import HomeMainPanel from "./HomeMainPanel";
import './Home.css';

function Home({setPage}) {
    return (
        <div className="home">
            <h2 className="home_h2_title">Production Introduction</h2>
            <HomeMainPanel setPage={setPage}/>
        </div>
    );
}

export default Home;