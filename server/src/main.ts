import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import RouterInjector from '@/presentation';
import { UseCases } from '@/presentation';

const app = express();
const port = 3000;

const dataSources = RouterInjector.initDataSources();
const repositories = RouterInjector.initRepositories(dataSources);
const useCases = RouterInjector.initUseCases(repositories);

const router = RouterInjector.inject(useCases);

const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.json());

// Utilisation des routes injectées
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello World from TypeScript back-end!');
});

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
