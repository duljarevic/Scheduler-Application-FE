import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs/internal/observable/throwError';

export default class Utils {

  // yyyy-MM-dd
  static dateToString(d: Date) {
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  static stringToDate(s) {
    // 2017-12-14 13:13:54.196
    let res = null;
    console.log('stringToDate');
    console.log(s);
    const d1 = s.split(' ');
    if (d1) {
      if (d1.length == 1) {
        let date1 = d1[0].split('-');
        res = new Date(Number.parseInt(date1[0]), Number.parseInt(date1[1]) - 1,
          Number.parseInt(date1[2]), 0, 0, 0);
      } else {
        const date1 = d1[0].split('-');
        console.log(date1.length);
        const time1 = d1[1].split(':');
        console.log(time1.length);
        const m = time1[2].split('.');
        res = new Date(Number.parseInt(date1[0]), Number.parseInt(date1[1]) - 1,
          Number.parseInt(date1[2]), Number.parseInt(time1[0]), Number.parseInt(time1[1]), Number.parseInt(m[0]), Number.parseInt(m[1]));
      }
    }
    else {
      res = null;
    }

    /*console.log(date1[0]);
     console.log(date1[1]);
     console.log(date1[2]);
     console.log(time1[0]);
     console.log(time1[1]);
     console.log(time1[2]);
     console.log(m[0]);
     console.log(m[1]);*/
    console.log(res);
    return res;
  }

  static handleError(error: HttpErrorResponse | any) {
    console.log('************ handleErrors');
    console.log(error);
    console.log(error.messages);
    console.log(error.error.messages);
    console.log(error.message);
    console.log(error.error.message);


    /*if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }*/
    // return an ErrorObservable with a user-facing error message


    /*return new ErrorObservable(
      'Something bad happened; please try again later. ' + error.error.messages);*/
    return throwError(
      error.error.message);
  }

}
