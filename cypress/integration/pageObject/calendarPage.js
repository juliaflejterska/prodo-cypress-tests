export default class CalendarPage {
  constructor() {
    // Form Elements
    this.titleInput = 'form input[type="text"]';
    this.datetimePickers = ".react-datetime-picker input[name='datetime']";
    this.clearButtons = ".react-datetime-picker__clear-button";
    this.addEventButton = 'form button[type="button"]:contains("ADD")';

    // Calendar Elements
    this.monthButton = '.rbc-btn-group button:contains("Month")';
    this.weekButton = '.rbc-btn-group button:contains("Week")';
    this.dayButton = '.rbc-btn-group button:contains("Day")';
    this.agendaButton = '.rbc-btn-group button:contains("Agenda")';
    this.monthView = ".rbc-month-view";
    this.weekView = ".rbc-time-view";
    this.dayView = ".rbc-time-view";
    this.agendaView = ".rbc-agenda-view";
    this.eventContent = ".rbc-event-content";
    this.inputGroupInputs = ".react-datetime-picker__inputGroup__input";
    this.dateCellButtons = ".rbc-date-cell button";
    this.todayButton = '.rbc-btn-group button:contains("Today")';
    this.backButton = '.rbc-btn-group button:contains("Back")';
    this.nextButton = '.rbc-btn-group button:contains("Next")';
    this.toolbarLabel = ".rbc-toolbar-label";

    // Modal Elements
    this.modalInput = ".modal-body input[type='text']";
    this.modalSaveEventButton =
      '.modal-footer button[type="button"]:contains("Save")';
    this.modalCloseButton =
      '.modal-footer button[type="button"]:contains("Close")';
    this.modalConfirmDeletionButton =
      '.modal-footer button[type="button"]:contains("Confirm")';
    this.modalCancelDeletionButton =
      '.modal-footer button[type="button"]:contains("Cancel")';
  }

  // Form

  fillEventDetails(calendarData) {
    const { title, date1, time1, date2, time2 } = calendarData;

    if (title !== "") {
      cy.get(this.titleInput).type(title);
    } else {
      cy.get(this.titleInput).clear();
    }

    if (date1 !== "" && time1 !== "") {
      cy.get(this.datetimePickers)
        .eq(0)
        .clear({ force: true })
        .type(`${date1}T${time1}`, { force: true });
    } else {
      cy.get(this.datetimePickers).eq(0).clear({ force: true });
    }

    if (date2 !== "" && time2 !== "") {
      cy.get(this.datetimePickers)
        .eq(1)
        .clear({ force: true })
        .type(`${date2}T${time2}`, { force: true });
    } else {
      cy.get(this.datetimePickers).eq(1).clear({ force: true });
    }
  }

  addEvent() {
    cy.get(this.addEventButton).click();
  }

  // Calendar

  checkEventInCalendar(eventTitle) {
    cy.get(this.eventContent)
      .scrollIntoView()
      .contains(eventTitle)
      .should("be.visible");
  }

  checkEventIsDeletedInCalendar(eventTitle) {
    cy.get(eventTitle).should("not.exist");
  }

  clearDateTimePickers() {
    cy.get(this.clearButtons).each(($clearButton) => {
      cy.wrap($clearButton).click();
    });

    cy.get(this.inputGroupInputs).each(($input) => {
      cy.wrap($input).should("have.value", "");
    });
  }

  addEventByDragging(title) {
    cy.get(this.dateCellButtons)
      .eq(6)
      .trigger("mousedown", { which: 1 })
      .trigger("mousemove", 100, 100, { force: true })
      .trigger("mouseup");

    if (title !== "") {
      cy.get(this.modalInput).type(title);
    } else {
      cy.get(this.modalInput).clear();
    }
  }

  deleteEvent(eventText) {
    cy.get(this.eventContent).contains(eventText).parent().click();
  }

  getFormattedDate(date) {
    const options = { year: "numeric", month: "long" };
    return date.toLocaleDateString("en-US", options);
  }

  navigateCalendar() {
    let currentDate = new Date();

    cy.get(this.todayButton).click();
    cy.get(this.toolbarLabel).should(
      "contain.text",
      this.getFormattedDate(currentDate)
    );

    cy.get(this.backButton).click();
    currentDate.setMonth(currentDate.getMonth() - 1);
    cy.get(this.toolbarLabel).should(
      "contain.text",
      this.getFormattedDate(currentDate)
    );

    cy.get(this.nextButton).click();
    currentDate.setMonth(currentDate.getMonth() + 1);
    cy.get(this.toolbarLabel).should(
      "contain.text",
      this.getFormattedDate(currentDate)
    );

    cy.get(this.monthButton).click();
    cy.get(this.monthView).should("be.visible");

    cy.get(this.weekButton).click();
    cy.get(this.weekView).should("be.visible");

    cy.get(this.dayButton).click();
    cy.get(this.dayView).should("be.visible");

    cy.get(this.agendaButton).click();
    cy.get(this.agendaView).should("be.visible");
  }

  // Modal buttons

  closeModal() {
    cy.get(this.modalCloseButton).click();
  }

  saveModal() {
    cy.get(this.modalSaveEventButton).click();
  }

  confirmModal() {
    cy.get(this.modalConfirmDeletionButton).click();
  }

  cancelModal() {
    cy.get(this.modalCancelDeletionButton).click();
  }
}
