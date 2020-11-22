context("Popup", () => {
  const fullConfiguration = {
    version: "1.1.0",
    projects: JSON.stringify([
      {
        id: 0,
        name: "Project name test",
        envs: ["f87a0b70-324e-4724-ab90-36cb47ff1c7d", 2, "39b2f74d-b8a4-405b-aa97-0cdeb46849af"],
      },
    ]),
    "env-f87a0b70-324e-4724-ab90-36cb47ff1c7d": JSON.stringify({
      id: "f87a0b70-324e-4724-ab90-36cb47ff1c7d",
      name: "FR",
      url: "https://www.google.fr/sdfsdf",
    }),
    "env-2": JSON.stringify({
      id: 2,
      name: "DE",
      url: "https://www.google.de/sdfsdf",
    }),
    "env-39b2f74d-b8a4-405b-aa97-0cdeb46849af": JSON.stringify({
      id: "39b2f74d-b8a4-405b-aa97-0cdeb46849af",
      name: "ES",
      url: "https://www.google.es/",
    }),
    options: JSON.stringify({}),
  };

  const fullConfigurationWithMultipleProjects = {
    version: "1.1.0",
    projects: JSON.stringify([
      {
        id: 0,
        name: "Project 1",
        envs: [1, 2],
      },
      {
        id: 1,
        name: "Project 2",
        envs: ["39b2f74d-b8a4-405b-aa97-0cdeb46849af"],
      },
    ]),
    "env-1": JSON.stringify({
      id: 1,
      name: "FR",
      url: "https://www.google.fr/sdfsdf",
    }),
    "env-2": JSON.stringify({
      id: 2,
      name: "DE",
      url: "https://www.google.de/sdfsdf",
    }),
    "env-39b2f74d-b8a4-405b-aa97-0cdeb46849af": JSON.stringify({
      id: "39b2f74d-b8a4-405b-aa97-0cdeb46849af",
      name: "ES",
      url: "https://www.google.es/",
    }),
    options: JSON.stringify({}),
  };

  const emptyConfiguration = {
    version: "1.1.0",
    projects: JSON.stringify([]),
    options: JSON.stringify({}),
  };

  function loadData(data = {}) {
    cy.window().then((win) => {
      win.chrome.storage.sync.get.callsFake((values, cb) => {
        console.log(values);
        return cb(data);
      });
      win.chrome.storage.sync.set.callsFake(() => {
        return data;
      });
      win.startApp();
    });
  }

  function mockTab(
    globalTabs = [
      {
        id: 1,
        url: "https://www.google.fr/toto",
      },
    ]
  ) {
    cy.window().then((win) => {
      win.chrome.tabs.query.callsFake((options, cb) => {
        cb(globalTabs);
      });
    });
  }

  function mockNotConfiguredTab() {
    mockTab([
      {
        id: 1,
        url: "https://www.google.tu/toto",
      },
    ]);
  }

  beforeEach(() => {
    cy.viewport(300, 700);
    cy.visit("http://localhost:8080/popup.html");
  });

  it("Should display empty message on empty state", () => {
    mockTab();
    loadData(emptyConfiguration);

    cy.get(".header").get(".footer").end();
    cy.get(".body").contains("No environments has been configured yet");
  });

  it("Should display header and footer", () => {
    mockTab();
    loadData(fullConfiguration);

    cy.get(".header").get(".footer").end();
  });

  it("Should display envs", () => {
    mockTab();
    loadData(fullConfiguration);

    cy.get(".env-list li")
      .first()
      .should("contain", "FR")
      .get("button")
      .should("have.class", "selected")
      .end();

    cy.get(".env-list li")
      .first()
      .next()
      .should("contain", "DE")
      .next()
      .should("contain", "ES")
      .end();
  });

  it("Should change tab when cliking on env", () => {
    mockTab();
    loadData(fullConfiguration);

    cy.get(".env-list li:nth(1) button").click();
    cy.window().then((win) => {
      expect(win.chrome.tabs.update).to.be.calledWith(1, {
        url: "https://www.google.de/toto",
      });
    });
  });

  it("Should change tab when ctrl cliking on env", () => {
    mockTab();
    loadData(fullConfiguration);

    cy.get(".env-list li:nth(1) button").click({
      ctrlKey: true,
    });
    cy.window().then((win) => {
      expect(win.chrome.tabs.create).to.be.calledWith({
        url: "https://www.google.de/toto",
        active: false,
      });
    });
  });

  it("Should change tab when middle cliking on env", () => {
    mockTab();
    loadData(fullConfiguration);

    cy.get(".env-list li:nth(1) button").trigger("mouseup", { button: 1 });
    cy.window().then((win) => {
      expect(win.chrome.tabs.create).to.be.calledWith({
        url: "https://www.google.de/toto",
        active: false,
      });
    });
  });

  it("Should change tab clicking on edit configuration", () => {
    mockTab();
    loadData(fullConfiguration);

    cy.contains("Edit Configuration").click();
    cy.window().then((win) => {
      expect(win.chrome.tabs.create).to.be.calledWith({
        url: "/options.html",
      });
    });
  });

  it("Should display envs (none selected) if only one project", () => {
    mockNotConfiguredTab();
    loadData(fullConfiguration);

    cy.get(".env-list li")
      .first()
      .should("contain", "FR")
      .next()
      .should("contain", "DE")
      .next()
      .should("contain", "ES")
      .end();
  });

  it("Should display projects", () => {
    mockNotConfiguredTab();
    loadData(fullConfigurationWithMultipleProjects);

    cy.get(".project-list li")
      .first()
      .should("contain", "Project 1")
      .next()
      .should("contain", "Project 2")
      .end();
  });

  it("Should open projects when click on it", () => {
    mockNotConfiguredTab();
    loadData(fullConfigurationWithMultipleProjects);

    cy.get(".project-list li")
      .contains("Project 1")
      .closest("button")
      .click()
      .should("have.class", "is-opened");

    cy.get(".project-list li").contains("Project 2").should("not.have.class", "is-opened");

    cy.get(".env-list li").first().should("contain", "FR").next().should("contain", "DE").end();

    cy.get(".project-list li").contains("Project 2").click().should("have.class", "is-opened");

    cy.get(".env-list li").first().should("contain", "ES").end();

    cy.get(".project-list li").contains("Project 1").should("not.have.class", "is-opened");
  });

  it("Should create new tab when clicking on env (not current domain)", () => {
    mockNotConfiguredTab();
    loadData(fullConfigurationWithMultipleProjects);

    cy.get(".project-list li")
      .contains("Project 1")
      .closest("button")
      .click()
      .should("have.class", "is-opened");

    cy.get(".env-list li").contains("DE").closest("button").click();

    cy.window().then((win) => {
      expect(win.chrome.tabs.update).to.be.calledWith(1, {
        url: "https://www.google.de/sdfsdf",
      });
    });
  });

  it("Should be able to switch between envs and projects", () => {
    mockTab();
    loadData(fullConfigurationWithMultipleProjects);

    cy.get(".env-list li");
    cy.contains("FR");
    cy.contains("DE");

    cy.contains("See projects").closest("button").click();

    cy.get(".project-list li");
    cy.contains("Project 1");
    cy.contains("Project 2");

    cy.contains("See current env").closest("button").click();
    cy.get(".env-list li");

    cy.contains("FR");
    cy.contains("DE");
  });
});
