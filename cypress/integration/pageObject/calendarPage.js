export default class CalendarPage {
  elements = {
    titleInput: 'form input[type="text"]',
    addEventButton: 'form button[type="button"]:contains("ADD")',
    datetimePickers: ".react-datetime-picker input[name='datetime']",
    clearButtons: ".react-datetime-picker__clear-button",
    monthButton: '.rbc-btn-group button:contains("Month")',
    weekButton: '.rbc-btn-group button:contains("Week")',
    dayButton: '.rbc-btn-group button:contains("Day")',
    agendaButton: '.rbc-btn-group button:contains("Agenda")',
    monthView: ".rbc-month-view",
    weekView: ".rbc-time-view",
    dayView: ".rbc-time-view",
    agendaView: ".rbc-agenda-view",
    eventContent: ".rbc-event-content",
    inputGroupInputs: ".react-datetime-picker__inputGroup__input",
    dateCellButtons: ".rbc-date-cell button",
    todayButton: '.rbc-btn-group button:contains("Today")',
    backButton: '.rbc-btn-group button:contains("Back")',
    nextButton: '.rbc-btn-group button:contains("Next")',
    toolbarLabel: ".rbc-toolbar-label",
    modalInput: ".modal-body input[type='text']",
    modalSaveEventButton:
      '.modal-footer button[type="button"]:contains("Save")',
    modalConfirmDeletionButton:
      '.modal-footer button[type="button"]:contains("Confirm")',
    modalCancelDeletionButton:
      '.modal-footer button[type="button"]:contains("Cancel")',
  };

  navigate() {
    cy.get('a[href="/calendar"]').click();
  }

  // Creating events

  fillEventDetails({ title, date1, time1, date2, time2 }) {
    const titleInput = cy.get(this.elements.titleInput);

    if (title !== "") {
      titleInput.type(title);
    } else {
      titleInput.clear();
    }

    this.setDateTimePicker(0, date1, time1);
    this.setDateTimePicker(1, date2, time2);
  }

  setDateTimePicker(index, date, time) {
    const dateTimePicker = cy.get(this.elements.datetimePickers).eq(index);

    if (date !== "" && time !== "") {
      dateTimePicker
        .clear({ force: true })
        .type(`${date}T${time}`, { force: true });
    } else {
      dateTimePicker.clear({ force: true });
    }
  }

  addEvent() {
    cy.get(this.elements.addEventButton).click();
  }

  addEventByDragging(title) {
    cy.get(this.elements.dateCellButtons)
      .eq(6)
      .trigger("mousedown", { which: 1 })
      .trigger("mousemove", 100, 100, { force: true })
      .trigger("mouseup");

    if (title !== "") {
      cy.get(this.elements.modalInput).type(title);
    } else {
      cy.get(this.elements.modalInput).clear();
    }
  }

  checkEventInCalendar(eventTitle) {
    cy.get(this.elements.eventContent)
      .scrollIntoView()
      .contains(eventTitle)
      .should("be.visible");
  }

  checkEventInLocalStorage(eventTitle) {
    cy.window().then((win) => {
      const storedEvents = win.localStorage.getItem("events");
      const parsedEvents = JSON.parse(storedEvents);
      const isEventInLocalStorage = parsedEvents.some(
        (event) => event.title === eventTitle
      );
      expect(isEventInLocalStorage).to.be.true;
    });
  }

  // Event deletion

  deleteEvent(eventText) {
    cy.get(this.elements.eventContent).contains(eventText).parent().click();
  }

  checkEventIsDeletedInCalendar(eventTitle) {
    cy.get(this.elements.monthView).contains(eventTitle).should("not.exist");
  }

  checkEventDeletedFromLocalStorage(eventTitle) {
    cy.window().then((win) => {
      const storedEvents = win.localStorage.getItem("events");
      const parsedEvents = JSON.parse(storedEvents);
      const isEventDeletedFromLocalStorage = !parsedEvents.some(
        (event) => event.title === eventTitle
      );
      expect(isEventDeletedFromLocalStorage).to.be.true;
    });
  }

  // Other tests

  clearDateTimePickers() {
    cy.get(this.elements.clearButtons).each(($clearButton) => {
      cy.wrap($clearButton).click();
    });

    cy.get(this.elements.inputGroupInputs).each(($input) => {
      cy.wrap($input).should("have.value", "");
    });
  }

  getFormattedDate(date) {
    const options = { year: "numeric", month: "long" };
    return date.toLocaleDateString("en-US", options);
  }

  navigateCalendar() {
    let currentDate = new Date();

    cy.get(this.elements.todayButton).click();
    cy.get(this.elements.toolbarLabel).should(
      "contain.text",
      this.getFormattedDate(currentDate)
    );

    cy.get(this.elements.backButton).click();
    currentDate.setMonth(currentDate.getMonth() - 1);
    cy.get(this.elements.toolbarLabel).should(
      "contain.text",
      this.getFormattedDate(currentDate)
    );

    cy.get(this.elements.nextButton).click();
    currentDate.setMonth(currentDate.getMonth() + 1);
    cy.get(this.elements.toolbarLabel).should(
      "contain.text",
      this.getFormattedDate(currentDate)
    );

    cy.get(this.elements.monthButton).click();
    cy.get(this.elements.monthView).should("be.visible");

    cy.get(this.elements.weekButton).click();
    cy.get(this.elements.weekView).should("be.visible");

    cy.get(this.elements.dayButton).click();
    cy.get(this.elements.dayView).should("be.visible");

    cy.get(this.elements.agendaButton).click();
    cy.get(this.elements.agendaView).should("be.visible");
  }

  // Modals

  saveModal() {
    cy.get(this.elements.modalSaveEventButton).click();
  }

  confirmModal() {
    cy.get(this.elements.modalConfirmDeletionButton).click();
  }

  cancelModal() {
    cy.get(this.elements.modalCancelDeletionButton).click();
  }
}
