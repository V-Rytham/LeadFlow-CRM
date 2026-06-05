import Lead from "../models/lead.model.js";
const getAll = async (req, res) => {
    console.log("Request received")
    try {
        const leads = await Lead.find({})
        console.log("Leads found: ", leads, " length = " , leads.length)
        return res.status(200).json({"data" : leads});
    } catch (error) {
        return res.status(500).json(`Error while retrieving leads ${error}`)
    }
}
export default getAll;