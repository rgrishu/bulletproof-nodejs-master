export interface IResponse {
  statusCode:number,
  message:string,
  data:any
}


export class Response implements IResponse{

  constructor(){
      
  }
  statusCode: number;
  message: string;
  data: any;

}
export interface IDbMessage {
  Code:string,
  Message:string
}
