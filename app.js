// =====================================================
// ESEC SMART CAMPUS NAVIGATOR
// STEP 5
// =====================================================



// =====================================================
// CAMPUS DATA
// =====================================================

const buildings = [

    {
        id: 1,
        name: "ESEC Campus",
        lat: 11.31373,
        lng: 77.55034,
        category: "Campus",
        icon: "🎓",
        description:
            "Erode Sengunthar Engineering College main campus.",
        details:
            "Thudupathi, Perundurai, Erode – 638057"
    },

    {
        id: 2,
        name: "Central Library",
        lat: 11.31373,
        lng: 77.55135,
        category: "Library",
        icon: "📚",
        description:
            "Central library serving students and faculty.",
        details:
            "Books • Digital Resources • Reading Area"
    },

    {
        id: 3,
        name: "Open Auditorium",
        lat: 11.31303,
        lng: 77.55105,
        category: "Academic",
        icon: "🎤",
        description:
            "Open auditorium for college events and programs.",
        details:
            "Events • Cultural Programs • Gatherings"
    },

    {
        id: 4,
        name: "Haigreshwar & Ganesh Temple",
        lat: 11.31278,
        lng: 77.55134,
        category: "Campus",
        icon: "🛕",
        description:
            "Temple area inside the ESEC campus.",
        details:
            "Campus Prayer Area"
    },

    {
        id: 5,
        name: "Basketball Court",
        lat: 11.31373,
        lng: 77.55263,
        category: "Sports",
        icon: "🏀",
        description:
            "Outdoor basketball court.",
        details:
            "Sports • Basketball"
    },

    {
        id: 6,
        name: "Volleyball Court",
        lat: 11.31373,
        lng: 77.55305,
        category: "Sports",
        icon: "🏐",
        description:
            "Outdoor volleyball court.",
        details:
            "Sports • Volleyball"
    },

    {
        id: 7,
        name: "Pearl Hostel",
        lat: 11.31296,
        lng: 77.54964,
        category: "Hostel",
        icon: "🏠",
        description:
            "Student hostel facility.",
        details:
            "Hostel • Student Accommodation"
    },

    {
        id: 8,
        name: "CSE & Administrative Block",
        lat: 11.31420,
        lng: 77.54990,
        category: "Academic",
        icon: "🏢",
        description:
            "Computer Science and administrative facilities.",
        details:
            "CSE • Administration • Classrooms"
    },

    {
        id: 9,
        name: "ECE & EIE Block",
        lat: 11.31445,
        lng: 77.55055,
        category: "Academic",
        icon: "🏢",
        description:
            "ECE and EIE academic block.",
        details:
            "ECE • EIE • Laboratories • Classrooms"
    },

    {
        id: 10,
        name: "Workshop Building",
        lat: 11.31455,
        lng: 77.55120,
        category: "Academic",
        icon: "🔧",
        description:
            "Workshop and practical learning facility.",
        details:
            "Workshop • Practical Training"
    },

    {
        id: 11,
        name: "Mess & Canteen",
        lat: 11.31380,
        lng: 77.55080,
        category: "Food",
        icon: "🍴",
        description:
            "Food and refreshment facility.",
        details:
            "Mess • Canteen • Refreshments"
    },

    {
        id: 12,
        name: "Main Gate",
        lat: 11.31190,
        lng: 77.54910,
        category: "Campus",
        icon: "🚪",
        description:
            "Main entrance of ESEC campus.",
        details:
            "Campus Entry • Campus Exit"
    },

    {
        id: 13,
        name: "Emergency Point",
        lat: 11.31320,
        lng: 77.55010,
        category: "Emergency",
        icon: "🚨",
        description:
            "Emergency assistance point.",
        details:
            "Emergency Assistance • Ambulance: 108"
    }

];



// =====================================================
// MAP
// =====================================================

const map = L.map("map").setView(

    [
        11.31373,
        77.55034
    ],

    17

);


L.tileLayer(

    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

    {

        maxZoom: 21,

        attribution:
            "&copy; OpenStreetMap contributors"

    }

).addTo(map);



// =====================================================
// CUSTOM MARKER
// =====================================================

function createIcon(

    emoji,
    emergency = false

) {

    return L.divIcon({

        className: "",

        html: `

            <div class="
                custom-marker
                ${emergency
                    ? "emergency-marker"
                    : ""}
            ">

                ${emoji}

            </div>

        `,

        iconSize: [
            36,
            36
        ],

        iconAnchor: [
            18,
            18
        ]

    });

}



// =====================================================
// BUILDING MARKERS
// =====================================================

const markers = {};


