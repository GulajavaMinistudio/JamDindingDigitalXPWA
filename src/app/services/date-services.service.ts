import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {Observable} from 'rxjs';


@Injectable()
export class DateServicesService {

  constructor() {

  }

  getTanggalObsevable(): any {

    moment.locale('id');

    const observableDate = Observable.create(
      observer => {

        const momentlocale = moment().locale('id');
        const susunanWaktuTanggal: string = momentlocale.format('DD MMMM YYYY');

        observer.next(susunanWaktuTanggal);
        observer.complete();
      }
    )
      .catch(
        (error) => (Observable.throw(error))
      );

    return observableDate;
  }


}
