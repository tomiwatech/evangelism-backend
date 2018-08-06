import Convert from '../models/convert';
/**
 * @exports
 * @class ConvertService
 */
class ConvertService {
    /**
     * Save new user
     * @staticmethod
     * @param  {string} data - Request object
     * @return {string} res
     */
    static saveConvert(data) {
        return new Promise((resolve, reject) => {
            Convert.findOne({ email: data.email }, function (err, user) {
                if (err) {
                    const log = {};
                    log.responseCode = '02';
                    log.responseMessage = 'Error Saving Convert';
                    reject(log);
                } else if (user) {
                    const exist = {};
                    exist.responseCode = '01';
                    exist.responseMessage = `Convert with email ${user.email} already exists`;
                    reject(exist);
                } else {
                    new Convert({
                        name: data.name,
                        email: data.email,
                        address: data.address,
                        phone: data.phone
                    }).save(function (err, user) {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(user);
                        }
                    })

                }
            });
        });
    }
    /**
     * find Convert by id
     * @staticmethod
     * @param  {string} body - Request object
     * @return {string} res
     */
    static findConvertById(id) {
        return new Promise((resolve, reject) => {
            Convert.findOne({ _id: id }, function (err, user) {
                if (err) {
                    const log = {};
                    log.responseCode = '02';
                    log.responseMessage = 'User Not found';
                    reject(log);
                }
                if (user) {
                    resolve(user);
                } else {
                    const unknownUser = {};
                    unknownUser.responseCode = '03';
                    unknownUser.responseMessage = 'Convert does not exist. Please Register Convert'
                    reject(unknownUser);
                }
            });
        });
    }
    /**
     * find all Converts
     * @staticmethod
     * @param  {string} body - Request object
     * @return {string} res
     */
    static getAllConverts() {
        return new Promise((resolve, reject) => {
            Convert.find(function (err, user) {
                if (err) {
                    const log = {};
                    log.responseCode = '02';
                    log.responseMessage = 'Error Finding All Converts';
                    reject(log);
                }
                if (user) {
                    resolve(user);
                } else {
                    const unknown = {};
                    unknown.responseCode = '03';
                    unknown.responseMessage = 'Could not find Converts '
                    reject(unknown);
                }
            });
        });
    }
    /**
     * Count all Converts
     * @staticmethod
     * @param  {string} body - Request object
     * @return {string} res
     */
    static countAllConverts() {
        return new Promise((resolve, reject) => {
            Convert.count(function (err, result) {
                if (err) {
                    const log = {};
                    log.responseCode = '02';
                    log.responseMessage = 'Error Counting All Converts';
                    reject(log);
                }
                if (result) {
                    resolve(result);
                } else {
                    const unknown = {};
                    unknown.responseCode = '03';
                    unknown.responseMessage = 'Converts Array Empty'
                    reject(unknown);
                }
            });
        });
    }
}

export default ConvertService;