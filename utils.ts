import { browser, protractor, $, element, by, ElementFinder, ElementHelper, ElementArrayFinder, WebElementPromise } from 'protractor';
import { Screenshot } from './utils/screenshot';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

export class Utils {
    public screenshot: Screenshot = new Screenshot();

    public init(): any {
        var self = this;
        var defferred = protractor.promise.defer();
        this.screenshot.prepareFolders().then(function () {
            browser.ignoreSynchronization = false;
            var url = browser.baseUrl;
            browser.manage().deleteAllCookies().then(function () {
               browser.get(url).then(function () {
                  defferred.fulfill();
               });
            });
        });
        return defferred.promise;
    }

    /**
     * @method clickBySelector
     * @desc Click the selector provided
     * @param selector css selector of the element to click
     * @param callback
     * @param text the text the element should contain
     * @param count if required
     * @param context if required
    **/
    public clickBySelector(selector: string, callback, text = undefined, count = 0, context = undefined): void {
        this.waitToAppearThenClick(this.getElementHelper(selector, text), callback, count, context);
    }

    /**
     * @method clickButton
     * @desc click the button with this text
     * @param text the text the button should contain
     **/
    public clickButton(text: string, callback): void {
        this.waitToAppearThenClick(this.getElementHelper("button", text), callback);
    }

    /**
     * @method sendText
     * @desc enters text in the input field
     * @param cssselector and text
     **/
    public sendText(elm: ElementFinder, text: string, callback): void {
        var promises = [];
        elm.sendKeys(text).then(() => {
            elm.getAttribute("value").then((value) => {
                if (value !== text) {
                    elm.clear().then(() => {
                        for (let i = 0; i < text.length; i++) {
                            promises.push(elm.sendKeys(text.charAt(i)));
                        }
                        protractor.promise.all(promises).then(() => {
                            callback();
                        });
                    });
                } else {
                    callback();
                }
            });
        });
    }
    
    private getElementHelper(selector, text = undefined) {
        var elm;
        if (text === undefined) {
            elm = element.all(by.css(selector));
        } else {
            text.replace(/ /g, "");
            elm = element.all(by.cssContainingText(selector, text));
        }
        return elm;
    }

    private waitToAppearThenClick(elm: ElementArrayFinder, callback, count = 0, context = undefined): void {
        let displayedElement = elm.filter((elem) => {
            return elem.isDisplayed();
        });
        displayedElement.count().then((elmCount) => {
            if (elmCount === 0) {
                throw false;
            } else {
                displayedElement.first().click().then(() => {
                    callback();
                });
            }
        })
            .catch((e) => {
                if (count === 4) {
                    let errorMessage = "element " + elm.locator() + " not found";
                    if (context) {
                        errorMessage = "\nContext:\n" + context + "\nError: " + errorMessage;
                    }
                    expect(false, errorMessage).to.be.true;
                } else {
                    count++;
                    browser.sleep(count * 400).then(() => {
                        this.waitToAppearThenClick(elm, callback, count, context);
                    });
                }
            });
    }

    /**
     * @method clearStorage
     * @desc Clear browser's local storage and session storage
     **/
    public clearStorage() {
        return browser.executeScript("window.localStorage.clear();").then(() => {
            browser.executeScript("window.sessionStorage.clear();");
        });
    }
}
