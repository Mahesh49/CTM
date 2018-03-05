import { CommonPage } from './CommonPage';
import { element, by } from 'protractor';

export class YourDetails extends CommonPage {

    private emailAddress = "Email";
    public fixedTariff = ".fixed-rate-1";
    public payment = ".annual-1";
    public emailID = "testcomparison@ctm.com";
    public marketting = ".single-check>span:nth-child(3)";
    public termsConditions = "#terms-label>span:nth-child(3)";

    public setEmailAddress() {
        return element(by.id(this.emailAddress));
        
    }

}