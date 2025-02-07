import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

interface Player {
    id: string;
    name: string;
    vote: number | null;
}

interface GameState {
    players: { [key: string]: Player };
    showVotes: boolean;
    taskName: string;
}

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const gameState: GameState = {
    players: {},
    showVotes: false,
    taskName: "Implement User Authentication"
};

const handlePlayerJoin = (socket: Socket, playerName: string) => {
    gameState.players[socket.id] = {
        id: socket.id,
        name: playerName,
        vote: null
    };
    io.emit('gameStateUpdate', gameState);
};

const handlePlayerVote = (socket: Socket, vote: number) => {
    if (gameState.players[socket.id]) {
        gameState.players[socket.id].vote = vote;
        io.emit('gameStateUpdate', gameState);
    }
};

const handleShowVotes = () => {
    gameState.showVotes = true;
    io.emit('gameStateUpdate', gameState);
};

const handleResetVotes = () => {
    gameState.showVotes = false;
    Object.keys(gameState.players).forEach(playerId => {
        gameState.players[playerId].vote = null;
    });
    io.emit('gameStateUpdate', gameState);
};

const handleDisconnect = (socket: Socket) => {
    delete gameState.players[socket.id];
    io.emit('gameStateUpdate', gameState);
};

io.on('connection', (socket: Socket) => {
    console.log('Client connected:', socket.id);

    socket.on('playerJoin', (playerName: string) => handlePlayerJoin(socket, playerName));
    socket.on('vote', (vote: number) => handlePlayerVote(socket, vote));
    socket.on('showVotes', () => handleShowVotes());
    socket.on('resetVotes', () => handleResetVotes());
    socket.on('disconnect', () => handleDisconnect(socket));
});

const PORT = process.env.PORT || 59617;
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});