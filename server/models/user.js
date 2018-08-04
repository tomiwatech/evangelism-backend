import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    fullname: String,
    email: String,
    password: String
}, {
        timestamps: { createdAt: 'created', updatedAt: 'updated' }
    });

const User = mongoose.model('User', UserSchema);

export default User;
