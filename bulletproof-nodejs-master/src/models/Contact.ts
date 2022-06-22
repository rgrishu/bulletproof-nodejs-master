import { IContact } from '@/interfaces/IContact';
import mongoose from 'mongoose';


const Contact = new mongoose.Schema({
  ProductID: {
    type: String,
    required: true,
  },
  Token: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Mobile: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  State:  {
    type: String,
    required: true,
  },
   
  City:  {
    type: String,
    required: true,
  },
   
  ZipCode:  {
    type: String,
    required: true,
  },
  Address:  {
    type: String,
    required: true,
  },
  });
export default mongoose.model<IContact & mongoose.Document>('Contact', Contact);
