import React, { useEffect, useState } from "react";
import axios from "../api/api.js";

const Standings = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchStandings = async () => {
      const response = await axios.get("/match/table");
      setTeams(response.data);
    };
    fetchStandings();
    const interval = setInterval(fetchStandings, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-2 sm:px-4">
  <div className="w-full max-w-7xl mx-auto px-4 py-6">
    <h2 className="text-4xl sm:text-3xl md:text-4xl font-bold text-purple-400 mb-6 text-center">Standings</h2>
    <div className="overflow-x-auto bg-gray-800 rounded-xl shadow-lg">
      <table className="min-w-full text-xs sm:text-sm md:text-base text-white">
        <thead>
          <tr className="bg-gray-900 text-purple-300">
            <th className="py-2 sm:py-3 px-2 sm:px-4 text-left">Rank</th>
            <th className="py-2 sm:py-3 px-2 sm:px-4 text-center">Team Name</th>
            <th className="py-2 sm:py-3 px-2 sm:px-4 text-center">Played</th>
            <th className="py-2 sm:py-3 px-2 sm:px-4 text-center">Won</th>
            <th className="py-2 sm:py-3 px-2 sm:px-4 text-center">Draw</th>
            <th className="py-2 sm:py-3 px-2 sm:px-4 text-center">Lost</th>
            <th className="py-2 sm:py-3 px-2 sm:px-4 text-center">PTS</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr
              key={team.teamName}
              className={`${
                index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"
              } hover:bg-gray-600 transition`}
            >
              <td
                className={`py-2 px-4 w-2 text-center ${
                  index === 0
                    ? "bg-yellow-400 text-black"
                    : index === 1
                    ? "bg-gray-400 text-black"
                    : index === 2
                    ? "bg-orange-500 text-white"
                    : "bg-gray-600"
                }`}
              >
                {index + 1}
              </td>
              <td className="py-2 px-4">{team.teamName}</td>
              <td className="py-2 px-4 text-center">{team.played}</td>
              <td className="py-2 px-4 text-center">{team.won}</td>
              <td className="py-2 px-4 text-center">{team.draw}</td>
              <td className="py-2 px-4 text-center">{team.lost}</td>
              <td className="py-2 px-4 text-center font-bold text-purple-400">
                {team.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

  );
};

export default Standings;