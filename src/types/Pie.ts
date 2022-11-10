import { Types } from 'mongoose';
import Activity from './Activity';

type Pie = {
  _id: Types.ObjectId;
  createdAt: Date;
  activities: Activity[];
};

export default Pie;
