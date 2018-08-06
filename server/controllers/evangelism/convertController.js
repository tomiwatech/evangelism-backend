import ConvertService from '../../services/convertService';
/**
 * @exports
 * @class ConvertController
 */
class ConvertController {
    /**
     * Creates a new user
     * @staticmethod
     * @param  {object} req - user object
     * @param {object} res - Response object
     * @return {json} res.json
     */
    static create(req, res) {
        ConvertService.saveConvert(req.body).then((result) => {
            console.log(result);
            return res.status(201).json({
                'responseMessage': 'New convert created successfully',
            });
        }).catch((err) => {
            return res.status(400).json({
                responseMessage: err.responseMessage,
            });
        });
    }
    /**
   * get all users
   * @staticmethod
   * @param  {object} req - user object
   * @param {object} res - Response object
   * @return {json} res.json
   */
    static getAll(req, res) {
        ConvertService.getAllConverts().then((result) => {
            console.log(result);
            return res.status(200).json({
                responseMessage: 'Successfully fetched all Converts',
                data: result
            });
        }).catch((err) => {
            return res.status(400).json({
                responseMessage: err.responseMessage,
            });
        });
    }
    /**
    * count all Converts
    * @staticmethod
    * @param  {object} req - user object
    * @param {object} res - Response object
    * @return {json} res.json
    */
    static countAll(req, res) {
        ConvertService.countAllConverts().then((result) => {
            console.log(result);
            return res.status(200).json({
                responseMessage: 'Successfully Counted all Converts',
                total: result
            });
        }).catch((err) => {
            return res.status(400).json({
                responseMessage: err.responseMessage,
            });
        });
    }
    /**
    * find Convert by id
    * @staticmethod
    * @param  {object} req - user object
    * @param {object} res - Response object
    * @return {json} res.json
    */
    static findConvert(req, res) {
        const id = req.params.id
        ConvertService.findConvertById(id).then((result) => {
            console.log(result);
            return res.status(200).json({
                responseMessage: 'User Found',
                data: result
            });
        }).catch((err) => {
            return res.status(400).json({
                responseMessage: err.responseMessage,
            });
        });
    }
}

export default ConvertController;