buildings.forEach(

    building => {

        const marker =

            L.marker(

                [
                    building.lat,
                    building.lng
                ],

                {

                    icon:

                        createIcon(

                            building.icon,

                            building.category
                            === "Emergency"

                        )

                }

            ).addTo(map);



        marker.bindTooltip(
            building.name
        );



        marker.on(

            "click",

            () => {

                showBuildingInfo(
                    building
                );

            }

        );



        markers[
            building.id
        ] = marker;

    }

);



// =====================================================
// CAMPUS BOUNDARY
// =====================================================

const campusBoundary = [

    [
        11.31220,
        77.54880
    ],

    [
        11.31500,
        77.54880
    ],

    [
        11.31520,
        77.55350
    ],

    [
        11.31230,
        77.55350
    ]

];


L.polygon(

    campusBoundary,

    {

        color: "#2563eb",

        weight: 2,

        dashArray: "8 8",

        fillOpacity: 0.03

    }

).addTo(map);



// =====================================================
// INFO PANEL
// =====================================================

const infoPanel =
    document.getElementById(
        "infoPanel"
    );


const buildingName =
    document.getElementById(
        "buildingName"
    );


const buildingDescription =
    document.getElementById(
        "buildingDescription"
    );


const buildingDetails =
    document.getElementById(
        "buildingDetails"
    );


const infoIcon =
    document.getElementById(
        "infoIcon"
    );



function showBuildingInfo(
    building
) {

    infoIcon.innerHTML =
        building.icon;


    buildingName.innerHTML =
        building.name;


    buildingDescription.innerHTML =
        building.description;


    buildingDetails.innerHTML = `

        <strong>
            Category:
        </strong>

        ${building.category}

        <br>

        <strong>
            Location:
        </strong>

        ESEC Campus

        <br>

        <strong>
            Coordinates:
        </strong>

        ${building.lat.toFixed(5)},
        ${building.lng.toFixed(5)}

        <br><br>

        ${building.details}

    `;


    infoPanel.style.display =
        "block";


    map.setView(

        [
            building.lat,
            building.lng
        ],

        18

    );

}



document
    .getElementById(
        "closePanel"
    )
    .addEventListener(

        "click",

        () => {

            infoPanel.style.display =
                "none";

        }

    );



// =====================================================
// SEARCH
// =====================================================

const searchInput =
    document.getElementById(
        "searchInput"
    );


const searchResults =
    document.getElementById(
        "searchResults"
    );



searchInput.addEventListener(

    "input",

    () => {

        const query =
            searchInput.value
                .toLowerCase()
                .trim();



        searchResults.innerHTML =
            "";



        if (!query) {

            return;

        }



        const results =
            buildings.filter(

                building =>

                    building.name
                        .toLowerCase()
                        .includes(query)

                    ||

                    building.category
                        .toLowerCase()
                        .includes(query)

            );



        results.forEach(

            building => {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "search-item";


                item.innerHTML =

                    `${building.icon}
                     ${building.name}`;



                item.addEventListener(

                    "click",

                    () => {

                        showBuildingInfo(
                            building
                        );


                        toLocation.value =
                            building.id;


                        searchInput.value =
                            building.name;


                        searchResults.innerHTML =
                            "";

                    }

                );


                searchResults.appendChild(
                    item
                );

            }

        );

    }

);



// =====================================================
// ROUTE DROPDOWNS
// =====================================================

const fromLocation =
    document.getElementById(
        "fromLocation"
    );


const toLocation =
    document.getElementById(
        "toLocation"
    );


buildings.forEach(

    building => {

        const fromOption =
            document.createElement(
                "option"
            );


        fromOption.value =
            building.id;


        fromOption.textContent =
            `${building.icon} ${building.name}`;


        fromLocation.appendChild(
            fromOption
        );



        const toOption =
            document.createElement(
                "option"
            );


        toOption.value =
            building.id;


        toOption.textContent =
            `${building.icon} ${building.name}`;


        toLocation.appendChild(
            toOption
        );

    }

);



// =====================================================
// GRAPH
// =====================================================

const graph = {

    1: [8, 9, 11, 13, 12],

    2: [3, 4, 5, 6, 11],

    3: [1, 2, 4],

    4: [2, 3, 13],

    5: [2, 6],

    6: [2, 5],

    7: [12, 13],

    8: [1, 9, 12],

    9: [1, 8, 10, 11],

    10: [9, 2],

    11: [1, 2, 9, 13],

    12: [1, 8, 7, 13],

    13: [1, 4, 7, 11, 12]

};



// =====================================================
// DISTANCE
// =====================================================

