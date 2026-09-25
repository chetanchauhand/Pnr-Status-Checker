/*
    RAILCHECK
    Railway Journey Frontend

    CURRENT:
    Demo railway data is used.

    LATER:
    Replace demo functions with your backend API.

    Example:

    fetch(`/api/trains/availability?train=12925&from=LDH&to=NDLS`)
*/


// ========================================
// DEMO DATA
// ========================================

const railwayData = {

    "1234567890": {

        pnr: "1234567890",

        trainNumber: "12925",

        trainName: "Paschim Express",

        date: "2026-09-25",

        from: "Ludhiana",

        fromCode: "LDH",

        to: "New Delhi",

        toCode: "NDLS",

        departure: "18:40",

        arrival: "05:20",

        status: "CNF",

        coach: "S4",

        seat: "32",

        boarding: "Ludhiana",

        destination: "New Delhi"
    },


    "9876543210": {

        pnr: "9876543210",

        trainNumber: "12046",

        trainName: "New Delhi Shatabdi",

        date: "2026-09-26",

        from: "Amritsar",

        fromCode: "ASR",

        to: "New Delhi",

        toCode: "NDLS",

        departure: "05:55",

        arrival: "11:15",

        status: "CNF",

        coach: "C2",

        seat: "18",

        boarding: "Amritsar",

        destination: "New Delhi"
    }

};


// ========================================
// SEGMENT-WISE DEMO DATA
// ========================================

