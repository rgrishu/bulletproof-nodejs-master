import { IDbMessage } from '@/interfaces/IResponse';
import mongoose from 'mongoose';
const DBMessage = new mongoose.Schema({
  Code: {
    type: String,
    required: true,
  },

  Message: {
    type: String,
    required: true,
  },
  });
export default mongoose.model<IDbMessage & mongoose.Document>('DBMessage', DBMessage);
