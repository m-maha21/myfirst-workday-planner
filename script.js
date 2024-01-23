$(document).ready(function () {
    // Function to generate time blocks
    function generateTimeBlocks() {
      var currentHour = dayjs().hour();
  
      for (var hour = 9; hour <= 17; hour++) {
        var timeBlock = $('<div>').addClass('time-block');
        var row = $('<div>').addClass('row');
        var hourCol = $('<div>').addClass('col-2 hour').text(formatHour(hour));
        var textareaCol = $('<div>').addClass('col-8');
        var textarea = $('<textarea>').attr('id', 'hour-' + hour);
        var saveBtnCol = $('<div>').addClass('col-2');
        var saveBtn = $('<button>').addClass('saveBtn').attr('data-hour', hour).html('<i class="fas fa-save"></i>');
  
        textareaCol.append(textarea);
        saveBtnCol.append(saveBtn);
        row.append(hourCol, textareaCol, saveBtnCol);
        timeBlock.append(row);
  
        if (hour < currentHour) {
          timeBlock.addClass('past');
        } else if (hour === currentHour) {
          timeBlock.addClass('present');
        } else {
          timeBlock.addClass('future');
        }
  
        $('.container').append(timeBlock);
      }
    }
  
    // Function to format hour in 12-hour format
    function formatHour(hour) {
      return dayjs().hour(hour).format('h A');
    }
  
    // Function to save event to local storage
    function saveEvent(hour) {
      var eventText = $('#hour-' + hour).val();
      localStorage.setItem('event-' + hour, eventText);
    }
  
    // Function to load events from local storage
    function loadEvents() {
      for (var hour = 9; hour <= 17; hour++) {
        var eventText = localStorage.getItem('event-' + hour);
        if (eventText !== null) {
          $('#hour-' + hour).val(eventText);
        }
      }
    }
  
    // Function to update current day
    function updateCurrentDay() {
      $('#currentDay').text('Today is ' + dayjs().format('dddd, MMMM D, YYYY'));
    }
  
    // Event listener for save button clicks
    $('.container').on('click', '.saveBtn', function () {
      var hour = $(this).data('hour');
      saveEvent(hour);
    });
  
    // Initial setup
    generateTimeBlocks();
    loadEvents();
    updateCurrentDay();
  });
  