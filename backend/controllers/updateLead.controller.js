import Lead from "../models/lead.model.js";
import mongoose from "mongoose";

const updateLead = async (req, res) => {

    console.log(`updateLead controller called!`)
    try {
        const {id} = req.params;
        
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
        const updateData = req.body;
        const lead = await Lead.findByIdAndUpdate(id, updateData, {new : true, runValidators: true});
        if(!lead){
            return res.status(404).json({
                message:"Lead not found"
            });
        }
        res.status(200).json({message: `Successfully updated lead`, lead})
    } catch (error) {
        res.status(500).json({message: `Error while updating lead ${error}`})
    }
}
export default updateLead;