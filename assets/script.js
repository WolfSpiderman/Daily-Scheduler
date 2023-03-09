var saveBtn = $('.saveBtn');
var userInput = $('.description');
var hourBlock = $('.time-block');
var today = $('#currentDay');

// this function did not need to be in the doc.ready function since it is activated by the user with a button
function saveText(event) {
    var h = $(event.currentTarget).parent('.time-block');
    console.log(h);
    console.log(h.attr('id'));
    var q = h.find('.description');
    console.log(q);
    var savedInput = q.val();
    console.log(savedInput);
    localStorage.setItem(`savedText-${h.attr("id")}`, savedInput);
}
$(document).ready(function () {
    // after page is fully loaded, this function checks local storage for each time block and loads any saved inputs
    $('textarea.description').each(function()
    {
        var containerID = $(this).closest('.time-block').attr('id');
        var loadInput = localStorage.getItem('savedText-' + containerID);
        if (loadInput) {
            $(this).val(loadInput);
        }
    });

    saveBtn.on("click", saveText);

    // time tracker for past, present, future functionality
    var currentHour = dayjs().format('H');
    for (var i = 9; i < 22; i++) {
        if (currentHour > i) {
            $('#hour-' + i).removeClass('future present').addClass('past');
        } else if (currentHour == i) {
            $('#hour-' + i).removeClass('future past').addClass('present');
        } else if (currentHour < i) {
            $('#hour-' + i).removeClass('present past').addClass('future');
        }
    }
    // clock set on interval to keep it up to date
    setInterval(function() {
        today.text(dayjs().format('[Today is ] dddd, MMMM D, YYYY. hh:mm a'));
    }, 1000)
        
  });