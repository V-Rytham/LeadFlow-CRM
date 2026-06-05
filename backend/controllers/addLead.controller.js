import Lead from "../models/lead.model.js";


export const addLead = async (req,res)=>{

    const {
        name,
        email,
        phoneNumber,
        companyName,
        notes
    } = req.body;


    try {

        if(!name || !email || !phoneNumber){
            return res.status(400).json({
                message:"Name, email and phone number required"
            });
        }


        const data = await Lead.create({
            name,
            email,
            phoneNumber,
            companyName,
            notes
        });


        return res.status(201).json({
            message:"Lead added successfully",
            data
        });


    } catch(error){


        if(error.code === 11000){
            return res.status(409).json({
                message:"Email or phone already exists"
            });
        }


        return res.status(500).json({
            message:`Error while adding new lead: ${error.message}`
        });
    }
};
export default addLead;