import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    fullname: String,
    email: String,
    designation: String,
    phone: Number
}, {
        timestamps: { createdAt: 'created', updatedAt: 'updated' }
    });

const Member = mongoose.model('Member', MemberSchema);

export default Member;