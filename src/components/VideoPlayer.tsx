import React, { useEffect, useRef, useState } from "react";
import { Player } from "@remotion/player";
import {
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { MyComposition } from "../Composition";

interface Overlay {
  text: string;
  timestamp: any;
  font: string;
  animation: string;
  top: string;
  left: string;
}

interface TimeStamp {
  start: number;
  end: number;
}

interface SubTitleProps {
  timeStamp: TimeStamp;
  text?: string;
  font: string;
  animation: string;
}

interface VideoPlayerProps {
  overlays: Overlay[];
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ overlays }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const playerRef = useRef<any>(null);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };
  console.log(overlays);
  useEffect(() => {
    const { current } = playerRef;
    if (!current) return;
    if (isPlaying) {
      current.pause();
    } else {
      current.play();
    }
  }, [isPlaying]);

  const Title = () => (
    <h1
      style={{
        position: "absolute",
        top: "10%",
        width: "100%",
        textAlign: "center",
      }}
    >
      This is title
    </h1>
  );
  const SubTitle: React.FC<SubTitleProps> = ({
    timeStamp,
    font,
    text = "",
    animation = "fade-in",
  }) => {
    const { fps } = useVideoConfig();
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [0, fps], [0, 1]);
    if (!timeStamp?.start && !timeStamp?.end) return <></>;

    const animationStyles = {
      "fade-in": {
        opacity: interpolate(frame, [0, fps], [0, 1]),
        transition: "opacity 1s ease-in-out",
      },
      "slide-in": {
        transform: `translateX(${interpolate(frame, [0, fps], [-10, 2])}%)`,
        opacity: interpolate(frame, [0, fps], [0, 1]),
        transition: "transform 1s ease-in-out, opacity 1s ease-in-out",
      },
    };
    return (
      <Sequence
        from={fps * timeStamp.start}
        durationInFrames={fps * (timeStamp.end - timeStamp.start)}
      >
        <h3
          style={{
            position: "absolute",
            bottom: "10%",
            width: "100%",
            textAlign: "center",
            fontFamily: font,
            ...animationStyles[animation],
          }}
        >
          {text}
        </h3>
      </Sequence>
    );
  };

  const Main = () => {
    const { fps, durationInFrames } = useVideoConfig();
    return (
      <div
        style={{
          flexGrow: 1,
          backgroundColor: "#ccc",
        }}
      >
        <Sequence durationInFrames={durationInFrames}>
          <Title />
        </Sequence>
        {overlays.map((overlay, index) => (
          <SubTitle
            key={index}
            timeStamp={overlay.timestamp}
            text={overlay.text}
            font={overlay.font}
            animation={overlay.animation}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <Player
        ref={playerRef}
        controls
        loop
        component={Main}
        compositionWidth={1200}
        compositionHeight={600}
        durationInFrames={30 * 10}
        fps={30}
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button onClick={togglePlayback}>{isPlaying ? "Play" : "Pause"}</button>
      </div>
    </div>
  );
};

export default VideoPlayer;
