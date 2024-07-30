import React from "react";

interface Overlay {
  text: string;
  timestamp: any;
  font: string;
  animation: string;
  top: string;
  left: string;
}

interface SubListProps {
  overlays: Overlay[];
  handleSubRemove: (index: number) => void;
}

const SubList: React.FC<SubListProps> = ({
  overlays = [],
  handleSubRemove,
}) => {
  console.log("SubList", overlays);
  return (
    <div className="sub-list-container">
      <h2>Subtitles List</h2>
      <ul className="sub-list">
        {overlays.length ? (
          overlays.map((el, index) => (
            <li key={index} className="sub-list-item">
              <span className="timestamp">
                {el.timestamp.start} - {el.timestamp.end} sec
              </span>
              <span className="text">{el.text}</span>
              <button onClick={() => handleSubRemove(index)}>-</button>
            </li>
          ))
        ) : (
          <p className="sub-list-item">No subs added</p>
        )}
      </ul>
    </div>
  );
};

export default SubList;
