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
                        const hashError = {};
                        hashError.responseCode = '03';
                        hashError.responseMessage = 'Error Hashing Password';
                        reject(hashError);
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
                        const wrongPassword = {};
                        wrongPassword.responseCode = '01';
                        wrongPassword.responseMessage = 'Wrong Username and Password Combination'
                        reject(wrongPassword);
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

    /**
     * find all members
     * @staticmethod
     * @param  {string} body - Request object
     * @return {string} res
     */
    static getAllUsers() {
        return new Promise((resolve, reject) => {
            User.find(function (err, user) {
                if (err) {
                    const log = {};
                    log.responseCode = '02';
                    log.responseMessage = 'Error Fetching All Users';
                    reject(log);
                }
                if (user) {
                    resolve(user);
                } else {
                    const unknown = {};
                    unknown.responseCode = '03';
                    unknown.responseMessage = 'Could not fetch users '
                    reject(unknown);
                }
            });
        });
    }
    /**
     * Count all members
     * @staticmethod
     * @param  {string} body - Request object
     * @return {string} res
     */
    static countAllUsers() {
        return new Promise((resolve, reject) => {
            User.count(function (err, result) {
                if (err) {
                    const log = {};
                    log.responseCode = '02';
                    log.responseMessage = 'Error Counting All Users';
                    reject(log);
                }
                if (result) {
                    resolve(result);
                } else {
                    const unknown = {};
                    unknown.responseCode = '03';
                    unknown.responseMessage = 'Could not count users '
                    reject(unknown);
                }
            });
        });
    }
}

export default userService;