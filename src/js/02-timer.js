import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';


    const startBtn= document.querySelector('[data-start]');
    const showDays= document.querySelector('[data-days]');
    const showHours= document.querySelector('[data-hours]');
   const showMinutes= document.querySelector('[data-minutes]');
    const showSeconds= document.querySelector('[data-seconds]');


startBtn.disabled = 'disabled';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (this.selectedDates[0] > Date.now()) {
            startBtn.disabled = null;
        } else {
           return alert('Please choose a date in the future');
        }
  },
};

const picker = flatpickr("#datetime-picker", options);



class Timer {
    constructor({onTick}) {
        this.intervalId = null;
        this.isActive = false;
        this.onTick = onTick;
    };
    start() {
        if (this.isActive) {
            return;
        }
        const startTime = picker.selectedDates[0].getTime();
        this.isActive = true;

        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = startTime - currentTime;

            if (deltaTime < 0) {
                clearInterval(this.intervalId);
                return;
            }
            
            const time = this.convertMs(deltaTime);
            this.onTick(time);
        }, 1000);
        
       startBtn.disabled = 'disabled';
    };
    convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
        
        const days = this.addLeadingZero(Math.floor(ms / day));
        const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
        const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
        const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

        return { days, hours, minutes, seconds };
    };
    addLeadingZero(value) {
        return String(value).padStart(2, '0');
    };
};

const timer = new Timer({
    onTick: changeFormat,
});

function changeFormat ({ days, hours, minutes, seconds }) {
    showDays.textContent = `${days}`;
    showHours.textContent = `${hours}`;
    showMinutes.textContent = `${minutes}`;
    showSeconds.textContent = `${seconds}`;
};


startBtn.addEventListener('click', timer.start.bind(timer));