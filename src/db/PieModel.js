import { Document, model, Schema, Model, Types } from "mongoose";

// type Activity = {
//   name: string;
//   hours: number;
// };

// interface ActivityInterface extends Document {
//   name: string;
//   hours: number;
// }

// export interface PieInterface extends Document {
//   _id: Types.ObjectId;
//   userId: Types.ObjectId;
//   createdAt: Date;
//   activities: Array<Activity>;
// }

const ActivitiesSchema = new Schema(
  {
    name: {
      type: String,
    },
    hours: {
      type: Number,
    },
  },
  { _id: false }
);

const PiesSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
  },
  activities: [ActivitiesSchema],
});

const Pies = model("pies", PiesSchema);
export default Pies;
