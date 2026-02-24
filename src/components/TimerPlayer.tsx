'use client';

import { useState, useEffect, useCallback } from 'react';
import { IntervalTimer, TimerStatus, TimerPhase } from '@/types';
import { playBeep } from '@/utils/audio';

interface TimerPlayerProps {
  timer: IntervalTimer;
  onClose: () => void;
}

export default function TimerPlayer({ timer, onClose }: TimerPlayerProps) {
  const [status, setStatus] = useState<TimerStatus>('running');
  const [phase, setPhase] = useState<TimerPhase>(timer.warmup > 0 ? 'warmup' : 'exercise');
  const [currentLoop, setCurrentLoop] = useState(1);
  const [currentRep, setCurrentRep] = useState(1);
  const [timeLeft, setTimeLeft] = useState(timer.warmup > 0 ? timer.warmup : timer.exerciseTime);

  const handleNextPhase = useCallback(() => {
    playBeep();
    if (phase === 'warmup') {
      setPhase('exercise');
      setTimeLeft(timer.exerciseTime);
    } else if (phase === 'exercise') {
      if (timer.restTime > 0) {
        setPhase('rest');
        setTimeLeft(timer.restTime);
      } else {
        // Skip rest if restTime is 0
        if (currentRep < timer.reps) {
          setCurrentRep((r) => r + 1);
          setPhase('exercise');
          setTimeLeft(timer.exerciseTime);
        } else if (currentLoop < timer.loops) {
          setCurrentLoop((l) => l + 1);
          setCurrentRep(1);
          setPhase('exercise');
          setTimeLeft(timer.exerciseTime);
        } else {
          setStatus('finished');
        }
      }
    } else {
      // End of rest
      if (currentRep < timer.reps) {
        setCurrentRep((r) => r + 1);
        setPhase('exercise');
        setTimeLeft(timer.exerciseTime);
      } else if (currentLoop < timer.loops) {
        setCurrentLoop((l) => l + 1);
        setCurrentRep(1);
        setPhase('exercise');
        setTimeLeft(timer.exerciseTime);
      } else {
        setStatus('finished');
      }
    }
  }, [phase, currentRep, currentLoop, timer]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (status === 'running' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (status === 'running' && timeLeft === 0) {
      handleNextPhase();
    }

    return () => clearInterval(interval);
  }, [status, timeLeft, handleNextPhase]);

  const togglePause = () => {
    setStatus((prev) => (prev === 'running' ? 'paused' : 'running'));
  };

  const getPhaseColor = () => {
    if (status === 'finished') return 'bg-green-100 text-green-800';
    if (phase === 'warmup') return 'bg-yellow-100 text-yellow-800';
    return phase === 'exercise' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900">{timer.name}</h2>
        
        <div className={`rounded-2xl p-8 ${getPhaseColor()} transition-colors duration-500`}>
          <p className="text-xl font-medium uppercase tracking-widest mb-2">
            {status === 'finished' ? 'Workout Complete!' : phase}
          </p>
          <p className="text-8xl font-black tabular-nums">
            {timeLeft}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-gray-600">
          <div className="bg-gray-100 p-4 rounded-xl">
            <p className="text-sm uppercase">Rep</p>
            <p className="text-2xl font-bold">{currentRep} / {timer.reps}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-xl">
            <p className="text-sm uppercase">Loop</p>
            <p className="text-2xl font-bold">{currentLoop} / {timer.loops}</p>
          </div>
        </div>

        <div className="flex space-x-4">
          {status !== 'finished' && (
            <button
              onClick={togglePause}
              className={`flex-1 py-4 rounded-xl text-xl font-bold text-white shadow-lg transition transform active:scale-95 ${
                status === 'running' ? 'bg-yellow-500' : 'bg-green-600'
              }`}
            >
              {status === 'running' ? 'PAUSE' : 'RESUME'}
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 py-4 rounded-xl text-xl font-bold bg-gray-200 text-gray-800 hover:bg-gray-300 transition transform active:scale-95"
          >
            {status === 'finished' ? 'DONE' : 'QUIT'}
          </button>
        </div>
      </div>
    </div>
  );
}
