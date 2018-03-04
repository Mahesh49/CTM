@smoke
Feature: Gas Only - Quotes
  As a Compare the Market cutomer
  I want to be able to get quotes for Gas Only
  So I can comare the quotes and may choose what suits me best


  Scenario: Gas Only 
     Given I enter "PE2 6YS" into input field
     And I click on "Find postcode" button
     And I click on ".energy-gas" option
     And I click on "Next" button
     Given I enter "100" into input field using id1
     And I click on "Next" button
     And I click on ".fixed-rate-1" option
     And I click on ".annual-1" option
     And I click on ".fixed-rate-1" option
     Given I enter email "mahesh49021@gmail.com"
     And I click on ".single-check>span:nth-child(3)" option
     And I click on "#terms-label>span:nth-child(3)" option
     And I click on "Go to prices" button
     Then I should see "Our recommendations" button