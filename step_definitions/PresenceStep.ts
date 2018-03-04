import { binding, given, then, when , before, after} from "cucumber-tsflow";
import { browser, $, element, protractor, by } from "protractor";
import { Utils } from "../utils";
let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;

@binding()
class PresenceStep {

    private utils = new Utils();

    @then(/^I should see "([^"]*)" button$/)
    public IShouldSeeCheckoutButton (arg1, callback): void {
       this.utils.isPresent(element(by.cssContainingText("span", arg1)), callback);
    }
}

export = PresenceStep;
