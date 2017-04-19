import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-jam-waktu',
  templateUrl: './jam-waktu.component.html',
  styleUrls: ['./jam-waktu.component.css']
})
export class JamWaktuComponent implements OnInit, OnDestroy {

  timerMenitInterval: any;
  timerDetikInterval: any;

  @Output()
  eventEmitDate = new EventEmitter();

  constructor() {
  }

  ngOnInit() {

    this.startMulaiTimer();
  }

  ngOnDestroy(): void {

    this.stopTimerWaktu();
  }

  refreshTanggal(): void {
    this.eventEmitDate.emit('data_refresh');
  }

  startMulaiTimer(): void {

    // Initialise the locale-enabled clocks
    // initInternationalClocks();
    // Initialise any local time clocks
    this.inisialisasiWaktuLocal();

    // Start the seconds container moving
    this.moveJarumDetik();

    // Set the intial minute hand container transition, and then each subsequent step
    this.setupJarumMenit();
  }

  stopTimerWaktu(): void {

    const observableCancel = Observable.create(
      observer => {

        clearInterval(this.timerMenitInterval);
        clearInterval(this.timerDetikInterval);

        observer.next(true);
        observer.complete();
      }
    )
      .catch(
        (error) => (Observable.throw(error))
      );

    observableCancel.subscribe(
      () => {
        console.log('time stopped');
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('time completed');
      }
    );

  }

  /*
   * Starts any clocks using the user's local time
   */
  inisialisasiWaktuLocal(): void {

    const waktuDateNow = new Date();
    const seconds = waktuDateNow.getSeconds();
    const minutes = waktuDateNow.getMinutes();
    const hours = waktuDateNow.getHours();


    // Create an object with each hand and it's angle in degrees
    const hands = [
      {
        hand: 'hours',
        angle: (hours * 30) + (minutes / 2)
      },
      {
        hand: 'minutes',
        angle: (minutes * 6)
      },
      {
        hand: 'seconds',
        angle: (seconds * 6)
      }
    ];

    // Loop through each of these hands to set their angle
    for (let j = 0; j < hands.length; j++) {

      const elements = <HTMLElement[]><any>document.querySelectorAll('.' + hands[j].hand);

      for (let k = 0; k < elements.length; k++) {

        elements[k].style.webkitTransform = 'rotateZ(' + hands[j].angle + 'deg)';
        elements[k].style.transform = 'rotateZ(' + hands[j].angle + 'deg)';

        // If this is a minute hand, note the seconds position (to calculate minute position later)
        if (hands[j].hand === 'minutes') {

          // elements[k].parentNode.setAttribute('data-second-angle', hands[j + 1].angle);

          // perbaikan dari fungsi di atas karena menggunakan type
          const element = <HTMLElement> elements[k].parentNode;
          const angles = hands[j + 1].angle + '';
          element.setAttribute('data-second-angle', angles);
        }
      }
    }
  }


  /*
   * Set a timeout for the first minute hand movement (less than 1 minute), then rotate it
   * every minute after that
   */
  setupJarumMenit(): void {

    // Find out how far into the minute we are
    const containers = <HTMLElement[]><any> document.querySelectorAll('.minutes-container');
    const secondAngle = containers[0].getAttribute('data-second-angle');

    const secondAngleNumber = Number(secondAngle);

    if (secondAngleNumber > 0) {

      // Set a timeout until the end of the current minute, to move the hand
      const delay = (((360 - secondAngleNumber) / 6) + 0.1) * 1000;

      setTimeout(
        () => {

          this.moveJarumMenit(containers);

        }, delay);
    }
  }

  /*
   * Do the first minute's rotation
   */
  moveJarumMenit(containers: any): void {

    const panjangContainer: number = containers.length;
    for (let i = 0; i < panjangContainer; i++) {

      const containerSelect = containers[i];
      containerSelect.style.webkitTransform = 'rotateZ(6deg)';
      containerSelect.style.transform = 'rotateZ(6deg)';
    }

    // Then continue with a 60 second interval
    this.timerMenitInterval = setInterval(
      () => {

        for (let i = 0; i < panjangContainer; i++) {

          const containerSelect = containers[i];
          if (containerSelect.angle === undefined) {
            containerSelect.angle = 12;
          } else {
            containerSelect.angle += 6;
          }

          containerSelect.style.webkitTransform = 'rotateZ(' + containerSelect.angle + 'deg)';
          containerSelect.style.transform = 'rotateZ(' + containerSelect.angle + 'deg)';
        }

        // segarkan tanggal di parent component
        console.log('tanggal segarkan');
        this.refreshTanggal();

      }, 60000
    );
  }

  /*
   * Move the second containers
   */
  moveJarumDetik(): void {

    const containers = <HTMLElement[]><any> document.querySelectorAll('.seconds-container');

    const panjangContainer = containers.length;

    this.timerDetikInterval = setInterval(
      () => {

        for (let i = 0; i < panjangContainer; i++) {

          const containerSelect: any = containers[i];

          if (containerSelect.angle === undefined) {
            containerSelect.angle = 6;
          } else {
            containerSelect.angle += 6;
          }
          containerSelect.style.webkitTransform = 'rotateZ(' + containerSelect.angle + 'deg)';
          containerSelect.style.transform = 'rotateZ(' + containerSelect.angle + 'deg)';
        }

      }, 1000
    );
  }


}
