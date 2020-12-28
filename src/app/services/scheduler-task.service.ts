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

  private schedulerTasksUrl = 'http://localhost:9094/api/scheduler-task';

  constructor(private httpClient: HttpClient) {
  }

  getSchedulerTasks(): Observable<SchedulerTask[]> {
    return this.httpClient.get<ResponseWrapper>(this.schedulerTasksUrl).pipe(
      map(rw => {
        return rw.data;
      }),
      retry(3),
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<{} | Object> {
    const url = `${this.schedulerTasksUrl}/${id}`;
    return this.httpClient.delete(url).pipe(
      catchError(this.handleError)
    );
  }


  getSchedulerTask(id: number): Observable<SchedulerTask> {
    return this.httpClient.get<ResponseWrapper>(`${this.schedulerTasksUrl}/${id}`).pipe(
      map(rw => {
        return rw.data;
      }),
      catchError(this.handleError)
    );
  }


  create(schedulerTask: SchedulerTask): Observable<SchedulerTask> {
    return this.httpClient
      .post<ResponseWrapper>(this.schedulerTasksUrl, JSON.stringify(schedulerTask), httpOptions).pipe(
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
