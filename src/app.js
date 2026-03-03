import express from 'express';
import logger from '#config/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from '#routes/auth.routes.js';
import securityMiddleware from '#middleware/security.middleware.js';
import usersRoutes from '#routes/users.routes.js';

const app = express();

//helps express apps with various http headers
app.use(helmet());
// Lets your backend decide which services can access it
app.use(cors());
//parse incoming payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// read cookies from incoming requests
app.use(cookieParser());

// Logging middleware to monitor all the info about the traffic
app.use(
  morgan('combined', {
    stream: { write: message => logger.info(message.trim()) },
  })
);
//app.use(securityMiddleware)

app.get('/', (req, res) => {
  logger.info('Hello from Acquisitions');
  res.status(200).send('Hello from Acquisitions');
});

app.get('/health', (req, res) => {
  res
    .status(200)
    .json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
});

app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Acquisition API is running!' });
});

// When they access the path, they will go to the route
app.use('/api/auth', authRoutes); // api/auth/sign-in
app.use('/api/users', usersRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;
