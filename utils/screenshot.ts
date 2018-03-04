import { Config } from "./config";
import { browser, protractor } from "protractor";
let fs = require("fs-extra");
declare var wdBrowser;

/**
 * @class Screenshot
 */
export class Screenshot {
    private screensCount = 0;
    private folderRunKey = "HasRunPrepareFolders";
    private config;

    constructor() {
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
            var self = this;
            var opS;
            var browserName;

            browser.getProcessedConfig().then(function (data) {
                    opS = self.getOperatingSystem();
                    browserName = data.capabilities.browserName;
                self.config.set("opS", opS);
                self.config.set("browserName", browserName);
                protractor.promise.all([
                    fs.emptyDir("./reports/" + opS + "/" + browserName),
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
}
