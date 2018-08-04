import bcrypt from 'bcrypt';

/**
 * @exports
 * @class cryptology
 */
class cryptology {
    /**
     * Userhelper Class
     * @staticmethod
     * @param  {string} newpassword
     * @param {string} dbpassword
     * @return {number} a
     */
    static compare(newpassword, dbpassword) {
        const promise = new Promise((resolve, reject) => {
            // Load hash from your password DB.
            console.log(newpassword, dbpassword);
            bcrypt.compare(newpassword, dbpassword).then((response) => {
                console.log(response);
                // res == true
                if (response) {
                    resolve('Password Matched');
                } else {
                    reject('Password not matched');
                }
            });
        });
        return promise;
    }
    /**
   * Userhelper Class
   * @staticmethod
   * @param  {string} hash
   * @param {string} 
   * @return {number} a
   */
    static hashPassword(password) {
        return new Promise((resolve, reject) => {
            // Hash password
            const saltRounds = 10;
            bcrypt.hash(password, saltRounds).then(function (hash) {
                resolve(hash);
            });
        });
    }
}
export default cryptology;