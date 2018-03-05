import { binding, given } from "cucumber-tsflow";
import { browser, $, protractor } from "protractor";
import { Utils } from "../../utils/utils";
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