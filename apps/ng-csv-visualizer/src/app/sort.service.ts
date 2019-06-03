import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  static compareString(a: string, b: string): number {
    const lowerA: string = a.toLowerCase();
    const lowerB: string = b.toLowerCase();
    return lowerA.localeCompare(lowerB)
  }

  static compareNumber(a: number,b: number): number{
    return a - b;
  }

  descend(columnName: string): (a: Object,b: Object) => number {
    return (a, b): number => {
      const rowItemA: any = a[columnName];
      const rowItemB: any = b[columnName];
      const isString = isNaN(rowItemA) && typeof rowItemA === 'string';
      const isNumber = !isNaN(rowItemA);
      if (isString) {
        return SortService.compareString(rowItemB, rowItemA);
      } else if(isNumber){
        return SortService.compareNumber(rowItemB, rowItemA);
      }
    }
  }

  ascend(columnName: string): (a: Object,b: Object) => number  {
    return (a, b): number => {
      const rowItemA: any = a[columnName];
      const rowItemB: any = b[columnName];
      const isString = isNaN(rowItemA) && typeof rowItemA === 'string';
      const isNumber = !isNaN(rowItemA);
      if (isString) {
        return SortService.compareString(rowItemA, rowItemB);
      } else if(isNumber){
        return SortService.compareNumber(rowItemA, rowItemB);
      }
    }
  }
}
