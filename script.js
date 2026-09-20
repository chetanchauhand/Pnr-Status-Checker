
/*
    RAILCHECK
    Frontend Demo

    IMPORTANT:
    This data is currently stored in JavaScript.

    Later you can replace this with:
    fetch("http://localhost:8080/api/pnr/1234567890")
*/


// ========================================
// DEMO DATABASE
// ========================================

const railwayData = {

    "1234567890": {

        pnr: "1234567890",

        trainNumber: "12925",

        trainName: "Paschim Express",

        date: "20 September 2026",

        from: "Ludhiana",

        fromCode: "LDH",

        to: "New Delhi",

        toCode: "NDLS",

        departure: "18:40",

        arrival: "05:20",

        passengers: [

            {
                name: "Rahul Kumar",

                age: 22,

                bookingStatus: "CNF",

                coach: "S4",

                seat: 32,

                boarding: "Ludhiana",

                boardingCode: "LDH",

                destination: "New Delhi",

                destinationCode: "NDLS"
            },

            {
                name: "Aman Singh",

                age: 21,

                bookingStatus: "RAC",

                coach: "S4",

                seat: 45,

                boarding: "Ludhiana",

                boardingCode: "LDH",

                destination: "New Delhi",

                destinationCode: "NDLS"
            },

            {
                name: "Rohit Sharma",

                age: 20,

                bookingStatus: "WL",

                coach: "-",

                seat: "-",

                boarding: "Ambala",

                boardingCode: "UMB",

                destination: "New Delhi",

                destinationCode: "NDLS"
            }

        ]

    },


    "9876543210": {

        pnr: "9876543210",

        trainNumber: "12046",

        trainName: "New Delhi Shatabdi",

        date: "22 September 2026",

        from: "Amritsar",

        fromCode: "ASR",

        to: "New Delhi",

        toCode: "NDLS",

        departure: "05:55",

        arrival: "11:15",

        passengers: [

            {
                name: "Chetan",

                age: 21,

                bookingStatus: "CNF",

                coach: "C2",

                seat: 18,

                boarding: "Amritsar",

                boardingCode: "ASR",

                destination: "New Delhi",

                destinationCode: "NDLS"
            }

        ]

    },


    "5555555555": {

        pnr: "5555555555",

        trainNumber: "12424",

        trainName: "Dibrugarh Rajdhani",

        date: "25 September 2026",

        from: "New Delhi",

        fromCode: "NDLS",

        to: "Dibrugarh",

        toCode: "DBRG",

        departure: "16:10",

        arrival: "07:00",

        passengers: [

            {
                name: "Vikas",

                age: 24,

                bookingStatus: "RAC",

                coach: "B2",

                seat: 21,

                boarding: "New Delhi",

                boardingCode: "NDLS",

                destination: "Dibrugarh",

                destinationCode: "DBRG"
            }

        ]

    }

};


// ========================================
// ELEMENTS
// ========================================

const pnrTab = document.getElementById("pnrTab");

const seatTab = document.getElementById("seatTab");

const pnrSearch = document.getElementById("pnrSearch");

const seatSearch = document.getElementById("seatSearch");

const pnrBtn = document.getElementById("pnrBtn");

const seatBtn = document.getElementById("seatBtn");

const pnrInput = document.getElementById("pnrInput");

const result = document.getElementById("result");

const themeBtn = document.getElementById("themeBtn");


// ========================================
// TAB SWITCHING
// ========================================

pnrTab.addEventListener("click", function () {

    pnrTab.classList.add("active");

    seatTab.classList.remove("active");

    pnrSearch.classList.remove("hidden");

    seatSearch.classList.add("hidden");

});


seatTab.addEventListener("click", function () {

    seatTab.classList.add("active");

    pnrTab.classList.remove("active");

    seatSearch.classList.remove("hidden");

    pnrSearch.classList.add("hidden");

});


// ========================================
// PNR SEARCH
// ========================================

