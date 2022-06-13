import {Container} from "typedi";
import Common from "@/services/common";
import {Request} from "express";
import {Logger} from 'winston';

/**
  @param {} req Express req Object
  @param {} res  Express res Object
  @param {} next  Express next Function
 */
const checkToken = async (req: Request, res, next) => {
  const Logger: Logger = Container.get('logger');
  try {
    const authHeader = req.get('Authorization');
    const token = authHeader && authHeader.toString().split(' ')[1];
    // console.log(req.get('Authorization'));
    if (!token) {
      Logger.error(`Token not found.`);
      return res.status(200).json({success: false, result: {error: "Token not found."}});
    }
    let result: { message: string, flag: boolean } = Container.get(Common).verifyJSONToken(token);
    if (result.flag) {
      req['userEmail'] = result.message;
      next();
    } else {
      Logger.error(result.message);
      return res.status(200).json({success: false, result: {error: result.message}});
    }
  } catch (e) {
    Logger.error(e.message);
    return next(e);
  }
}

export default checkToken;