import 'dotenv/config'
import jwt from 'jsonwebtoken'
const jwt_secret = process.env.JWT_SECRET_TOKEN;
import VerificationToken from '../Model/Tokens.js';


const ProtectedRoutes = async (req, res, next) => {
    const authorization = req.headers.authorization;
    if(authorization){
        const token = authorization.split(' ')[1];

        jwt.verify(token, jwt_secret, async (error, user) => {
            if(error){
                return res.send({
                    status: 401,
                    message: 'Invalid Token'
                })
            }
            const result = await VerificationToken.findOne({
                token: token
            })
            if(result != null){
                req.user = user;
                next();
            }else{
                res.send({
                    status: 401,
                    message: 'Invalid Token'
                })
            }
        });
    }else{
        return res.send({
            status: 401,
            message: 'Unauthenticated'
        })
    }
}

export default ProtectedRoutes;