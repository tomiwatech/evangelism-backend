import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ConvertSchema = new Schema({
    name: String,
    email: String,
    address: String,
    phone: Number
}, {
        timestamps: { createdAt: 'created', updatedAt: 'updated' }
    });

const Convert = mongoose.model('Convert', ConvertSchema);

export default Convert;