import { Document, model, Schema, Model, Types, models } from 'mongoose';

type Activity = {
  activity: string;
  units: number;
};

interface ActivityInterface extends Document {
  activity: string;
  units: number;
}

export interface PieInterface extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  createdAt: Date;
  activities: Array<Activity>;
}

const ActivitiesSchema = new Schema<ActivityInterface>(
  {
    activity: {
      type: String,
    },
    units: {
      type: Number,
    },
  },
  { _id: false },
);

const PiesSchema = new Schema<PieInterface>({
  userId: {
    type: Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
  },
  activities: [ActivitiesSchema],
});

const Pies: Model<PieInterface> = models?.pies || model('pies', PiesSchema);
export default Pies;
