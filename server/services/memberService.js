import Member from '../models/member';
/**
 * @exports
 * @class memberService
 */
class memberService {
    /**
     * Save new user
     * @staticmethod
     * @param  {string} data - Request object
     * @return {string} res
     */
    static saveMember(data) {
        return new Promise((resolve, reject) => {
            Member.findOne({ email: data.email }, function (err, user) {
                if (err) {
                    const log = {};
                    log.responseCode = '02';
                    log.responseMessage = 'Error Saving Member';
                    reject(log);
                } else if (user) {
                    const exist = {};
                    exist.responseCode = '01';
                    exist.responseMessage = `Member with email ${user.email} already exists`;
                    reject(exist);
                } else {
                    new Member({
                        fullname: data.fullname,
                        email: data.email,
                        designation: data.designation,
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
     * find member by id
     * @staticmethod
     * @param  {string} body - Request object
     * @return {string} res
     */
    static findMemberById(id) {
        return new Promise((resolve, reject) => {
            Member.findOne({ _id: id }, function (err, user) {
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
                    unknownUser.responseMessage = 'Member does not exist. Please Register Member'
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
    static getAllMembers() {
        return new Promise((resolve, reject) => {
            Member.find(function (err, user) {
                if (err) {
                    const log = {};
                    log.responseCode = '02';
                    log.responseMessage = 'Error Finding All Members';
                    reject(log);
                }
                if (user) {
                    resolve(user);
                } else {
                    const unknown = {};
                    unknown.responseCode = '03';
                    unknown.responseMessage = 'Could not find members '
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
    static countAllMembers() {
        return new Promise((resolve, reject) => {
            Member.count(function (err, result) {
                if (err) {
                    const log = {};
                    log.responseCode = '02';
                    log.responseMessage = 'Error Counting All Members';
                    reject(log);
                }
                if (result) {
                    resolve(result);
                } else {
                    const unknown = {};
                    unknown.responseCode = '03';
                    unknown.responseMessage = 'Members Aray Empty'
                    reject(unknown);
                }
            });
        });
    }
}

export default memberService;