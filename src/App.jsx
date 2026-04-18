import { useState } from "react";
import "./App.css";

function App() {
  const [digits, setDigits] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    // Remove the custom transparent image to allow the browser's default free-moving ghost
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = (e) => {
    // Optional: Only clear if leaving the entire grid
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newDigits = [...digits];
    const [draggedItem] = newDigits.splice(draggedIndex, 1);
    newDigits.splice(targetIndex, 0, draggedItem);

    setDigits(newDigits);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="container" onDragOver={(e) => e.preventDefault()}>
      <div className="card">
        <h1>Drag & Drop Digits</h1>
        <p className="subtitle">Drag the boxes to reorder the digits 0–9.</p>

        <div className="digits-grid" onDragOver={(e) => e.preventDefault()}>
          {digits.map((digit, index) => (
            <div
              key={`${digit}-${index}`}
              id={`box-${digit}`}
              className={`digit-box ${draggedIndex === index ? "dragging" : ""} ${dragOverIndex === index ? "drag-over" : ""}`}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
            >
              {dragOverIndex === index && draggedIndex !== null ? (
                <span className="original-digit-faded">{digit}</span>
              ) : (
                <span>{digit}</span>
              )}
            </div>
          ))}
        </div>

        <div className="card-footer">
          <span>Tip: Try reordering to make</span>
          <code className="tip-code">0123456789</code>
          <span>or reverse it!</span>
        </div>
      </div>
    </div>
  );
}

export default App;
