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
        style={{ width: "80%", padding: 10 }}
      />

      <button onClick={sendMessage} style={{ padding: 10 }}>
        Send
      </button>
    </div>
  );
}

export default App;