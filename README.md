Ensure that chrome browser is updated to the latest before running the webdriver.
Install latest version of Node.js, this should install both node and npm.  
To check versions run 'node -v' and 'npm -v'
Navigate to the parent directory and run the following commands to run the tests

To install required dependencies 
# npm install

Update all webdriver versions
# npm run update

Start the webdriver server (may require Java installed, is so install Java and include java path in env. variables)
# npm run selenium

In seperate terminal to run the tests, this will compile and run the web-smoke.js file
# npm ctm


Report, and Screenshots for any failed tests will be available in reports/ folder
