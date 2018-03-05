import { binding, before, after } from "cucumber-tsflow";
import { Utils } from "../../utils/utils";

@binding()
class CommonSteps {
    private utils: Utils = new Utils();

    @before()
    public beforeEachScenario(scen, callback: Function): void {
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