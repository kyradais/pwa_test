frappe.pages['main'].on_page_load = function(wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'test',
        single_column: true
    });

    // Load Bootstrap CSS and JS
    frappe.require([
        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js",
        "https://cdn.jsdelivr.net/npm/js-yaml/dist/js-yaml.min.js"
    ], function() {
        console.log("Bootstrap Loaded!");
    });

    // Hide the page head
    let pageHead = wrapper.querySelector('.page-head');
    if (pageHead) pageHead.style.display = 'none';

    // Hide the navbar
    let navbar = document.querySelector('.navbar.navbar-expand');
    if (navbar) navbar.style.display = 'none';

    // Create the bottom navigation bar
    let bottomNav = document.createElement('div');
    bottomNav.className = 'bottom-nav d-flex justify-content-between align-items-center';

    bottomNav.innerHTML = `
        <button class="btn btn-light nav-button">📁</button>
        <button class="btn btn-primary home-button" id="menu-button">🏠</button>
        <button class="btn btn-light nav-button">⚙️</button>
    `;

    wrapper.appendChild(bottomNav);

    // Create the main content container
    let mainContent = document.createElement("div");
    mainContent.id = "main-content";
    mainContent.className = "p-3";
    wrapper.appendChild(mainContent);

    // Create the menu container
    let menu = document.createElement('div');
    menu.className = 'floating-menu p-3 bg-white rounded shadow-lg';

    menu.innerHTML = `
        <div class="row">
            <div class="col-6"><button class="btn btn-outline-secondary w-100 load-content" data-file="documents.xml">🔍 Documents</button></div>
            <div class="col-6"><button class="btn btn-outline-secondary w-100 load-content" data-file="test.xml">📧 Messages</button></div>
        </div>
    `;

    wrapper.appendChild(menu);

    // Toggle menu visibility when clicking the Home button
    let menuButton = document.getElementById("menu-button");

    menuButton.addEventListener("click", function(event) {
        event.stopPropagation();
        menu.classList.toggle("menu-open");
    });

    // Close menu when clicking outside
    document.addEventListener("click", function(event) {
        if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
            menu.classList.remove("menu-open");
        }
    });

    // Load XML content when clicking menu buttons
    document.querySelectorAll(".load-content").forEach(button => {
        button.addEventListener("click", function() {
            let file = this.getAttribute("data-file");
            loadXML(file);
        });
    });

    function loadXML(file) {
        frappe.call({
            method: "pwa_test.api.get_xml",
            args: { file_name: file },
            callback: function(response) {
                if (response.message) {
                    mainContent.innerHTML = response.message;
                } else {
                    console.error("Error loading XML");
                }
            }
        });
    }
    
};
