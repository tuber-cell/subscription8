const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');

// GET subscription status
router.get('/:userId', async (req, res) => {
    try {
        const sub = await Subscription.findOne({ userId: req.params.userId });
        if (!sub) {
            return res.json({ isActive: false });
        }

        const now = new Date();
        const active = sub.expiryDate > now;
        return res.json({ isActive: active });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
