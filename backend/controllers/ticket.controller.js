const Ticket = require("../models/ticketModel");

const createTicket = (req, res) => {
  Ticket.create(req.body)
    .then((ticket) => res.status(201).json(ticket))
    .catch((err) => res.status(400).json(err));
};

const findAllTickets = (req, res) => {
  Ticket.find()
    .then((tickets) => res.status(200).json(tickets))
    .catch((err) => res.status(400).json(err));
};

const findOneTicket = (req, res) => {
  const { id } = req.params;
  Ticket.findById(id)
    .then((ticket) => res.status(200).json(ticket))
    .catch((err) => res.status(400).json(err));
};

const updateTicket = (req, res) => {
  const { id } = req.params;
  Ticket.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then((ticket) => res.status(200).json(ticket))
    .catch((err) => res.status(400).json(err));
};

const deleteTicket = (req, res) => {
  const { id } = req.params;
  Ticket.findByIdAndDelete(id)
    .then((ticket) => res.status(200).json(ticket))
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  createTicket,
  findAllTickets,
  findOneTicket,
  updateTicket,
  deleteTicket,
};