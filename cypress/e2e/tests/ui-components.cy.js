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

it("Lists and dropdowns", () => {
    cy.contains('Modal & Overlays').click();
    cy.contains("Toastr").click();

    // If there is standard select: 
    cy.contains('div', 'Toast type:').find('select').select('warning')
        .should('have.value', 'warning');

    // For custom dropdowns:
    cy.contains('div', 'Position:').find('nb-select').click();
    cy.get('.option-list').contains('bottom-right').click()
    cy.contains('div', 'Position:').find('nb-select')
        .should('have.text', 'bottom-right');

    // Playing around loops and dropdowns
    cy.contains('div', 'Position:').find('nb-select').then(dropdown => {
        cy.wrap(dropdown).click()
        cy.get('.option-list nb-option').each((option, index, list) => {
            cy.wrap(option).click()
            if (index < list.length - 1)
                cy.wrap(dropdown).click()
        })

    })
})

it('Tooltips', () => {
    cy.contains('Modal & Overlays').click();
    cy.contains("Tooltip").click();

    cy.contains('button', 'Top').trigger('mouseenter');
    cy.get('nb-tooltip').should('have.text', 'This is a tooltip');
})

it.only('dialog boxes 1 ', () => {
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click();

    // Case 1
    cy.get('.nb-trash').first().click();
    cy.on('window:confirm', confirm => {
        expect(confirm).to.equal('Are you sure you want to delete?');
    })


    // Case 2 -> use that one instead 
    cy.window().then(win => {
        cy.stub(win, 'confirm').as('dialogBox').returns(false)
    })

    cy.get('.nb-trash').first().click();
    cy.get('@dialogBox').should('be.calledWith', 'Are you sure you want to delete?');
})