function calculateDistance(

    lat1,
    lon1,
    lat2,
    lon2

) {

    const earthRadius =
        6371000;


    const lat1Rad =
        lat1 *
        Math.PI /
        180;


    const lat2Rad =
        lat2 *
        Math.PI /
        180;


    const deltaLat =
        (
            lat2 -
            lat1
        ) *
        Math.PI /
        180;


    const deltaLon =
        (
            lon2 -
            lon1
        ) *
        Math.PI /
        180;


    const a =

        Math.sin(
            deltaLat / 2
        ) ** 2

        +

        Math.cos(
            lat1Rad
        )

        *

        Math.cos(
            lat2Rad
        )

        *

        Math.sin(
            deltaLon / 2
        ) ** 2;


    const c =

        2 *

        Math.atan2(

            Math.sqrt(a),

            Math.sqrt(
                1 - a
            )

        );


    return earthRadius * c;

}



// =====================================================
// EDGE DISTANCE
// =====================================================

function edgeDistance(

    id1,
    id2

) {

    const a =
        buildings.find(
            b => b.id === id1
        );


    const b =
        buildings.find(
            b => b.id === id2
        );


    return calculateDistance(

        a.lat,
        a.lng,

        b.lat,
        b.lng

    );

}



// =====================================================
// DIJKSTRA
// =====================================================

function dijkstra(

    start,
    end

) {

    const distances = {};

    const previous = {};

    const unvisited =
        new Set(
            buildings.map(
                b => b.id
            )
        );


    buildings.forEach(

        building => {

            distances[
                building.id
            ] = Infinity;

            previous[
                building.id
            ] = null;

        }

    );


    distances[start] = 0;



    while (
        unvisited.size > 0
    ) {

        let current =
            null;

        let smallest =
            Infinity;



        unvisited.forEach(

            id => {

                if (
                    distances[id]
                    <
                    smallest
                ) {

                    smallest =
                        distances[id];

                    current =
                        id;

                }

            }

        );



        if (
            current === null
        ) {

            break;

        }



        if (
            current === end
        ) {

            break;

        }



        unvisited.delete(
            current
        );



        graph[current].forEach(

            neighbor => {

                if (
                    !unvisited.has(
                        neighbor
                    )
                ) {

                    return;

                }



                const newDistance =

                    distances[current]

                    +

                    edgeDistance(
                        current,
                        neighbor
                    );



                if (
                    newDistance
                    <
                    distances[neighbor]
                ) {

                    distances[neighbor] =
                        newDistance;

                    previous[neighbor] =
                        current;

                }

            }

        );

    }



    const path = [];

    let current =
        end;



    while (
        current !== null
    ) {

        path.unshift(
            current
        );

        current =
            previous[current];

    }



    if (
        path[0] !== start
    ) {

        return null;

    }



    return {

        path: path,

        distance:
            distances[end]

    };

}



// =====================================================
// ROUTE LINE
// =====================================================

let routeLine = null;



function clearRoute() {

    if (routeLine) {

        map.removeLayer(
            routeLine
        );

        routeLine = null;

    }

}



// =====================================================
// DRAW ROUTE
// =====================================================

function drawCampusRoute(
    path
) {

    clearRoute();


    const coordinates =
        path.map(

            id => {

                const building =
                    buildings.find(
                        b => b.id === id
                    );


                return [
                    building.lat,
                    building.lng
                ];

            }

        );


    routeLine =
        L.polyline(

            coordinates,

            {

                weight: 7,

                opacity: 0.9,

                dashArray: "12 8"

            }

        ).addTo(map);


    map.fitBounds(

        routeLine.getBounds(),

        {

            padding: [
                80,
                80
            ]

        }

    );

}



// =====================================================
// NORMAL ROUTE
// =====================================================

document
    .getElementById(
        "routeBtn"
    )
    .addEventListener(

        "click",

        () => {

            const start =
                Number(
                    fromLocation.value
                );


            const destination =
                Number(
                    toLocation.value
                );


            if (
                !start ||
                !destination
            ) {

                document
                    .getElementById(
                        "routeInfo"
                    )
                    .innerHTML =

                    "⚠️ Please select both starting point and destination.";

                return;

            }


            if (
                start === destination
            ) {

                document
                    .getElementById(
                        "routeInfo"
                    )
                    .innerHTML =

                    "📍 You are already at the selected destination.";

                return;

            }


            const result =
                dijkstra(
                    start,
                    destination
                );


            if (!result) {

                document
                    .getElementById(
                        "routeInfo"
                    )
                    .innerHTML =

                    "❌ No route found.";

                return;

            }


            drawCampusRoute(
                result.path
            );


            const destinationBuilding =
                buildings.find(
                    b =>
                        b.id ===
                        destination
                );


            const distance =
                Math.round(
                    result.distance
                );


            const walkingTime =
                Math.max(

                    1,

                    Math.ceil(
                        distance / 80
                    )

                );


            document
                .getElementById(
                    "routeInfo"
                )
                .innerHTML = `

                    <strong>
                        🧭 Route Found
                    </strong>

                    <br><br>

                    📌 Destination:
                    ${destinationBuilding.name}

                    <br>

                    📏 Distance:
                    ${distance} meters

                    <br>

                    🚶 Walking Time:
                    ${walkingTime} minute(s)

                `;

        }

    );



