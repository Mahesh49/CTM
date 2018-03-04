@smoke
Feature: Gas & Electricity - Quotes
As a Compare the Market cutomer
I want to be able to get quotes for Gas & Electricity
So I can comare the quotes and may choose what suits me best


  Scenario: Gas & Electricity 
    Given I am on "Your Supplier" step
    When I choose to compare Gas & Electricity
    And I enter units "100" for "Electricity"
    And I click on "Next" button
    And I enter units "100" for "Gas"
    And I click on "Next" button
    And I choose "Fixed tariff" option
    And I choose "Payment" option
    And I fill all mandatory fileds
    And I click on "Go to prices" button
    Then I should see supplier recommendations

# @smoke
#  Scenario: Gas & Electricity2
#     Given I am on "Your Supplier" step
#     When I choose to compare Gas & Electricity
#     And I enter all required fileds
#     Then I should see results in "Your Results" step 

