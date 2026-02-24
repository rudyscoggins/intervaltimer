import { render, screen, act } from '@testing-library/react';
import TimerPlayer from './TimerPlayer';
import { IntervalTimer } from '@/types';

jest.useFakeTimers();

const mockTimer: IntervalTimer = {
  id: 'test-1',
  name: 'Test Timer',
  reps: 2,
  warmup: 5,
  exerciseTime: 5,
  restTime: 3,
  loops: 1,
};

describe('TimerPlayer', () => {
  it('starts with warmup phase and correct time', () => {
    render(<TimerPlayer timer={mockTimer} onClose={() => {}} />);
    expect(screen.getByText(/warmup/i)).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('switches to exercise phase after warmup', () => {
    render(<TimerPlayer timer={mockTimer} onClose={() => {}} />);
    
    for (let i = 0; i < 5; i++) {
      act(() => {
        jest.advanceTimersByTime(1000);
      });
    }

    expect(screen.getByText(/exercise/i)).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('counts down and switches to rest phase', () => {
    render(<TimerPlayer timer={mockTimer} onClose={() => {}} />);
    
    for (let i = 0; i < 10; i++) {
      act(() => {
        jest.advanceTimersByTime(1000);
      });
    }

    expect(screen.getByText(/rest/i)).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('completes the workout after all reps', () => {
    render(<TimerPlayer timer={mockTimer} onClose={() => {}} />);
    
    // Total time: 5s warmup + (5s exercise + 3s rest) * 2 reps = 21s
    for (let i = 0; i < 21; i++) {
      act(() => {
        jest.advanceTimersByTime(1000);
      });
    }

    expect(screen.getByText(/workout complete/i)).toBeInTheDocument();
  });
});
