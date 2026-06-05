import mongoose from "mongoose";


const leadSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        trim:true
    },

    phoneNumber: {
        type: String,
        required:true,
        unique:true
    },

    companyName: {
        type:String,
        trim:true
    },

    leadStatus:{
        type:String,
        enum:[
            "New",
            "Contacted",
            "Qualified",
            "Converted",
            "Lost"
        ],
        default:"New"
    },

    notes:{
        type:String,
        default:""
    }

},
{
    timestamps:true
});


const Lead = mongoose.model("Lead", leadSchema);

export default Lead;