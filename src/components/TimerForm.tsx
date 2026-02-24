'use client';

import { useState } from 'react';
import { IntervalTimer } from '@/types';

interface TimerFormProps {
  onSave: (timer: IntervalTimer) => void;
  onCancel: () => void;
  initialData?: IntervalTimer;
}

export default function TimerForm({ onSave, onCancel, initialData }: TimerFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [reps, setReps] = useState(initialData?.reps || 1);
  const [warmup, setWarmup] = useState(initialData?.warmup || 0);
  const [exerciseTime, setExerciseTime] = useState(initialData?.exerciseTime || 30);
  const [restTime, setRestTime] = useState(initialData?.restTime || 10);
  const [loops, setLoops] = useState(initialData?.loops || 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
    try {
      const id = initialData?.id || (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11));
      const timerData = {
        id,
        name,
        reps,
        warmup,
        exerciseTime,
        restTime,
        loops,
      };
      console.log('Saving timer data:', timerData);
      onSave(timerData);
      console.log('onSave called successfully');
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md text-black">
      <h2 className="text-xl font-bold mb-4">{initialData ? 'Edit Timer' : 'Add New Timer'}</h2>
      <div>
        <label htmlFor="name" className="block text-sm font-medium">Timer Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="warmup" className="block text-sm font-medium">Warmup (s)</label>
          <input
            id="warmup"
            type="number"
            min="0"
            value={warmup}
            onChange={(e) => setWarmup(parseInt(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          />
        </div>
        <div>
          <label htmlFor="reps" className="block text-sm font-medium">Reps</label>
          <input
            id="reps"
            type="number"
            min="1"
            value={reps}
            onChange={(e) => setReps(parseInt(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          />
        </div>
        <div>
          <label htmlFor="loops" className="block text-sm font-medium">Loops</label>
          <input
            id="loops"
            type="number"
            min="1"
            value={loops}
            onChange={(e) => setLoops(parseInt(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="exerciseTime" className="block text-sm font-medium">Exercise (s)</label>
          <input
            id="exerciseTime"
            type="number"
            min="1"
            value={exerciseTime}
            onChange={(e) => setExerciseTime(parseInt(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          />
        </div>
        <div>
          <label htmlFor="restTime" className="block text-sm font-medium">Rest (s)</label>
          <input
            id="restTime"
            type="number"
            min="0"
            value={restTime}
            onChange={(e) => setRestTime(parseInt(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Save
        </button>
      </div>
    </form>
  );
}
