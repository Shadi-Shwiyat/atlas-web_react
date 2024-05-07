import $ from 'jquery';
import lodash from 'lodash';

$(document).ready(function() {
    // DOM manipulation
    $('body').append('<p>Holberton Dashboard</p>');
    $('body').append('<p>Dashboard data for the students</p>');
    $('body').append('<button id="startButton">Click here to get started</button>');
    $('body').append('<p id="count"></p>');
    $('body').append('<p>Copyright - Holberton School</p>');

    // Counter variable
    let count = 0;

    // Function to update the counter
    function updateCounter() {
        count = count + 1;
        const count_p = $('#count');
        count_p.text(count);
    }

    // Debounced function to update the counter with a 500ms delay
    const debouncedUpdateCounter = lodash.debounce(updateCounter, 500);

    // Event handling for the button with debounce
    $('#startButton').click(function() {
        debouncedUpdateCounter();
    });
})