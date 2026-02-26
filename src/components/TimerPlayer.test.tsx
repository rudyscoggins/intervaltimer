import { render, screen, act } from '@testing-library/react';
import TimerPlayer from './TimerPlayer';
import { IntervalTimer } from '@/types';
import * as audioUtils from '@/utils/audio';

jest.mock('@/utils/audio', () => ({
  playBeep: jest.fn(),
  playTick: jest.fn(),
  playDing: jest.fn(),
}));

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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('starts with warmup phase and correct time', () => {
    render(<TimerPlayer timer={mockTimer} onClose={() => {}} />);
    expect(screen.getByText(/warmup/i)).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    // It should NOT tick at 5 because it just started
    expect(audioUtils.playTick).not.toHaveBeenCalled();
  });

  it('switches to exercise phase after warmup and plays ding', () => {
    render(<TimerPlayer timer={mockTimer} onClose={() => {}} />);
    
    // Warmup is 5s. 
    // Ticks at 4, 3, 2, 1.
    for (let i = 0; i < 5; i++) {
      act(() => {
        jest.advanceTimersByTime(1000);
      });
    }

    expect(screen.getByText(/exercise/i)).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(audioUtils.playTick).toHaveBeenCalledTimes(4);
    expect(audioUtils.playDing).toHaveBeenCalledTimes(1); // One ding for starting exercise
  });

  it('plays ding at halfway point of exercise', () => {
    render(<TimerPlayer timer={mockTimer} onClose={() => {}} />);
    
    // Fast forward through warmup (5s)
    for (let i = 0; i < 5; i++) {
      act(() => {
        jest.advanceTimersByTime(1000);
      });
    }

    // Now in exercise (5s). playDing count should be 1 (transition).
    expect(audioUtils.playDing).toHaveBeenCalledTimes(1);

    // Now advance to halfway point (timeLeft = 2)
    // floor(5/2) = 2.
    act(() => {
      jest.advanceTimersByTime(1000); // timeLeft 4
      jest.advanceTimersByTime(1000); // timeLeft 3
      jest.advanceTimersByTime(1000); // timeLeft 2
    });

    expect(audioUtils.playDing).toHaveBeenCalledTimes(2);
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
