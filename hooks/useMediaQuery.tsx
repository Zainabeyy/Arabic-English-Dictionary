import { useEffect, useState } from "react";

export default function useIsMediumScreen() {
  const [isMedium, setIsMedium] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsMedium(window.innerWidth >= 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return isMedium;
}