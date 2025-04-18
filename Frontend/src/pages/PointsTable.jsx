import React,{useEffect, useState} from "react";
import axios from "../api/api.js";

const PointsTable = ()=>{
    const [teams, setTeams] = useState([]);
    useEffect(()=>{
        const fetchStandings = async()=>{
            const response = await axios.get("/match/table");
            setTeams(response.data);
        }
        fetchStandings();
        const interval = setInterval(fetchStandings,5000);
        return ()=>clearInterval(interval);
    },[]);
    return (
        <div className="bg-gray-900 p-4 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Top Teams</h2>
      {teams.map((team, index) => (
        <div
          key={team.teamName}
          className="flex justify-between items-center py-2 px-4 mb-2 rounded bg-gray-800 text-white"
        >
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 text-center rounded-full ${index === 0 ? 'bg-yellow-400 text-black' : index === 1 ? 'bg-gray-400 text-black' : index === 2 ? 'bg-orange-500 text-white' : 'bg-gray-600'}`}>
              {index + 1}
            </span>
            <span>{team.teamName}</span>
          </div>
          <span className="text-purple-400 font-bold">{team.points}</span>
        </div>
      ))}
    </div>
    )
}

export default PointsTable
