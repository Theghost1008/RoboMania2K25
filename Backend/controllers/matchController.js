import { Team } from "../models/teams.models.js";
import { Match } from "../models/match.models.js";

const updateMatchScore = async(req,res)=>{
    try{
        const {matchId} = req.params;
        const {scoreA,scoreB,status} = req.body;
        
        const match = await Match.findById(matchId).populate("teamA teamB");
        if(!match)
            return res.status(404).json({message:"Match not found"});
        match.scoreA += scoreA;
        match.scoreB += scoreB;
        match.status = status;
        await match.save();
        if(status==="Completed"){
            let teamA = await Team.findById(match.teamA._id)
            let teamB = await Team.findById(match.teamB._id)

            teamA.played+=1;
            teamB.played+=1;
            if(match.scoreA > match.scoreB){
                teamA.won+=1;
                teamB.lost+=1;
                teamA.points+=4;
            }
            else if(match.scoreA < match.scoreB){
                teamA.lost+=1;
                teamB.won+=1;
                teamB.points+=4;
            }
            else{
                teamA.draw+=1;
                teamB.draw+=1;
                teamA.points+=2;
                teamB.points+=2;
            }
            await teamA.save();
            await teamB.save();
        }
        const io=req.app.get('io');
        io.emit("matchUpdated", match);
        return res.status(200).json({message:"Match updated successfully", match});
    }catch(err){
        return res.status(500).json({message:"Server error",error:err.message});
    }
}

const liveStandings = async(req,res)=>{
    try{
        const standings = await Team.find().sort({points:-1});
        return res.status(200).json(standings);
    }catch(err){
        return res.status(500).json({message:"Failed to fetch standings"});
    }
}

const getMatches = async(req,res)=>{
    try{
        const matches = await Match.find().populate("teamA").populate("teamB");
        return res.status(200).json(matches);
    }catch(err){
        return res.status(500).json({message:"Internal server error", error:err.message})
    }
}

export {updateMatchScore, liveStandings, getMatches};