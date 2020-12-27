import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Bills} from '../model/bills';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ResponseWrapper} from '../core/response-wrapper';
import {map, catchError, retry} from 'rxjs/operators';
import Utils from '../core/utils';
import {AuthLoginInfo} from '../auth/login-info';
import {JwtResponse} from '../auth/jwt-response';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
};

@Injectable({
  providedIn: 'root'
})
export class BillsService {

  private billsUrl = 'http://localhost:9093/api/bills';

  constructor(private httpClient: HttpClient) {
  }

  getBills(): Observable<Bills[]> {
    return this.httpClient.get<ResponseWrapper>(this.billsUrl).pipe(
      map(rw => {
        return rw.data;
      }),
      retry(3),
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<{} | Object> {
    const url = `${this.billsUrl}/${id}`;
    return this.httpClient.delete(url).pipe(
      catchError(this.handleError)
    );
  }


  getBill(id: number): Observable<Bills> {
    return this.httpClient.get<ResponseWrapper>(`${this.billsUrl}/${id}`).pipe(
      map(rw => {
        return this.processData(rw.data);
      }),
      catchError(this.handleError)
    );
  }


  create(bill: Bills): Observable<Bills> {
    return this.httpClient
      .post<ResponseWrapper>(this.billsUrl, JSON.stringify(bill), httpOptions).pipe(
        map(rw => {
          return this.processData(rw.data);
        }),
        catchError(this.handleError)
      );
  }


  private handleError(error: Response | any) {
    return Utils.handleError(error);
  }


  private processData(bills) {
    if (bills.datumIzdavanjaRacuna) {
      bills.datumIzdavanjaRacuna = new Date(bills.datumIzdavanjaRacuna);
    }
    if (bills.datumPrometaDobaraUsluga) {
      bills.datumPrometaDobaraUsluga = new Date(bills.datumPrometaDobaraUsluga);
    }
    return bills;
  }

}
