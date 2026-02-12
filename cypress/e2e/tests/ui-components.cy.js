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

it('Input fields and key presses', () => {
    cy.contains('Auth').click();
    cy.contains('Login').click();

    cy.get('#input-email').type('test@test.com');
    cy.get('#input-password').type('test1234{enter}');

    // TAB is the only modifier that does not work 
    // cy.press will support that command 
    // cy.press(Cypress.Keyboard.Keys.TAB)
})

it('Radio buttons', () => {
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(allRadioButtons => {
        cy.wrap(allRadioButtons).eq(0).check({ force: true }).should('be.checked');
        cy.wrap(allRadioButtons).eq(1).check({ force: true }).should('be.checked');
        cy.wrap(allRadioButtons).eq(0).should('not.be.checked');
    });

    cy.contains('nb-card', 'Using the Grid').contains('label', 'Option 1').click();
    cy.contains('nb-card', 'Using the Grid').contains('label', 'Option 2').find('input').check({ force: true });
})

it('Checkboxes', () => {
    cy.contains('Modal & Overlays').click();
    cy.contains("Toastr").click();

    cy.get("[type='checkbox']").check({ force: true });
    cy.get("[type='checkbox']").should("be.checked");

    cy.get("[type='checkbox']").uncheck({ force: true });
    cy.get("[type='checkbox']").should("be.not.checked");

    // this will work and requires multiple: true but will do the job
    // just use check uncheck functions 
    cy.get("[type='checkbox']").click({ force: true, multiple: true });
    cy.get("[type='checkbox']").should("be.checked");

})