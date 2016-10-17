import Hapi from 'hapi';

const server = new Hapi.Server();
server.connection({
  port: 4000,
});

server.route({
  method: 'GET',
  path: '/',
  handler(request, reply) {
    return reply('Blood API');
  },
});

server.start(err => {
  if (err) {
    throw err;
  }

  console.log('Server running at:', server.info.uri);
});