pnrBtn.addEventListener("click", function () {

    const pnr = pnrInput.value.trim();

    if (pnr.length !== 10) {

        showError("Please enter a valid 10 digit PNR.");

        return;
    }


    // Show loading

    result.innerHTML = `
        <div class="welcome-card">
            <div class="welcome-icon">🔎</div>
            <h2>Checking PNR...</h2>
            <p>Please wait.</p>
        </div>
    `;


    setTimeout(function () {

        const data = railwayData[pnr];

        if (!data) {

            showError(
                "PNR not found in demo database. Try 1234567890 or 9876543210."
            );

            return;
        }

        displayPNR(data);

    }, 700);

});


// ========================================
// DISPLAY PNR
// ========================================

function displayPNR(data) {

    let passengerHTML = "";


    data.passengers.forEach(function (passenger, index) {

        let statusClass = "waiting";

        if (passenger.bookingStatus === "CNF") {

            statusClass = "confirmed";

        } else if (passenger.bookingStatus === "RAC") {

            statusClass = "rac";

        } else if (passenger.bookingStatus === "CAN") {

            statusClass = "cancelled";
        }


        passengerHTML += `

            <div class="passenger">

                <div>
                    <span class="label">
                        Passenger
                    </span>

                    <div class="passenger-name">
                        ${index + 1}. ${passenger.name}
                    </div>

                    <small>
                        Age: ${passenger.age}
                    </small>
                </div>


                <div>

                    <span class="label">
                        Status
                    </span>

                    <span class="status ${statusClass}">
                        ${getFullStatus(passenger.bookingStatus)}
                    </span>

                </div>


                <div>

                    <span class="label">
                        Coach / Seat
                    </span>

                    <strong>
                        ${passenger.coach} / ${passenger.seat}
                    </strong>

                </div>


                <div>

                    <span class="label">
                        Boarding
                    </span>

                    <strong>
                        ${passenger.boarding}
                        (${passenger.boardingCode})
                    </strong>

                </div>

            </div>

        `;
    });


    result.innerHTML = `

        <div class="train-card">

            <div class="train-header">

                <div>

                    <div class="train-name">

                        ${data.trainName}

                    </div>

                    <div class="pnr-number">

                        Train No. ${data.trainNumber}

                    </div>

                </div>


                <div>

                    <span class="label">
                        PNR
                    </span>

                    <strong>
                        ${data.pnr}
                    </strong>

                </div>

            </div>


            <div class="journey">

                <div class="station">

                    <span class="label">
                        DEPARTURE
                    </span>

                    <h3>
                        ${data.fromCode}
                    </h3>

                    <p>
                        ${data.from}
                    </p>

                    <strong>
                        ${data.departure}
                    </strong>

                </div>


                <div class="arrow">
                    →
                </div>


                <div class="station">

                    <span class="label">
                        ARRIVAL
                    </span>

                    <h3>
                        ${data.toCode}
                    </h3>

                    <p>
                        ${data.to}
                    </p>

                    <strong>
                        ${data.arrival}
                    </strong>

                </div>

            </div>


            <div class="boarding-box">

                <h3>
                    📍 Passenger Journey Information
                </h3>

                <p>
                    Each passenger's boarding station and
                    destination are shown below.
                </p>

            </div>


            <div class="passenger-section">

                <h2>
                    Passenger Details
                </h2>

                ${passengerHTML}

            </div>


            <div class="boarding-box">

                <h3>
                    🧭 Important
                </h3>

                <p>
                    Passenger must board the train from the
                    boarding station shown in their ticket.
                </p>

            </div>

        </div>

    `;
}


// ========================================
// SEAT SEARCH
// ========================================

