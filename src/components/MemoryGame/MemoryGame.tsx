
import { useEffect, useRef, useState } from "react";
import "./MemoryGame.css";

// CHANGE THIS NUMBER whenever you beat your own record!
const ANITA_HIGH_SCORE = 12;

const STORAGE_KEY = "beat-the-developer-best";
const STARTING_DIGITS = 3;

type Phase = "ready" | "memorize" | "answer" | "lost" | "won";

function makeNumber(length: number): string {
  const digits = new Uint32Array(length);
  crypto.getRandomValues(digits);

  return Array.from(digits, (value, index) =>
    String(index === 0 ? (value % 9) + 1 : value % 10)
  ).join("");
}

export default function MemoryGame() {
  const [phase, setPhase] = useState<Phase>("ready");
  const [level, setLevel] = useState(STARTING_DIGITS);
  const [number, setNumber] = useState("");
  const [answer, setAnswer] = useState("");
  const [best, setBest] = useState(() => {
    try {
      return Number(localStorage.getItem(STORAGE_KEY)) || 0;
    } catch {
      return 0;
    }
  });
  const [countdown, setCountdown] = useState(0);
  const [lastScore, setLastScore] = useState(0);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearTimer() {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  useEffect(() => {
    return () => clearTimer();
  }, []);

  useEffect(() => {
    if (phase !== "memorize") return;

    if (countdown <= 0) {
      setPhase("answer");
      return;
    }

    timerRef.current = setTimeout(() => {
      setCountdown(value => value - 1);
    }, 1000);

    return () => clearTimer();
  }, [phase, countdown]);

  function startRound(digits: number) {
    clearTimer();
    setLevel(digits);
    setNumber(makeNumber(digits));
    setAnswer("");

    // Longer numbers get slightly more viewing time.
    setCountdown(Math.max(3, Math.ceil(digits * 0.65)));
    setPhase("memorize");
  }

  function saveBest(score: number) {
    if (score <= best) return;

    setBest(score);
    try {
      localStorage.setItem(STORAGE_KEY, String(score));
    } catch {
      // The game still works if browser storage is unavailable.
    }
  }

  function submitAnswer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (phase !== "answer") return;

    if (answer.trim() === number) {
      saveBest(level);

      if (level > ANITA_HIGH_SCORE) {
        setLastScore(level);
        setPhase("won");
      } else {
        startRound(level + 1);
      }
    } else {
      setLastScore(level - 1);
      setPhase("lost");
    }
  }

  function restart() {
    startRound(STARTING_DIGITS);
  }

  return (
    <main className="memory-page">
      <div className="memory-container">
        <div className="memory-heading">
          <span className="memory-eyebrow">A LITTLE CHALLENGE FROM ME TO YOU</span>
          <h1>Beat the Developer</h1>
          <p>
            I Love a friendly competition.
          </p>
        </div>

        <div className="memory-scores">
          <div className="memory-score">
            <span> ANITA'S RECORD</span>
            <strong>{ANITA_HIGH_SCORE}</strong>
            <small>digits</small>
          </div>

          <div className="memory-score">
            <span>YOUR BEST</span>
            <strong>{best}</strong>
            <small>digits</small>
          </div>
        </div>

        <section className="memory-game-card">
          <div className="memory-game-top">
            <span>LEVEL: {level} DIGITS</span>
            <span>
              {phase === "memorize"
                ? `⏱ ${countdown}s`
                : phase === "answer"
                ? "YOUR TURN"
                : "MEMORY CHALLENGE"}
            </span>
          </div>

          <div className="memory-game-content">
            {phase === "ready" && (
              <div className="memory-state">
                <div className="memory-emoji">🧠</div>
                <h2>Ready to challenge me?</h2>
                <p>
                  Remember each number before it disappears.
                  Reach {ANITA_HIGH_SCORE + 1} digits to win.
                </p>
                <button className="memory-button" onClick={restart}>
                  Let's Play!
                </button>
              </div>
            )}

            {phase === "memorize" && (
              <div className="memory-state">
                <p>Memorize this number!</p>
                <div className="memory-number">{number}</div>
                <div className="memory-progress">
                  <div
                    key={`${level}-${number}`}
                    style={{
                      animationDuration: `${Math.max(3, Math.ceil(level * 0.65))}s`
                    }}
                  />
                </div>
                <small>It will disappear automatically...</small>
              </div>
            )}

            {phase === "answer" && (
              <form className="memory-state" onSubmit={submitAnswer}>
                <div className="memory-emoji">🤔</div>
                <h2>What was the number?</h2>
                <input
                  className="memory-input"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  pattern="[0-9]*"
                  value={answer}
                  onChange={event =>
                    setAnswer(event.target.value.replace(/\D/g, ""))
                  }
                  placeholder="Enter the number"
                  aria-label="Remembered number"
                  autoFocus
                  required
                />
                <button className="memory-button" type="submit">
                  Submit Answer
                </button>
              </form>
            )}

            {phase === "lost" && (
              <div className="memory-state">
                <div className="memory-emoji">💔</div>
                <h2>Not quite!</h2>
                <p>The correct number was:</p>
                <div className="memory-result-number">{number}</div>
                <p>
                  You remembered {lastScore} digits.
                  {lastScore === ANITA_HIGH_SCORE
                    ? " You tied my record, but you have to beat it!"
                    : " Think you can do better?"}
                </p>
                <button className="memory-button" onClick={restart}>
                  Try Again
                </button>
              </div>
            )}

            {phase === "won" && (
              <div className="memory-state">
                <div className="memory-emoji">🏆</div>
                <h2>YOU BEAT ME!</h2>
                <p>
                  You remembered {lastScore} digits and beat
                  my record of {ANITA_HIGH_SCORE}!
                </p>
                <p>Okay, fine. I'm impressed. 💚</p>
                <button className="memory-button" onClick={restart}>
                  Play Again
                </button>
              </div>
            )}
          </div>
        </section>

        <p className="memory-footer-note">
          Built with React + TypeScript • Made by Anita
        </p>
      </div>
    </main>
  );
}
