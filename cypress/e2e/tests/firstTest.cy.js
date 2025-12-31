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

    it('Cypress Locator Methods', () => {
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

    it('Child Elements', () => {
        // In cypress you can chain endless amount of .find elements
        cy.contains('nb-card', 'Using the Grid').find('.row').find('button');

        cy.get('nb-card').find('nb-radio-group').find('nb-radio').contains('Option 1');

        // find this element and child element inside cy.get()
        cy.get('nb-card nb-radio-group').contains('Option 1');

        // Use > if you want to find element that is exactly under specific element
        cy.get('nb-card > nb-card-body [placeholder="Email"]')
        cy.get('nb-card > nb-card-body').find('[placeholder="Email"]')

        // When building selectors try to get them as short as possible 
    })

    it('Parent Elements', () => {
        cy.get('#inputEmail1').parents('form').find('button');

        // Move 1 step up
        cy.contains('Using the Grid').parent().find('button');
        // the same would be that one 
        cy.contains('nb-card', 'Using the Grid').find('button');

        // This will fail because it stops until form
        // cy.get('#inputEmail1').parentsUntil('form').find('button');
        cy.get('#inputEmail1').parentsUntil('nb-card-body').find('button');
    })

    it.only('Cypress Chains', () => {
        // It is not really recommended to continue chain after action command
        // Because Click may change the DOM 
        cy.get("#inputEmail1")
            .parents('form')
            .find('button')
            .click()

        // create new chain
        cy.get("#inputEmail1")
            .parents('form')
            .find('nb-radio')
            .first()
            .should('have.text', 'Option 1');
    })
})