seatBtn.addEventListener("click", function () {

    const train = document
        .getElementById("trainInput")
        .value
        .trim();

    const coach = document
        .getElementById("coachInput")
        .value
        .trim()
        .toUpperCase();

    const seat = document
        .getElementById("seatInput")
        .value
        .trim();


    if (!train || !coach || !seat) {

        showError("Please enter train, coach and seat.");

        return;
    }


    let foundPassenger = null;

    let foundTrain = null;


    // Search through demo database

    for (const pnr in railwayData) {

        const data = railwayData[pnr];

        if (data.trainNumber !== train) {
            continue;
        }


        for (const passenger of data.passengers) {

            if (
                passenger.coach === coach &&
                String(passenger.seat) === seat
            ) {

                foundPassenger = passenger;

                foundTrain = data;

                break;
            }
        }


        if (foundPassenger) {
            break;
        }

    }


    if (!foundPassenger) {

        showError(
            "No passenger found for this train and seat in demo data."
        );

        return;
    }


    displaySeatResult(foundPassenger, foundTrain);

});


// ========================================
// DISPLAY SEAT RESULT
// ========================================

function displaySeatResult(passenger, train) {

    result.innerHTML = `

        <div class="seat-result">

            <h2>
                🎫 Seat Information
            </h2>


            <div class="seat-info">

                <div class="info-box">

                    <span class="label">
                        Passenger
                    </span>

                    <strong>
                        ${passenger.name}
                    </strong>

                </div>


                <div class="info-box">

                    <span class="label">
                        PNR
                    </span>

                    <strong>
                        ${train.pnr}
                    </strong>

                </div>


                <div class="info-box">

                    <span class="label">
                        Train
                    </span>

                    <strong>
                        ${train.trainNumber}
                        - ${train.trainName}
                    </strong>

                </div>


                <div class="info-box">

                    <span class="label">
                        Coach / Seat
                    </span>

                    <strong>
                        ${passenger.coach}
                        / ${passenger.seat}
                    </strong>

                </div>


                <div class="info-box">

                    <span class="label">
                        Boarding Station
                    </span>

                    <strong>
                        ${passenger.boarding}
                        (${passenger.boardingCode})
                    </strong>

                </div>


                <div class="info-box">

                    <span class="label">
                        Destination
                    </span>

                    <strong>
                        ${passenger.destination}
                        (${passenger.destinationCode})
                    </strong>

                </div>


                <div class="info-box">

                    <span class="label">
                        Journey Date
                    </span>

                    <strong>
                        ${train.date}
                    </strong>

                </div>


                <div class="info-box">

                    <span class="label">
                        Ticket Status
                    </span>

                    <strong>
                        ${getFullStatus(passenger.bookingStatus)}
                    </strong>

                </div>

            </div>


            <div class="boarding-box">

                <h3>
                    📍 Boarding Station
                </h3>

                <p>

                    Passenger <strong>${passenger.name}</strong>
                    will board from

                    <strong>
                        ${passenger.boarding}
                        (${passenger.boardingCode})
                    </strong>

                    and travel to

                    <strong>
                        ${passenger.destination}
                        (${passenger.destinationCode})
                    </strong>.

                </p>

            </div>

        </div>

    `;
}


// ========================================
// STATUS TEXT
// ========================================

function getFullStatus(status) {

    if (status === "CNF") {

        return "CONFIRMED";

    }

    if (status === "RAC") {

        return "RAC";

    }

    if (status === "WL") {

        return "WAITING";

    }

    if (status === "CAN") {

        return "CANCELLED";

    }

    return status;
}


// ========================================
// ERROR
// ========================================

function showError(message) {

    result.innerHTML = `

        <div class="welcome-card">

            <div class="welcome-icon">
                ⚠️
            </div>

            <h2>
                Search Result
            </h2>

            <p>
                ${message}
            </p>

        </div>

    `;
}


// ========================================
// DARK MODE
// ========================================

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");


    if (document.body.classList.contains("dark")) {

        themeBtn.textContent = "☀️";

        localStorage.setItem("theme", "dark");

    } else {

        themeBtn.textContent = "🌙";

        localStorage.setItem("theme", "light");

    }

});


// Load saved theme

if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark");

    themeBtn.textContent = "☀️";

}
```
