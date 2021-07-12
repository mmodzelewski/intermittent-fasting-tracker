import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { emptyTimer, formattedTimeLeft, isActiveTimer, newActiveTimer, Timer } from '../time/timer';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent implements OnDestroy {

  timer: Timer = emptyTimer();
  private subscription?: Subscription;

  constructor(private changeRef: ChangeDetectorRef) {}

  get timeLeft(): string | null {
    return isActiveTimer(this.timer) ? formattedTimeLeft(this.timer, Date.now()) : null;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  startTimer() {
    this.timer = newActiveTimer(new Date(), 16);
    this.subscription = interval(1000).subscribe(() => this.changeRef.markForCheck());
  }

  stopTimer() {
    this.timer = emptyTimer();
    this.subscription?.unsubscribe();
  }

}
