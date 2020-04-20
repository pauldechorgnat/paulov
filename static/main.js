class Swipe {
    constructor(element) {
        this.xDown = null;
        this.yDown = null;
        this.element = typeof(element) === 'string' ? document.querySelector(element) : element;
        this.percentage = 10.;
    }

    touchStart(event) {
        this.xDown = event.touches[0].clientX;
        this.yDown = event.touches[0].clientY;
    }

    onLeft(callback) {
        this.onLeft = callback;

        return this;
    }

    onRight(callback) {
        this.onRight = callback;

        return this;
    }

    onUp(callback) {
        this.onUp = callback;

        return this;
    }

    onDown(callback) {
        this.onDown = callback;

        return this;
    }

    handleTouchMove(evt) {
        if (!this.xDown || !this.yDown) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        this.xDiff = this.xDown - xUp;
        this.yDiff = this.yDown - yUp;

        if (
            (Math.abs(this.xDiff) > (this.percentage)) ||
            (Math.abs(this.yDiff) > (this.percentage))
        ) {

            if (Math.abs(this.xDiff) > Math.abs(this.yDiff)) { // Most significant.
                if (this.xDiff > 0) {
                    this.onLeft();
                } else {
                    this.onRight();
                }
            } else {
                if (this.yDiff > 0) {
                    this.onUp();
                } else {
                    this.onDown();
                }
            }
        }

        // Reset values.
        this.xDown = null;
        this.yDown = null;
    }

    run() {
        this.element.addEventListener('touchstart', this.touchStart.bind(this));
        this.element.addEventListener('touchmove', this.handleTouchMove.bind(this));
    }
}


// function to filter a table

filterTable = function(tableId, inputId) {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById(inputId);
    filter = input.value.toUpperCase();
    table = document.getElementById(tableId);
    tr = table.getElementsByTagName("tr");


    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i];
        // .getElementsByTagName("td")[0];
        // console.log(td)
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

// function to perform a get request
function getData(url) {
    var request = new XMLHttpRequest();
    request.open("GET", url, false); // false for synchronous request
    request.send(null);
    return JSON.parse(request.responseText);
}

// function to populate a table
function populateTable(tableId, data) {
    var table = document.getElementById(tableId);
    for (i = 0; i < data.length; i++) {
        var tr = document.createElement('TR');
        tr.innerHTML = `<td class="left-col">${data[i]['translation']}</td><td class="right-col hidden">${data[i]['word']}</td>`;
        table.appendChild(tr)
    }

}

// display facilities for tables
var tableDisplay = 'left';

splitTable = function() {
    var ths = document.getElementsByTagName('th');
    for (var i = 0; i < ths.length; i++) {
        var th = ths[i];
        th.classList.remove('hidden');
        th.style.width = '50%';

    }
    var tds = document.getElementsByTagName('td');
    for (var i = 0; i < tds.length; i++) {
        var td = tds[i];
        td.classList.remove('hidden');
        td.style.width = '50%';

    }
    tableDisplay = 'split';
}
showRightTable = function() {
    var t = document.getElementsByClassName('right-col');
    for (var i = 0; i < t.length; i++) {
        t[i].classList.remove('hidden');
        t[i].style.width = '100%';
    }
    var t = document.getElementsByClassName('left-col');
    for (var i = 0; i < t.length; i++) {
        t[i].classList.add('hidden');
    }
    tableDisplay = 'right';
}
showLeftTable = function() {
    var t = document.getElementsByClassName('left-col');
    for (var i = 0; i < t.length; i++) {
        t[i].classList.remove('hidden');
        t[i].style.width = '100%';
    }
    var t = document.getElementsByClassName('right-col');
    for (var i = 0; i < t.length; i++) {
        t[i].classList.add('hidden');
    }
    tableDisplay = 'left';
}

leftSwipeTable = function() {
    if (tableDisplay == 'left') {
        return;
    } else if (tableDisplay == 'split') {
        showLeftTable();
        tableDisplay = 'left';
    } else {
        splitTable();
        tableDisplay = 'split';
    }
}

rightSwipeTable = function() {
    if (tableDisplay == 'right') {
        return;
    } else if (tableDisplay == 'split') {
        showRightTable();
        tableDisplay = 'right';
    } else {
        splitTable();
        tableDisplay = 'split';
    }
}