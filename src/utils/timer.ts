import { IntervalTimer } from '../types';

export const calculateTotalTime = (timer: IntervalTimer): number => {
  const totalSets = timer.reps * timer.loops;
  if (totalSets === 0) return timer.warmup;
  
  const totalExerciseTime = timer.exerciseTime * totalSets;
  const totalRestTime = timer.restTime * (totalSets - 1);
  
  return timer.warmup + totalExerciseTime + Math.max(0, totalRestTime);
};

export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  
  if (mins === 0) return `${secs}s`;
  if (secs === 0) return `${mins}m`;
  return `${mins}m ${secs}s`;
};
