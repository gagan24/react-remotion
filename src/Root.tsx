// import MyComposition from "./Composition";
// export const RemotionRoot: React.FC = () => {
//   return (
//     <>
//       <Composition
//         id="MyComp"
//         component={MyComposition}
//         durationInFrames={120}
//         fps={30}
//         width={1280}
//         height={720}
//       />
//     </>
//   );
// };

import { Composition } from "remotion";

import React, { useState } from "react";
import VideoPlayer from "./components/VideoPlayer";
import { TextOverlay, OverlayInput } from "./components/TextOverlay";
import AnimatedText from "./components/AnimatedText";
// import exportVideo from './utils/exportVideo';
import "./styles/styles.css";
import SubList from "./components/SubList";

interface Overlay {
  text: string;
  timestamp: number;
  font: string;
  animation: string;
  top: string;
  left: string;
}

const App: React.FC = () => {
  const [overlays, setOverlays] = useState<Overlay[]>([]);
  const [animation, setAnimation] = useState({
    opacity: 1,
    transition: { duration: 1 },
  });

  const addOverlay = (overlay: Overlay) => {
    setOverlays([...overlays, overlay]);
  };

  const handleSubRemove = (index: number) => {
    const newSubs = overlays.filter((el, ind) => ind !== index);
    setOverlays([...newSubs]);
  };

  // const handleExport = () => {
  //   exportVideo(
  //     <YourVideoComponent
  //       overlays={overlays}
  //       animation={animation}
  //     />
  //   );
  // };

  console.log("Root", overlays);

  return (
    <div
      style={{
        display: "flex",
        gap: 4,
        backgroundColor: "black",
        width: "100%",
      }}
    >
      <VideoPlayer overlays={overlays} />
      <div>
        <OverlayInput addOverlay={addOverlay} />
        <SubList overlays={overlays} handleSubRemove={handleSubRemove} />
      </div>
      {/* <TextOverlay overlays={overlays} /> */}
      {/* <button onClick={handleExport}>Export Video</button> */}
    </div>
  );
};

// export const RemotionRoot: React.FC = () => {
//   return (
//     <>
//       <Composition
//         id="MyComp"
//         component={App}
//         durationInFrames={120}
//         fps={30}
//         width={1600}
//         height={680}
//       />
//     </>
//   );
// };

export default App;
