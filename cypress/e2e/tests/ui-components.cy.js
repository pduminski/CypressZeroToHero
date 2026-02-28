/// <reference types="cypress" />

import { navigateTo } from "../../page-objects/navigationPage";

beforeEach('Open Application', () => {
    cy.visit('/')
})

it('Input Fields', () => {
    // cy.contains('Forms').click();
    // cy.contains('Form Layouts').click();
    navigateTo.formLayoutsPage();

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

it('dialog boxes', () => {
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

it('getting values in tables', () => {
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click();

    // 1. Update value on Larry Bird age, using unique value to catch row
    cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
        cy.wrap(tableRow).find('.nb-edit').click();
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('36');
        cy.wrap(tableRow).find('.nb-checkmark').click();
        cy.wrap(tableRow).find('td').last().should('have.text', '36');
    })

    // 2. How to find by index 
    // Create new row and validate it
    cy.get('.nb-plus').click();

    cy.get('thead tr').eq(2).then(tableRow => {
        cy.wrap(tableRow).find('[placeholder="First Name"]').type('John')
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Rambo')
        cy.wrap(tableRow).find('.nb-checkmark').click();
    })

    cy.get('tbody tr').first().find('td').then(tableColumns => {
        cy.wrap(tableColumns).eq(2).should('have.text', 'John');
        cy.wrap(tableColumns).eq(3).should('have.text', 'Rambo');
    })


    // 3. Filtering tables
    const ages = [20, 40, 50];

    cy.wrap(ages).each(ageValue => {
        cy.get('[placeholder="Age"]').clear().type(ageValue);
        cy.wait(1000);
        cy.get('tbody').find('tr').each(tableRow => {
            if (ageValue === 50)
                cy.wrap(tableRow).find('td').last().should('contain.text', 'No data found');
            else
                cy.wrap(tableRow).find('td').last().should('have.text', ageValue);
        })
    })

})

it('datepickers', () => {
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()



    function selectDateFromCurrentDay(day) {
        let date = new Date()
        date.setDate(date.getDate() + day)
        let futureDay = date.getDate()
        let futureMonthLong = date.toLocaleDateString('en-US', { month: 'long' })
        let futureMonthShort = date.toLocaleDateString('en-US', { month: 'short' })
        let futureYear = date.getFullYear()
        let dateToAssert = `${futureMonthShort} ${futureDay}, ${futureYear}`

        cy.get('nb-calendar-view-mode').invoke('text').then(calendarMonthAndYear => {
            if (!calendarMonthAndYear.includes(futureMonthLong) || !calendarMonthAndYear.includes(futureYear)) {
                cy.get('[data-name="chevron-right"]').click()
                selectDateFromCurrentDay(day)
            } else {
                cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
            }
        })
        return dateToAssert
    }

    cy.get('[placeholder="Form Picker"]').then(input => {
        cy.wrap(input).click()
        const dateToAssert = selectDateFromCurrentDay(20)
        cy.wrap(input).should('have.value', dateToAssert)
    })
})

it('Sliders', () => {
    cy.get('[tabtitle="Temperature"]').find('circle')
        .invoke('attr', 'cx', '119.50')
        .invoke('attr', 'cy', '10.61')
        .click();

    cy.get('[class="value temperature h1"]').should('contain.text', '20')
})

it('drag and drop', () => {
    cy.contains('Extra Components').click()
    cy.contains('Drag & Drop').click()

    cy.get('#todo-list div').first().trigger('dragstart')
    cy.get('#drop-list').trigger('drop')

})