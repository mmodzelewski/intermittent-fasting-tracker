import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { formattedTimeLeft, isActiveTimer, newActiveTimer, Timer } from '../libs/time/timer';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnDestroy {

  private timer: Timer | null = null;
  private subscription?: Subscription;

  constructor(private changeRef: ChangeDetectorRef) {}

  get timeLeft(): string | null {
    return isActiveTimer(this.timer) ? formattedTimeLeft(this.timer, Date.now()) : null;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  startTimer() {
    this.timer = newActiveTimer(new Date(), 16);
    this.subscription = interval(1000).subscribe(() => this.changeRef.markForCheck());
  }

}
