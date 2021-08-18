import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { interval, map, Observable } from 'rxjs';
import { StorageService } from '../storage.service';
import { emptyTimer, finishTimer, isActiveTimer, newActiveTimer, Timer } from '../time/timer';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent implements OnInit {

  timer: Timer = emptyTimer();
  time: Observable<number> = interval(1000).pipe(map((_) => Date.now()));
  selectOptions: any = {
    header: 'Fasting time',
  };

  readonly fastingOptions = [
    {
      label: '16',
      value: 16,
    },
    {
      label: '18',
      value: 18,
    },
    {
      label: '20',
      value: 20,
    },
  ] as const;
  fastingTime = this.fastingOptions[0].value;

  constructor(
    private storage: StorageService,
    private changeRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.restoreTimer();
  }

  startTimer() {
    this.timer = newActiveTimer(new Date(), this.fastingTime);
    this.storage.saveTimer(this.timer);
  }

  stopAndSaveTimer() {
    if (isActiveTimer(this.timer)) {
      this.storage.saveFinishedTimer(finishTimer(this.timer, new Date()));
      this.timer = emptyTimer();
      this.storage.removeTimer();
    }
  }

  private async restoreTimer() {
    const timer = await this.storage.getTimer();
    if (timer) {
      this.timer = timer;
      this.changeRef.markForCheck();
    }
  }

}
