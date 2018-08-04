import jwt from 'jsonwebtoken';
import Cryptography from '../helpers/crypto';
import User from '../models/user';
import config from '../config/index';
/**
 * @exports
 * @class userService
 */
class userService {
    /**
     * Save new user
     * @staticmethod
     * @param  {string} data - Request object
     * @return {string} res
     */
    static saveUser(data) {
        return new Promise((resolve, reject) => {
            User.findOne({ email: data.email }, function (err, user) {
                if (err) {
                    const log = {};
                    log.responseCode = '02';
                    log.responseMessage = 'Error Saving User';
                    reject(log);
                } else if (user) {
                    const exist = {};
                    exist.responseCode = '01';
                    exist.responseMessage = `User with email ${user.email} already exists`;
                    reject(exist);
                } else {
                    Cryptography.hashPassword(data.password).then((hashPassword) => {
                        console.log(hashPassword);
                        new User({
                            username: data.username,
                            fullname: data.fullname,
                            email: data.email,
                            password: hashPassword
                        }).save(function (err, user) {
                            if (err) {
                                reject(err)
                            } else {
                                resolve(user);
                            }
                        })
                    }).catch((error) => {
                        console.log(error);
                        const hasherror = {};
                        hasherror.responseCode = '03';
                        hasherror.responseMessage = 'Error Hashing Password';
                        reject(error);
                    });
                }
            });
        });
    }
    /**
     * save new user
     * @staticmethod
     * @param  {string} body - Request object
     * @return {string} res
     */
    static login(username, password) {
        return new Promise((resolve, reject) => {
            User.findOne({ username: username }, function (err, user) {
                if (err) {
                    const log = {};
                    log.responseCode = '02';
                    log.responseMessage = 'Error Saving User';
                    reject(log);
                }
                if (user) {
                    Cryptography.compare(password, user.password).then((response) => {
                        const token = jwt.sign({ data: user._id }, config.secret, {
                            expiresIn: 86400, // expires in 24 hours
                        });
                        const data = {};
                        data.user = user;
                        data.token = token;
                        resolve(data);
                    }).catch((error) => {
                        const errorpsswd = {};
                        errorpsswd.responseCode = '01';
                        errorpsswd.responseMessage = 'Wrong Username and Password Combination'
                        reject(errorpsswd);
                    });
                } else {
                    const unknownUser = {};
                    unknownUser.responseCode = '03';
                    unknownUser.responseMessage = 'User does not exist. Please Signup'
                    reject(unknownUser);
                }
            });
        });
    }
}

export default userService;