import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SchedulerTask} from '../model/schedulerTask';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ResponseWrapper} from '../core/response-wrapper';
import {map, catchError, retry} from 'rxjs/operators';
import Utils from '../core/utils';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
};

@Injectable({
  providedIn: 'root'
})
export class SchedulerTaskService {

  private billsUrl = 'http://localhost:9094/api/scheduler-task';

  constructor(private httpClient: HttpClient) {
  }

  getBills(): Observable<SchedulerTask[]> {
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


  getBill(id: number): Observable<SchedulerTask> {
    return this.httpClient.get<ResponseWrapper>(`${this.billsUrl}/${id}`).pipe(
      map(rw => {
        return rw.data;
      }),
      catchError(this.handleError)
    );
  }


  create(bill: SchedulerTask): Observable<SchedulerTask> {
    return this.httpClient
      .post<ResponseWrapper>(this.billsUrl, JSON.stringify(bill), httpOptions).pipe(
        map(rw => {
          return rw.data;
        }),
        catchError(this.handleError)
      );
  }


  private handleError(error: Response | any) {
    return Utils.handleError(error);
  }

}
