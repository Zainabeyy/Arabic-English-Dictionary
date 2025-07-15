"use client";

import React, { useEffect, useRef } from "react";

export default function RiveBird() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const loadRive = async () => {
      const riveModule = await import("@rive-app/canvas"); // Dynamically import
      const bird = new riveModule.Rive({
        src: "/bird.riv",
        canvas: canvasRef.current!,
        autoplay: true,
        artboard: "Artboard",
        stateMachines: ["State Machine 1"],
        onLoad: () => {
          bird.resizeDrawingSurfaceToCanvas();

          const inputs = bird.stateMachineInputs("State Machine 1");
          const xInput = inputs.find((input) => input.name === "cursorX");
          const yInput = inputs.find((input) => input.name === "cursorY");

          const maxWidth = window.innerWidth;
          const maxHeight = window.innerHeight;

          window.addEventListener("mousemove", function (e) {
            if (xInput && yInput) {
              xInput.value = (e.clientX / maxWidth) * 100;
              yInput.value = 100 - (e.clientY / maxHeight) * 100;
            }
          });
        },
      });
    };

    loadRive();
  }, []);

  return <canvas id="bird" ref={canvasRef} width={500} height={500} />;
}
