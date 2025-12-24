import { useEffect, useRef, useState } from "react";

const ALL_COLORS = ["red", "green", "blue", "yellow", "orange", "purple", "pink", "cyan"];

export default function useSimonGame(settings = {}) {
  const [sequence, setSequence] = useState([]);
  const [playerIndex, setPlayerIndex] = useState(0);
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [isShowing, setIsShowing] = useState(false);
  const [activeColor, setActiveColor] = useState(null);
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const timers = useRef([]);
  const availableColors = ALL_COLORS.slice(0, settings.elementsCount || 4);

  const getRandomColor = () => availableColors[Math.floor(Math.random() * availableColors.length)];

  const clearTimers = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  };

 const showSequence = (seq) => {
    setIsShowing(true);
    setIsUserTurn(false);
    clearTimers();


    const gameSpeed = Number(settings.speed) || 600;
    const highlightDuration = gameSpeed * 0.8;

    seq.forEach((color, idx) => {
      const t1 = setTimeout(() => setActiveColor(color), gameSpeed * idx);
      const t2 = setTimeout(() => setActiveColor(null), gameSpeed * idx + highlightDuration);
      timers.current.push(t1, t2);
    });

    const endTimer = setTimeout(() => {
      setIsShowing(false);
      setIsUserTurn(true);
      setPlayerIndex(0);
    }, gameSpeed * seq.length);
    timers.current.push(endTimer);
  };

  const startGame = () => {
    clearTimers();
    const firstColor = getRandomColor();
    setSequence([firstColor]);
    setLevel(1);
    setScore(0);
    setIsGameOver(false);
    setTimeout(() => showSequence([firstColor]), 200);
  };

  const handleTileClick = (color) => {
    if (!isUserTurn || isShowing || isGameOver) return;

    setActiveColor(color);
    const t = setTimeout(() => setActiveColor(null), 250);
    timers.current.push(t);

    if (color !== sequence[playerIndex]) {
      const finalScore = level - 1;
      setScore(finalScore);
      setIsGameOver(true);
      setIsUserTurn(false);
      return;
    }

    const nextIndex = playerIndex + 1;
    setPlayerIndex(nextIndex);

    if (nextIndex === sequence.length) {
      setScore(level); 
      setIsUserTurn(false);
      const nextSeq = [...sequence, getRandomColor()];
      setSequence(nextSeq);
      setLevel(l => l + 1);
      setTimeout(() => showSequence(nextSeq), 700);
    }
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  return {
    level,
    score,
    isShowing,
    activeColor,
    isUserTurn,
    isGameOver,
    startGame,
    handleTileClick,
  };
}