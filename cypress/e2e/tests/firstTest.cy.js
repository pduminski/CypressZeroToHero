/// <reference types="cypress" />

beforeEach('Open test application', () => {
    cy.visit('/');
    // cy.get('[title="Forms"]').click();
    // cy.get('[title="Form Layouts"]').click();
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();
})

describe('Locators', () => {
    it('Find elements by locator', () => {
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

    it.only('Cypress Locator Methods', () => {
        // Theory 
        // get() - to find elements on the page globally
        // find() - to find only child elements

        // contains() - to find web elements by test 
        // method is case sensitive (check in dom what text is there)
        cy.contains('Sign In', { matchCase: false })
        cy.contains('Sign', { matchCase: false })
        cy.contains('Emai', { matchCase: false })

        // Buttons have different colors, so we can differentiate them
        cy.contains('[status="warning"]', 'Sign in')

        // Try to find entire form where Sign In button is located
        cy.contains('nb-card', 'Horizontal form').find('button');
        cy.contains('nb-card', 'Horizontal form').contains('Sign in');


        // NEXT LESSON CHILD ELEMENTS
    })
})