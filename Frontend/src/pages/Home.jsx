import React,{useState} from "react";
import Completed from "./Completed.jsx";
import Upcoming from "./Upcoming.jsx";
import Ongoing from "./Ongoing.jsx";
import PointsTable from "./PointsTable.jsx";
import { Link } from "react-router";

const Home = ()=>{
    const [activeTab, setActiveTab] = useState("Ongoing");
    const render=()=>{
        try{switch(activeTab){
            case "Ongoing":
                return <Ongoing/>;
            case "Upcoming":
                return <Upcoming/>;
            case "Completed":
                return <Completed/>;
            default:
                return null;
        }}catch(err){
            return <div className="text-red-500">Error Loading:{err.message}</div>
        }
    };
    return(
        <div className="min-h-screen bg-[#0D1120] text-white p-4 md:p-8 flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1 w-full">
                <h1 className="text-3xl md:text-3xl font-bold mb-1 text-pink-500">
                    Robo<span className="text-white">Mania</span>
                </h1>
                <p className="mb-6 text-gray-400 text-sm md:text-base">Live scores and match details</p>
                <div className="flex flex-col sm:flex-row bg-gray-100 rounded-md overflow-hidden text-black w-full md:w-[600px] mb-4">
                    {['Ongoing', 'Upcoming', 'Completed'].map((tab) => (
                        <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`w-full py-2 font-medium transition-colors ${
                            activeTab === tab
                            ? 'bg-purple-700 text-white'
                            : 'hover:bg-gray-200'
                        }`}
                        >
                        {tab}
                        </button>
                    ))}
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                    {render()}
                </div>
            </div>
            <div className="w-full md:w-80">
                <PointsTable />
                <div className="mt-4">
                <Link to="/standings">
                    <button className="bg-white text-black px-4 py-2 rounded shadow hover:bg-gray-200 flex items-center justify-between w-full text-sm md:text-base">
                        Full Standings <span>→</span>
                    </button>
                </Link>
                </div>
            </div>
        </div>
    )
}

export default Home;