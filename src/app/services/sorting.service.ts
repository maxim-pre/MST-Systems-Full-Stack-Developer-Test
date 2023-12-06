import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { sortColumn } from '../sortColumn';

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  constructor() {}

  sortData(data: any[], sortColumn: sortColumn) {
    const sortedData = _.orderBy(
      data,
      [sortColumn.key],
      [sortColumn.asc === true ? 'asc' : 'desc']
    );

    return sortedData;
  }
}
