require('dotenv').config({ debug: true });

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const debugModule = require('debug');

const { MessageClient, UserClient } = require('./redis');
const actionTypes = require('../state/actionTypes');

const app = express();
/* eslint-disable new-cap */
const server = require('http').Server(app);
const io = require('socket.io')(server);

const buildDir = path.resolve('build');

app.use(express.static(buildDir));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(buildDir, '../index.html'));
});

const ACTION = 'action';

const userClient = new UserClient();
const messageClient = new MessageClient();

(async () => {

  try {
  
    const users = {}; // TODO how to clean up????
    const messages = await messageClient.list();

    io.on('connection', async socket => {
      const debug = debugModule('presence:user');

      debug(`a user connected ${socket.id}`);

      socket.emit(ACTION, {
        type: actionTypes.UPDATE_USERS,
        data: { users }
      });
      socket.emit(ACTION, {
        type: actionTypes.UPDATE_MESSAGES,
        data: { messages: await messageClient.list() }
      });

      socket.on(ACTION, async ({ type, data }) => {
        switch (type) {
          case actionTypes.IDENTIFY:
            const { username, cursor } = data;
            
            const user = {
              id: socket.id,
              username: username,
              cursor: cursor,
              position: null,
            };
            userClient.add(user)
            users[socket.id] = users;

            debug(`user ${socket.id} set username to "${username}" and cursor to "${cursor}"`);

            io.emit(ACTION, { 
              type: actionTypes.UPDATE_USERS, 
              data: { users } 
            });
            break;

          case actionTypes.SET_POSITION:
            if (!users[socket.id]) return;

            const { x, y } = data;
            users[socket.id].position = { x, y };

            io.emit(ACTION, {
              type: actionTypes.UPDATE_USERS,
              data: { users }
            });
            break;

          case actionTypes.SEND_MESSAGE:
            if (!users[socket.id]) return;
            
            await messageClient.push({
              user: socket.id,
              username: users[socket.id].username,
              body: data.message,
              sentAt: Math.floor(new Date() / 1000),
            });

            debug(`${users[socket.id].username} said: "${data.message}"`);

            io.emit(ACTION, {
              type: actionTypes.UPDATE_MESSAGES,
              data: { messages: await messageClient.list() }
            });
            break;
          case actionTypes.CLEAR_IDENTITY:
            if (!users[socket.id]) return;

            delete users[socket.id];

            debug(`user ${socket.id} cleared identity`);

            io.emit(ACTION, {
              type: actionTypes.UPDATE_USERS,
              data: { users }
            });
            break;
          default:
            break;
        }
      });

      socket.on('disconnect', () => {
        delete users[socket.id];

        debug(`user ${socket.id} disconnected`);

        io.emit(ACTION, {
          type: actionTypes.UPDATE_USERS,
          data: { users }
        });
      });
    });

  } catch (e) {
    console.error(e);
    process.exit();
  }

})();

server.listen(process.env.PORT, () => {
  const debug = debugModule('presence:server');
  debug(`http://localhost:${process.env.PORT}/`);
});

