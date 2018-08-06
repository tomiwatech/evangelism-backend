import jwt from 'jsonwebtoken';
import config from '../../config/index';
/**
 * @exports
 * @class tokenMiddleware
 */
class tokenMiddleware {
    /**
       * tokenMiddleware
       * VERIFY TOKEN
       * @staticmethod
       * @param  {object} req - Request object
       * @param {object} res - Response object
       * @param {function} next - middleware next (for error handling)
       * @return {json} res.json
       */
    static verifyToken(req, res, next) {
        // check header or url parameters or post parameters for token
        const token = req.body.token || req.headers['x-access-token'];

        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    return res.status(400).json({ verifyToken: false, message: 'Failed to authenticate token.' });
                }
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            });
        } else {
            // if there is no token
            // return an error
            return res.status(403).send({
                verifyToken: false,
                message: 'No token provided.',
            });
        }
    }
}
export default tokenMiddleware;