import { AbstractService } from './abstract.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtpService extends AbstractService<any> {
  ROUTE: string = 'api/v1/otp';

  register(username: string): Observable<undefined> {
    return this.post(`${this.ROUTE}/register/${username}`);
  }

}
