import express from 'express';
import logger from "#config/logger.js";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//helps express apps with various http headers
app.use(helmet());
// Lets your backend decide which services can access it
app.use(cors())
//parse incoming payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// read cookies from incoming requests
app.use(cookieParser())

// Logging middleware to monitor all the info about the traffic
app.use(morgan("combined", {stream: {write:(message) => logger.info(message.trim())}}));

app.get('/', (req, res) => {
  logger.info('Hello from Acquisitions');
  res.status(200).send('Hello from Acquisitions');
});

export default app;
