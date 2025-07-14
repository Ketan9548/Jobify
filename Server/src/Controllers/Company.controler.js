import e from "express";
import { Company } from "../Models/Company.Model.js";


// this if for company registration
const registerCompany = async (req, res) => {
    try {
        const { companyName, companyDescription, companyLocation } = req.body;
        if (!companyName) {
            return res.status(400).json({ message: "Company name is required", success: false });
        }
        const companyExist = await Company.findOne({ name: companyName })
        if (companyExist) {
            return res.status(400).json({ message: "Company already exist you cat't register again this company", success: false });
        }
        let newCompany = await Company.create({
            name: companyName,
            UserId: req.id,
            description: companyDescription,
            location: companyLocation
        })

        if (!newCompany) {
            return res.status(400).json({ message: "Error occurred during company registration", success: false });
        }

        return res.status(201).json({ message: "Company registered successfully", success: true, data: newCompany });
    } catch (error) {
        return res.status(500).json({ message: "Error occurred during company registration", success: false, error: error.message });
    }
}

// this is for getting company data
const get_Company_data = async (req, res) => {
    try {
        const userId = res.id;
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(400).json({ message: "Company not found", success: false });
        }
        return res.status(200).json({ message: "Company data fetched successfully", data: companies, success: true });

    } catch (error) {
        return res.status(500).json({ message: "Error occurred during company data fetching", success: false });
    }
}

// this is for getting company by id
const get_Company_By_id = async (req, res) => {
    try {
        const Company_id = req.params.id;
        const company = await Company.findById(Company_id);
        if (!company) {
            return res.status(400).json({ message: "Company not found", success: false });
        }
        return res.status(200).json({ message: "Company data fetched successfully", success: true, data: company });
    } catch (error) {
        return res.status(500).json({ message: "Error occurred during company data fetching", success: false });
    }
}


// update company data
const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;
        // aws s3 bucket can be used to handle file uploads
        const UpdateData = {
            name,
            description,
            website,
            location
        }
        const company = await Company.findByIdAndUpdate(req.params.id, UpdateData, { new: true });
        if (!company) {
            return res.status(400).json({ message: "Company not found", success: false });
        }
        return res.status(200).json({ message: "Company data updated successfully", success: true, data: company });
    } catch (error) {
        return res.status(500).json({ message: "Error occurred during company data updating", success: false });
    }
}
export { registerCompany, get_Company_data, get_Company_By_id, updateCompany }