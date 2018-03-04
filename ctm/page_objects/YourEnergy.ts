import { CommonPage } from './CommonPage';
import { element, by } from 'protractor';

export class YourEnergy extends CommonPage {

    private electricity = "electricity-usage";
    private gas = "gas-usage";

    public setElectricity() {
        return element(by.id(this.electricity));
    }

    public setGas() {
        return element(by.id(this.gas));
    }

}