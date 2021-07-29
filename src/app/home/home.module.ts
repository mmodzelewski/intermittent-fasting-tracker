import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DurationPipe } from '../libs/time/duration.pipe';
import { ActiveTimerComponent } from '../libs/timer/active-timer/active-timer.component';
import { TimerComponent } from '../libs/timer/timer.component';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage, TimerComponent, DurationPipe, ActiveTimerComponent],
})
export class HomePageModule {}
