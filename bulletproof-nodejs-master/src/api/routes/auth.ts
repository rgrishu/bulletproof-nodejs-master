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
  app.use('/auth', route);

  route.post(
    '/signup',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger');
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body );
      try {
        const authServiceInstance = Container.get(AuthService);
        const result = await authServiceInstance.SignUp(req.body as IUserInputDTO);
        return res.status(201).json(result);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );


  route.post(
    '/contact',
    celebrate({
      body: Joi.object({
        Email: Joi.string().required(),
        
        Mobile: Joi.string().required(),
        ProductID: Joi.string().required(),
        Token: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger');
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body );
      console.log(req.body);
      try {
        const result= await Container.get(ContactService).AddContact(req.body as IContact);
        return res.status(201).json({ result});
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/updatecontact',
    celebrate({
      body: Joi.object({
        ID:Joi.string().required(),
        Email: Joi.string().required(),
        Mobile: Joi.string().required(),
        ProductID: Joi.string().required(),
        Token: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger');
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body );
      console.log(req.body);
      try {
        const result= await Container.get(ContactService).UpdateContact(req.body.ID,req.body as IContact);
        return res.status(201).json({ result});
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

   
  route.post(
    '/deletecontact',
    celebrate({
      body: Joi.object({
        ID:Joi.string().required()
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger');
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body );
      console.log(req.body);
      try {
        const result= await Container.get(ContactService).DeleteContact(req.body.ID);
        return res.status(201).json({ result});
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

   


  route.get(
    '/getcontact',middlewares.checkToken,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger');
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body );
      console.log(req.body);
      try {
        const result= await Container.get(ContactService).GetAllContact(req.body as IContact);
        return res.status(201).json({ result});
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

 


  route.post(
    '/signin',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger');
      logger.debug('Calling Sign-In endpoint with body: %o', req.body);
      try {
        const { email, password } = req.body;
        const authServiceInstance = Container.get(AuthService);
        const { user, token } = await authServiceInstance.SignIn(email, password);
        return res.json({ user, token }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o',  e );
        return next(e);
      }
    },
  );
  route.post(
    '/GenAdd',
    celebrate({
      body: Joi.object({
        clname: Joi.string().required(),
        data: Joi.any().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger');
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body );
      console.log(req.body);
      var result:any;
      result=req.body
      return res.status(201).json({result});
    },
  );

  /**
   * @TODO Let's leave this as a place holder for now
   * The reason for a logout route could be deleting a 'push notification token'
   * so the device stops receiving push notifications after logout.
   *
   * Another use case for advance/enterprise apps, you can store a record of the jwt token
   * emitted for the session and add it to a black list.
   * It's really annoying to develop that but if you had to, please use Redis as your data store
   */
  route.post('/logout', middlewares.isAuth, (req: Request, res: Response, next: NextFunction) => {
    const logger:Logger = Container.get('logger');
    logger.debug('Calling Sign-Out endpoint with body: %o', req.body);
    try {
      //@TODO AuthService.Logout(req.user) do some clever stuff
      return res.status(200).end();
    } catch (e) {
      logger.error('🔥 error %o', e);
      return next(e);
    }
  });
};