// =====================================================
// GPS VARIABLES
// =====================================================

let userMarker = null;

let userLat = null;

let userLng = null;



// =====================================================
// GET USER LOCATION
// =====================================================

function getUserLocation(
    callback
) {

    if (
        !navigator.geolocation
    ) {

        document
            .getElementById(
                "routeInfo"
            )
            .innerHTML =

            "❌ Geolocation is not supported.";

        return;

    }


    navigator.geolocation.getCurrentPosition(

        position => {

            userLat =
                position.coords.latitude;

            userLng =
                position.coords.longitude;


            if (userMarker) {

                map.removeLayer(
                    userMarker
                );

            }


            userMarker =
                L.marker(

                    [
                        userLat,
                        userLng
                    ]

                )

                .addTo(map)

                .bindPopup(
                    "📍 You are here"
                );


            map.setView(

                [
                    userLat,
                    userLng
                ],

                18

            );


            callback();

        },


        error => {

            let message =
                "Unable to access your location.";


            if (
                error.code === 1
            ) {

                message =
                    "Location permission denied. Please allow location access.";

            }


            if (
                error.code === 2
            ) {

                message =
                    "Your location could not be determined.";

            }


            if (
                error.code === 3
            ) {

                message =
                    "Location request timed out.";

            }


            document
                .getElementById(
                    "routeInfo"
                )
                .innerHTML =

                `❌ ${message}`;

        },


        {

            enableHighAccuracy:
                true,

            timeout:
                10000,

            maximumAge:
                0

        }

    );

}



// =====================================================
// WHERE AM I?
// =====================================================

function findMyLocation() {

    const info =
        document.getElementById(
            "routeInfo"
        );


    info.innerHTML =
        "⏳ Finding your location...";


    getUserLocation(

        () => {

            const nearest =
                findNearestBuilding(

                    userLat,
                    userLng

                );


            info.innerHTML = `

                <strong>
                    📍 Your Location
                </strong>

                <br><br>

                You are near:

                <br>

                📌
                ${nearest.building.name}

                <br>

                📏
                ${Math.round(
                    nearest.distance
                )}
                meters away

            `;

        }

    );

}



// =====================================================
// FIND NEAREST BUILDING
// =====================================================

function findNearestBuilding(

    latitude,
    longitude

) {

    let nearest =
        null;

    let smallestDistance =
        Infinity;


    buildings.forEach(

        building => {

            const distance =
                calculateDistance(

                    latitude,
                    longitude,

                    building.lat,
                    building.lng

                );


            if (
                distance
                <
                smallestDistance
            ) {

                smallestDistance =
                    distance;

                nearest =
                    building;

            }

        }

    );


    return {

        building:
            nearest,

        distance:
            smallestDistance

    };

}



// =====================================================
// MY LOCATION → DESTINATION
// =====================================================

