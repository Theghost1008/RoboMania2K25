import React, { useEffect, useState } from "react";
import axios from "../api/api.js";
import Matches from "../components/Matches.jsx";

const Ongoing=()=>{
    const [matches, setMatches] = useState([]);
    useEffect(()=>{
        const fetchMatches = async()=>{
            const response = await axios.get("/match/matches");
            setMatches(response.data.filter(m=>m.status==="Ongoing"));
        }
        fetchMatches();
        const interval = setInterval(fetchMatches,5000);
        return ()=>clearInterval(interval)
    },[]);
    return (
        <div className="text-white">
            <h1 className="text-2xl font-bold mb-4">Ongoing Match</h1>
            {matches.length>0?(
                matches.map(mat=><Matches key={mat._id} match={mat}/>)
            ):(
                <p className="text-gray-400">No ongoing matches</p>
            )}
        </div>
    )
}

export default Ongoing;