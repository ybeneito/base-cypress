/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
import locators from '../utils/locators/locators';

Cypress.Commands.add('apiLogin', (username: string, password: string) => {
  cy.session([username, password], () => {
    cy.request({
      body: {
        password,
        username,
      },
      method: 'POST',
      failOnStatusCode: false,
      url: `${Cypress.config('baseUrl')}/auth}`, // FIXME: change to your own endpoint URL for the authentication
    }).then(resp => {
      if (resp.body.id_token) {
        window.localStorage.setItem('jwtToken', `Bearer ${resp.body.id_token}`); // FIXME: change to your own key that contain your token
        window.localStorage.setItem('currentLang', 'fr');
      }
    });
  });
});

Cypress.Commands.add('webLogin', (username: string, password: string) => {
  cy.session([username, password], () => {
    window.localStorage.setItem('currentLang', 'fr');
    cy.visit('#/auth'); // FIXME: change to your own endpoint URL for the authentication
    cy.get(`${locators.emailField} input`).type(`{selectall}${username}`).should('have.value', username);
    cy.get(`${locators.passwordField} input`)
      .type(`{selectall}${password}`)
      .then($input => {
        cy.wrap($input).should('have.value', password);
        cy.get(`${locators.loginButton}`).click();
      });
    cy.url().should('eq', `${Cypress.config('baseUrl')}#/home`); // FIXME: change to your own endpoint URL for your home page

    // create the jwt token in local storage to use for the api requests
    let auth: any;
    cy.window().then(window => {
      cy.log(`${window.localStorage.getItem('jwtToken')}`);
      auth = window.localStorage.getItem('jwtToken');
      window.localStorage.setItem('jwtToken', `Bearer ${auth.replace(/^"(.+(?="$))"$/, '$1')}`);
    });
  });
});

const LOCAL_STORAGE_MEMORY: { [key: string]: any } = {};
Cypress.Commands.add('saveLocalStorage', () => {
  Object.keys(localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add('restoreLocalStorage', () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
    window.localStorage.setItem('currentLang', 'fr');
  });
});

Cypress.Commands.add('shouldHaveTrimmedText', { prevSubject: true }, (subject: any, equalTo: any) => {
  cy.wrap(subject)
    .should('contain.text', equalTo)
    .then(() => {
      expect(subject.text().trim()).to.equal(equalTo);

      return subject;
    });
});
