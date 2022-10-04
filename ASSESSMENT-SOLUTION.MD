# Update 04-10-2022
The mocha (it-steps, option 4.2) way is working as intended, but I can't get the cucumber way working. I've tried my best to resolve the issues, but there seem to be a lot of dependencies that are being outdated and conflicting each other. I've used Cypress 3.0.0, 5.0.0 and 10.0.0 (all with different NPM versions as well) and all give the same error when I'm trying to run the project out of the box (`npm run start` + `npm run e2e`). I'm using @cypress/schematic 2.1.1 as a builder and updated the angular.json accordingly. I get the following error when running a simple test:

```
"Schema validation failed with the following errors:
  Data path ".builders['cypress']" should have required property 'class'."
 ```

The 197 vulnerabilities (from which 26 critical and 87 high) with npm aren't helping either probably.

In practice we would have resolved this a lot sooner, probably wouldn't have this issue in the first place because of updated dependencies, but for now this is taking too much time from me sadly. I've updated this readme with some additional steps to install the project. As Cypress 10 is being used, you need a newer node version (16.x) and also do an npm install after pulling the repository.

# Assessment Solution by Volkan Ogretmen
Date: 19-09-2022

First of all, thank you for the great assessment, I had a blast while doing it!

## Test file setup
- I'm using Cypress 10.x.x which changes the filenames to be `.cy.ts`. The test file is now called `app.cy.ts`.
- There are some basic variables at the top of the file to reuse later
- Locators are introduced to easily maintain changes in data attributes, classnames or id's, ideally these should be moved to a separate file
- `[data-test]` attributes are implemented in the app to easily identify elements
- Different arrays of Characters, Planets and Meta data are used to assert and/or loop over in the tests
- Tests are split on `context` level
- Each `context` has multiple `it` steps, which describes a separate test. Therefore, each `it` step can be run isolated
- There is 1 failing test, which is on purpose, because the behaviour is not as expected (BDD approach)

## Running the test
- Use Node version 16.x.x (e.g. 16.15.1) as Cypress 10 is used
- Install NPM dependencies `npm install`
- Start the server by running `npm run start` or `ng serve`
- Either run `npm run cy:open`
- Or use `npm run cy:run` for headless

## Remarks
- Both Angular + TypeScript are faily new for me (coming from plain JS + React/Vue), so forgive me for any noob errors regarding this
- Added some simple config to `cypress.config.ts`
- Added `cypress-mochawesome-reporter` as a reporter, report is being outputted to `cypress/reports/`. Open `index.html` in your local browser to view the report.
- Linting passed

## Bugs / Missing functionality
- Clearing the search bar, switching checkboxes and searching again should clear the results. It doesn't (bug)
- More results are given back in the reponse than shown on screen (no pagination)
- More meta-data are given back in the response than shown on screen
- Trailing spaces are not trimmed off (e.g. `?search=%20%20%20%20%20%20%20%`... is allowed). Backend API issue I presume.
