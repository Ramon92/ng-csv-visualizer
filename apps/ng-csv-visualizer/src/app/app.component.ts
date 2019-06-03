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
  public title: String = 'ng-csv-visualizer';
  private file: File;
  private data: Object[];
  public fileName: String = 'No file selected';
  public headers: String[];
  public sortedHeaders: Array<String | Boolean> = [];
  public sortedClasses: Object;
  public sortedData: Object[];
  public disableSubmit: Boolean = true;

  /**
   * Handles on file selected, enables submit button and stores file in context
   * @param {InputEvent} - change event when a file is selected
   */
  onFileSelected({ target }): void {
    if (target.files[0]) {
      this.disableSubmit = false;
      const file = target.files[0];
      this.file = file;
      this.fileName = file.name;
    }
  }

  /**
   * success handler for parsing csv data to JSON
   * @param {Object[]} results - array of objects where the key is the column
   */
  private parseSuccess(results: Object[]): void {
    this.data = results.data;
    this.sortedData = [...this.data];
    this.headers = this.data && Object.keys(this.data[0]);
    this.headers.forEach(element => {
      this.sortedHeaders.push(false);
    });
  }

  /**
   * Set classes for sorting the columns, sets a flag based on the index of the columns
   * @param {number} index - index of the table columns
   */
  private setSortedClasses(index: number){
    const isNotSorted = !this.sortedHeaders[index];
    const isAscending = this.sortedHeaders[index] === 'ascending';

    let newSortedHeader;

    if (isNotSorted) {
      newSortedHeader = this.sortedHeaders[index] = 'ascending';
    } else if (isAscending) {
      newSortedHeader = this.sortedHeaders[index] = 'descending';
    } else {
      newSortedHeader = this.sortedHeaders[index] = false;
    }

    // reset sorted headers to remove active classes
    this.sortedHeaders = this.sortedHeaders.map((): Boolean => false);

    // set active sorted column
    this.sortedHeaders[index] = newSortedHeader;

    // set classes for active sorted column
    this.sortedClasses = {
      descending: this.sortedHeaders[index] === 'descending',
      ascending: this.sortedHeaders[index] === 'ascending',
    }
  }

  /**
   * Sorts based on the column name. when first called it is sorted in descending order
   * When run for a second time with the same columnName sorted on ascending order
   * When called for the third time with the same columnName restore to original order
   * @param columnName - name of the table column
   * @param index - index of the column orders
   */
  sort(columnName: string, index: number): void {
    this.setSortedClasses(index);

    const {ascend, descend} = this.sortService;
    const isAscending = this.sortedHeaders[index] === 'ascending';
    const isDescending = this.sortedHeaders[index] === 'descending';

    // reset data back to initial state
    this.sortedData = [...this.data];

    if (isAscending) {
      this.sortedData.sort(ascend(columnName));
    } else if (isDescending) {
      this.sortedData.sort(descend(columnName));
    } else {
      // set data back to initial state
      this.sortedData = [...this.data]
    }
  }

  /**
   * handle submit of the csv files
   */
  displayTable(): void {
    Papa.parse(this.file, { complete: this.parseSuccess.bind(this), header: true });
  }
}
