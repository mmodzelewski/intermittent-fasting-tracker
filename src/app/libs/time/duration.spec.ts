import { formatDuration } from './duration';

describe('formatDuration', () => {

  it('should add leading zero for single numbers', () => {
    expect(formatDuration({
      hours: 0,
      minutes: 0,
      seconds: 0,
    })).toEqual('0:00:00');

    expect(formatDuration({
      hours: 1,
      minutes: 1,
      seconds: 1,
    })).toEqual('1:01:01');
  });

  it('should add colons between numbers', () => {
    expect(formatDuration({
      hours: 15,
      minutes: 59,
      seconds: 59,
    })).toEqual('15:59:59');
  });

});
