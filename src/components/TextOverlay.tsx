import React, { useState } from "react";

interface Overlay {
  text: string;
  timestamp: any;
  font: string;
  animation: string;
  top: string;
  left: string;
}

interface TextOverlayProps {
  overlays: Overlay[];
}

const TextOverlay: React.FC<TextOverlayProps> = ({ overlays }) => {
  return (
    <div>
      {overlays.map((overlay, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: overlay.top,
            left: overlay.left,
            fontFamily: overlay.font,
          }}
        >
          <span>{overlay.text}</span>
        </div>
      ))}
    </div>
  );
};

interface OverlayInputProps {
  addOverlay: (overlay: Overlay) => void;
}

const OverlayInput: React.FC<OverlayInputProps> = ({ addOverlay }) => {
  const [text, setText] = useState<string>("");
  const [timestamp, setTimestamp] = useState<any>({ start: 0, end: 0 });
  const [font, setFont] = useState<string>("Arial");
  const [animation, setAnimation] = useState<string>("face-in");
  console.log("timestamp", timestamp);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) return;
    addOverlay({ text, timestamp, font, animation, top: "50%", left: "50%" });
    setText("");
    setTimestamp({
      start: 0,
      end: 0,
    });
    setAnimation("fade-in");
  };

  return (
    <form onSubmit={handleSubmit} className="overlay-form">
      <div className="form-group">
        <label htmlFor="text">Enter text:</label>
        <input
          type="text"
          id="text"
          value={text}
          placeholder="Enter text"
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="start-timestamp">
          Enter start timestamp (seconds):
        </label>
        <input
          type="number"
          id="start-timestamp"
          value={timestamp.start}
          placeholder="Enter start timestamp (seconds)"
          onChange={(e) =>
            setTimestamp((prev) => ({
              ...prev,
              start: Number(e.target.value),
            }))
          }
        />
      </div>
      <div className="form-group">
        <label htmlFor="end-timestamp">Enter end timestamp (seconds):</label>
        <input
          type="number"
          id="end-timestamp"
          value={timestamp.end}
          placeholder="Enter end timestamp (seconds)"
          onChange={(e) =>
            setTimestamp((prev) => ({
              ...prev,
              end: Number(e.target.value),
            }))
          }
        />
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <div className="form-group">
          <label htmlFor="animation">Animation:</label>
          <select
            id="animation"
            value={animation}
            onChange={(e) => setAnimation(e.target.value)}
          >
            <option value="fade-in">fade-in</option>
            <option value="slide-in">slide-in</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="font">font:</label>
          <select
            id="font"
            value={font}
            onChange={(e) => setFont(e.target.value)}
          >
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
          </select>
        </div>
      </div>

      <button type="submit" className="submit-button">
        Add Overlay
      </button>
    </form>
  );
};

export { TextOverlay, OverlayInput };
