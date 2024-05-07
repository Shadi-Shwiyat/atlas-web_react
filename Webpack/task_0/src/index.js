import $ from 'jquery';

$(document).ready(function() {
    // Declare paragraphs
    let p1 = $("<p>Holberton Dashboard</p>");
    let p2 = $("<p>Dashboard data for the students</p>");
    let p3 = $("<p>Copyright - Holberton School</p>");

    const p_list = [p1, p2, p3];

    // Add each paragraph to dom
    const body = $("body");
    for (let p of p_list) {
        body.append(p);
    }
});