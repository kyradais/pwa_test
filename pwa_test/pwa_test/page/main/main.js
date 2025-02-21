frappe.pages['main'].on_page_load = function(wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'test',
        single_column: true
    });

    // Hide the page head
    let pageHead = wrapper.querySelector('.page-head');
    if (pageHead) pageHead.style.display = 'none';

    // Create the bottom navigation bar
    let bottomNav = document.createElement('div');
    bottomNav.className = 'bottom-nav';

    bottomNav.innerHTML = `
        <button class="nav-button">📁</button>
        <button class="home-button">🏠</button>
        <button class="nav-button">⚙️</button>
    `;

    wrapper.appendChild(bottomNav);
};