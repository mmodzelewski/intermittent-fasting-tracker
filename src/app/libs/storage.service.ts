import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { FinishedTimer, Timer, timerFromString } from './time/timer';

const ACTIVE_TIMER = 'timers.active';
const FINISHED_TIMERS = 'timers.finished';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  saveTimer(timer: Timer): Promise<void> {
    return Storage.set({
      key: ACTIVE_TIMER,
      value: JSON.stringify(timer),
    });
  }

  getTimer(): Promise<Timer | null> {
    return Storage.get({key: ACTIVE_TIMER})
      .then(({value}) => {
        if (value !== null) {
          return timerFromString(value);
        } else {
          return null;
        }
      });
  }

  removeTimer(): Promise<void> {
    return Storage.remove({key: ACTIVE_TIMER});
  }

  async saveFinishedTimer(finishedTimer: FinishedTimer): Promise<void> {
    const currentValue = (await Storage.get({key: FINISHED_TIMERS})).value;
    let list = [];
    if (currentValue !== null) {
      list = JSON.parse(currentValue);
    }
    list.push(finishedTimer);
    return Storage.set({
      key: FINISHED_TIMERS,
      value: JSON.stringify(list),
    });
  }
}
