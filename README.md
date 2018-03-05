The Packages and Languages used in the framework are Protractor, Cucumber.js, Chai, TypeScript, Node.js and NPM. 

Ensure that chrome browser is updated to the latest before running the webdriver.
Install latest version of Node.js, this should install both node and npm.  
To check versions of Node and NPM,  run 'node -v' and 'npm -v' from the command line.
To run the tests navigate to the parent directory and run the following commands.

To install required dependencies 
# npm install

Update all webdriver versions
# npm run update

Please keep in mind, that selenium server should be running seperately in the background for Protractor tests. 
To start the selenium server (may require Java installed, is so install Java and include java path in env. variables)
# npm run selenium

In seperate terminal to run the tests, this will compile and run the web-smoke.js file
# npm ctm


Report, and Screenshots for any failed tests will be available in reports/ folder. Happy to answer any questions.
