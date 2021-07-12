export interface Duration {
  hours: number;
  minutes: number;
  seconds: number;
  overtime: boolean;
}

export const formatDuration = (duration: Duration): string =>
  `${duration.hours}:${addLeadingZero(duration.minutes)}:${addLeadingZero(duration.seconds)}`;

const addLeadingZero = (value: number | undefined): string => {
  if (value === undefined) {
    return '';
  }
  const sValue = value.toString();
  if (sValue.length === 1) {
    return '0' + sValue;
  }
  return sValue;
};
