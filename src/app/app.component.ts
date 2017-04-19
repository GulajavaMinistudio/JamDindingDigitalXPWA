import {Component, OnDestroy, OnInit} from '@angular/core';
import {DateServicesService} from './services/date-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app works!';
  tanggalSekarangIni = '1 Januari 2017';

  constructor(private dateService: DateServicesService) {

  }

  ngOnInit(): void {

    this.setelTanggalSekarang();
  }

  ngOnDestroy(): void {
  }

  setelTanggalSekarang(): void {

    this.dateService.getTanggalObsevable()
      .subscribe(
        (hasil) => {

          console.log('tanggal-disegarkan');
          this.tanggalSekarangIni = hasil;
        },
        (error) => {
          this.tanggalSekarangIni = '1 Januari 2017';
          console.log(error);
        }
      );
  }
}
