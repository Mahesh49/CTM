import { binding, given, then, when , before, after} from "cucumber-tsflow";
import { browser, $, element, protractor, by } from "protractor";
import { Utils } from "../utils";
import { Config } from "../utils/config";
let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;
@binding()
class GeneralSteps {

    private utils: Utils;
    private config = new Config();
    
    @before()
    public beforeEachScenario (scen, callback: Function): void {
        this.utils = new Utils();
        this.utils.init().then(callback);
    }

    @after()
    public AfterEachScenario (scenario, callback): void {
        if (scenario.isFailed()) {
                this.utils.screenshot.takeWebSS(scenario, () => {
                    this.utils.clearStorage().then(callback);
                    });
        } else {
            this.utils.clearStorage().then(callback);
        }
    }
}

export = GeneralSteps;
