import { useEffect, useState } from "react";
import axios from "../api/api.js";
import Matches from "../components/Matches.jsx";


const Completed=()=>{
    const [matches, setMatches] = useState([]);
    useEffect(()=>{
        const fetchMatches = async()=>{
            const response = await axios.get("/match/matches");
            setMatches(response.data.filter(m=>m.status==="Completed"));
        }
        fetchMatches();
    },[]);
    return(
        <div className="text-white">
            <h1 className="text-2xl font-bold mb-4">Completed Matches</h1>
            {matches.length>0 ?(
                matches.map(mat=><Matches key={mat._id} match={mat}/>)
            ):(
                <p className="text-gray-400">No completed matches</p>
            )}
        </div>
    )
}

export default Completed;