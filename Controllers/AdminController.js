import {compare, genSalt, hash} from 'bcrypt'
import Admin from "../Model/Admins.js";
import jwt from 'jsonwebtoken'
import Token from '../Model/Tokens.js';
export default class AdminController {


    _hashPassword(password){
        const roundSalt = 10;
        return hash(password,roundSalt)
    }

    create = async (req, res) => {
            const username = req.body.username;
            const email = req.body.email;
            const password = req.body.password;
            const hashPassword = await this._hashPassword(password)
            const status = 1;
            const admin = new Admin({
                username: username,
                email: email,
                password: hashPassword,
                status: status
            })
            await admin.save().then(() => {
                res.send({
                    status: 200,
                    message: 'Admin Created Successfully'
                })
            }).catch(error => {
                if(error.code == 11000){
                    res.send({
                        status: 401,
                        message: "Email or Username must be unique"
                    })
                }else{
                    res.send({
                        status: 401,
                        message: error
                    })
                }
            })
    }

    _passwordCheck = (password, hashPassword) => {
        return compare(password, hashPassword);
    }

    login = async (req, res) => {
        const {username, password} = req.body;
        const findAdmin = await Admin.findOne({username: username})
        if(findAdmin !== null){
            const passwordCheck = await this._passwordCheck(password,findAdmin.password)
            if(passwordCheck){
                const token = jwt.sign({id: findAdmin._id, username: findAdmin.username},process.env.JWT_SECRET_TOKEN)
                const saveToken = new Token({
                    token: token
                })
                saveToken.save()
                res.send({
                    status: 200,
                    message: 'Login successfully',
                    token: token
                })
            }else{
                res.send({
                    status: 401,
                    message: 'Username or Password not matched.'
                })
            }
        }else{
            res.send({
                status: 401,
                message: 'Username or Password not matched.'
            })
        }
}
}