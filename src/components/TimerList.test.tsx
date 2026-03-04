import { render, screen } from '@testing-library/react';
import TimerList from './TimerList';
import { IntervalTimer } from '@/types';
import '@testing-library/jest-dom';

const mockTimers: IntervalTimer[] = [
  {
    id: '1',
    name: 'Quick Workout',
    warmup: 5,
    reps: 2,
    exerciseTime: 10,
    restTime: 5,
    loops: 1,
  },
];

describe('TimerList', () => {
  it('displays the total duration for each timer', () => {
    // Total duration: 5 (warmup) + 10 * 2 (exercise) + 5 * (2-1) (rest) = 30s
    render(
      <TimerList
        timers={mockTimers}
        onStart={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
        onAdd={() => {}}
      />
    );

    expect(screen.getByText('Quick Workout')).toBeInTheDocument();
    expect(screen.getByText('30s')).toBeInTheDocument();
  });
});
