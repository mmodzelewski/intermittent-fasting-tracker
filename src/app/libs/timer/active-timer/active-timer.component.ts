import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { interval } from 'rxjs';
import { Duration } from '../../time/duration';
import { ActiveTimer, timeLeft } from '../../time/timer';

@Component({
  selector: 'app-active-timer',
  templateUrl: './active-timer.component.html',
  styleUrls: ['./active-timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveTimerComponent implements OnDestroy {

  @Input()
  timer!: ActiveTimer;

  @Output()
  stop = new EventEmitter<boolean>();

  private subscription = interval(1000).subscribe(() => this.changeRef.markForCheck());

  constructor(private changeRef: ChangeDetectorRef) {}

  get timeLeft(): Duration {
    return timeLeft(this.timer, Date.now());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
