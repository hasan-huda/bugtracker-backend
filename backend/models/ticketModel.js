const mongoose = require('mongoose');
const User = require('./userModel');
const Project = require('./projectModel');

const ticketSchema = new mongoose.Schema({
  title : {
    type : String,
    required: [true,"Ticket title is required"]
  },
  description : {
    type : String,
    required: [true,"Ticket description is required"]
  },
  submitter : {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  developer : {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status : {
    type : String,
    required : [true,"status of ticket is required"]
  },
  priority : {
    type : String,
    required : [true, "priority of ticket is required"]
  },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
},{timestamps:true})

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;