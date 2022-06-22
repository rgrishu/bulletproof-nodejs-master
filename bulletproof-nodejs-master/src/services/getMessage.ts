import { Service, Inject } from 'typedi';
import { IDbMessage } from '@/interfaces/IResponse';
@Service()
export default class getMessage {
  constructor(
    @Inject('DBMessage') private DbMEssageModal: Models.DbMEssageModal,
    @Inject('logger') private logger,
  ) {}
  public async getMessages(codes:string): Promise<any> {
    try {
      var response = "404 Some Thing Is Wrong.!";
     // var data: IDbMessage[] = await this.DbMEssageModal.insertMany([{"Code":"SS","Message":"Saved Successfull"}]);
     var data = await this.DbMEssageModal.findOne({Code: codes}); 
     // const data: IDbMessage = await this.DbMEssageModal.findOne({code:codes});
      if (data === null) {
        return response;
      }
      else
      {
        return data.Message;
      }
      this.logger.info(data);
      return response;
    } catch (e) {
      return e.toString();
    }
  }
}
