var Cucumber = require('cucumber');
var fs = require('fs');
var ssReport = require('./build/utils/screenshotReport').ScreenshotReport;

module.exports = function () {
  var createHtmlReport = function (sourceJson, browserName, os) {
    var CucumberHtmlReport = require('cucumber-html-report');
    var dest = './reports/' + os + '/' + browserName
    var report = new CucumberHtmlReport({
      source: sourceJson,
      dest: dest,
      template: './reports/template/default.html'
    });
    report.createReport();
  };

  var JsonFormatter = Cucumber.Listener.JsonFormatter();

  JsonFormatter.log = function (string) {
    browser.getProcessedConfig().then(function (data) {
      var browserName
      var os;
      if (browser.params.isAppTest) {
        os = data.capabilities.platformName;
        browserName = data.capabilities.deviceName;
      } else {
        os = getOperatingSystem();
        browserName = data.capabilities.browserName;
      }
      var targetJson = './reports/' + os + '/' + browserName + '/cucumber_report.json';
      fs.writeFile(targetJson, string, function (err) {
        if (err) {
          console.log('Failed to save cucumber test results to json file.');
          console.log(err);
        } else {
          let ssreportGen = new ssReport();
          ssreportGen.generateReport().then(() => {
            createHtmlReport(targetJson, browserName, os);
          });
        }
      });
    });
  };

  this.registerListener(JsonFormatter);
  var getOperatingSystem = function () {
    var osString = process.platform;
    if (osString.indexOf('win') !== -1) {
      return 'Windows';
    } else {
      return 'Unix';
    }
  }
};