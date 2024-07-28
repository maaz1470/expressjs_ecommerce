import express from 'express'
const apiRouter = express.Router();
import AdminController from '../Controllers/AdminController.js';

// instance of controller
const Admin = new AdminController();

apiRouter.post('/admin/create',(req, res) => {
    return Admin.create(req, res)
})

apiRouter.post('/admin/login',(req, res) => {
    return Admin.login(req, res);
})

export default apiRouter;