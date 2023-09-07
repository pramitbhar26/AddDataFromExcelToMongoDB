import { Schema, model } from 'mongoose';

const candidateSchema = new Schema({
  Name: {
    type:String
},
  Email: { type: String, unique: true },
  Mobile:{
    type: String
},
  DOB: {
    type:String
},
  Work_Experience:{
    type: String},
  Resume_Title: {type: String},
  Current_Location: {type: String},
  Postal_Address: {type:String},
  Current_Employer: {type:String},
  Current_Designation: {type:String}
});

export default model('candidate', candidateSchema);
