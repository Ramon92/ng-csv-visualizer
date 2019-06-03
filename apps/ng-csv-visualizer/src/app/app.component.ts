import { SortService } from './sort.service';
import { Component } from '@angular/core';
import Papa from 'papaparse';

@Component({
  selector: 'ng-csv-visualizer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private sortService: SortService){}
  title: String = 'ng-csv-visualizer';
  fileName: String = 'No file selected';
  file: File;
  data: Object[];
  headers: String[];
  sortedHeaders: Array<String | Boolean> = [];
  sortedClasses: Object;
  sortedData: Object[];
  disableSubmit: Boolean = true;

  onFileSelected({ target }): void {
    if (target.files[0]) {
      this.disableSubmit = false;
      const file = target.files[0];
      this.file = file;
      this.fileName = file.name;
    }
  }

  parseSuccess(results): void {
    this.data = results.data;
    this.sortedData = [...this.data];
    this.headers = this.data && Object.keys(this.data[0]);
    this.headers.forEach(element => {
      this.sortedHeaders.push(false);
    });
  }

  sort(column: string, index): void {
    const {ascend, descend} = this.sortService;
    let newSortedHeader;
    if (!this.sortedHeaders[index]) {
      newSortedHeader = this.sortedHeaders[index] = 'ascending';
    } else if (this.sortedHeaders[index] === 'ascending') {
      newSortedHeader = this.sortedHeaders[index] = 'descending';
    } else {
      newSortedHeader = this.sortedHeaders[index] = false;
    }
    this.sortedHeaders = this.sortedHeaders.map((): Boolean => false);
    this.sortedHeaders[index] = newSortedHeader;

    this.sortedClasses = {
      descending: this.sortedHeaders[index] === 'descending',
      ascending: this.sortedHeaders[index] === 'ascending',
    }

    this.sortedData = [...this.data];
    if (this.sortedHeaders[index] === 'ascending') {
      this.sortedData.sort(ascend(column));
    } else if (this.sortedHeaders[index] === 'descending') {
      this.sortedData.sort(descend(column));
    } else {
      this.sortedData = [...this.data]
    }
  }

  displayTable(): void {
    Papa.parse(this.file, { complete: this.parseSuccess.bind(this), header: true });
  }
}
