import { isActiveTimer, timerFromString } from './timer';

describe('timer', () => {

  it('should create ActiveTimer from string', () => {
    const json = `{
      "type": "ACTIVE_TIMER",
      "startedAt": "2021-07-12T16:58:05.778Z",
      "predictedFinish": "2021-07-13T08:58:05.778Z"
    }`;
    const timer = timerFromString(json) as any;

    expect(isActiveTimer(timer)).toBeTruthy();
    expect(timer.startedAt).toBeInstanceOf(Date);
    expect(timer.predictedFinish).toBeInstanceOf(Date);
  });

  it('should create EmptyTimer from string', () => {
    const json = `{
      "type": "EMPTY_TIMER"
    }`;
    const timer = timerFromString(json) as any;

    expect(timer.type).toEqual('EMPTY_TIMER');
  });

  it('should throw for incorrect string', () => {
    const json = `{
      "testing": "hello"
    }`;
    expect(() => timerFromString(json)).toThrow();
  });

});
