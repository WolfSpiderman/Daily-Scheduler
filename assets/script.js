var saveBtn = $('.saveBtn');
var userInput = $('.description');
var hourBlock = $('.time-block');
var today = $('#currentDay');
var closeBtn = $('.btn-close');

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

function deleteText(event) {
    var where = $(event.target).parent('.time-block');
    console.log(where);
    console.log(where.attr('id'));
    var what = where.find('.description');
    console.log(what);
    var storageCheck = localStorage.getItem(`savedText-${where.attr("id")}`);
    console.log(storageCheck);
    what.val("");
    if (storageCheck !== null && storageCheck !== "") {
    what.attr("placeholder", "Data is still saved to local storage if you don't click the save button.");
    }
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
    closeBtn.on("click", deleteText);

    // time tracker for past, present, future functionality

    function timeCheck() {
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
    }
    timeCheck();
    setInterval(timeCheck(), 60000);
    // clock set on interval to keep it up to date
    setInterval(function() {
        today.text(dayjs().format('[Today is ] dddd, MMMM D, YYYY [at] hh:mm a'));
    }, 1000);
        
  });