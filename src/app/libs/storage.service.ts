import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Timer, timerFromString } from './time/timer';

const TIMER_KEY = 'timer';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  saveTimer(timer: Timer): Promise<void> {
    return Storage.set({
      key: TIMER_KEY,
      value: JSON.stringify(timer),
    });
  }

  getTimer(): Promise<Timer | null> {
    return Storage.get({key: TIMER_KEY})
      .then(({value}) => {
        if (value !== null) {
          return timerFromString(value);
        } else {
          return null;
        }
      });
  }

  removeTimer(): Promise<void> {
    return Storage.remove({key: TIMER_KEY});
  }
}
