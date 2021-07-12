import { add, intervalToDuration, parseJSON } from 'date-fns';
import { formatDuration } from './duration';

export type Timer = ActiveTimer | EmptyTimer;

interface EmptyTimer {
  type: 'EMPTY_TIMER';
}

interface ActiveTimer {
  type: 'ACTIVE_TIMER';
  startedAt: Date;
  predictedFinish: Date;
}

export const emptyTimer = (): EmptyTimer => ({type: 'EMPTY_TIMER'});

export const newActiveTimer = (startingAt: Date, hours: number): ActiveTimer => ({
  type: 'ACTIVE_TIMER',
  startedAt: startingAt,
  predictedFinish: add(startingAt, {hours}),
});

export const timerFromString = (value: string): Timer => {
  const parsedTimer = JSON.parse(value);
  if (isActiveTimer(parsedTimer)) {
    parsedTimer.startedAt = parseJSON(parsedTimer.startedAt);
    parsedTimer.predictedFinish = parseJSON(parsedTimer.predictedFinish);
    return parsedTimer;
  }
  if (isEmptyTimer(parsedTimer)) {
    return parsedTimer;
  }
  throw new Error(`Could not parse value to a timer. Value: ${value}`);
};

export const isActiveTimer = (timer: any | null): timer is ActiveTimer => timer?.type === 'ACTIVE_TIMER';
const isEmptyTimer = (timer: any | null): timer is EmptyTimer => timer?.type === 'EMPTY_TIMER';

export const formattedTimeLeft = (timer: ActiveTimer, now: Date | number): string => formatDuration(timeLeft(timer, now));

const timeLeft = (timer: ActiveTimer, now: Date | number): Duration =>
  intervalToDuration({
    start: now,
    end: timer.predictedFinish,
  });
