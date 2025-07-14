import Job from '../Models/Jobs.Model.js';


const postJob = async (req, res) => {
    try {
        const { title, company, experience, location, salary, description, companyId, position } = req.body;
        const userId = req.id;
        if (!title || !company || !experience || !location || !salary || !description || !companyId || !position) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }
        const newJob = await Job.create({ title, company, experience, location, salary, description, companyId, position, userId });
        if (!newJob) {
            return res.status(400).json({ message: "Error occurred during job posting", success: false });
        }
        return res.status(201).json({ message: "Job posted successfully", success: true, data: newJob });
    } catch (error) {
        return res.status(500).json({ message: "Error occurred during job posting", success: false });
    }
}

export { postJob };