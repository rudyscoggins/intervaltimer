export interface IntervalTimer {
  id: string;
  name: string;
  reps: number;
  warmup: number; // in seconds
  exerciseTime: number; // in seconds
  restTime: number; // in seconds
  loops: number;
}

export type TimerStatus = 'idle' | 'running' | 'paused' | 'finished';
export type TimerPhase = 'warmup' | 'exercise' | 'rest' | 'cooldown';

export interface TimerState {
  status: TimerStatus;
  phase: TimerPhase;
  currentLoop: number;
  currentRep: number;
  timeLeft: number;
}
