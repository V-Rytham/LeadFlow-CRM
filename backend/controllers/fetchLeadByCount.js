import mongoose from "mongoose";
import Lead from "../models/lead.model.js";


export const getLeads = async (req,res)=>{

    try{

        const {
            cursor,
            direction
        } = req.query;


        let query = {};
        let sort = {_id:-1};


        if(cursor){

            if(direction === "next"){

                query = {
                    _id:{
                        $lt:new mongoose.Types.ObjectId(cursor)
                    }
                };

                sort = {_id:-1};

            }


            if(direction === "previous"){

                query = {
                    _id:{
                        $gt:new mongoose.Types.ObjectId(cursor)
                    }
                };

                sort = {_id:1};

            }
        }



        let leads = await Lead.find(query)
            .sort(sort)
            .limit(15);



        if(direction === "previous"){
            leads.reverse();
        }



        res.json({
            success:true,
            data:leads
        });



    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

}

export default getLeads;