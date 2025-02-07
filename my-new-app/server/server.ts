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
    voteAverage: number | null;
}

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const calculateVoteAverage = (players: { [key: string]: Player }): number | null => {
    const votes = Object.values(players)
        .map(player => player.vote)
        .filter((vote): vote is number => vote !== null);

    if (votes.length === 0) return null;
    return Math.round((votes.reduce((sum, vote) => sum + vote, 0) / votes.length) * 10) / 10;
};

const gameState: GameState = {
    players: {},
    showVotes: false,
    taskName: "Implement User Authentication",
    voteAverage: null
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
        gameState.voteAverage = calculateVoteAverage(gameState.players);
        io.emit('gameStateUpdate', gameState);
    }
};

const handleShowVotes = () => {
    gameState.showVotes = true;
    gameState.voteAverage = calculateVoteAverage(gameState.players);
    io.emit('gameStateUpdate', gameState);
};

const handleResetVotes = () => {
    gameState.showVotes = false;
    gameState.voteAverage = null;
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