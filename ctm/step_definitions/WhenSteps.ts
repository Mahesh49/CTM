import { binding, given, then, when, before } from "cucumber-tsflow";
import { browser, $, by, element, protractor } from "protractor";
let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;
import { Utils } from "../../utils";

@binding()
class YourSupplier {
    private utils: Utils = new Utils();

    @when(/^I enter "([^"]*)" into input field$/)
    public iEnterTextIntoInputField(arg1: string, callback) {
       var EC = protractor.ExpectedConditions;
       browser.wait(EC.presenceOf($("input")), 5000);
       browser.driver.findElement(by.css("input")).sendKeys(arg1).then(callback);
    }

    @when(/^I enter "([^"]*)" in to the email field$/)
    public enterEmail(arg1: string, callback: Function) {
        this.utils.sendText(element(by.css('[type="email"]')), arg1, callback);
    }

    @when(/^I click on "([^"]*)" button$/)
    public clickOnbutton (arg1, callback: Function): void {
        this.utils.clickButton(arg1, callback);
    }

    @when(/^I click text "([^"]*)"$/)
    public iClickText (arg1: string, callback: Function): void {
        this.utils.clickText(arg1, callback);
    }

    @when(/^I click span "([^"]*)"$/)
    public Clickspan (arg1, callback: any): void {
        this.utils.clickText(arg1, callback, "span");
    }

    @given(/^I click on "([^"]*)" option$/)
    public iClickonOption (arg1, callback): void {
         this.utils.clickBySelector(arg1, callback);
    }

    @given(/^I enter "([^"]*)" into input field using id1$/)
       public iEnterGaS (arg1, callback): void {
         this.utils.sendText(element(by.css('#gas-usage')), arg1, callback);
       }
     
     @given(/^I enter "([^"]*)" into input field using id$/)
       public iEnterElectricity (arg1, callback): void {
         this.utils.sendText(element(by.css('#electricity-usage')), arg1, callback);
       }

       @given(/^I enter "([^"]*)" into input field using id2$/)
       public iEnterEmail (arg1, callback): void {
         this.utils.sendText(element(by.css('#Email')), arg1, callback);
       }




}
export = YourSupplier;