import { Component } from '@angular/core';
import { AlertComponent } from 'ngx-bootstrap/alert';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  alerts: any[] = [{
  }];
 
  add(type:string, msg:string): void {
    this.alerts.push({
      type: type,
      msg: msg,
      timeout: 4000
    });
  }
 
  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }
}

