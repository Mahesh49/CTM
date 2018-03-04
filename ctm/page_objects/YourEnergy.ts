import { CommonPage } from './CommonPage';
import { element, by } from 'protractor';

export class YourEnergy extends CommonPage {
     
    public setElectricity = element(by.css("#electricity-usage")); 
    public setGas = element(by.css("#gas-usage"));
}