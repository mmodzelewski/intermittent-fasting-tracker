import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { StorageService } from '../storage.service';
import { Duration } from '../time/duration';
import { emptyTimer, isActiveTimer, newActiveTimer, timeLeft, Timer } from '../time/timer';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent implements OnInit, OnDestroy {

  timer: Timer = emptyTimer();
  private subscription?: Subscription;

  constructor(
    private storage: StorageService,
    private changeRef: ChangeDetectorRef,
  ) {}

  get timeLeft(): Duration | null {
    return isActiveTimer(this.timer) ? timeLeft(this.timer, Date.now()) : null;
  }

  ngOnInit(): void {
    this.storage.getTimer()
      .then(timer => {
        if (timer) {
          this.timer = timer;
          this.changeRef.markForCheck();
          if (isActiveTimer(this.timer)) {
            this.runUpdates();
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  startTimer() {
    this.timer = newActiveTimer(new Date(), 16);
    this.storage.saveTimer(this.timer);
    this.runUpdates();
  }

  stopTimer() {
    this.timer = emptyTimer();
    this.storage.removeTimer();
    this.subscription?.unsubscribe();
  }

  private runUpdates() {
    this.subscription = interval(1000).subscribe(() => this.changeRef.markForCheck());
  }

}
