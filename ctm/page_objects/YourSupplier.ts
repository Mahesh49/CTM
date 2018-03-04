import { CommonPage } from './CommonPage';
import { element, by } from 'protractor';

export class YourSupplier extends CommonPage {

    public setPostcode = element(by.css("input"));;
    public clickPostcode = element(by.cssContainingText("button", "Find postcode"));
}