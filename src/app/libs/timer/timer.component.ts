import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { interval, map, Observable } from 'rxjs';
import { StorageService } from '../storage.service';
import { emptyTimer, newActiveTimer, Timer } from '../time/timer';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent implements OnInit {

  timer: Timer = emptyTimer();
  time: Observable<number> = interval(1000).pipe(map((_) => Date.now()));

  constructor(
    private storage: StorageService,
    private changeRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.restoreTimer();
  }

  startTimer() {
    this.timer = newActiveTimer(new Date(), 16);
    this.storage.saveTimer(this.timer);
  }

  stopTimer() {
    this.timer = emptyTimer();
    this.storage.removeTimer();
  }

  private async restoreTimer() {
    const timer = await this.storage.getTimer();
    if (timer) {
      this.timer = timer;
      this.changeRef.markForCheck();
    }
  }

}
