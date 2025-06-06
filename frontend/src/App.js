import React, { useState } from 'react';
import './App.css';

function App() {
  const [status, setStatus] = useState('');

  const sendEmail = async () => {
    try {
      const res = await fetch('http://localhost:3001/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idempotencyKey: Date.now().toString(),
          to: 'user@example.com',
          subject: 'From React',
          body: 'Hello from frontend'
        })
      });
      const data = await res.json();
      setStatus(data.status);
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="App">
      <h1>Email Service</h1>
      <button onClick={sendEmail}>Send Email</button>
      <p className={`status ${status === 'sent' ? 'success' : status === 'error' ? 'error' : ''}`}>
        Status: {status}
        {status === 'sent' && <span className="tick">✓</span>}
      </p>
    </div>
  );
}

export default App;
