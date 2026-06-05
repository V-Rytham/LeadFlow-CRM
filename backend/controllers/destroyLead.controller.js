import Lead from "../models/lead.model.js";

const deleteLead = async (req, res) => {
    const {id} = req.params;
    try {
        if (!id) {
            // Missing id => Bad client request => 400
            return res.status(400).json({message: "Lead is required"})
        }
        const lead = await Lead.findByIdAndDelete(id);
        if (!lead) {
            return res.status(404).json({message: "lead not found"})
        }
        return res.status(200).json({message: `Deletion successful`, data:lead})
    } catch (error) {
        return res.status(500).json(`Error deleting lead: ${error}`)
    }
}
export default deleteLead;