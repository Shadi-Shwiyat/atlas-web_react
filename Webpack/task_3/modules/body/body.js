import $ from 'jquery';
import _ from 'lodash';
import './body.css';

$(document).ready(function() {
    $('body').append('<button id="startButton">Click here to get started</button>');
    $('body').append('<p id="count"></p>');
  
    // Counter variable
    let count = 0;

    // Function to update the counter
    function updateCounter() {
        count = count + 1;
        const count_p = $('#count');
        count_p.text(count);
    }

    // Debounced function to update the counter with a 500ms delay
    const debouncedUpdateCounter = _.debounce(updateCounter, 500);

    // Event handling for the button with debounce
    $('#startButton').click(function() {
        debouncedUpdateCounter();
    });
  });