import { Config } from "./config";
import { browser, protractor } from "protractor";
let fs = require("fs-extra");
declare var wdBrowser;

/**
 * @class Screenshot
 */
export class Screenshot {
    private screensCount = 0;
    private defaultResolution = "large";
    private folderRunKey = "HasRunPrepareFolders";
    private resolutions;
    private config;

    constructor() {
        this.resolutions = browser.params.resolutions;
        this.config = new Config();
    }

    private getOperatingSystem(): string {
        var osString = process.platform;
        if (osString.indexOf("win") !== -1) {
            return "Windows";
        } else {
            return "Unix";
        }
    }
    /**
     * @method Screenshot#prepareFolders
     * @desc ensure folders are perpared for storing screenshots during tests
     * @return void
     */
    public prepareFolders() {
        var promise = protractor.promise.defer();
        if (!this.config.get(this.folderRunKey)) {
            var testName = browser.params.testName;
            var self = this;
            var opS;
            var browserName;

            browser.getProcessedConfig().then(function (data) {
                if (browser.params.isAppTest) {
                    opS = data.capabilities.platformName;
                    browserName = data.capabilities.deviceName;
                } else {
                    opS = self.getOperatingSystem();
                    browserName = data.capabilities.browserName;
                }
                self.config.set("opS", opS);
                self.config.set("browserName", browserName);
                self.config.set("testName", testName);
                [{
                    name: "testImagesFolder",
                    path: "/test-assets/",
                }, {
                    name: "diffImagesFolder",
                    path: "/diff-assets/"
                }, {
                    name: "refImagesFolder",
                    path: "/ref-assets/"
                }].forEach(function(folderMeta, i) {
                    self.config.set(folderMeta.name, "./reports" + folderMeta.path + testName  + "/" + opS + "/" + browserName + "/" );
                    fs.mkdirs(self.config.get(folderMeta.name), function (err) {
                        if (err) {
                            return console.error(err);
                        }
                    });

                    for (var displaySize in this.resolutions) {
                        self.defaultResolution = displaySize;
                    }
                }.bind(self));

                protractor.promise.all([
                    fs.emptyDir("./reports/" + opS + "/" + browserName),
                    fs.emptyDir("./reports/diff-assets/" + testName +  "/" + opS + "/" + browserName),
                    fs.emptyDir("./reports/test-assets/" + testName + "/" + opS + "/" + browserName )
                ]).then(() => {
                    promise.fulfill();
                },
                err => {
                    console.error(err);
                });
            });
            this.config.set(this.folderRunKey, true);
        } else {
            promise.fulfill();
        }
        return promise.promise;
    }
    /**
     * @method Screenshot#doTakeSS
     * @desc take screenshot and store it under the current test suite > test assets > screensize - journeyname.png
     * @param imageNameArg identified for image name
     * @param screensize screensize identifier
     * @return full path of image
     */
    public doTakeSS(imageNameArg: string, journeyName: string, screenSize: string): any {
        var screenPath = "";
        screenPath = this.config.get("testImagesFolder")
            + screenSize + "-" + journeyName + "-" + imageNameArg +
            ".png";
        var self = this;
        var deferred = protractor.promise.defer();
        browser.driver.sleep(this.config.get("stabalizationDelay")).then(() => {
            browser.takeScreenshot().then(function (png) {
                var res = fs.existsSync(screenPath);
                if (res) {
                    var increment = self.config.get(screenPath);
                    if (increment === undefined) {
                        increment = 1;
                    } else {
                        increment++;
                    }
                    self.config.set(screenPath, increment);
                    var position = screenPath.indexOf(".png");
                    screenPath = [screenPath.slice(0, position), increment, screenPath.slice(position)].join("");
                }
                var stream = fs.createWriteStream(screenPath);
                stream.write(Buffer.from(png, "base64"));
                stream.end(function () {
                    deferred.fulfill();
                });
            });
        });

        return deferred.promise;
    }

    public takeWebSS(scenario, callback) {
        browser.takeScreenshot().then(function (png) {
            var decodedImage = new Buffer(png.replace(/^data:image\/(png|gif|jpeg);base64,/, ""), "base64");
            scenario.attach(decodedImage, "image/png");
            callback();
        });
    }

    /**
     * @method Screenshot#setGifsVisibility
     * @desc show or hide .gif images
     * @param show boolean true for visible false for hidden
     * @return void
     */
    public setGifsVisibility(show: boolean) {
        var propertyValue = !show ? "hidden" : "visible";
        browser.executeScript(
            'for(var images=document.images,imageLength=images.length,i=0;imageLength>i;i++)images[i].src.endsWith(".gif")&&(images[i].style.visibility="%propertyValue%");'
                .replace("%propertyValue%", propertyValue));
    }

    /**
     * @method Screenshot#setVideoVisibility
     * @desc show or hide . images
     * @param show boolean true for visible false for hidden
     * @return void
     */
    public setVideoVisibility(show: boolean) {
        var propertyValue = !show ? "hidden" : "visible";
        browser.executeScript(
            'for(var videos=document.getElementsByTagName("video"),videosLength=videos.length,i=0;videosLength>i;i++)(videos[i].style.visibility="%propertyValue%");'
                .replace("%propertyValue%", propertyValue));
    }

    /**
     * @method removeCssAnimations
     * @desc remove CSS animattion while screen shot testing
     * @param none
     * @return void
     */
    public removeCssAnimations() {
        browser.executeScript(this.disableCSSAnimations);
    }

    /**
     * @method disableCSSAnimations
     * @desc remove CSS animattion while screen shot testing
     * @param none
     * @return void
     */
    private disableCSSAnimations() {
        var css = '* {' +
          '-webkit-transition-duration: 0s !important;' +
          'transition-duration: 0s !important;' +
          '-webkit-animation-duration: 0s !important;' +
          'animation-duration: 0s !important;' +

          '}',
          head = document.head || document.getElementsByTagName('head')[0],
          style = document.createElement('style');

          style.type = 'text/css';
          style.appendChild(document.createTextNode(css));
          head.appendChild(style);
    }

    /**
     * @method Screenshot#setBrowserSize
     * @desc change the browser size
     * @param screenName recognised screename set in the conf.js usally small medium or large
     * @return void
     */
    public setBrowserSize(screenName = this.defaultResolution): void {
        browser.driver.manage().window().setSize(this.resolutions[screenName].w, this.resolutions[screenName].h).then(function () {
            return browser.executeScript("window.scrollTo(0, 0)");
        });
    }
}
