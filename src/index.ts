import http from 'http';
import { app } from './app';

const PORT = process.env.PORT || 4251;

const server = http.createServer(app);

server.on('error', () => {});

server.on('listening', () => {
  console.log(
    'Server listening in http://localhost: ' +
      PORT +
      '\n Have a nice experience'
  );
});

server.listen(PORT);
