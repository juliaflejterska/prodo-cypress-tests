import CalendarPage from "../pageObject/calendarPage";
import calendarData from "../../fixtures/calendarData";

describe("Calendar - Functionality", () => {
  const calendarPage = new CalendarPage();

  beforeEach(() => {
    cy.loginWithValidCredentials();
    cy.get('a[href="/calendar"]').click();
  });

  it("Creates a sub-1-day event", () => {
    calendarPage.fillEventDetails(calendarData.validOneDayEvent);
    calendarPage.addEvent();
    calendarPage.checkEventInCalendar(calendarData.validOneDayEvent.title);
  });

  it("Creates a multi-day event", () => {
    calendarPage.fillEventDetails(calendarData.validMultipleDaysEvent);
    calendarPage.addEvent();
    calendarPage.checkEventInCalendar(
      calendarData.validMultipleDaysEvent.title
    );
  });

  it("Fails to create an event without a title, proper alert should be displayed", () => {
    calendarPage.fillEventDetails(calendarData.invalidTitleEvent);
    calendarPage.addEvent();
    cy.validateModal("Title cannot be empty. Please enter a valid title.");
    cy.get(calendarPage.modalCloseButton).click();
  });

  it("Fails to create an event with an end date before a start date, proper alert should be displayed", () => {
    calendarPage.fillEventDetails(calendarData.invalidDateEvent);
    calendarPage.addEvent();
    cy.validateModal("The start date must be before the end date.");
    cy.get(calendarPage.modalCloseButton).click();
  });

  it("Fails to create an event without dates, proper alert should be displayed", () => {
    calendarPage.fillEventDetails(calendarData.invalidDatesEvent);
    calendarPage.addEvent();
    cy.validateModal("Dates cannot be empty. Please enter valid dates.");
    cy.get(calendarPage.modalCloseButton).click();
  });

  it("Creates an event with Drag and Drop method", () => {
    const title = calendarData.validMouseEvent.title;
    calendarPage.addEventByDragging(title);
    calendarPage.saveModal();
    calendarPage.checkEventInCalendar(title);
  });

  it("Fails to create an event with Drag and Drop method, proper alert should be displayed", () => {
    const title = calendarData.invalidMouseEvent.title;
    calendarPage.addEventByDragging(title);
    calendarPage.saveModal();
    cy.validateModal("Title cannot be empty. Please enter a valid title.");
    cy.get(calendarPage.modalCloseButton).click();
  });

  it("Deletes an event with modal confirmation", () => {
    const title = calendarData.validMouseEvent.title;
    calendarPage.addEventByDragging(title);
    calendarPage.saveModal();
    calendarPage.deleteEvent(title);
    calendarPage.confirmModal();
    calendarPage.checkEventIsDeletedInCalendar(title);
  });

  it("Fails to delete an event with modal cancelation", () => {
    const title = calendarData.validMouseEvent.title;
    calendarPage.addEventByDragging(title);
    calendarPage.saveModal();
    calendarPage.deleteEvent(title);
    calendarPage.cancelModal();
    calendarPage.checkEventInCalendar(title);
  });

  it("Clears date pickers after clicking the clear buton", () => {
    calendarPage.clearDateTimePickers();
  });

  it("Tests calendar navigation buttons", () => {
    calendarPage.navigateCalendar();
  });
});
