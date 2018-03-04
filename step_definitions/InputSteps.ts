import { binding, given, then, when , before, after} from "cucumber-tsflow";
import { browser, $, element, protractor, by } from "protractor";
import { Utils } from "../utils";

@binding()
class InputSteps {

    private utils = new Utils();
    
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
}

export = InputSteps;
