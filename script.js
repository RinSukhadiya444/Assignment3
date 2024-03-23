function validateForm() {
    var postalCodePattern = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
    var phonePattern = /^(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/;

    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var address = document.getElementById("address").value;
    var city = document.getElementById("city").value;
    var province = document.getElementById("province").value;
    var postalCode = document.getElementById("postalCode").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var email = document.getElementById("email").value;
    var vehicleMake = document.getElementById("vehicleMake").value;
    var vehicleModel = document.getElementById("vehicleModel").value;
    var vehicleYear = document.getElementById("vehicleYear").value;

    if (vehicleMake.trim() === "" || vehicleModel.trim() === "" || vehicleYear.trim() === "") {
        alert("Please enter the vehicle make, model, and year properly.");
        return false;
    }

    if (!postalCodePattern.test(postalCode)) {
        alert("Please enter a valid postal code (e.g., A1A 1A1)");
        return false;
    }

    saveData();
    return true;
}

// Function to save data to localStorage
function saveData() {
    var data = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        province: document.getElementById("province").value,
        postalCode: document.getElementById("postalCode").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        email: document.getElementById("email").value,
        vehicleMake: document.getElementById("vehicleMake").value,
        vehicleModel: document.getElementById("vehicleModel").value,
        vehicleYear: document.getElementById("vehicleYear").value
    };

    // Retrieve existing data from localStorage or initialize an empty array
    var savedData = JSON.parse(localStorage.getItem("savedData")) || [];
    savedData.push(data);

    // Save updated data back to localStorage
    localStorage.setItem("savedData", JSON.stringify(savedData));

    // Call function to display saved data
    displaySavedData();
}

// Display previously saved data
function displaySavedData() {
    var savedData = JSON.parse(localStorage.getItem("savedData"));
    if (savedData && savedData.length > 0) {
        var savedList = document.getElementById("savedList");
        savedList.innerHTML = "<h3>Previously Saved Data</h3>";
        savedData.forEach(function (data, index) {
            var listItem = document.createElement("div");
            listItem.innerHTML = "<p><strong>Seller Name:</strong> " + data.firstName + " " + data.lastName + "<br>" +
                "<strong>Address:</strong> " + data.address + ", " + data.city + ", " + data.province + " " + data.postalCode + "<br>" +
                "<strong>Phone:</strong> " + data.phoneNumber + "<br>" +
                "<strong>Email:</strong> " + data.email + "<br>" +
                "<strong>JD Power URL:</strong> <a href='" + constructJDPowerURL(data) + "' target='_blank'>View JD Power Page</a></p>";
            savedList.appendChild(listItem);
        });
    }
}

function constructJDPowerURL(data) {
    var make = encodeURIComponent(data.vehicleMake);
    var model = encodeURIComponent(data.vehicleModel);
    var year = encodeURIComponent(data.vehicleYear);
    return "http://www.jdpower.com/cars/" + make + "/" + model + "/" + year;
}

// Call function to display saved data when the page loads
window.onload = function () {
    displaySavedData();
};

