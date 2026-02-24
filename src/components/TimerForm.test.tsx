import { render, screen, fireEvent } from '@testing-library/react';
import TimerForm from './TimerForm';

describe('TimerForm', () => {
  it('renders with default values', () => {
    render(<TimerForm onSave={() => {}} onCancel={() => {}} />);
    expect(screen.getByLabelText(/Timer Name/i)).toBeInTheDocument();
  });

  it('calls onSave with correct data when submitted', () => {
    const onSave = jest.fn();
    render(<TimerForm onSave={onSave} onCancel={() => {}} />);

    fireEvent.change(screen.getByLabelText(/Timer Name/i), { target: { value: 'My Workout' } });
    fireEvent.change(screen.getByLabelText(/Warmup/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/Reps/i), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText(/Exercise/i), { target: { value: '45' } });
    fireEvent.change(screen.getByLabelText(/Rest/i), { target: { value: '15' } });
    fireEvent.change(screen.getByLabelText(/Loops/i), { target: { value: '2' } });

    fireEvent.click(screen.getByText(/Save/i));

    expect(onSave).toHaveBeenCalledWith({
      id: expect.any(String),
      name: 'My Workout',
      reps: 5,
      warmup: 10,
      exerciseTime: 45,
      restTime: 15,
      loops: 2,
    });
  });
});
