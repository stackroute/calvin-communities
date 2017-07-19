import { Component } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import {SocketService} from './socket.service';

@Component({
	selector: 'calvin-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  providers: [SocketService]
})
export class NotificationsComponent {
    private notifications: any[];
    private ioConnection: any;
   

    constructor(private socketService: SocketService) {}

    ngOnInit() {
        this.notifications = [];
        this.initIoConnection();
    }
    
    private initIoConnection() {
        this.ioConnection = this.socketService.get().subscribe((newNotification) => {
            this.notifications.unshift(newNotification);
            });
        
    }
}
