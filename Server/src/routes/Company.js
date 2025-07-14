import express from 'express';
import { registerCompany, get_Company_data, get_Company_By_id, updateCompany } from '../Controllers/Company.controler.js';
import isAuthentication from '../middleware/isAuthentication.js';
const CompanyRouter = express.Router();

CompanyRouter.route("/register_company").post(isAuthentication, registerCompany);
CompanyRouter.route("/get").get(isAuthentication, get_Company_data);
CompanyRouter.route("/get_by_Id/:id").get(isAuthentication, get_Company_By_id);
CompanyRouter.route("/update_company/:id").put(isAuthentication, updateCompany);;

export default CompanyRouter;