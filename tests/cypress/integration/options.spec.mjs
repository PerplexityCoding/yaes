context("Options", () => {
  const fullConfiguration = {
    version: "1.1.1",
    projects: JSON.stringify([
      {
        id: "0",
        name: "Project name test",
        envs: ["1", "f87a0b70-324e-4724-ab90-36cb47ff1c7d", "3"],
      },
    ]),
    "env-1": JSON.stringify({
      id: "1",
      name: "FR",
      url: "https://www.google.fr/sdfsdf",
    }),
    "env-f87a0b70-324e-4724-ab90-36cb47ff1c7d": JSON.stringify({
      id: "f87a0b70-324e-4724-ab90-36cb47ff1c7d",
      name: "DE",
      url: "https://www.google.de/sdfsdf",
    }),
    "env-3": JSON.stringify({
      id: "3",
      name: "ES",
      url: "https://www.google.es/",
    }),
    options: JSON.stringify({}),
  };

  function loadData(data = {}) {
    cy.window().then((win) => {
      win.chrome.storage.sync.get.callsFake((values, f) => {
        f(data);
      });
      win.chrome.storage.sync.set.callsFake((data, f) => {
        f();
      });
      win.startApp();
    });
  }

  beforeEach(() => {
    cy.visit("http://localhost:5173/src/options-cypress.html");
  });

  it("Should display tutorial on empty state", () => {
    loadData();
    cy.get(".introjs-tooltip").end();
  });

  it("Should load on empty state", () => {
    loadData();
    cy.get(".left-pane").contains("There is currently no projects.");
    cy.get(".right-pane").contains(" No env currently selected. ");
  });

  it("Should be able to add new project and new env", () => {
    loadData();
    // skip tutorial
    cy.get(".introjs-skipbutton").click();

    cy.get("button.new-project").click();

    cy.get(".left-pane").contains("There is currently no envs configured for this project.");

    cy.get(".project-item").first().get(".add-new-env").click();

    cy.get(".right-pane").within(() => {
      cy.get(`.label-set:nth(0) input[type=text]`).type("Great env");
      cy.get(`.label-set:nth(1) input[type=text]`).type("http://www.google.fr");
      cy.get(".create-env-btn").click();
    });

    cy.get(".selected-env").contains("Great env");
    cy.get(".info ").contains("Saved");
  });

  it("Should be able to delete env", () => {
    loadData(fullConfiguration);

    cy.get(".left-pane").contains("ES").click();

    cy.get(".right-pane").within(() => {
      cy.get(".delete-btn").click();
      cy.get(".delete-confirm-btn").click();
    });

    cy.get(".left-pane").contains("ES").should("not.exist");

    cy.get(".info ").contains("Saved");
  });

  it("Should be able to delete project", () => {
    loadData(fullConfiguration);

    cy.get(".left-pane").within(() => {
      cy.get(".delete-project .delete-btn").click({ force: true });
      cy.get(".delete-confirm-btn").click({ force: true });
    });

    cy.get(".info ").contains("Saved");
    cy.get(".left-pane").contains("There is currently no projects.");
  });

  it("Should be able to clone project", () => {
    loadData(fullConfiguration);

    cy.get(".left-pane").contains("FR").click();

    cy.get(".right-pane .clone-env").click();
    cy.get(".left-pane .project-env").should(($p) => {
      expect($p).to.have.length(4);
    });

    cy.get(".info ").contains("Saved");
    cy.get(".selected-env").contains("FR");
  });
});
