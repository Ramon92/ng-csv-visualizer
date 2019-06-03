import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortService {
  descend(column: string): (a: Object,b: Object) => number {
    return (a, b): number => {
      const lowerA = a[column].toLowerCase();
      const lowerB = b[column].toLowerCase();
      if (lowerA < lowerB) {
        return 1;
      } else if (lowerA > lowerB) {
        return -1;
      }
      return 0;
    }
  }

  ascend(column: string): (a: Object,b: Object) => number  {
    return (a, b): number => {
      const lowerA = a[column].toLowerCase();
      const lowerB = b[column].toLowerCase();
      if (lowerA > lowerB) {
        return 1;
      } else if (lowerA < lowerB) {
        return -1;
      }
      return 0;
    }
  }
}
