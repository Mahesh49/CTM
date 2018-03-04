import { binding, given, then, when, before } from "cucumber-tsflow";
import { browser, by, element, protractor } from "protractor";
let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;
import { Utils } from "../../utils";

@binding()
class YourSupplier {
    private utils: Utils = new Utils();
    
    @then(/^I should see "([^"]*)" button$/)
    public IShouldSeeCheckoutButton (arg1, callback): void {
       this.utils.isPresent(element(by.cssContainingText("span", arg1)), callback);
    }
    
}
export = YourSupplier;