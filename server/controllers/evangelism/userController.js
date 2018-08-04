import userService from '../../services/userService';
/**
 * @exports
 * @class userController
 */
class UserController {
  /**
   * Creates a new user
   * @staticmethod
   * @param  {object} req - user object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static createUser(req, res) {
    const {
      username, email, fullname, password
    } = req.body;
    console.log(username);
    userService.saveUser(req.body).then((result) => {
      console.log(result);
      return res.status(201).json({
        'responseMessage': 'New user created successfully',
      });
    }).catch((err) => {
      return res.status(400).json({
        responseMessage: err.responseMessage,
      });
    });
  }
  /**
 * Creates a new user
 * @staticmethod
 * @param  {object} req - user object
 * @param {object} res - Response object
 * @return {json} res.json
 */
  static login(req, res) {
    const {
      username, password
    } = req.body;
    userService.login(username, password).then((response) => {
      return res.status(200).json({
        responseMessage: 'Authentication Successful',
        body: response
      });
    }).catch((err) => {
      return res.status(400).json({
        responseMessage: err.responseMessage,
      });
    })
  }
}

export default UserController;
