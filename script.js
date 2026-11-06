
/* =========================================
   ZINELABIDINE PORTFOLIO
   Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // 1. ELEMENTS
    // =====================================

    const editButton = document.getElementById("editButton");
    const addProjectButton = document.getElementById("addProjectButton");
    const projectsContainer = document.getElementById("projectsContainer");

    const STORAGE_KEY = "zinelabidine_portfolio_content";

    let editMode = false;


    // =====================================
    // 2. EDIT MODE
    // =====================================

    function enableEditing() {
        const editableElements = document.querySelectorAll("[data-editable]");

        editableElements.forEach(element => {
            element.contentEditable = "true";
            element.classList.add("editable");
        });

        editMode = true;

        if (editButton) {
            editButton.textContent = "Save Changes";
            editButton.classList.add("active");
        }

        if (addProjectButton) {
            addProjectButton.style.display = "inline-flex";
        }
    }

    function disableEditing() {
        const editableElements = document.querySelectorAll("[data-editable]");

        editableElements.forEach(element => {
            element.contentEditable = "false";
            element.classList.remove("editable");
        });

        editMode = false;

        if (editButton) {
            editButton.textContent = "Edit Portfolio";
            editButton.classList.remove("active");
        }

        if (addProjectButton) {
            addProjectButton.style.display = "none";
        }

        savePortfolio();
    }

    if (editButton) {
        editButton.addEventListener("click", () => {
            if (editMode) {
                disableEditing();
            } else {
                enableEditing();
            }
        });
    }


    // =====================================
    // 3. SAVE PORTFOLIO
    // =====================================

    function savePortfolio() {
        const editableElements = document.querySelectorAll("[data-editable]");

        const content = [];

        editableElements.forEach((element, index) => {
            content.push({
                index: index,
                content: element.innerHTML
            });
        });

        localStorage.setItem(STORAGE_KEY, JSON.stringify(content));

        showNotification("Changes saved successfully!");
    }


    // =====================================
    // 4. LOAD SAVED CONTENT
    // =====================================

    function loadPortfolio() {
        const savedContent = localStorage.getItem(STORAGE_KEY);

        if (!savedContent) return;

        try {
            const content = JSON.parse(savedContent);
            const editableElements = document.querySelectorAll("[data-editable]");

            content.forEach(item => {
                if (editableElements[item.index]) {
                    editableElements[item.index].innerHTML = item.content;
                }
            });

        } catch (error) {
            console.error("Could not load saved portfolio:", error);
        }
    }


    // =====================================
    // 5. ADD NEW PROJECTS
    // =====================================

    function addProject() {
        if (!projectsContainer) return;

        const project = document.createElement("article");

        project.className = "project-card";

        project.innerHTML = `
            <div class="project-content">
                <span data-editable>NEW PROJECT</span>

                <h3 data-editable>
                    Project Title
                </h3>

                <p data-editable>
                    Write a description of your project here.
                </p>

                <a href="#" data-editable>
                    View Project
                </a>

                <button class="delete-project" type="button">
                    Delete Project
                </button>
            </div>
        `;

        projectsContainer.appendChild(project);

        if (editMode) {
            project.querySelectorAll("[data-editable]").forEach(element => {
                element.contentEditable = "true";
                element.classList.add("editable");
            });
        }

        showNotification("New project added!");
    }

    if (addProjectButton) {
        addProjectButton.addEventListener("click", addProject);
    }


    // =====================================
    // 6. DELETE PROJECTS
    // =====================================

    document.addEventListener("click", event => {
        if (event.target.classList.contains("delete-project")) {

            if (!editMode) return;

            const project = event.target.closest(".project-card");

            if (project && confirm("Delete this project?")) {
                project.remove();
                showNotification("Project deleted!");
            }
        }
    });


    // =====================================
    // 7. MOBILE NAVIGATION
    // =====================================

    const menuButton = document.getElementById("menuButton");
    const navigation = document.querySelector(".nav-links");

    if (menuButton && navigation) {
        menuButton.addEventListener("click", () => {
            navigation.classList.toggle("show");
        });

        navigation.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navigation.classList.remove("show");
            });
        });
    }


    // =====================================
    // 8. NOTIFICATIONS
    // =====================================

    function showNotification(message) {
        let notification = document.getElementById("notification");

        if (!notification) {
            notification = document.createElement("div");
            notification.id = "notification";

            document.body.appendChild(notification);
        }

        notification.textContent = message;
        notification.classList.add("visible");

        clearTimeout(notification.timeout);

        notification.timeout = setTimeout(() => {
            notification.classList.remove("visible");
        }, 2500);
    }


    // =====================================
    // 9. AUTO-SAVE WHILE EDITING
    // =====================================

    document.addEventListener("input", event => {
        if (editMode && event.target.matches("[data-editable]")) {
            savePortfolio();
        }
    });


    // =====================================
    // 10. INITIALIZATION
    // =====================================

    loadPortfolio();

    if (addProjectButton) {
        addProjectButton.style.display = "none";
    }

    console.log(
        "%c ZINELABIDINE PORTFOLIO ",
        "background:#2563eb;color:white;padding:8px;font-weight:bold;"
    );

    console.log("Portfolio initialized successfully.");

});
