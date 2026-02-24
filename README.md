# Interval Timer

A modern, responsive interval timer application built with Next.js, React, and Tailwind CSS. Designed for HIIT workouts, CrossFit, or any activity requiring precise timed intervals.

## Features

- **Customizable Timers**: Create and save multiple timers with specific configurations:
  - **Warmup**: Set a preparation time before the workout starts.
  - **Exercise Time**: Duration of the active interval.
  - **Rest Time**: Duration of the recovery interval.
  - **Reps**: Number of exercise/rest cycles per loop.
  - **Loops**: Number of times to repeat the entire set.
- **Interactive Player**: Real-time countdown display with phase indicators (Warmup, Exercise, Rest).
- **Audio Notifications**: High-pitched beeps to signal phase transitions and the end of the workout.
- **LocalStorage Persistence**: Your timers are automatically saved in your browser, so they're ready whenever you return.
- **Responsive Design**: Optimized for both mobile and desktop use using Tailwind CSS 4.
- **Unit Tested**: Core components and logic are verified with Jest and React Testing Library.

## Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Testing**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **Containerization**: [Docker](https://www.docker.com/)

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm (or yarn/pnpm/bun)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rudyscoggins/intervaltimer.git
   cd intervaltimer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

### Running Tests

Execute the test suite:

```bash
npm test
```

## Docker Deployment

The application is containerized for easy deployment.

### Using Docker Compose

1. Build and start the container:
   ```bash
   docker-compose up -d
   ```

2. Access the application at [http://localhost:3030](http://localhost:3030).

### Using Docker Directly

1. Build the image:
   ```bash
   docker build -t intervaltimer .
   ```

2. Run the container:
   ```bash
   docker run -p 3030:3030 intervaltimer
   ```

## License

MIT