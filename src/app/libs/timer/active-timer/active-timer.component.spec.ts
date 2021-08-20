import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { DurationPipe } from '../../time/duration.pipe';
import { newActiveTimer } from '../../time/timer';

import { ActiveTimerComponent } from './active-timer.component';

describe('ActiveTimerComponent', () => {
  let component: ActiveTimerComponent;
  let fixture: ComponentFixture<ActiveTimerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveTimerComponent, DurationPipe],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ActiveTimerComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    component.timer = newActiveTimer(new Date(), 16);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
