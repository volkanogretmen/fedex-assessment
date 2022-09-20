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
