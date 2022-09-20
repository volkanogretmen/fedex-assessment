/// <reference types="cypress" />
const apiUriPeople = '/api/people/?search**';
const apiUriPlanets = '/api/planets/?search**';

const locators = {
  "characterCheckbox": "[data-test='cy-people-checkbox']",
  "characterResults": "[data-test='cy-character-results']",
  "errorMessage": "[data-test='cy-error-message']",
  "loadingMessage": "[data-test='cy-loading-message']",
  "planetCheckbox": "[data-test='cy-planets-checkbox']",
  "planetResults": "[data-test='cy-planet-results']",
  "searchButton": "[data-test='cy-search-button']",
  "searchInput": "[data-test='cy-search-input']"
}

const characters:Array<string> = [
  "Luke Skywalker",
  "Leia Organa",
  "r2"
]

const planets:Array<string> = [
  "Alderaan",
  "Hoth"
]

const metaDataCharacters:Array<string> = [
  "Gender",
  "Birth year",
  "Eye color",
  "Skin color"
]

const metaDataPlanets:Array<string> = [
  "Population",
  "Climate",
  "Gravity"
]

describe("Star Wars Search web application", () => {
  beforeEach(() => {
    cy.visit('/');
  })
  
  context('Search by character', () => {    
    beforeEach(() => {
      cy.intercept(apiUriPeople).as('searchPeople');
      cy.get(locators.characterCheckbox).check().should('be.checked');
    });

    it('should display meta data when the character is VALID', () => {
      characters.forEach((character) => {
        cy.get(locators.searchInput).clear().type(character).type('{enter}');
        cy.wait('@searchPeople');

        metaDataCharacters.forEach((data) => {
          cy.get(locators.characterResults)
            .should('be.visible')
            .and('have.length.at.least', 1)
            .and('contain', data);
        });
      })
    });

    it('should display an error message when the character is INVALID', () => {
      cy.get(locators.searchInput).type('Iron Man').type('{enter}');
      cy.wait('@searchPeople');

      cy.get(locators.characterResults).should('not.exist');
      cy.get(locators.errorMessage).should('be.visible').and('contain', "Not found")
    });

    it('should be able to display multiple search results', () => {
      cy.get(locators.searchInput).type('Darth').type('{enter}');
      cy.wait('@searchPeople');

      cy.get(locators.characterResults).should('be.visible').and('have.length.above', 1);
    });
  })

  context('Search by planet', () => {    
    beforeEach(() => {
      cy.intercept(apiUriPlanets).as('searchPlanets');
      cy.get(locators.planetCheckbox).check().should('be.checked');
    });

    it('should display meta data when the planet is VALID', () => {
      planets.forEach((planet) => {
        cy.get(locators.searchInput).clear().type(planet).type('{enter}');
        cy.wait('@searchPlanets');
        cy.get(locators.planetResults).should('be.visible').and('have.length.at.least', 1);
        
        metaDataPlanets.forEach((data) => {
          cy.get(locators.planetResults).should('contain', data);
        });
      })
    });

    it('should display an error message when the character is INVALID', () => {
      cy.get(locators.searchInput).type('Asgard').type('{enter}');
      cy.wait('@searchPlanets');

      cy.get(locators.planetResults).should('not.exist');
      cy.get(locators.errorMessage).should('be.visible').and('contain', "Not found")
    });
  });

  context('Misc - Functional tests', () => {
    beforeEach(() => {
      cy.get(locators.characterCheckbox).check().should('be.checked');
    });

    it('should be possible to search by clicking Search button and pressing <ENTER> key', () => {
      cy.get(locators.searchInput).clear().type('Luke Skywalker').type('{enter}');
      cy.get(locators.characterResults).should('be.visible').and('have.length.at.least', 1);
      
      cy.get(locators.searchInput).clear().type('r2');
      cy.get(locators.searchButton).click();
      cy.get(locators.characterResults).should('be.visible').and('have.length.at.least', 1);
    });

    it('should show no search results when switching searchtype after results are shown', () => {
      cy.get(locators.searchInput).clear().type('Luke Skywalker').type('{enter}');
      cy.get(locators.characterResults).should('be.visible').and('have.length.at.least', 1);
      
      cy.get(locators.planetCheckbox).check().should('be.checked');
      cy.get(locators.searchButton).click();

      cy.get(locators.planetResults).should('not.exist');
      cy.get(locators.errorMessage).should('be.visible').and('contain', "Not found");
    });

    it('🔴 FAILING TEST: should clear the search results when clearing the input and pressing "Search"', () => {
      // Additional Flow -- Bug fails the test (results are not cleared)
      cy.get(locators.searchInput).type('Luke Skywalker').type('{enter}');
      cy.get(locators.characterResults).should('be.visible').and('have.length.at.least', 1);

      cy.get(locators.searchInput).clear();
      cy.get(locators.searchButton).click();

      cy.get(locators.characterResults).should('not.exist').and('have.length', 0);
    });
  });

  context('API behaviour (extra)', () => {
    beforeEach(() => {
      cy.get(locators.characterCheckbox).check().should('be.checked');
    })
    
    it('should display a "Loading" message when the API is down', () => {
      cy.intercept(apiUriPeople, { statusCode: 404 }).as('apiDown');

      cy.get(locators.searchInput).clear().type('Luke Skywalker').type('{enter}');
      cy.wait('@apiDown');

      cy.get(locators.loadingMessage).should('be.visible');
    });
  })
});