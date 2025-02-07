import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

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

const FIBONACCI_SEQUENCE = [1, 2, 3, 5, 8, 13, 21];

const ScrumPokerPage = () => {
    const [socket, setSocket] = useState<any>(null);
    const [gameState, setGameState] = useState<GameState>({
        players: {},
        showVotes: false,
        taskName: "Implement User Authentication"
    });
    const [playerName, setPlayerName] = useState<string>("");
    const [isJoined, setIsJoined] = useState(false);
    const [selectedValue, setSelectedValue] = useState<number | null>(null);

    useEffect(() => {
        const newSocket = io('http://localhost:59617');
        
        newSocket.on('gameStateUpdate', (newGameState: GameState) => {
            setGameState(newGameState);
        });

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    const handleJoinGame = () => {
        if (socket && playerName.trim()) {
            socket.emit('playerJoin', playerName);
            setIsJoined(true);
        }
    };

    const handleVote = (value: number) => {
        if (socket) {
            socket.emit('vote', value);
            setSelectedValue(value);
        }
    };

    const handleSubmitVotes = () => {
        if (socket) {
            socket.emit('showVotes');
        }
    };

    const handleResetVotes = () => {
        if (socket) {
            socket.emit('resetVotes');
            setSelectedValue(null);
        }
    };

    if (!isJoined) {
        return (
            <div style={{ 
                fontFamily: 'Arial, sans-serif',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px'
            }}>
                <h2>Join Scrum Poker</h2>
                <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Enter your name"
                    style={{
                        padding: '8px',
                        fontSize: '16px',
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                    }}
                />
                <button
                    onClick={handleJoinGame}
                    disabled={!playerName.trim()}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: playerName.trim() ? '#007bff' : '#ccc',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: playerName.trim() ? 'pointer' : 'not-allowed'
                    }}
                >
                    Join Game
                </button>
            </div>
        );
    }

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            <div style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '10px',
                textAlign: 'center',
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '20px'
            }}>
                {gameState.taskName}
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                gap: '10px',
                marginBottom: '20px'
            }}>
                {Object.values(gameState.players).map((player) => (
                    <div
                        key={player.id}
                        style={{
                            border: '1px solid #ccc',
                            padding: '10px',
                            textAlign: 'center',
                            backgroundColor: player.vote !== null ? '#e9ecef' : 'white',
                        }}
                    >
                        {player.name}: {gameState.showVotes ? (player.vote ?? '?') : (player.vote !== null ? '✓' : '?')}
                    </div>
                ))}
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
                gap: '10px',
                marginBottom: '20px'
            }}>
                {FIBONACCI_SEQUENCE.map((value) => (
                    <button
                        key={value}
                        onClick={() => handleVote(value)}
                        style={{
                            padding: '20px',
                            fontSize: '18px',
                            border: selectedValue === value ? '2px solid #007bff' : '1px solid #ccc',
                            backgroundColor: selectedValue === value ? '#e7f1ff' : 'white',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        {value}
                    </button>
                ))}
            </div>

            <div style={{ textAlign: 'center' }}>
                <button
                    onClick={handleSubmitVotes}
                    style={{
                        marginRight: '10px',
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Submit Votes
                </button>
                <button
                    onClick={handleResetVotes}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Reset Votes
                </button>
            </div>
        </div>
    );
};

export default ScrumPokerPage;