var io = require('socket.io');

exports.initialize = function(server) {
    io = io.listen(server);
    io.on('connection', function(socket) {
        socket.emit('news', {hello: 'world', soId: socket.id});

        socket.on('my other event', function (data) {
            console.log(data);
        });

        socket.on('get owner id', function () {
            console.log('get owner id');
            socket.emit('owner id', {ownerId: socket.id});
        });

        socket.on('visitor join', function (data) {
            console.log('visitor join', data);
            socket.join(data.room);
            io.of('/').in(data.room).clients(function (error, clients) {
                if (error) throw error;
                console.log(clients);
                io.to(data.room).emit('visitor joined', {room: data.room, clients: clients});
            });

        });

        socket.on('go', function () {
            io.of('/').in(socket.id).clients(function (error, clients) {
                if (error) throw error;
                console.log(socket.id);
                console.log('go ' + clients);

                for (var i = 0; i < clients.length; i++) {
                    var c = clients[i];
                    if (socket.id == c) {
                        continue;
                    }
                    console.log('go for ', c);
                    //io.sockets.connected[c].emit('msg', i);
                    io.to(c).emit('msg', i * 5);
                }
            });
        })
    });
};