'use client';

import { IntervalTimer } from '@/types';

interface TimerListProps {
  timers: IntervalTimer[];
  onStart: (timer: IntervalTimer) => void;
  onEdit: (timer: IntervalTimer) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

export default function TimerList({ timers, onStart, onEdit, onDelete, onAdd }: TimerListProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Interval Timers</h1>
        <button
          onClick={onAdd}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Add New Timer
        </button>
      </div>

      {timers.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">No timers found.</p>
          <button
            onClick={onAdd}
            className="text-indigo-600 font-medium hover:underline"
          >
            Create your first timer
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {timers.map((timer) => (
            <div
              key={timer.id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:y-0"
            >
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-semibold text-gray-900">{timer.name}</h3>
                <p className="text-sm text-gray-600">
                  {timer.warmup > 0 && `Warmup: ${timer.warmup}s | `}
                  {timer.reps} reps × {timer.exerciseTime}s exercise, {timer.restTime}s rest | {timer.loops} loops
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onStart(timer)}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                >
                  Start
                </button>
                <button
                  onClick={() => onEdit(timer)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(timer.id)}
                  className="bg-red-100 text-red-600 px-4 py-2 rounded-md hover:bg-red-200 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
