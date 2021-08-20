import { add, intervalToDuration, isAfter, parseJSON } from 'date-fns';
import { Duration } from './duration';

export type Timer = ActiveTimer | EmptyTimer | FinishedTimer;

interface EmptyTimer {
  type: 'EMPTY_TIMER';
}

export interface ActiveTimer {
  type: 'ACTIVE_TIMER';
  startedAt: Date;
  predictedFinish: Date;
}

export interface FinishedTimer {
  type: 'FINISHED_TIMER';
  startedAt: Date;
  predictedFinish: Date;
  finishedAt: Date;
}

export const emptyTimer = (): EmptyTimer => ({type: 'EMPTY_TIMER'});

export const newActiveTimer = (startingAt: Date, hours: number): ActiveTimer => ({
  type: 'ACTIVE_TIMER',
  startedAt: startingAt,
  predictedFinish: add(startingAt, {hours}),
});

export const timerFromString = (value: string): Timer => {
  const parsedTimer: Timer = JSON.parse(value);
  switch (parsedTimer.type) {
    case 'ACTIVE_TIMER':
      parsedTimer.startedAt = parseJSON(parsedTimer.startedAt);
      parsedTimer.predictedFinish = parseJSON(parsedTimer.predictedFinish);
      return parsedTimer;
    case 'FINISHED_TIMER':
      parsedTimer.startedAt = parseJSON(parsedTimer.startedAt);
      parsedTimer.predictedFinish = parseJSON(parsedTimer.predictedFinish);
      parsedTimer.finishedAt = parseJSON(parsedTimer.finishedAt);
      return parsedTimer;
    case 'EMPTY_TIMER':
      return parsedTimer;
    default:
      const x: never = parsedTimer;
  }
  throw new Error(`Could not parse value to a timer. Value: ${value}`);
};

export const finishTimer = (timer: ActiveTimer, finishingAt: Date): FinishedTimer => ({
  ...timer,
  type: 'FINISHED_TIMER',
  finishedAt: finishingAt,
});

export const isActiveTimer = (timer: any | null): timer is ActiveTimer => timer?.type === 'ACTIVE_TIMER';
const isEmptyTimer = (timer: any | null): timer is EmptyTimer => timer?.type === 'EMPTY_TIMER';
export const isFinishedTimer = (timer: any | null): timer is FinishedTimer => timer?.type === 'FINISHED_TIMER';

export const timeLeft = (timer: ActiveTimer, now: Date | number): Duration => {
  const {
    hours = 0,
    minutes = 0,
    seconds = 0,
  } = intervalToDuration({
    start: now,
    end: timer.predictedFinish,
  });
  return {
    hours,
    minutes,
    seconds,
    overtime: isAfter(now, timer.predictedFinish),
  };
};

