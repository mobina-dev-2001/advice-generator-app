import { useState, useEffect } from "react";
import Skeleton from "./components/Skeleton";
import dividerPatternDesktop from "./assets/images/pattern-divider-desktop.svg";
import dividerPatternMobile from "./assets/images/pattern-divider-mobile.svg";
import diceIcon from "./assets/images/icon-dice.svg";

export default function App() {
  const [adviceData, setAdviceData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAdvice = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      const data = await response.json();
      setAdviceData(data.slip);
    } catch (error) {
      console.error("Failed to fetch advice:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {loading ? "Loading new advice" : "Advice loaded"}
      </div>
      <h1 className="advice-id">Advice #{loading ? "--" : adviceData?.id}</h1>

      <blockquote className="advice-text">
        {loading ? (
          <>
            <Skeleton width="95%" />
            <Skeleton width="95%" />
          </>
        ) : (
          <q>{adviceData?.advice}</q>
        )}
      </blockquote>

      <picture className="divider" aria-hidden="true">
        <source srcSet={dividerPatternMobile} media="(max-width: 376px)" />
        <img src={dividerPatternDesktop} alt="" />
      </picture>

      <button
        className="random-advice-button"
        onClick={fetchAdvice}
        disabled={loading}
        aria-label={loading ? "Loading new advice" : "Get new advice"}
        aria-busy={loading}
      >
        <img src={diceIcon} alt="" aria-hidden="true" />
      </button>
    </>
  );
}
