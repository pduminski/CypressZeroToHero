/// <reference types="cypress"/>

import { onDatePickerPage } from "../../page-objects/datePickerPage"
import { onFormLayoutsPage } from "../../page-objects/formLayoutsPage"
import { navigateTo } from "../../page-objects/navigationPage"

beforeEach('open application', () => {
    // cy.visit('/')
    cy.openHomePage()
})

it('navigation test', () => {
    navigateTo.formLayoutsPage()
    navigateTo.datePickerPage()
    navigateTo.toastrPage()
    navigateTo.tooltipPage()
})

it.only('Test with page object', () => {
    navigateTo.formLayoutsPage()
    onFormLayoutsPage.submitUsingTheGridForm('test@test.com', 'qwerty123', 0)
    onFormLayoutsPage.submitBasicForm('test@test.com', 'Welcome1', true)
    navigateTo.datePickerPage()
    onDatePickerPage.selectCommonDatepickerDateFromToday(20)
    onDatePickerPage.selectRangePickerDateFromToday(20, 25)
})