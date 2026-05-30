require('dotenv').config();
const express = require('express')
const authMiddleware = require('../middleware/auth.middleware.js')
const { User, accountModel } = require('../models/User.model.js')
const router = express.Router();
const z = require('zod');
const { default: mongoose } = require('mongoose');

router.get('/balance', authMiddleware, async (req, res) => {

    console.log(req.userId);

    const account = await accountModel.findOne({
        userId: req.userId
    })
    console.log(account)
    res.status(200).json({
        balance: account.balance
    })
})

router.post('/transfer', authMiddleware, async (req, res) => {
    // const session = await mongoose.startSession()

    // session.startTransaction()
    const { amount, to } = req.body;

    // const account = await accountModel.findOne({ userId: req.userId }).session(session)
    

    const account = await accountModel.findOne({ userId: req.userId })

    if (!account || account.balance < amount) {
        // await session.abortTransaction();
        return res.status(400).json({
            message: 'infucient balance'
        })
    }

    // const toAccount = await accountModel.findOne({ userId: to }).session(session)

    
    const toAccount = await accountModel.findOne({ userId: to })

    if (!toAccount) {
        // await session.abortTransaction()
        return res.status(400).json({
            message: 'invalid account'
        })
    }

    // await accountModel.updateOne({userId: req.userId}, {$inc: {balance: -amount}}).session(session)
    // await accountModel.updateOne({userId: to}, {$inc: {balance: amount}}).session(session)

    await accountModel.updateOne({ userId: req.userId }, { $inc: { balance: -amount } })
    await accountModel.updateOne({ userId: to }, { $inc: { balance: amount } })

    // await session.commitTransaction()
    res.status(200).json({
        message: 'transfer succseful'
    })
})

module.exports = router