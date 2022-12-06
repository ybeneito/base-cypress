/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
declare namespace Cypress {
  interface Chainable<Subject = any> {
    // global commands
    saveLocalStorage(): void;
    restoreLocalStorage(): void;
    shouldHaveTrimmedText(equalTo: string): Cypress.Chainable<Cypress.Response>;
    getCountsFromTextInfo(): Cypress.Chainable<Cypress.Response>;
    // login commands
    apiLogin(username: string, password: string): Cypress.Chainable<Response>;
    webLogin(username: string, password: string): void;
  }
}
