import { CommonPage } from './CommonPage';
import { element, by } from 'protractor';

export class YourDetails extends CommonPage {
    
     public fixedTariff = element(by.css(".fixed-rate-1"));
     public payment = element(by.css(".annual-1"));
     public setEmailAddress = element(by.id("Email"));
     public marketting = element(by.css(".single-check>span:nth-child(3)"));
     public termsConditions = element(by.css("#terms-label>span:nth-child(3)"));
     public gotoPrices = element(by.cssContainingText("button", "Go to prices"));
}