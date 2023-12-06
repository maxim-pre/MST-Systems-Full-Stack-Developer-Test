import { Component } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { SortingService } from '../services/sorting.service';
import { sortColumn } from '../sortColumn';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent {
  data: any[] = [];
  sortColumn: sortColumn = { key: 'MSTID', asc: true };

  constructor(
    private socketService: SocketService,
    private sortingService: SortingService
  ) {}

  onSort(key: string) {
    if (key === this.sortColumn.key) {
      this.sortColumn = { key: key, asc: !this.sortColumn.asc };
    } else {
      this.sortColumn = { key: key, asc: true };
    }

    this.data = this.sortingService.sortData(this.data, this.sortColumn);
  }

  ngOnInit() {
    this.socketService.onDataUpdate().subscribe((data: any) => {
      this.data.push(data);
    });
  }
}
