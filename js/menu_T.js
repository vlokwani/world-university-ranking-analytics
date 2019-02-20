function getMenuTemplate() {
    let len = properties.length;
    let navItems = []
    let navItem_t = "<li class=\"nav-item\"></li>";

    for(let i = 0; i < Math.min(4, len); ++i) {
        navItems.push(
            $(navItem_t).append(
                `<a class="nav-link ${properties[i].active === true? 'active': ''}" href="#" data-property="${properties[i].property}">${properties[i].name}</a>`
            ));
    }

    if (len > 4) {
        // everything else goes into dropdown;
        let navItem = $(navItem_t).addClass("nav-item dropup"),
            dropAnchor = $("<span></span>"),
            dropupDiv = $("<div class='dropdown-menu'></div>");

        navItem.append(dropAnchor)
            .append(dropupDiv);

        dropAnchor.addClass("nav-link dropdown-toggle context-menu")
            .attr('href', '#')
            .attr('id', 'navbarDropup')
            .attr('role', 'button')
            .attr('data-toggle', 'dropdown')
            .append($('<span>More...</span>'));

        for(let i=4; i< len; ++i) {
            dropupDiv.append(
                `<a class="dropdown-item" href="#" data-property="${properties[i].property}">${properties[i].name}</a>`
            );
        }
        navItems.push(navItem);
    }

    return navItems;
}