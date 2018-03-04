import { browser, protractor, $, element, by, ElementFinder, ElementHelper, ElementArrayFinder, WebElementPromise, WebDriver } from 'protractor';
import { Screenshot } from './utils/screenshot';
import { Config } from './utils/config';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
declare var wdBrowser;
var until = require('selenium-webdriver').until;

export class Utils {
    private resolutions;
    public screenshot : Screenshot;
    public config : Config;

    constructor () {
        this.resolutions = browser.params.resolutions;
        this.screenshot = new Screenshot();
        this.config = new Config();
    }

    /**
     * @method init
     * @desc initialise utils for a journey/scenario/feature
     * @param callback
     */
    public init (): any {
        var self = this;
        var defferred = protractor.promise.defer();
        this.screenshot.prepareFolders().then(function() {
            browser.ignoreSynchronization = false;
            var url =browser.baseUrl;
            browser.get(url).then(function(){
                defferred.fulfill();
            });
        });
        return defferred.promise;
    }

    /**
     * @method takeSS
     * @desc take a screenshot (at all resolutions)
     * @param imageNameArg the name of the screenshot
     **/
    public takeSS (imageNameArg: string, journeyName: string, callback) : void {
            this.takeWebSS(imageNameArg, journeyName, callback);
    }

    private takeWebSS(imageNameArg: string, journeyName: string, callback) {
        var promises = [];
        for (var displaySize in this.resolutions) {
            this.screenshot.setBrowserSize(displaySize);
            // Disable gifs, video, and css animations  to make sure the screen shots more reliable
            this.screenshot.setGifsVisibility(false);
            this.screenshot.setVideoVisibility(false);
            this.screenshot.removeCssAnimations();
            promises.push(this.screenshot.doTakeSS(imageNameArg, journeyName, displaySize));
        }
        protractor.promise.all(promises).then(() => {
            this.screenshot.setBrowserSize();
            this.screenshot.setGifsVisibility(true);
            this.screenshot.setVideoVisibility(true);
            callback();
        });
    }

    /**
     * @method clickText
     * @desc click the first element found that contains a specified bit of text
     * @param text
     * @param [type=p] selector
     **/
    public clickText (text, callback, type = "p", count = 0, context = undefined): void {
        this.waitToAppearThenClick(this.getElementHelper(type, text), callback, count, context);
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
    public clickBySelector(selector: string, callback, text = undefined, count = 0, context = undefined) : void {
        this.waitToAppearThenClick(this.getElementHelper(selector, text), callback, count, context);
    }

    /**
     * @method clickElement
     * @desc Click the Element
     * @param elem ElementFinder
     * @param callback
     * @param count if required
     **/
    public clickElement(elem: ElementFinder, callback, count = 0) : void {
        this.waitToAppearThenClick(element.all(elem.locator()), callback, count);
    }

    /**
     * @method clickButton
     * @desc click the button with this text
     * @param text the text the button should contain
     **/
    public clickButton(text: string, callback) : void {
        this.waitToAppearThenClick(this.getElementHelper("button", text), callback);
    }


    /**
     * @method sendText
     * @desc enters text in the input field
     * @param cssselector and text
     **/
    public sendText (elm: ElementFinder, text: string, callback): void {
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


    private waitToAppearThenClick (elm: ElementArrayFinder, callback, count = 0, context = undefined): void {
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
     * @method isPresent
     * @desc Given an element detemine wether it is currently displayed on the page
     * @param elm the element to check is present
     * @param callback
     * @param count if required
     * @param context if required
     **/
    public isPresent (elm: ElementFinder, callback, throwsError = true, context = undefined, count = 0): void {
         elm.isDisplayed().then((res) => {
            if (res) {
              callback();  //to-do: why callback(true) is failing
            } else {
              if (throwsError) {
                throw false;
              } else {
                callback(false);
              }
            }
         }).catch((e) => {
            if (count === 4){
                 let errorMessage = "element " + elm.locator() + " not found";
                if (context) {
                    errorMessage = "\nContext:\n" + context + "\nError: " + errorMessage;
                }
                if (throwsError) {
                    expect(false, errorMessage).to.be.true;
                } else {
                   callback(false);
               }
            } else {
                ++count;
                browser.sleep(count * 400).then(() => {
                    this.isPresent(elm, callback, throwsError, context, count);
                });
            }
         });
    }

    /**
     * @method isPresentBySelector
     * @desc Click the selector provided
     * @param selector css selector of the element to check
     * @param callback
     * @param text the text the element should contain
     * @param count if required
     * @param context if required
     **/
    public isPresentBySelector(selector: string, callback, text = undefined, count = 0, context = undefined) : void {
        this.isPresent(this.getElementHelper(selector, text).first(), callback, true, context, count);
    }

    /**
     * @method clearStorage
     * @desc Clear browser's local storage and session storage
     **/
    public clearStorage () {
        return browser.executeScript("window.localStorage.clear();").then (() => {
            browser.executeScript("window.sessionStorage.clear();");
        });
    }


}
