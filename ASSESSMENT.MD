# QA Engineer Assessment

## Introduction

This is the FedEx Digital International QA Engineer assessment. The purpose is to give us
insight in your technical abilities, development approach and general technical
working habits. We view your performance on this assessment as indicative of
the work you will deliver as a QA Engineer.

Good luck!

## Tips

* Choose an IDE to your liking (We recommend the Free Micrsoft Visual Studio Code)
* It should not take more than a three to four hours to demonstrate your skills with this project
* If you get stuck (especially with the app itself or installations), please contact us
* Refactor and restructure anything in the project if you think that works better
* When you `npm start` the application know that `npm run e2e` will start it again (and fail). So kill a running application if startup fails.
* We have left the angular + cypress builder configuration empty in angular.json file, we'll leave it to you to update it

Please provide your documentation in the [ASSESSMENT-SOLUTION.MD](./ASSESSMENT-SOLUTION.MD) file.

## Assignment

### Start

1. Using the instructions attached to the project [README.MD](./README.md), configure your local environment
2. Complete the above setup so that you can execute the existing scenario without problems

### The coding

3. In the [README.MD](./README.md) file, you will see the APP Specs, this will be the basis for you test cases. Please read these carefully.
4. Write test automation scripts using below options
4.1 **using Cucumber and cypress (BDD approach)** that would document the user stories, verify the application features, whilst also including comments on code you write
4.2  **using mocha and cypress (describe and IT block)**
5. add test reports support to show test exceution status
6. Please report any bugs or anomalies you will find
7. Also note that the sourcecode of the app is running on your machine so you have full access to make your test code as efficient as possible
8. In angular.json file. Fix tnt-assignment-e2e block by using cypress builder if you want to run cypess test using command `ng e2e`

### Done? -> The feedback

When the assessment is completed and your tests run and show your skills, push your work to GitHub and provide us a link of your branch. Alternatively zip your project (exclude node_modules folder please) and email it back to us

## Important Notice

* By doing this assignment, you are bound by our confidentiality and data protection policies. That means that you are not allowed to discuss or share anything to any third party (public internet, physical person, company, etc.)
* You most probably will be asked to answer various questions around your deliverables of the assignment afterwards

We ask you to treat this assessment as confidential so we can apply the scenarios to
future candidates also. Your solution will not be kept after the assessment and
will not be used by FedEx Digital International.