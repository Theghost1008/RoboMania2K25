import mongoose,{Schema} from "mongoose";

const teamSchema = new Schema(
    {
        teamName : {
            type:String,
            required:true,
        },
        coach:{
            type:String,
            required:true,
        },
        captain:{
            type:String,
            required:true,
        },
        played:{
            type:Number,
            default: 0
        },
        won:{
            type:Number,
            default: 0
        },
        lost:{
            type:Number,
            default: 0
        },
        draw:{
            type:Number,
            default: 0
        },
        points:{
            type: Number,
            default: 0,
        }
},{timestamps:true})

export const Team = mongoose.model("Team",teamSchema);
