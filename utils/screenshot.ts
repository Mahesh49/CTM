import { Config } from "./config";
import { browser, protractor } from "protractor";
let fs = require("fs-extra");

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
    
    public takeWebSS(scenario, callback) {
        browser.takeScreenshot().then(function (png) {
            var decodedImage = new Buffer(png.replace(/^data:image\/(png|gif|jpeg);base64,/, ""), "base64");
            scenario.attach(decodedImage, "image/png");
            callback();
        });
    }
}