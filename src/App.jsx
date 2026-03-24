import { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message) return;

    const userMsg = { role: "user", text: message };
    setChat((prev) => [...prev, userMsg]);

    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/chat`,
        { message }
      );

      const botMsg = { role: "bot", text: res.data.reply };
      setChat((prev) => [...prev, botMsg]);

    } catch (error) {
      setChat((prev) => [
        ...prev,
        { role: "bot", text: "Error: server not responding" }
      ]);
    }

    setMessage("");
    setLoading(false);
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h1>Ask Anything...</h1>

      <div style={{ minHeight: 300 }}>
        {chat.map((msg, i) => (
          <p key={i}>
            <b>{msg.role}:</b> {msg.text}
          </p>
        ))}
        {loading && <p><i>Ai is typing...</i></p>}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        style={{ width: "80%", padding: 10, border: '2px solid green', borderRadius: '8px', color: '#cccccc' }}
      />

<button 
  onClick={sendMessage} 
  style={{
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: 'bold',
    fontFamily: '"Orbitron", "Courier New", monospace',
    color: '#00FFFF',
    background: 'linear-gradient(45deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
    border: '2px solid',
    borderImage: 'linear-gradient(45deg, #00FFFF, #FF00FF, #00FF00, #00FFFF) 1',
    borderRadius: '8px',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    textShadow: '0 0 10px #00FFFF',
    boxShadow: `
      0 0 20px rgba(0, 255, 255, 0.3),
      inset 0 0 20px rgba(0, 255, 255, 0.1)
    `,
    transition: 'all 0.3s ease',
  }}
  onMouseEnter={(e) => {
    e.target.style.boxShadow = `
      0 0 30px rgba(0, 255, 255, 0.6),
      0 0 40px rgba(255, 0, 255, 0.4),
      inset 0 0 30px rgba(0, 255, 255, 0.2)
    `;
    e.target.style.transform = 'translateY(-2px) scale(1.05)';
    e.target.style.textShadow = '0 0 20px #00FFFF, 0 0 30px #FF00FF';
  }}
  onMouseLeave={(e) => {
    e.target.style.boxShadow = `
      0 0 20px rgba(0, 255, 255, 0.3),
      inset 0 0 20px rgba(0, 255, 255, 0.1)
    `;
    e.target.style.transform = 'translateY(0) scale(1)';
    e.target.style.textShadow = '0 0 10px #00FFFF';
  }}
>
  <span style={{
    position: 'relative',
    zIndex: 2,
  }}>
    Ask
  </span>
</button>
    </div>
  );
}

export default App;