import { Component } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { Params, RouterModule, Routes, Router, ActivatedRoute } from '@angular/router'
import { MdTableModule } from '@angular/material';
import { SocketService } from './socket.service';

@Component({
	selector: 'calvin-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  providers: [SocketService]
})
export class NotificationsComponent {
    private notifications: any[];
    private ioConnection: any;
    //private count = 0;

    constructor(private socketService: SocketService, private router: Router) {}

    ngOnInit() {
        this.notifications = [];
        this.initIoConnection();
    }

    private redirect(domain) {
            this.router.navigate(['/communities/'+ domain]);
        }
    private initIoConnection() {
        this.ioConnection = this.socketService.get().subscribe((newNotification) => {
            this.notifications.unshift(newNotification);
     });



    // this.notifications.forEach((data) => {
    // if(data.event === 'memberadded')
    // {
    //     console.log(this.count,"his")
    //     this.count++;
    // }
    // });
    }
}
