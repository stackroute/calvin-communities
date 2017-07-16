import { Component } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";


@Component({
	selector: 'calvin-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {

public options = {
    position: ["bottom", "left"],
    timeOut: 5000,
    lastOnBottom: true
}

}
