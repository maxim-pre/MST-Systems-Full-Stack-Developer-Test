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
  page: number = 1;
  pageSize: number = 6;
  visibleColumns: string[] = [];

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
    console.log(this.sortColumn.key);
  }

  showNextColumns() {
    let currentIndex = this.page * this.pageSize;
    const keys = Object.keys(this.data[0]);
    if (currentIndex >= keys.length) {
      currentIndex = 0;
      this.page = 0;
    }
    const nextColumns = keys.slice(currentIndex, currentIndex + this.pageSize);
    this.page += 1;
    this.visibleColumns = nextColumns;
  }

  ngOnInit() {
    this.socketService.onDataUpdate().subscribe((data: any) => {
      if (this.visibleColumns.length === 0) {
        this.visibleColumns = Object.keys(data).slice(0, this.pageSize);
      }

      this.data.push(data);

      if (this.data.length >= 11) {
        this.data.shift();
      }
    });
  }
}
