import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Duration } from '../../time/duration';
import { ActiveTimer, timeLeft } from '../../time/timer';

@Component({
  selector: 'app-active-timer',
  templateUrl: './active-timer.component.html',
  styleUrls: ['./active-timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveTimerComponent {

  @Input()
  timer!: ActiveTimer;

  @Input()
  time?: number;

  @Output()
  stop = new EventEmitter<boolean>();

  get timeLeft(): Duration {
    return timeLeft(this.timer, this.time ?? Date.now());
  }

}