const seatAvailabilityData = {

    "12925": {

        trainName: "Paschim Express",

        date: "2026-09-25",

        class: "SL",

        stations: [

            {
                name: "Amritsar",
                code: "ASR"
            },

            {
                name: "Jalandhar",
                code: "JUC"
            },

            {
                name: "Ludhiana",
                code: "LDH"
            },

            {
                name: "Ambala",
                code: "UMB"
            },

            {
                name: "New Delhi",
                code: "NDLS"
            }

        ],

        seats: [

            {
                coach: "S4",
                seat: "32",
                reservedFrom: "Ludhiana",
                reservedFromCode: "LDH",
                destination: "New Delhi",
                destinationCode: "NDLS"
            },

            {
                coach: "S4",
                seat: "33",
                reservedFrom: "Ambala",
                reservedFromCode: "UMB",
                destination: "New Delhi",
                destinationCode: "NDLS"
            },

            {
                coach: "S4",
                seat: "34",
                reservedFrom: "Jalandhar",
                reservedFromCode: "JUC",
                destination: "Ambala",
                destinationCode: "UMB"
            },

            {
                coach: "S4",
                seat: "35",
                reservedFrom: "Ludhiana",
                reservedFromCode: "LDH",
                destination: "Ambala",
                destinationCode: "UMB"
            },

            {
                coach: "S4",
                seat: "36",
                reservedFrom: "New Delhi",
                reservedFromCode: "NDLS",
                destination: "New Delhi",
                destinationCode: "NDLS"
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

const fromInput = document.getElementById("fromInput");
const toInput = document.getElementById("toInput");
const dateInput = document.getElementById("dateInput");
const trainInput = document.getElementById("trainInput");
const classInput = document.getElementById("classInput");

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

    if (!/^\d{10}$/.test(pnr)) {

        showError("Please enter a valid 10-digit PNR.");

        return;
    }


    showLoading("Checking PNR status...");


    setTimeout(function () {

        const data = railwayData[pnr];

        if (!data) {

            showError(
                "PNR not available in demo data. Try 1234567890 or 9876543210."
            );

            return;
        }

        displayPNR(data);

    }, 600);

});


// ========================================
// DISPLAY PNR
// ========================================

function displayPNR(data) {

    result.innerHTML = `

        <div class="result-card">

            <div class="result-header">

                <div>

                    <div class="train-name">
                        ${data.trainName}
                    </div>

                    <div class="train-number">
                        Train No. ${data.trainNumber}
                    </div>

                </div>

                <div>

                    <span class="status confirmed">
                        ${getFullStatus(data.status)}
                    </span>

                </div>

            </div>


            <div class="journey">

                <div class="station">

                    <div class="station-code">
                        ${data.fromCode}
                    </div>

                    <div class="station-name">
                        ${data.from}
                    </div>

                    <span class="station-time">
                        ${data.departure}
                    </span>

                </div>


                <div class="route-line"></div>


                <div class="station">

                    <div class="station-code">
                        ${data.toCode}
                    </div>

                    <div class="station-name">
                        ${data.to}
                    </div>

                    <span class="station-time">
                        ${data.arrival}
                    </span>

                </div>

            </div>


            <div class="info-grid">

                <div class="info-box">

                    <span class="info-label">
                        PNR
                    </span>

                    <span class="info-value">
                        ${data.pnr}
                    </span>

                </div>


                <div class="info-box">

                    <span class="info-label">
                        Coach / Seat
                    </span>

                    <span class="info-value">
                        ${data.coach} / ${data.seat}
                    </span>

                </div>


                <div class="info-box">

                    <span class="info-label">
                        Boarding
                    </span>

                    <span class="info-value">
                        ${data.boarding}
                    </span>

                </div>


                <div class="info-box">

                    <span class="info-label">
                        Destination
                    </span>

                    <span class="info-value">
                        ${data.destination}
                    </span>

                </div>


                <div class="info-box">

                    <span class="info-label">
                        Journey Date
                    </span>

                    <span class="info-value">
                        ${formatDate(data.date)}
                    </span>

                </div>


                <div class="info-box">

                    <span class="info-label">
                        Ticket Status
                    </span>

                    <span class="info-value">
                        ${getFullStatus(data.status)}
                    </span>

                </div>

            </div>

        </div>

    `;
}


// ========================================
// SEGMENT-WISE SEAT SEARCH
// ========================================

seatBtn.addEventListener("click", function () {

    const from = fromInput.value.trim();
    const to = toInput.value.trim();
    const date = dateInput.value;
    const train = trainInput.value.trim();
    const selectedClass = classInput.value;


    if (!from || !to || !date || !train) {

        showError(
            "Please enter From, To, Date and Train Number."
        );

        return;
    }


    if (from.toLowerCase() === to.toLowerCase()) {

        showError(
            "From and To stations cannot be the same."
        );

        return;
    }


    showLoading("Checking segment-wise seat availability...");


    setTimeout(function () {

        const trainData = seatAvailabilityData[train];


        if (!trainData) {

            showError(
                "This train is not available in demo data. Try train 12925."
            );

            return;
        }


        if (trainData.date !== date) {

            showError(
                `Demo data for this train is available for ${formatDate(trainData.date)}.`
            );

            return;
        }


        displaySegmentAvailability(
            trainData,
            from,
            to,
            selectedClass
        );

    }, 700);

});


// ========================================
// SEGMENT AVAILABILITY
// ========================================

function displaySegmentAvailability(
    trainData,
    from,
    to,
    selectedClass
) {

    const fromIndex = findStationIndex(
        trainData.stations,
        from
    );

    const toIndex = findStationIndex(
        trainData.stations,
        to
    );


    if (fromIndex === -1 || toIndex === -1) {

        showError(
            "Station not found in this demo train route. Try Ludhiana, Ambala or New Delhi."
        );

        return;
    }


    if (fromIndex >= toIndex) {

        showError(
            "Please select stations in the same journey direction."
        );

        return;
    }


    const relevantSeats = trainData.seats.filter(function (seat) {

        return isSeatRelevantForSegment(
            seat,
            trainData.stations,
            fromIndex,
            toIndex
        );

    });


    result.innerHTML = `

        <div class="result-card">

            <div class="result-header">

                <div>

                    <div class="train-name">
                        ${trainData.trainName}
                    </div>

                    <div class="train-number">
                        Train No. ${Object.keys(seatAvailabilityData).find(
                            key => seatAvailabilityData[key] === trainData
                        )}
                        • ${selectedClass}
                    </div>

                </div>

                <span class="status confirmed">
                    ${relevantSeats.length} seats found
                </span>

            </div>


            <div class="journey">

                <div class="station">

                    <div class="station-code">
                        ${trainData.stations[fromIndex].code}
                    </div>

                    <div class="station-name">
                        ${trainData.stations[fromIndex].name}
                    </div>

                </div>


                <div class="route-line"></div>


                <div class="station">

                    <div class="station-code">
                        ${trainData.stations[toIndex].code}
                    </div>

                    <div class="station-name">
                        ${trainData.stations[toIndex].name}
                    </div>

                </div>

            </div>


            <div class="segment-title">

                <h2>
                    Seat-wise journey segment
                </h2>

                <p>
                    These are demo reservation segments.
                    Actual availability will come from the railway data source.
                </p>

            </div>


            <div class="segment-list">

                ${renderSeatRows(
                    relevantSeats,
                    trainData.stations,
                    fromIndex,
                    toIndex
                )}

            </div>


            <div class="notice">

                <strong>How this works:</strong>
                A seat reserved from a later station can appear free
                before that boarding station. Actual booking availability
                must always be confirmed through the authorized railway
                reservation system.

            </div>

        </div>

    `;
}


// ========================================
// CHECK SEAT SEGMENT
// ========================================

function isSeatRelevantForSegment(
    seat,
    stations,
    fromIndex,
    toIndex
) {

    const reservedFromIndex = findStationIndex(
        stations,
        seat.reservedFrom
    );

    const reservedToIndex = findStationIndex(
        stations,
        seat.destination
    );


    if (reservedFromIndex === -1) {
        return false;
    }


    /*
        We show seats whose reservation overlaps
        or begins after the user's boarding station.

        Example:

        User: Ludhiana → Ambala

        Seat: Ambala → Delhi
        Result: FREE BEFORE AMBALA

        Seat: Ludhiana → Delhi
        Result: RESERVED
    */

    const overlaps =
        reservedFromIndex < toIndex &&
        reservedToIndex > fromIndex;


    const startsAfterUser =
        reservedFromIndex >= toIndex;


    return overlaps || startsAfterUser;
}


// ========================================
// RENDER SEAT ROWS
// ========================================

function renderSeatRows(
    seats,
    stations,
    fromIndex,
    toIndex
) {

    if (seats.length === 0) {

        return `
            <div class="notice">
                No matching seat information found in demo data.
            </div>
        `;
    }


    return seats.map(function (seat) {

        const reservedFromIndex = findStationIndex(
            stations,
            seat.reservedFrom
        );

        const reservedToIndex = findStationIndex(
            stations,
            seat.destination
        );


        const isReservedDuringSegment =
            reservedFromIndex < toIndex &&
            reservedToIndex > fromIndex;


        if (!isReservedDuringSegment) {

            return `

                <div class="seat-row">

                    <div class="seat-number">
                        ${seat.coach}-${seat.seat}
                    </div>

                    <div class="seat-route">

                        Free until
                        <strong>
                            ${seat.reservedFrom}
                        </strong>

                        <br>

                        <span>
                            Reserved: ${seat.reservedFrom}
                            → ${seat.destination}
                        </span>

                    </div>

                    <div class="segment-status">

                        <span class="badge partial-badge">
                            Free before ${seat.reservedFrom}
                        </span>

                    </div>

                </div>

            `;
        }


        return `

            <div class="seat-row">

                <div class="seat-number">
                    ${seat.coach}-${seat.seat}
                </div>

                <div class="seat-route">

                    <strong>
                        ${seat.reservedFrom}
                    </strong>

                    →
                    
                    <strong>
                        ${seat.destination}
                    </strong>

                    <br>

                    <span>
                        Seat is reserved on this segment
                    </span>

                </div>

                <div class="segment-status">

                    <span class="badge reserved-badge">
                        Reserved
                    </span>

                </div>

            </div>

        `;

    }).join("");

}


// ========================================
// FIND STATION
// ========================================

function findStationIndex(stations, stationName) {

    const search = stationName
        .toLowerCase()
        .trim();


    return stations.findIndex(function (station) {

        return (
            station.name.toLowerCase() === search ||
            station.code.toLowerCase() === search
        );

    });

}


// ========================================
// LOADING
// ========================================

function showLoading(message) {

    result.innerHTML = `

        <div class="welcome-card">

            <div class="welcome-icon">
                <img src="logo.svg" alt="">
            </div>

            <h2>
                ${message}
            </h2>

            <p>
                Please wait...
            </p>

        </div>

    `;

}


// ========================================
// ERROR
// ========================================

function showError(message) {

    result.innerHTML = `

        <div class="welcome-card">

            <h2>
                Search unavailable
            </h2>

            <p>
                ${message}
            </p>

        </div>

    `;

}


// ========================================
// STATUS
// ========================================

function getFullStatus(status) {

    const statusMap = {

        CNF: "CONFIRMED",
        RAC: "RAC",
        WL: "WAITING",
        CAN: "CANCELLED"

    };

    return statusMap[status] || status;

}


// ========================================
// DATE
// ========================================

function formatDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}


// ========================================
// DARK MODE
// ========================================

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    const isDark =
        document.body.classList.contains("dark");


    themeBtn.textContent =
        isDark ? "Light" : "Dark";


    localStorage.setItem(
        "theme",
        isDark ? "dark" : "light"
    );

});


if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark");

    themeBtn.textContent = "Light";

}
