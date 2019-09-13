const express = require('express');

const ProjectRouter = require('./projects/projectRouter.js');
const ResourceRouter = require('./resources/resourceRouter.js');
// const TaskRouter = require('./tasks/taskRouter.js');
// const ContextRouter = require('./contexts/contextRouter.js');


const server = express();

server.use(express.json());
server.use('/api/projects', ProjectRouter);
server.use('/api/resources', ResourceRouter);
// server.use('/api/tasks', TaskRouter);
// server.use('/api/contexts', ContextRouter);


module.exports = server;