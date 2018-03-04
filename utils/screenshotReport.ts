import { Config } from "./config";
let fs = require("fs-extra");
var Q  = require("q");


export class ScreenshotReport {
    private ops;
    private browserName;
    private testName;


    private config: Config = new Config();

    public generateReport() {
        this.ops = this.config.get("opS");
        this.browserName = this.config.get("browserName");
        this.testName = this.config.get("testName");
        var deferred = Q.defer();
        var files = fs.readdirSync(this.config.get("diffImagesFolder"));
        var ssReportPath = "./reports/" + this.config.get("opS") + "/" + this.config.get("browserName") + "/screenshot.html";

         files = files.filter(function(file) {
            return file.substr(-4) === ".png";
        });

        let buildString = "<style> .visual {width:30%; margin: 30px 30px 30px 30px; } h1{display: inline-block; width:31%; text-align: center; border: 5px solid black; margin: 5px; background-color: lightgrey;} </style>";

        if (files.length === 0 ) {
            buildString += "<h1> Screenshot Testing Pass </h1>";
            this.writeToFile(ssReportPath, buildString, () => {
                deferred.resolve();
            });
        }

        buildString += "<div style='color:black'> <h1> DiffAsset </h1> <h1> TestAsset </h1> <h1> RefAsset </h1></div>";
        files.forEach((imageName, index, array) => {
            buildString  += "<a href='../../diff-assets/" + this.testName +  "/" + this.ops + "/" + this.browserName + "/" + imageName + "'><img class='visual' src='../../diff-assets/" + this.testName +  "/" + this.ops + "/" + this.browserName + "/" + imageName + "'></a>";
            buildString  += "<a href='../../test-assets/" + this.testName +  "/" + this.ops + "/" + this.browserName + "/" + imageName + "'><img class='visual' src='../../test-assets/" + this.testName +  "/" + this.ops + "/" + this.browserName + "/" + imageName + "'></a>";
            buildString  += "<a href='../../ref-assets/" + this.testName +  "/" + this.ops + "/" + this.browserName + "/" + imageName + "'><img class='visual' src='../../ref-assets/" + this.testName +  "/" + this.ops + "/" + this.browserName + "/" + imageName + "'></a>";
            if (index === array.length - 1 ) {
                this.writeToFile(ssReportPath, buildString, () => {
                deferred.resolve();
                });
            }
        });
        return deferred.promise;
    }

    private writeToFile(path, writeString, cb) {
        fs.writeFile(path, writeString, function(err) {
            if (err) {
                console.error(err);
            }
            cb();
        });
    }
}
