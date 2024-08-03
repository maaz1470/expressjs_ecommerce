import exporess from 'express'
import cors from 'cors'
import 'dotenv/config'
import apiRouter from './routes/api.js';
import AuthController from './Controllers/AuthController.js';
const app = exporess();
const port = process.env.PORT || 5000;
import './Database/Mongoose.js'
import ProtectedRoutes from './App/ProtectedRoutes.js';
import dashboardRouter from './routes/panel.js'

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: [
        'Content-Type','Authorization'
    ]
}))
// api routes
app.use(exporess.json())
app.use('/api',apiRouter)
app.use('/api/panel',ProtectedRoutes, dashboardRouter)

// web routes
app.get('/',(req,res) => {
    return AuthController.home(req, res);
})


app.listen(port, () => {
    console.log(`Server is Running on ${port}`)
})