import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import AuthService from '@/services/auth';
import { IUserInputDTO } from '@/interfaces/IUser';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import ContactService from '@/services/contact';
import { IContact } from '@/interfaces/IContact';

const route = Router();

export default (app: Router) => {
  app.use('/contacts', route);
  route.post(
    '/contact',
    celebrate({
      body: Joi.object({
        action: Joi.string().required(),
        ID:Joi.allow(),
        ProductID: Joi.allow(),
        Token: Joi.allow(),
        Name: Joi.allow(),
        Mobile:Joi.allow(),
        Email: Joi.allow(),
        State: Joi.allow(),
        City: Joi.allow(),
        ZipCode: Joi.allow(),
        Address: Joi.allow(),
      }),
    }),
    
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger');
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body );
      console.log(req.body);
    
      try {
        if(req.body.action=="add"){
        const result= await Container.get(ContactService).AddContact(req.body as IContact);
        return res.status(201).json({ result});
      }
      else if (req.body.action=="post"){
        const result= await Container.get(ContactService).UpdateContact(req.body.ID,req.body as IContact);
        return res.status(201).json({ result});
      }
      else if (req.body.action=="del"){
        const result= await Container.get(ContactService).DeleteContact(req.body.ID);
        return res.status(201).json({ result});
      }
      else if (req.body.action=="get"){
        const result= await Container.get(ContactService).GetAllContact(req.body as IContact);
        return res.status(201).json({ result});
      }
      else if (req.body.action=="info"){
        const result= await Container.get(ContactService).InfoContact(req.body as IContact);
        return res.status(201).json({ result});
      }
      else
      {
       
      return  res.status(201).json({"statusCode":"-1","message":"Invalid Action"});
      }
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

};


