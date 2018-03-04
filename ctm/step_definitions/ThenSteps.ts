import { binding, given, then, when, before } from "cucumber-tsflow";
import { browser, by, element, protractor } from "protractor";
let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;
import { Utils } from "../../utils";
import { YourResults } from "../page_objects/YourResults";

@binding()
class ThenSteps {
    private utils: Utils = new Utils();
    private yourResults: YourResults = new YourResults();

    @then(/^I should see supplier recommendations$/)
    public IShouldSeeCheckoutButton(callback) {
        this.yourResults.getSupplier().count().then((count) => {
            expect(count).to.be.above(0);
            callback();
        });
    }
}
export = ThenSteps;