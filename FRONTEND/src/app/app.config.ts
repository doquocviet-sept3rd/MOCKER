import {Injectable} from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AppConfig {
  processing: FormControl = new FormControl<boolean>(false);
  token: string;

}
