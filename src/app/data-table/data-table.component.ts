import { Component } from '@angular/core';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent {
  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.socketService.onDataUpdate().subscribe((data: any) => {
      console.log(data);
    });
  }
}
