import { Component } from '@angular/core';
import { AbstractComponent } from '../../../../shared/common/abstract.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent extends AbstractComponent {
  constructor(
    private toastrService: ToastrService
  ) {
    super();
    this.toastrService.success('Message Success!');
    this.toastrService.error('Message error!');
    this.toastrService.warning('Message warning!');

  }
}
