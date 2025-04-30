const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: false },
    startDate: { type: Date, default: Date.now },
    expiryDate: { type: Date }
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);
