/// <reference types="cypress" />

beforeEach('Open Application', () => {
    cy.visit('/')
})

it('Input Fields', () => {
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    const name = 'TestUser';
    cy.get('#inputEmail1').type('test@test.com', { delay: 200 }).clear()
    cy.contains('nb-card', 'Using the Grid').contains('Email').type(name + '@test.com');

    // .clear will not work on the label -> thicky thing 

    cy.get('#inputEmail1').should('have.value', name + '@test.com').clear().type('test@test.com');
})

it.only('Input fields and key presses', () => {
    cy.contains('Auth').click();
    cy.contains('Login').click();

    cy.get('#input-email').type('test@test.com');
    cy.get('#input-password').type('test1234{enter}');

    // TAB is the only modifier that does not work 
    // cy.press will support that command 
    // cy.press(Cypress.Keyboard.Keys.TAB)
})
