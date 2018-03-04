import { binding, given, then, when , before, after} from "cucumber-tsflow";
import { browser, element, by } from "protractor";
import { Utils } from "../utils";

@binding()
class ClickSteps {

    private utils = new Utils();

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
}
export = ClickSteps;