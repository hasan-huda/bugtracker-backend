const dotenv = require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
app.use(express.json(), cors());

const connectDB = require("./config/connectDB");

const userRouter = require("./routes/user.routes");
app.use("/api/users", userRouter);

const projectRouter = require("./routes/project.routes");
app.use("/api/projects", projectRouter);

const ticketRouter = require("./routes/ticket.routes");
app.use("/api/tickets", ticketRouter);

const PORT = process.env.PORT || 5001;


const startServer = async () => {
  try{
    await connectDB();
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch(error) {
    console.log(error);
  }
};
startServer();
// mongodb+srv://hasan123:<password>@cluster0.l1f6f2w.mongodb.net/?retryWrites=true&w=majority
