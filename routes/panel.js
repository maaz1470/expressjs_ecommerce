import express from 'express'
const dashboardRouter = express.Router();


dashboardRouter.get('/',(req, res) => {
    return res.send('Hello, this is dashboard page')
})


export default dashboardRouter;