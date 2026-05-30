require('dotenv').config();
const express = require('express')
const authMiddleware = require('../middleware/auth.middleware.js')
const {User, accountModel} = require('../models/User.model.js')
const router = express.Router();
const User = require('../models/User.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const z = require('zod');

const signUpSchema = z.object({
    username: z.email(),
    firstname: z.string(),
    lastname: z.string().optional(),
    password: z.string().min(6)
})

const loginSchema = z.object({
    username: z.email(),
    firstname: z.string(),
    lastname: z.string().optional(),
    password: z.string().min(6)
})

const updateUserSchema = z.object({
    username: z.email(),
    firstname: z.string(),
    lastname: z.string().optional()
})
router.post('/signup', async (req, res) => {
    const body = req.body;
    const { success } = signUpSchema.safeParse(body);
    if (!success) {
        return res.status(403).json({ message: 'required field missing' })
    }

    const checkExisting = await User.findOne({ username: body.username });
    if (checkExisting) {
        return res.json({ message: 'user already exists' })
    }
    const hashedPassword = await bcrypt.hashSync(password, 10);

    const token = await jwt.sign({ username: username }, process.env.JWT_TOKEN, { expiresIn: '15m' })
    const user = new User({
        username,
        firstname,
        lastname,
        password: hashedPassword
    })
    await user.save();
    const user = user._id;
    const userAccount = new accountModel({
        user,
        balance: 1 + Math.random() * 10000
    })
    userAccount.save();
    
    return res.json({
        message: 'user created succesfully',
        token
    });
})

router.post('/login', (req, res) => {
    const body = req.body;
    const { success } = loginSchema.safeParse(body)
    if (!success) {
        return res.status(403).json({ message: 'required field missing' })
    }
    const user = await User.findOne({ username: body.username });
    if (!user) {
        return res.json({ message: 'user not found' })
    }
    const token = await jwt.sign({ username: username }, process.env.JWT_TOKEN, { expiresIn: '15m' })

    return res.json({
        message: 'user logged in',
        token
    });
})


//update route to update user data
router.put('/update', authMiddleware, async (req,res)=> {
    const {success} = updateUserSchema.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message: 'error while updating'
        })
    }
    await User.updateOne(req.body, {
        username: req.userId
    })
    return res.status(200).json({
        message: 'updated'
    })
})

// search user
router.get('/search', authMiddleware, async(req,res)=> {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstname: {
                "$regex": filter 
            }
        },{
            lastname: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user=>({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id

        }))
    })
})

// search user with like like syntax or OR read about it mongoose like roh will return all user with ro, will be using req.query
module.exports = router;