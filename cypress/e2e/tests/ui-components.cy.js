/// <reference types="cypress" />

beforeEach('Open Application', () => {
    cy.visit('/')
})

it('Input Fields', () => {
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    cy.get('#inputEmail1').type('test@test.com', { delay: 200 }).clear().type('Hello');

    cy.contains('nb-card', 'Using the Grid').contains('Email').type("' Yes it works'");

    // .clear will not work on the label -> thicky thing 
})
