'use client';

import { useState, useEffect } from 'react';
import { IntervalTimer } from '@/types';
import TimerList from '@/components/TimerList';
import TimerForm from '@/components/TimerForm';
import TimerPlayer from '@/components/TimerPlayer';

export default function Home() {
  const [timers, setTimers] = useState<IntervalTimer[]>([]);
  const [activeTimer, setActiveTimer] = useState<IntervalTimer | null>(null);
  const [editingTimer, setEditingTimer] = useState<IntervalTimer | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('interval-timers');
    if (saved) {
      try {
        setTimers(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved timers', e);
      }
    }
  }, []);

  const saveTimers = (newTimers: IntervalTimer[]) => {
    console.log('Attempting to save timers to localStorage:', newTimers);
    setTimers(newTimers);
    try {
      localStorage.setItem('interval-timers', JSON.stringify(newTimers));
      console.log('Successfully saved to localStorage');
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  };

  const handleAddTimer = (timer: IntervalTimer) => {
    console.log('handleAddTimer called with:', timer);
    saveTimers([...timers, timer]);
    setIsAdding(false);
  };

  const handleEditTimer = (timer: IntervalTimer) => {
    console.log('handleEditTimer called with:', timer);
    saveTimers(timers.map((t) => (t.id === timer.id ? timer : t)));
    setEditingTimer(null);
  };

  const handleDeleteTimer = (id: string) => {
    if (confirm('Are you sure you want to delete this timer?')) {
      saveTimers(timers.filter((t) => t.id !== id));
    }
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-gray-50 text-black">
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        {!activeTimer && (
          <TimerList
            timers={timers}
            onStart={setActiveTimer}
            onEdit={setEditingTimer}
            onDelete={handleDeleteTimer}
            onAdd={() => setIsAdding(true)}
          />
        )}

        {(isAdding || editingTimer) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
            <div className="w-full max-w-md">
              <TimerForm
                onSave={editingTimer ? handleEditTimer : handleAddTimer}
                onCancel={() => {
                  setIsAdding(false);
                  setEditingTimer(null);
                }}
                initialData={editingTimer || undefined}
              />
            </div>
          </div>
        )}

        {activeTimer && (
          <TimerPlayer
            timer={activeTimer}
            onClose={() => setActiveTimer(null)}
          />
        )}
      </div>
    </main>
  );
}