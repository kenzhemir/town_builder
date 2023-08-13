import { useEffect, useState } from "react";

export default function MouseFollower({ boundsRef, children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const eventHandler = ({ clientX, clientY }) => {
      setPosition({ x: clientX, y: clientY });
      setStarted(true);
    };

    window.addEventListener("mousemove", eventHandler);
    return () => {
      window.removeEventListener("mousemove", eventHandler);
    };
  }, [children]);

  const boundRect = boundsRef?.current?.getBoundingClientRect() ?? document.body.getBoundingClientRect();
  if (
    boundRect &&
    boundRect.left < position.x &&
    boundRect.right > position.x &&
    boundRect.top < position.y &&
    boundRect.bottom > position.y
  ) {
    return (
      <div
        style={{
          display: children != null && started ? "block" : "none",
          top: position.y,
          left: position.x,
        }}
        className="mouse-follower"
      >
        {children}
      </div>
    );
  } else {
    return <></>;
  }
}
