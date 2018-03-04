@smoke
Feature: Gas & Electricity - Quotes
As a Compare the Market cutomer
I want to be able to get quotes for Gas & Electricity
So I can comare the quotes and may choose what suits me best


  Scenario: Gas & Electricity 
    Given I enter "PE2 6YS" into input field
    And I click on "Find postcode" button
    When I click on ".energy-gas-electricity" option
    And I click on "Next" button
    And I enter "100" into input field using id
    And I click on "Next" button
    And I enter "100" into input field using id1
    And I click on "Next" button
    And I click on ".fixed-rate-1" option
    And I click on ".annual-1" option
    And I click on ".fixed-rate-1" option
    And I enter "mahesh49021@gmail.com" into input field using id2
    And I click on ".single-check>span:nth-child(3)" option
    And I click on "#terms-label>span:nth-child(3)" option
    And I click on "Go to prices" button
    Then I should see "Our recommendations" button