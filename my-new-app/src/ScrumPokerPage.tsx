import React, { useState } from 'react';

interface Player {
  name: string;
  vote: number | null;
}

const FIBONACCI_SEQUENCE = [1, 2, 3, 5, 8, 13, 21];

const ScrumPokerPage = () => {
  const [players, setPlayers] = useState<Player[]>([
    { name: 'John', vote: null },
    { name: 'Jane', vote: null },
    { name: 'Alex', vote: null },
    { name: 'Mike', vote: null },
    { name: 'Sarah', vote: null },
    { name: 'Chris', vote: null },
  ]);

  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [showVotes, setShowVotes] = useState(false);

  const handleVote = (value: number) => {
    setSelectedValue(value);
    // In a real app, you would update the current user's vote
    // For demo, we'll update John's vote
    setPlayers(players.map(player =>
      player.name === 'John' ? { ...player, vote: value } : player
    ));
  };

  const handleSubmitVotes = () => {
    setShowVotes(true);
  };

  const handleResetVotes = () => {
    setPlayers(players.map(player => ({ ...player, vote: null })));
    setSelectedValue(null);
    setShowVotes(false);
  };

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
        Task: Implement User Authentication
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
        gap: '10px',
        marginBottom: '20px'
      }}>
        {players.map((player, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              textAlign: 'center',
              backgroundColor: player.vote !== null ? '#e9ecef' : 'white',
            }}
          >
            {player.name}: {showVotes ? (player.vote ?? '?') : (player.vote !== null ? '✓' : '?')}
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