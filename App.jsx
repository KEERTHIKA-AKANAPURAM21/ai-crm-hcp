import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    hcp_name: "",
    interaction_type: "Meeting",
    date: "",
    time: "",
    attendees: "",
    topics_discussed: "",
    materials_shared: "",
    summary: "",
    sentiment: ""
  });

  const [chatInput, setChatInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAI = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/interactions/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: chatInput })
      });
      const data = await res.json();

      setForm({
        hcp_name: data.hcp_name || "",
        interaction_type: data.interaction_type || "Meeting",
        date: data.date || "",
        time: data.time || "",
        attendees: data.attendees || "",
        topics_discussed: data.topics_discussed || "",
        materials_shared: data.materials_shared || "",
        summary: data.summary || "",
        sentiment: data.sentiment || ""
      });
    } catch (err) {
      console.error("AI request failed", err);
      alert("AI request failed. Check backend.");
    }
    setLoading(false);
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    marginBottom: 16,
    borderRadius: 6,
    border: "1px solid #d1d5db",
    fontSize: 14,
    outline: "none"
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: 110,
    resize: "vertical"
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "Inter, Arial, sans-serif",
        background: "#f8fafc"
      }}
    >
      {/* LEFT FORM */}
      <div
        style={{
          width: "55%",
          padding: "32px 40px",
          background: "#ffffff"
        }}
      >
        <h2 style={{ marginBottom: 20 }}>Log HCP Interaction</h2>

        <input
          style={inputStyle}
          placeholder="HCP Name"
          value={form.hcp_name}
          onChange={(e) => setForm({ ...form, hcp_name: e.target.value })}
        />

        <select
          style={inputStyle}
          value={form.interaction_type}
          onChange={(e) =>
            setForm({ ...form, interaction_type: e.target.value })
          }
        >
          <option>Meeting</option>
          <option>Call</option>
          <option>Email</option>
        </select>

        <div style={{ display: "flex", gap: 10 }}>
          <input
            type="date"
            style={inputStyle}
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <input
            type="time"
            style={inputStyle}
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
          />
        </div>

        <textarea
          style={textareaStyle}
          placeholder="Attendees"
          value={form.attendees}
          onChange={(e) => setForm({ ...form, attendees: e.target.value })}
        />

        <textarea
          style={textareaStyle}
          placeholder="Topics Discussed"
          value={form.topics_discussed}
          onChange={(e) =>
            setForm({ ...form, topics_discussed: e.target.value })
          }
        />

        <textarea
          style={textareaStyle}
          placeholder="Materials Shared"
          value={form.materials_shared}
          onChange={(e) =>
            setForm({ ...form, materials_shared: e.target.value })
          }
        />
      </div>

      {/* RIGHT AI PANEL */}
      <div
        style={{
          width: "45%",
          padding: "28px 32px",
          borderLeft: "1px solid #e5e7eb",
          background: "#ffffff"
        }}
      >
        <h3
          style={{
            marginBottom: 16,
            fontSize: 16,
            fontWeight: 600
          }}
        >
          🤖 AI Assistant
        </h3>

        <textarea
          style={{ ...textareaStyle, minHeight: 120 }}
          placeholder="Describe the interaction..."
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
        />

        <button
          onClick={handleAI}
          disabled={loading}
          style={{
            width: "100%",
            padding: 10,
            marginTop: 10,
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer"
          }}
        >
          {loading ? "Processing..." : "AI Log"}
        </button>

        <div
          style={{
            background: "#f1f5ff",
            padding: 16,
            marginTop: 20,
            borderRadius: 8,
            fontSize: 14
          }}
        >
          <strong>Summary</strong>
          <p>{form.summary}</p>
          <strong>Sentiment:</strong> {form.sentiment}
        </div>
      </div>
    </div>
  );
}

export default App;
