import React from "react";
import axios from "axios";
function InfoCards ({card}) {
    return (
        <div className="flex flex-col gap-2 bg-gray-100 w-50 text-center rounded-xl">
            <p className="text-gray-500 font-bold">{card.name}</p>
            <span className="text-2xl">{card.value}</span>
        </div>
    )
}
export default InfoCards