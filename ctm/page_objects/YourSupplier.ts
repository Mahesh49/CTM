import { CommonPage } from './CommonPage';
import { element, by } from 'protractor';

export class YourSupplier extends CommonPage {

    private postcodeField = "input";
    public postcodeButton = "Find postcode";
    public postcode = "PE2 6YS";
    public comapareGasElectricity = ".energy-gas-electricity";
    public comapareGas = ".energy-gas";
    public comapareElectricity = ".energy-electricity";

    public setPostcode(){
        return element(by.css(this.postcodeField));
    }
}