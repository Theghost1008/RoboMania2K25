import mongoose,{Schema} from "mongoose";

const matchSchema = new Schema(
    {
        teamA:{
            type:Schema.Types.ObjectId,
            ref:"Team",
            required: true,
        },
        teamB:{
            type:Schema.Types.ObjectId,
            ref:"Team",
            required: true,
        },
        scoreA:{
            type:Number,
            default:0
        },
        scoreB:{
            type:Number,
            default:0
        },
        status:{
            type:String,
            enum:["Upcoming","Ongoing","Completed"],
            default:"Upcoming",
        }
},{timestamps:true})

export const Match = mongoose.model("Match", matchSchema);