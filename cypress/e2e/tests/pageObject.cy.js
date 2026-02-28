/// <reference types="cypress"/>

import { navigateTo } from "../../page-objects/navigationPage"

beforeEach('open application', () => {
    cy.visit('/')
})

it('navigation test', () => {
    navigateTo.datePickerPage()
    navigateTo.formLayoutsPage()
    navigateTo.toastrPage()
    navigateTo.tooltipPage()
})