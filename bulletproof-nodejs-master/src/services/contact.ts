import { Service, Inject } from 'typedi';
import { randomBytes } from 'crypto';
import events from '@/subscribers/events';
import { IContact } from '@/interfaces/IContact';

@Service()
export default class ContactService {
    constructor(
      @Inject('Contact') private contactModel: Models.contatModal,
      
      @Inject('logger') private logger,
      
    ) {}

    public async AddContact(contactInput: IContact): Promise<IContact> {
        try {
          const contactRecord = await this.contactModel.create(contactInput);
          if (!contactRecord) {
            throw new Error('User cannot be created');
          }
          this.logger.info(contactRecord);
          return contactRecord;
        } catch (e) {
          this.logger.error(e);
          throw e;
        }
      }
      public async GetAllContact(contactInput: IContact): Promise<IContact[]> {
        try {
          const contactRecord : IContact[] = await this.contactModel.find({});
          if (contactRecord.length === 0) {
            throw new Error('User cannot be created');
          }
          this.logger.info(contactRecord);
          return contactRecord;
        } catch (e) {
          this.logger.error(e);
          throw e;
        }
      }

    }
  

    