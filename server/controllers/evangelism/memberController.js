import memberService from '../../services/memberService';
/**
 * @exports
 * @class MemberController
 */
class MemberController {
    /**
     * Creates a new user
     * @staticmethod
     * @param  {object} req - user object
     * @param {object} res - Response object
     * @return {json} res.json
     */
    static create(req, res) {
        memberService.saveMember(req.body).then((result) => {
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
   * get all users
   * @staticmethod
   * @param  {object} req - user object
   * @param {object} res - Response object
   * @return {json} res.json
   */
    static getAll(req, res) {
        memberService.getAllMembers().then((result) => {
            console.log(result);
            return res.status(200).json({
                responseMessage: 'Successfully fetched all Members',
                data: result
            });
        }).catch((err) => {
            return res.status(400).json({
                responseMessage: err.responseMessage,
            });
        });
    }
    /**
    * count all members
    * @staticmethod
    * @param  {object} req - user object
    * @param {object} res - Response object
    * @return {json} res.json
    */
    static countAll(req, res) {
        memberService.countAllMembers().then((result) => {
            console.log(result);
            return res.status(200).json({
                responseMessage: 'Successfully Counted all Members',
                total: result
            });
        }).catch((err) => {
            return res.status(400).json({
                responseMessage: err.responseMessage,
            });
        });
    }
    /**
    * find member by id
    * @staticmethod
    * @param  {object} req - user object
    * @param {object} res - Response object
    * @return {json} res.json
    */
    static findMember(req, res) {
        const id = req.params.id
        memberService.findMemberById(id).then((result) => {
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

export default MemberController;
