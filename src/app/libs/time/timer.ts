import { add, intervalToDuration } from 'date-fns';
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

export const isActiveTimer = (timer: Timer | null): timer is ActiveTimer => timer?.type === 'ACTIVE_TIMER';

export const formattedTimeLeft = (timer: ActiveTimer, now: Date | number): string => formatDuration(timeLeft(timer, now));

const timeLeft = (timer: ActiveTimer, now: Date | number): Duration =>
  intervalToDuration({
    start: now,
    end: timer.predictedFinish,
  });