document
    .getElementById(
        "myLocationRouteBtn"
    )
    .addEventListener(

        "click",

        () => {

            const destination =
                Number(
                    toLocation.value
                );


            if (!destination) {

                document
                    .getElementById(
                        "routeInfo"
                    )
                    .innerHTML =

                    "⚠️ First select a destination.";

                return;

            }


            const button =
                document
                    .getElementById(
                        "myLocationRouteBtn"
                    );


            button.innerHTML =
                "⏳ Finding location...";


            getUserLocation(

                () => {

                    const nearest =
                        findNearestBuilding(

                            userLat,
                            userLng

                        );


                    const result =
                        dijkstra(

                            nearest.building.id,

                            destination

                        );


                    const destinationBuilding =
                        buildings.find(

                            b =>
                                b.id ===
                                destination

                        );


                    if (!result) {

                        button.innerHTML =
                            "📍 Use My Location";

                        return;

                    }


                    clearRoute();


                    const coordinates =
                        result.path.map(

                            id => {

                                const building =
                                    buildings.find(
                                        b =>
                                            b.id === id
                                    );


                                return [

                                    building.lat,

                                    building.lng

                                ];

                            }

                        );


                    coordinates.unshift(

                        [
                            userLat,
                            userLng
                        ]

                    );


                    routeLine =
                        L.polyline(

                            coordinates,

                            {

                                weight: 7,

                                opacity: 0.9,

                                dashArray:
                                    "12 8"

                            }

                        ).addTo(map);


                    map.fitBounds(

                        routeLine.getBounds(),

                        {

                            padding: [
                                80,
                                80
                            ]

                        }

                    );


                    const gpsDistance =
                        calculateDistance(

                            userLat,
                            userLng,

                            nearest.building.lat,
                            nearest.building.lng

                        );


                    const totalDistance =

                        gpsDistance
                        +
                        result.distance;


                    const walkingTime =
                        Math.max(

                            1,

                            Math.ceil(
                                totalDistance /
                                80
                            )

                        );


                    document
                        .getElementById(
                            "routeInfo"
                        )
                        .innerHTML = `

                            <strong>
                                📍 Navigation Started
                            </strong>

                            <br><br>

                            📌 Destination:

                            ${destinationBuilding.name}

                            <br>

                            📏 Distance:

                            ${Math.round(
                                totalDistance
                            )}
                            meters

                            <br>

                            🚶 Walking Time:

                            ${walkingTime}
                            minute(s)

                            <br><br>

                            🧭 Your Location
                            →
                            ${destinationBuilding.name}

                        `;


                    button.innerHTML =
                        "📍 Use My Location";

                }

            );

        }

    );



// =====================================================
// QUICK NAVIGATION
// =====================================================

function quickNavigate(
    destinationId
) {

    const building =
        buildings.find(
            b =>
                b.id ===
                destinationId
        );


    if (!building) {

        return;

    }


    toLocation.value =
        destinationId;


    showBuildingInfo(
        building
    );


    if (
        markers[destinationId]
    ) {

        markers[destinationId]
            .openPopup();

    }


    document
        .getElementById(
            "routeInfo"
        )
        .innerHTML = `

            <strong>
                📍 Destination Selected
            </strong>

            <br><br>

            ${building.icon}
            ${building.name}

            <br><br>

            Click
            <strong>
                📍 Use My Location
            </strong>
            to navigate here.

        `;

}



// =====================================================
// ACADEMIC BLOCKS
// =====================================================

function showAcademicBlocks() {

    document
        .getElementById(
            "academicPopup"
        )
        .style.display =
        "block";

}



function closeAcademicPopup() {

    document
        .getElementById(
            "academicPopup"
        )
        .style.display =
        "none";

}



// =====================================================
// EMERGENCY
// =====================================================

document
    .getElementById(
        "emergencyBtn"
    )
    .addEventListener(

        "click",

        () => {

            const emergency =
                buildings.find(

                    building =>
                        building.category
                        ===
                        "Emergency"

                );


            toLocation.value =
                emergency.id;


            document
                .getElementById(
                    "routeInfo"
                )
                .innerHTML = `

                    <strong>
                        🚨 EMERGENCY ASSISTANCE
                    </strong>

                    <br><br>

                    📍 Emergency Point

                    <br>

                    📞 Ambulance:
                    <strong>
                        108
                    </strong>

                    <br><br>

                    Click
                    <strong>
                        📍 Use My Location
                    </strong>
                    to navigate to the emergency point.

                `;


            map.setView(

                [
                    emergency.lat,
                    emergency.lng
                ],

                18

            );


            markers[
                emergency.id
            ].openPopup();

        }

    );



// =====================================================
// MY LOCATION MAP BUTTON
// =====================================================

const LocationControl =
    L.Control.extend({

        options: {

            position:
                "bottomright"

        },


        onAdd: function () {

            const button =
                L.DomUtil.create(
                    "button"
                );


            button.innerHTML =
                "📍";


            button.title =
                "Show My Location";


            button.style.width =
                "42px";


            button.style.height =
                "42px";


            button.style.background =
                "white";


            button.style.border =
                "none";


            button.style.borderRadius =
                "10px";


            button.style.fontSize =
                "20px";


            button.style.cursor =
                "pointer";


            button.style.boxShadow =
                "0 3px 12px rgba(0,0,0,0.25)";


            L.DomEvent.on(

                button,

                "click",

                () => {

                    findMyLocation();

                }

            );


            return button;

        }

    });


map.addControl(
    new LocationControl()
);



// =====================================================
// START
// =====================================================

console.log(
    "ESEC Smart Campus Navigator - Step 5 loaded."
);