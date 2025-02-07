import React from 'react';

const ScrumPokerPage = () => {
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
        <div style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>John: 5</div>
        <div style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>Jane: 3</div>
        <div style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>Alex: ?</div>
        <div style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>Mike: 8</div>
        <div style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>Sarah: 5</div>
        <div style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>Chris: 2</div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button style={{ marginRight: '10px', padding: '10px 20px', fontSize: '16px' }}>Submit Votes</button>
        <button style={{ padding: '10px 20px', fontSize: '16px' }}>Reset Votes</button>
      </div>
    </div>
  );
};

export default ScrumPokerPage;