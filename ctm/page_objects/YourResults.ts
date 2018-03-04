import { CommonPage } from './CommonPage';
import { element, by } from 'protractor';

export class YourResults extends CommonPage {
     
      private supplier = "td.supplier";

      public getSupplier() {
            return element.all(by.css(this.supplier));
      }
}