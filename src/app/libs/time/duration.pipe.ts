import { Pipe, PipeTransform } from '@angular/core';
import { Duration, formatDuration } from './duration';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {

  transform(duration: Duration | null): string {
    if (duration) {
      return formatDuration(duration) + (duration.overtime ? ' overtime' : '');
    }
    return '';
  }

}
