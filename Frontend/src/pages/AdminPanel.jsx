import React, { useEffect, useState } from "react";
import axios from "../api/api.js";
import io from "socket.io-client";

const socket = io("https://robomania-backend.onrender.com", { withCredentials: true });

const AdminPanel = () => {
  const [matches, setMatches] = useState([]);
  const [selectedMatchId, setMatchId] = useState("");
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [status, setStatus] = useState("Ongoing");

  useEffect(() => {
    fetchMatches();
    socket.on("matchUpdated", (updatedMatch) => {
      setMatches((prev) =>
        prev.map((m) => (m._id === updatedMatch._id ? updatedMatch : m))
      );
    });
    return () => socket.disconnect();
  }, []);

  const fetchMatches = async () => {
    const response = await axios.get("/match/matches");
    setMatches(response.data);
  };

  const handleUpdate = async () => {
    if (!selectedMatchId) return;
    await axios.put(
      `/match/match/${selectedMatchId}`,
      {
        scoreA: parseInt(scoreA),
        scoreB: parseInt(scoreB),
        status,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setScoreA(0);
    setScoreB(0);
  };

  const selectedMatch = matches.find((m) => m._id === selectedMatchId);

  return (
    <div className="min-h-screen bg-gray-950 text-white py-10 px-4">
      <div className="max-w-3xl mx-auto bg-gray-900 rounded-xl shadow-2xl p-6">
        <h1 className="text-3xl font-bold text-purple-400 mb-6 text-center">Admin Panel</h1>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-300">Select Match:</label>
          <select
            onChange={(e) => setMatchId(e.target.value)}
            value={selectedMatchId}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">-- Select Match --</option>
            {matches.map((match) => (
              <option key={match._id} value={match._id}>
                {match.teamA.teamName} vs {match.teamB.teamName} ({match.status})
              </option>
            ))}
          </select>
        </div>

        {selectedMatch && (
          <div className="bg-gray-800 p-6 rounded-lg space-y-5 border border-gray-700">
            <h2 className="text-xl font-semibold text-purple-300 mb-2 text-center">
              {selectedMatch.teamA.teamName} vs {selectedMatch.teamB.teamName}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm">Score - {selectedMatch.teamA.teamName}</label>
                <input
                  type="number"
                  value={scoreA}
                  onChange={(e) => setScoreA(e.target.value)}
                  className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Score - {selectedMatch.teamB.teamName}</label>
                <input
                  type="number"
                  value={scoreB}
                  onChange={(e) => setScoreB(e.target.value)}
                  className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm">Match Status:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 focus:ring-purple-500 focus:border-purple-500"
              >
                <option>Upcoming</option>
                <option>Ongoing</option>
                <option>Completed</option>
              </select>
            </div>

            <div className="text-center">
              <button
                onClick={handleUpdate}
                className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition"
              >
                Submit Update
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
