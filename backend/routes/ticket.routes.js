const express = require("express");
const ticketRouter = express.Router();
const {
  createTicket,
  findAllTickets,
  findOneTicket,
  updateTicket,
  deleteTicket
} = require("../controllers/ticket.controller");


ticketRouter
  .route('/')
  .get(findAllTickets)
  .post(createTicket)

ticketRouter
  .route('/:id')
  .get(findOneTicket)
  .put(updateTicket)
  .delete(deleteTicket);

module.exports = ticketRouter;