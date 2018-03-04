exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: "https://energy.comparethemarket.com/energy/v2/?AFFCLIE=TSTT",
    useAllAngular2AppRoots: true,
    getPageTimeout: 60000,
    allScriptsTimeout: 500000,
    framework: 'custom',
    ignoreUncaughtExceptions: true,
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    specs: [
        './features/*.feature',
    ],
    capabilities: {
        'browserName': 'chrome',
        'recreateChromeDriverSessions': true,
        'acceptInsecureCerts': true,
        'acceptSslCerts': true,
        chromeOptions: {
            args: [
                '--start-maximized',
                'user-agent=RegressionTest'
            ]
        }
    },
    cucumberOpts: {
        require: ['../build/step_definitions/*.js', '../build/ctm/step_definitions/*.js', '../setup.js', '../report.js'],
        format: 'pretty',
        tags: ['~@ignore', '@smoke'],
        profile: false,
        'no-source': true,
        keepAlive: false
    },
    params: {
        testName: 'ctm',
        isMobileWebTest: false,
        isAppTest: false,
        resolutions: {
            small: {
                w: 320,
                h: 568
            },
            medium: {
                w: 768,
                h: 900
            },
            large: {
                w: 1220,
                h: 900
            }
        }
    }
};
