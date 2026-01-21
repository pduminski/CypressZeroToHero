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
        cy.get('nb-card git> nb-card-body').find('[placeholder="Email"]')

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

    it('Cypress Chains', () => {
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

    it('Reusing Locators', () => {
        // 1. Cypress Aliases
        // This variable becomes global for your test run 
        cy.get("#inputEmail1").as('emailInput');
        cy.get('@emailInput').parents('form').find('button');
        cy.get('@emailInput').parents('form').find('nb-radio');

        // 2. Cypress then() method
        cy.get("#inputEmail1").then(inputEmail => {
            // this will not work, here we use jquery 
            // inputEmail becomes pure jquery object
            // inputEmail.parents('form').find('button');

            // convery jquery object into Cypress chainable object
            cy.wrap(inputEmail).parents('form').find('button');
            cy.wrap(inputEmail).parents('form').find('nb-radio');

            // cy.wrap can be used to any type of data on which
            // we want to use cypress chainable 
            cy.wrap('Hello').should('equal', 'Hello');
            cy.wrap(inputEmail).as('inputEmail2');


            // We cannot return anything from then using return keyword
            // If you want to remove anything from then() use alias
        })

        cy.get('@inputEmail2').click();
    })

    it('Extracting Values', () => {
        // 1. using a JQuery method
        cy.get('[for="exampleInputEmail1"]').then(label => {
            const emailLabel = label.text();
            cy.log(emailLabel);
        });

        // 2. using Cypress .invoke() method
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(emailLabel => {
            cy.log(emailLabel);
        })

        cy.get('[for="exampleInputEmail1"]').invoke('text').as('emailLabelText');

        // 3. Invoke attribute value 
        cy.get('#exampleInputEmail1').invoke('attr', 'placeholder').then(placeholder => {
            cy.log(placeholder);
            expect(placeholder).to.equal('Email');
        })

        cy.get('#exampleInputEmail1').invoke('attr', 'class').then(classValue => {
            cy.log(classValue);
        })

        cy.get('#exampleInputEmail1').should('include.attr', 'class', 'input-full-width size-medium status-basic shape-rectangle nb-transition');



        // 4. Invoke input field value
        cy.get('#exampleInputEmail1').type('hello@test.com');
        cy.get('#exampleInputEmail1').invoke('prop', 'value').then(inputValue => {
            cy.log(inputValue);
        })
    })

    it('Assertions', () => {

        // 1 
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address');
        cy.get('[for="exampleInputEmail1"]').should('have.text', 'Email address');

        // 2
        cy.get('[for="exampleInputEmail1"]').then(label => {
            const emailLabel = label.text();
            cy.log(emailLabel);

            expect(label).to.contain('Email address');
        });

        // 3 
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(emailLabel => {
            cy.log(emailLabel);
            expect(emailLabel).to.equal('Email address');
        })

        // How it retries 

    })

    it.only('Timeouts', () => {
        cy.contains("Modal & Overlays").click();
        cy.contains('Dialog').click();

        cy.contains('Open with delay 10 seconds').click();
        // remember to not add timeout into assertion
        cy.get('nb-dialog-container nb-card-header', { timeout: 11000 }).should('have.text', 'Friendly reminder');
    })
})