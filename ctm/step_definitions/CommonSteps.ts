import { binding, given, then, when, before, after } from "cucumber-tsflow";
import { browser, by, element, protractor } from "protractor";
let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;
import { Utils } from "../../utils";

@binding()
class CommonSteps {
    private utils: Utils = new Utils();

    @before()
    public beforeEachScenario(scen, callback: Function): void {
        this.utils = new Utils();
        //browser.restart();
        this.utils.init().then(callback);
    }

    @after()
    public AfterEachScenario(scenario, callback): void {
        if (scenario.isFailed()) {
            this.utils.screenshot.takeWebSS(scenario, () => {
                this.utils.clearStorage().then(callback);
            });
        } else {
            this.utils.clearStorage().then(callback);
        }
    }
}
export = CommonSteps;