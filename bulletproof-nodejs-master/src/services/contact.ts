import { Service, Inject } from 'typedi';
import { IContact } from '@/interfaces/IContact';
import { IResponse,Response } from '@/interfaces/IResponse';
import {encrypt,decrypt} from '@/Utility/Encryption';
import {removeEmptyObjectFromJson} from '@/Utility/Helper';
import getMessage from '@/services/getMessage';
import { Container } from 'typedi';


@Service()
export default class ContactService {
  constructor(
    @Inject('Contact') private contactModel: Models.contatModal,
    @Inject('logger') private logger,
  ) {}

  
  public async AddContact(contactInput: IContact): Promise<IResponse> {
    var response = new Response();
      response.statusCode = -1;
      response.message = "Failed";
    try {
      //const contactRecord = await this.contactModel.create(contactInput);
      
      contactInput.Token=encrypt(contactInput.Token)?.encryptedData;
      //const contactRecord = await this.contactModel.create(contactInput);
      const contactRecord = await this.contactModel(contactInput);
      await contactRecord.save();
      if (!contactRecord) {
        response.message = "Failed";
      } else {
        response.statusCode = 1;
        response.message = await Container.get(getMessage).getMessages("SS");
      }
      this.logger.info(contactRecord);
    } catch (e) {
      response.message=e.message;
    }
    return response;
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
  public async InfoContact1(contactInput: IContact): Promise<any> {
    try {
      var response = new Response(); 
      let check = {}
      if(contactInput.Name.length != 0)
      {
        check={Name:contactInput.Name}
      }
      if(contactInput.Email.length != 0)
      {
        check={...check,Email:contactInput.Email}
      }

      
      console.log(check)
      const contactRecord: IContact[] = await this.contactModel.find(check);
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
  public async InfoContact(contactInput: IContact): Promise<any> {
    try {
      var response = new Response(); 
     var filterobject=removeEmptyObjectFromJson(contactInput)
      console.log(filterobject)
      const contactRecord: IContact[] = await this.contactModel.find(filterobject);
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
