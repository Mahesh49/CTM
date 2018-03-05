import { binding, then } from "cucumber-tsflow";
let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;
import { Utils } from "../../utils/utils";
import { YourResults } from "../page_objects/YourResults";

@binding()
class ThenSteps {
    private utils: Utils = new Utils();
    private yourResults: YourResults = new YourResults();

    //Verifying that there is atleast one aupplier quote available to choose
    @then(/^I should see supplier recommendations$/)
    public iShouldSeeSupplierrecommendations(callback) {
        this.yourResults.getSupplier().count().then((count) => {
            expect(count).to.be.above(0);
            callback();
        });
    }
}
export = ThenSteps;