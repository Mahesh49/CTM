import { binding, given, then, when, before } from "cucumber-tsflow";
import { browser, by, $, element, protractor } from "protractor";
let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;
import { Utils } from "../../utils";
import { YourSupplier } from "../page_objects/YourSupplier";
let EC = protractor.ExpectedConditions;

@binding()
class GivenSteps {
    private utils: Utils = new Utils();
    private yourSupplier: YourSupplier = new YourSupplier();

    @given(/^I am on "([^"]*)" step$/)
    public iAmOnStep(arg1, callback): void {
        browser.wait(EC.presenceOf($("input")), 5000);
        this.utils.sendText(this.yourSupplier.setPostcode(), this.yourSupplier.postcode, () => {
            this.utils.clickButton(this.yourSupplier.postcodeButton, callback);
        });
    }
}
export = GivenSteps;