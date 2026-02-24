import '@testing-library/jest-dom';

// Mock AudioContext
(global as any).AudioContext = jest.fn().mockImplementation(() => ({
  createOscillator: jest.fn().mockReturnValue({
    connect: jest.fn(),
    start: jest.fn(),
    stop: jest.fn(),
    frequency: {
      setValueAtTime: jest.fn(),
    },
  }),
  createGain: jest.fn().mockReturnValue({
    connect: jest.fn(),
    gain: {
      setValueAtTime: jest.fn(),
      linearRampToValueAtTime: jest.fn(),
      exponentialRampToValueAtTime: jest.fn(),
    },
  }),
  currentTime: 0,
  destination: {},
}));

// Mock crypto.randomUUID
if (!global.crypto) {
  (global as any).crypto = {
    randomUUID: () => 'test-uuid',
  };
}
