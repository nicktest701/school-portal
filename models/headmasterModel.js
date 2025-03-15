// models/Headmaster.js
const mongoose = require('mongoose');

const headmasterSchema = new mongoose.Schema({

    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^[0-9]{10}$/, 'Phone number must be 10 digits']
    },
    signature: {
        type: String,
        required: [true, 'Signature is required'],
        default: 'uploads/signatures/default.png'
    },

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes
headmasterSchema.index({ user: 1 });
headmasterSchema.index({ email: 1 }, { unique: true });

const Headmaster = mongoose.model('Headmaster', headmasterSchema);

module.exports = Headmaster;