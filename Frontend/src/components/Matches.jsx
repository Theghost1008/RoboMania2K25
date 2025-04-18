import React from "react";

const Matches = ({ match }) => {
    const renderStatus = () => {
        try {
            switch (match.status) {
                case "Ongoing":
                    return (
                        <span className="bg-yellow-900 text-yellow-400 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                            ⏱️ <span className="font-medium">{match.status}</span>
                        </span>
                    );
                case "Upcoming":
                    return (
                        <span className="bg-blue-900 text-blue-400 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                            🕒 <span className="font-medium">{match.status}</span>
                        </span>
                    );
                case "Completed":
                    return (
                        <span className="bg-green-900 text-green-400 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                            ✅ <span className="font-medium">{match.status}</span>
                        </span>
                    );
                default:
                    return null;
            }
        } catch (error) {
            return (
                <div className="text-red-500">
                    Error Loading: {error.message}
                </div>
            );
        }
    };

    return (
        <div className="bg-[#12172b] border border-gray-700 rounded-md p-4 mb-4 flex flex-col md:flex-row justify-between items-center text-white">
            <div className="flex-1 text-center md:text-right">
                <div className="text-lg font-semibold">{match.teamA.teamName}</div>
                <div className="text-purple-400 text-2xl font-bold">{match.scoreA}</div>
            </div>

            <div className="flex flex-col items-center gap-1 text-sm md:px-20">
                {renderStatus()}
            </div>

            <div className="flex-1 text-center md:text-left">
                <div className="text-lg font-semibold">{match.teamB.teamName}</div>
                <div className="text-purple-400 text-2xl font-bold">{match.scoreB}</div>
            </div>
        </div>
    );
};

export default Matches;
