import axios from "axios";
import React from "react";
import { toast } from "react-toastify";


function Pagination({
    currentCursor,
    setCurrentCursor,
    prevCursors,
    setPrevCursors,
    setLeads
}) {


    const fetchNextPage = async()=>{

        try{


            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/lead-by-count`,
                {
                    params:{
                        cursor:currentCursor,
                        direction:"next"
                    },
                    withCredentials:true
                }
            );


            const newLeads=response.data.data;


            if(newLeads.length===0){
                return toast.error("No more leads");
            }


            setPrevCursors(
                prev=>[...prev,currentCursor]
            );


            setLeads(newLeads);


            setCurrentCursor(
                newLeads[newLeads.length-1]._id
            );



        }catch(error){

            console.log(error);

        }

    };



    const fetchPreviousPage=async()=>{


        if(prevCursors.length===0){

            return toast.error(
                "Already on first page"
            );

        }


        try{


            const previousCursor =
                prevCursors[prevCursors.length-1];


            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/lead-by-count`,
                {
                    params:{
                        cursor:previousCursor,
                        direction:"previous"
                    },

                    withCredentials:true
                }
            );


            const oldLeads=response.data.data;


            setLeads(oldLeads);


            setCurrentCursor(
                oldLeads[oldLeads.length-1]._id
            );


            setPrevCursors(
                prev=>prev.slice(0,-1)
            );



        }catch(error){

            console.log(error);

        }

    };



    return (

        <div className="flex justify-center items-center gap-5 my-8">

            <button
                onClick={fetchPreviousPage}
                className="
                px-5 py-2 
                border rounded-lg
                bg-white
                hover:bg-gray-100
                "
            >

                Previous

            </button>


            <button
                onClick={fetchNextPage}
                className="
                px-5 py-2
                rounded-lg
                bg-blue-800
                text-white
                hover:bg-blue-700
                "
            >

                Next

            </button>


        </div>

    );

}


export default Pagination;