"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import timer from '@/assets/images/timer.png';

interface Props {
  onTimeUp: () => void,
  setTimePerQuestion: (value: number) => void,
  isAnswered: boolean,
  resetTimer: number
}

export const QuestionTimer: React.FC<Props> = ({ onTimeUp, setTimePerQuestion, isAnswered, resetTimer }) => {
  const [seconds, setSeconds] = useState(10); // 10 seconds for each question

  useEffect(() => {
    if (!isAnswered && seconds > 0) {
      const timer = setTimeout(() => {
        setSeconds((prev) => prev - 1);
        setTimePerQuestion(10 - seconds);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (seconds === 0 && !isAnswered) {
      onTimeUp();
    }
  }, [seconds, isAnswered]);

  useEffect(() => {
    setSeconds(10);
  }, [resetTimer]);

  return (<div className="text-lg flex gap-2 items-center">
    <Image
      src={timer}
      alt='timer'
      width={30}
    />
    <p> {seconds} seconds</p>
    </div>);
};
