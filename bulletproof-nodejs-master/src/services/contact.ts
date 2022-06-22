import { Service, Inject } from 'typedi';
import { IContact } from '@/interfaces/IContact';
import { IResponse,Response } from '@/interfaces/IResponse';
import {encrypt,decrypt} from '@/Utility/Encryption';
import getMessage from '@/services/getMessage';
import { Container } from 'typedi';


@Service()
export default class ContactService {
  constructor(
    @Inject('Contact') private contactModel: Models.contatModal,
    @Inject('logger') private logger,
  ) {}

  public async AddContact(contactInput: IContact): Promise<IResponse> {
    try {
      //const contactRecord = await this.contactModel.create(contactInput);
      var response = new Response(); 
      contactInput.Token=encrypt(contactInput.Token)?.encryptedData;
      const contactRecord = await this.contactModel.create(contactInput);
      if (!contactRecord) {
        response.statusCode = -1;
        response.message = "Failed";
      } else {
        response.statusCode = 1;
        
        response.message = await Container.get(getMessage).getMessages("SS");
      }
      this.logger.info(contactRecord);
      return response;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async UpdateContact(id: string, contactInput: IContact): Promise<any> {
    try {
      var response = new Response(); 
      const contactRecord = await this.contactModel.updateOne({ _id: id }, contactInput);
      if (!contactRecord) {
        response.statusCode = -1;
        response.message = 'Contact cannot be Updated';
      }
      else {
        response.statusCode = 1;
        response.message = 'Contact Updated Sucessfull';
      }
      this.logger.info(contactRecord);
      return contactRecord;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async DeleteContact(id: string): Promise<any> {
    try {
      var response = new Response(); 
      const contactRecord = await this.contactModel.deleteOne({ _id: id });
      if (!contactRecord) {
        response.statusCode = -1;
        response.message = 'Contact cannot be Deleted';
      }
      else {
        response.statusCode = 1;
        response.message = 'Contact Deleted Sucessfull';
      }
      this.logger.info(contactRecord);
      return response;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async GetAllContact(contactInput: IContact): Promise<any> {
    try {
      var response = new Response(); 
      const contactRecord: IContact[] = await this.contactModel.find({});
      if (contactRecord.length === 0) {
        response.statusCode = -1;
        response.message = 'Contact Not Found';
      }
      else
      {
        response.statusCode = 1;
        response.message = 'Success';
        response.data=contactRecord;
      }
      this.logger.info(contactRecord);
      return response;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async FilterContacts(contactInput: IContact): Promise<any> {
    try {
      var response = new Response(); 
      let check = {}
      if(contactInput.Name.length != 0)
      {
        check={Name:contactInput.Name}
      }
      if(contactInput.Email.length != 0)
      {
        check={Name:contactInput.Name,Email:contactInput.Email}
      }
      const contactRecord: IContact[] = await this.contactModel.find({check});
      if (contactRecord.length === 0) {
        response.statusCode = -1;
        response.message = 'Contact Not Found';
      }
      else
      {
        response.statusCode = 1;
        response.message = 'Success';
        response.data=contactRecord;
      }
      this.logger.info(contactRecord);
      return response;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async Filtermtwo(contactInput: IContact): Promise<any> {
    try {
      var response = new Response(); 
      let param: IContact;
      if(contactInput.Name.length != 0)
      {
        param["Name"] = contactInput.Name;
      }

      const contactRecord: IContact[] = await this.contactModel.find({param});
      if (contactRecord.length === 0) {
        response.statusCode = -1;
        response.message = 'Contact Not Found';
      }
      else
      {
        response.statusCode = 1;
        response.message = 'Success';
        response.data=contactRecord;
      }
      this.logger.info(contactRecord);
      return response;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
