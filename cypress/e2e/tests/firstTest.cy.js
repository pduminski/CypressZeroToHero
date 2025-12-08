/// <reference types="cypress" />

beforeEach('Open test application', () => {
    cy.visit('/');
    // cy.get('[title="Forms"]').click();
    // cy.get('[title="Form Layouts"]').click();
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();
})

describe('Locators', () => {
    it('Find elements', () => {

        // by Tag
        cy.get('input')

        // by ID
        cy.get('#inputEmail')

        // by class name 
        cy.get('.input-full-width')

        // by attribute
        cy.get('[fullwidth]')

        // by attribute with value 
        cy.get('[placeholder="Email"]')

        // by entire class value 
        cy.get('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

        // how to combine several attributes 
        // remember to not provide space in there 
        cy.get('[placeholder="Email"][fullwidth]')
        cy.get('input[placeholder="Email"]')

        // find by data-cy aatribute 
        cy.get('[data-cy="inputEmail1"]')
    })
})