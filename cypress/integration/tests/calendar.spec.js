import CalendarPage from "../pageObject/calendarPage";
import calendarData from "../../fixtures/calendarData";

describe("Calendar - Functionality", () => {
  const calendarPage = new CalendarPage();

  beforeEach(() => {
    cy.loginWithValidCredentials();
    calendarPage.navigate();
  });

  const {
    validOneDayEvent,
    validMultipleDaysEvent,
    invalidEvent,
    invalidTitleEvent,
    invalidDateEvent,
    invalidDatesEvent,
    validMouseEvent,
    invalidMouseEvent,
  } = calendarData;

  context("Creating events", () => {
    it("Creates a sub-1-day event", () => {
      calendarPage.fillEventDetails(validOneDayEvent);
      calendarPage.addEvent();
      calendarPage.checkEventInCalendar(validOneDayEvent.title);
    });

    it("Creates a multi-day event", () => {
      calendarPage.fillEventDetails(validMultipleDaysEvent);
      calendarPage.addEvent();
      calendarPage.checkEventInCalendar(validMultipleDaysEvent.title);
    });

    it("Creates an event with Drag and Drop", () => {
      const title = validMouseEvent.title;
      calendarPage.addEventByDragging(title);
      calendarPage.saveModal();
      calendarPage.checkEventInCalendar(title);
    });
  });

  context("Failing to create events", () => {
    it("Fails to create an event without a title and dates, proper alert should be displayed", () => {
      calendarPage.fillEventDetails(invalidEvent);
      calendarPage.addEvent();
      cy.validateModal(
        "Title and dates cannot be empty. Please enter valid values."
      );
    });

    it("Fails to create an event without a title, proper alert should be displayed", () => {
      calendarPage.fillEventDetails(invalidTitleEvent);
      calendarPage.addEvent();
      cy.validateModal("Title cannot be empty. Please enter a valid title.");
    });

    it("Fails to create an event with an end date before a start date, proper alert should be displayed", () => {
      calendarPage.fillEventDetails(invalidDateEvent);
      calendarPage.addEvent();
      cy.validateModal("The start date must be before the end date.");
    });

    it("Fails to create an event without dates, proper alert should be displayed", () => {
      calendarPage.fillEventDetails(invalidDatesEvent);
      calendarPage.addEvent();
      cy.validateModal("Dates cannot be empty. Please enter valid dates.");
    });

    it("Fails to create an event with Drag and Drop without a title, proper alert should be displayed", () => {
      const title = invalidMouseEvent.title;
      calendarPage.addEventByDragging(title);
      calendarPage.saveModal();
      cy.validateModal("Title cannot be empty. Please enter a valid title.");
    });
  });

  context("Event deletion", () => {
    it("Deletes an event with modal confirmation", () => {
      const title = validMouseEvent.title;
      calendarPage.addEventByDragging(title);
      calendarPage.saveModal();
      calendarPage.deleteEvent(title);
      calendarPage.confirmModal();
      calendarPage.checkEventIsDeletedInCalendar(title);
    });

    it("Fails to delete an event with modal cancelation", () => {
      const title = validMouseEvent.title;
      calendarPage.addEventByDragging(title);
      calendarPage.saveModal();
      calendarPage.deleteEvent(title);
      calendarPage.cancelModal();
      calendarPage.checkEventInCalendar(title);
    });
  });

  context("Other tests", () => {
    it("Clears date pickers after clicking the clear buton", () => {
      calendarPage.clearDateTimePickers();
    });

    it("Tests calendar navigation buttons", () => {
      calendarPage.navigateCalendar();
    });
  });
});
