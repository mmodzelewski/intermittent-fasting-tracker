import { sub } from 'date-fns';
import { isActiveTimer, isFinishedTimer, newActiveTimer, timeLeft, timerFromString } from './timer';

describe('timer', () => {

  it('should create ActiveTimer from string', () => {
    const json = `{
      "type": "ACTIVE_TIMER",
      "startedAt": "2021-07-12T16:58:05.778Z",
      "predictedFinish": "2021-07-13T08:58:05.778Z"
    }`;
    const timer = timerFromString(json);

    expect(isActiveTimer(timer)).toBeTruthy();
    if (isActiveTimer(timer)) {
      expect(timer.startedAt).toBeInstanceOf(Date);
      expect(timer.predictedFinish).toBeInstanceOf(Date);
    }
  });

  it('should create EmptyTimer from string', () => {
    const json = `{
      "type": "EMPTY_TIMER"
    }`;
    const timer = timerFromString(json);

    expect(timer.type).toEqual('EMPTY_TIMER');
  });

  it('should create FinishedTimer from string', () => {
    const json = `{
      "type": "FINISHED_TIMER",
      "startedAt": "2021-07-12T16:58:05.778Z",
      "predictedFinish": "2021-07-13T08:58:05.778Z",
      "finishedAt": "2021-07-13T08:58:05.778Z"
    }`;
    const timer = timerFromString(json);

    expect(isFinishedTimer(timer)).toBeTruthy();
    if (isFinishedTimer(timer)) {
      expect(timer.startedAt).toBeInstanceOf(Date);
      expect(timer.predictedFinish).toBeInstanceOf(Date);
      expect(timer.finishedAt).toBeInstanceOf(Date);
    }
  });


  it('should throw for incorrect string', () => {
    const json = `{
      "testing": "hello"
    }`;
    expect(() => timerFromString(json)).toThrow();
  });

  it('should get overtime', () => {
    const now = Date.now();
    const time5HoursAgo = sub(now, {hours: 5});

    const time = timeLeft(newActiveTimer(time5HoursAgo, 4), now);
    expect(time.hours).toEqual(1);
    expect(time.overtime).toBeTrue();
  });

  it('should not get overtime', () => {
    const now = Date.now();
    const time5HoursAgo = sub(now, {hours: 5});

    const time = timeLeft(newActiveTimer(time5HoursAgo, 6), now);
    expect(time.hours).toEqual(1);
    expect(time.overtime).toBeFalse();
  });

});
