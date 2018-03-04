import { binding, given, then, when, before } from "cucumber-tsflow";
import { browser, $, by, element, protractor } from "protractor";
let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;
import { Utils } from "../../utils";
import { YourSupplier } from "../page_objects/YourSupplier";
import { YourResults } from "../page_objects/YourResults";
import { YourEnergy } from "../page_objects/YourEnergy";
import { YourDetails } from "../page_objects/YourDetails.";
let EC = protractor.ExpectedConditions;

@binding()
class WhenSteps {
  private utils: Utils = new Utils();
  private yourSupplier: YourSupplier = new YourSupplier();
  private yourResults: YourResults = new YourResults();
  private yourEnergy: YourEnergy = new YourEnergy();
  private yourDetails: YourDetails = new YourDetails();

  @when(/^I enter "([^"]*)" into input field$/)
  public iEnterTextIntoInputField(arg1: string, callback) {
    browser.wait(EC.presenceOf($("input")), 5000);
    this.utils.sendText(this.yourSupplier.setPostcode, arg1, callback);
  }

  @when(/^I click on "([^"]*)" button$/)
  public clickOnbutton(arg1, callback: Function): void {
    this.utils.clickButton(arg1, callback);
  }

  @when(/^I click text "([^"]*)"$/)
  public iClickText(arg1: string, callback: Function): void {
    this.utils.clickText(arg1, callback);
  }

  @given(/^I click on "([^"]*)" option$/)
  public iClickonOption(arg1, callback): void {
    this.utils.clickBySelector(arg1, callback);
  }

  @given(/^I enter "([^"]*)" into input field using id1$/)
  public iEnterGaS(arg1, callback): void {
    this.utils.sendText(this.yourEnergy.setGas, arg1, callback);
  }

  @given(/^I enter "([^"]*)" into input field using id$/)
  public iEnterElectricity(arg1, callback): void {
    this.utils.sendText(this.yourEnergy.setElectricity, arg1, callback);
  }

  @given(/^I enter "([^"]*)" into input field using id2$/)
  public iEnterEmail(arg1, callback): void {
    this.utils.sendText(this.yourDetails.setEmailAddress, arg1, callback);
  }
}
export = WhenSteps;