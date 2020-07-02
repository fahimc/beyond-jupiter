import * as Phaser from 'phaser';
import { Timer } from 'easytimer.js';
export const ProdCountdown = {
  timer: new Timer(),
  create() {
    this.timer.start({
      precision: 'seconds',
      countdown: true,
      startValues: { hours: 8, minutes: 0, seconds: 0 },
    });
    const timerElement = document.querySelector('#prod-timer');
    this.timer.addEventListener('secondsUpdated', () => {
      const timeValues = this.timer.getTimeValues();
      if (timerElement)
        timerElement.innerHTML = `${timeValues.hours}H ${timeValues.minutes}M ${timeValues.seconds}S`;
    });
  },
};
