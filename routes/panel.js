import express from 'express'
const dashboardRouter = express.Router();


dashboardRouter.get('/',(req, res) => {
    return res.send('Hello, this is dashboard page')
})

dashboardRouter.get('/check',(req, res) => {
    return res.send({
        status: 200,
        user: true
    })
})

export default dashboardRouter;