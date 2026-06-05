import mongoose from "mongoose";
import Lead from "../models/lead.model.js";


const searchById = async (req,res)=>{

    try {

        const { id } = req.params;


        if(!id){
            return res.status(400).json({
                message:"Lead id required"
            });
        }


        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                message:"Invalid lead id"
            });
        }


        const lead = await Lead.findById(id);


        if(!lead){
            return res.status(404).json({
                message:"Lead not found"
            });
        }


        return res.status(200).json({
            lead
        });


    } catch(error){

        return res.status(500).json({
            message:`Error while retrieving lead: ${error.message}`
        });

    }
}


export default searchById;