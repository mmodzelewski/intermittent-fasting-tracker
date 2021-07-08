import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { add, intervalToDuration } from 'date-fns';
import { interval, Subscription } from 'rxjs';
import { formatDuration } from '../libs/time/duration';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnDestroy {

  private finishAt?: Date;
  private subscription?: Subscription;

  constructor(private changeRef: ChangeDetectorRef) {}

  get timeLeft(): string | null {
    if (this.finishAt) {
      const duration = {
        start: Date.now(),
        end: this.finishAt,
      };
      return formatDuration(intervalToDuration(duration));
    } else {
      return null;
    }
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  startTimer() {
    this.finishAt = add(Date.now(), {hours: 16});
    this.subscription = interval(1000).subscribe(() => this.changeRef.markForCheck());
  }

}
