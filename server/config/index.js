
import dotenv from 'dotenv';

dotenv.config();

const config = {
    mongoUri: process.env.MONGO_URI,
    secret: process.env.JWT_SECRET
};
export default config;