import { useEffect, useRef, useState } from "react";

const COLORS = ["red", "green", "blue", "yellow"];

function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

export default function useSimonGame() {
  const [sequence, setSequence] = useState([]);
  const [playerIndex, setPlayerIndex] = useState(0);
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [isShowing, setIsShowing] = useState(false);
  const [activeColor, setActiveColor] = useState(null);
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const timers = useRef([]);

  useEffect(() => {
    return () => {
      timers.current.forEach((t) => clearTimeout(t));
      timers.current = [];
    };
  }, []);

  const clearTimers = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  };

  const showSequence = (seq) => {
    setIsShowing(true);
    setIsUserTurn(false);
    clearTimers();
    seq.forEach((color, idx) => {
      const t1 = setTimeout(() => setActiveColor(color), 600 * idx + 200);
      const t2 = setTimeout(() => setActiveColor(null), 600 * idx + 500);
      timers.current.push(t1, t2);
    });
    const endTimer = setTimeout(() => {
      setIsShowing(false);
      setIsUserTurn(true);
      setPlayerIndex(0);
    }, 600 * seq.length + 300);
    timers.current.push(endTimer);
  };

  const startGame = () => {
    clearTimers();
    setSequence([]);
    setPlayerIndex(0);
    setLevel(1);
    setScore(0);
    setIsGameOver(false);
    const first = [getRandomColor()];
    setSequence(first);
    setTimeout(() => showSequence(first), 200);
  };

  const nextRound = (prevSeq) => {
    const next = [...prevSeq, getRandomColor()];
    setSequence(next);
    setLevel((l) => l + 1);
    setTimeout(() => showSequence(next), 400);
  };

  const handleTileClick = (color) => {
    if (!isUserTurn || isShowing || isGameOver) return;
    setActiveColor(color);
    const t = setTimeout(() => setActiveColor(null), 200);
    timers.current.push(t);

    const expected = sequence[playerIndex];
    if (color !== expected) {
      setIsGameOver(true);
      setIsUserTurn(false);
      setScore(level - 1);
      return;
    }

    const nextPlayerIndex = playerIndex + 1;
    setPlayerIndex(nextPlayerIndex);

    if (nextPlayerIndex === sequence.length) {
      setScore((s) => Math.max(s, level));
      setIsUserTurn(false);
      const t2 = setTimeout(() => nextRound(sequence), 700);
      timers.current.push(t2);
    }
  };

  const restart = () => startGame();

  return {
    sequence,
    playerIndex,
    level,
    score,
    isShowing,
    activeColor,
    isUserTurn,
    isGameOver,
    startGame,
    handleTileClick,
    restart,
  };
}
