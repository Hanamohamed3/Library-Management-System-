import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../../db/models/user/user.model.js';


 export const register = async (req, res) => {
    let { username, password  } = req.body
    let hashedPassword = await bcrypt.hash(password, 10)
    let data = await User.create({ username, password: hashedPassword })
    res.json(data)
}

export const login =  async (req, res) => {
    let { username, password } = req.body
    let user = await User.findOne({ where: { username } })
    if (user) {
        let isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.json({ error: 'invalid username or password' })
        } else {
            let token = jwt.sign({ username }, 'secretkey')
            res.json({message:"login successfully", token })
        }
    }
    else {
        res.json({ error: 'invalid username or password' })
    }
}