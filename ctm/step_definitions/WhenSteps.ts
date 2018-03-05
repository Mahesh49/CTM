import { binding, when } from "cucumber-tsflow";
import { browser, $, protractor } from "protractor";
let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;
import { Utils } from "../../utils/utils";
import { YourSupplier } from "../page_objects/YourSupplier";
import { YourResults } from "../page_objects/YourResults";
import { YourEnergy } from "../page_objects/YourEnergy";
import { YourDetails } from "../page_objects/YourDetails.";
import { CommonPage } from "../page_objects/CommonPage";
let EC = protractor.ExpectedConditions;

@binding()
class WhenSteps {
  private utils: Utils = new Utils();
  private yourSupplier: YourSupplier = new YourSupplier();
  private yourResults: YourResults = new YourResults();
  private yourEnergy: YourEnergy = new YourEnergy();
  private yourDetails: YourDetails = new YourDetails();
  private commonPage: CommonPage = new CommonPage();

  @when(/^I choose to compare Gas & Electricity$/)
  public iChooseToCompareGasAndElectricity(callback) {
    this.utils.clickBySelector(this.yourSupplier.comapareGasElectricity, () => {
      this.utils.clickButton(this.commonPage.clickNext, callback);
    });
  }

  @when(/^I enter units "([^"]*)" for "([^"]*)"$/)
  public iEnterUnitsFor(arg1, arg2, callback): void {
    if (arg2 == "Gas") {
      this.utils.sendText(this.yourEnergy.setGas(), arg1, callback);
    } else {
      this.utils.sendText(this.yourEnergy.setElectricity(), arg1, callback);
    }
  }

  @when(/^I click on "([^"]*)" button$/)
  public clickOnbutton(arg1, callback: Function): void {
    this.utils.clickButton(arg1, callback);
  }

  @when(/^I choose "([^"]*)" option$/)
  public iChooseOption(arg1, callback): void {
    var element = undefined;
    if (arg1 == "Fixed tariff") {
      element = this.yourDetails.fixedTariff;
    } else {
      element = this.yourDetails.payment;
    }
    this.utils.clickBySelector(element, callback);
  }

  @when(/^I fill all mandatory fileds$/)
  public iFillAllMandatoryFields(callback) {
    this.utils.sendText(this.yourDetails.setEmailAddress(), this.yourDetails.emailID, () => {
      this.utils.clickBySelector(this.yourDetails.marketting, () => {
        this.utils.clickBySelector(this.yourDetails.termsConditions, callback);
      });
    });
  }

  @when(/^I choose to compare Gas$/)
  public iChooseToCompareGas(callback) {
    this.utils.clickBySelector(this.yourSupplier.comapareGas, () => {
      this.utils.clickButton(this.commonPage.clickNext, callback);
    });
  }

  @when(/^I choose to compare Electricity$/)
  public iChooseToCompareElectricity(callback) {
    this.utils.clickBySelector(this.yourSupplier.comapareElectricity, () => {
      this.utils.clickButton(this.commonPage.clickNext, callback);
    });
  }
}
export = WhenSteps;