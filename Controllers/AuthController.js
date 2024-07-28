import express from 'express'

class AuthController{
    static home = (req, res) => {
        res.send('This is authcontroller')
    }
}

export default AuthController;