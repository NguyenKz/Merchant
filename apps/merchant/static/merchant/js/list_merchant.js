function openCreateMerchantModal() {
    $('#create-merchant-name').val('');
    $('#create-merchant-description').val('');
    $('#create-merchant-description-html').val('');
    $('#create-merchant-email').val('');
    $('#create-merchant-phone').val('');
    $('#createMerchantModal').modal('show');
}

function closeErrorModal() {
    $('#errorModal').modal('hide');
}
function saveCreatedMerchant() {
    var newMerchant = {
        name: $('#create-merchant-name').val(),
        description: $('#create-merchant-description').val(),
        description_html: $('#create-merchant-description-html').val(),
        email: $('#create-merchant-email').val(),
        phone_number: $('#create-merchant-phone').val()
    };
    var csrftoken = getCookie('csrftoken');
    $.ajax({
        url: '/merchant/api/',  // Adjust the URL based on your project structure
        method: 'POST',
        data: newMerchant,
        headers: { 'X-CSRFToken': csrftoken },  // Include the CSRF token in the headers
        success: function () {
            location.reload();
        },
        error: function (error) {
            console.log('Error creating new merchant:', error.responseJSON);
            showError(error.responseJSON);
        }
    });
    $('#createMerchantModal').modal('hide');
}
var merchants = [];

function showError(data){
    var msg = "Something was wrong.";
    for (var key in data) {
        msg = data[key];
        break;
    }
    $('#createMerchantModal').modal('hide');
    $('#editMerchantModal').modal('hide');
    $('#error-message-body').text(msg);
    $('#errorModal').modal('show');
}
function addNewMerchant() {
    // Switch to edit mode for the new row
    $('#new-merchant-row td.edit-mode').show();
    $('#new-merchant-row td:not(.edit-mode)').hide();
    $('.save-btn, .cancel-btn').show();
    $('button:contains("Add")').hide();
}

function saveNewMerchant() {
    var newMerchant = {
        name: $('#new-merchant-name').val(),
        description: $('#new-merchant-description').val(),
        description_html: $('#new-merchant-description-html').val(),
        email: $('#new-merchant-email').val(),
        phone_number: $('#new-merchant-phone').val()
    };

    var csrftoken = getCookie('csrftoken');

    $.ajax({
        url: '/merchant/api/',  // Adjust the URL based on your project structure
        method: 'POST',
        data: newMerchant,
        headers: { 'X-CSRFToken': csrftoken },  // Include the CSRF token in the headers
        success: function () {
            // If successful, refresh the table
            location.reload();
        },
        error: function (error) {
            console.log('Error adding new merchant:', error);
            showError(error.responseJSON);
        }
    });
}

// Function to cancel the edit mode for the new merchant
function cancelEdit() {
    $('#editMerchantModal').modal('hide');
}

// Function to edit an existing merchant
function editMerchant(merchantId) {
    // Retrieve the existing merchant's data
    var existingMerchant = getMerchantById(merchantId);

    // Populate the modal with the merchant's data
    $('#edit-merchant-id').val(existingMerchant.id);
    $('#edit-merchant-name').val(existingMerchant.name);
    $('#edit-merchant-description').val(existingMerchant.description);
    $('#edit-merchant-description-html').val(existingMerchant.description_html);
    $('#edit-merchant-email').val(existingMerchant.email);
    $('#edit-merchant-phone').val(existingMerchant.phone_number);

    // Show the modal
    $('#editMerchantModal').modal('show');
}

// Function to get a merchant by ID from the list
function getMerchantById(merchantId) {
    // Assuming 'merchants' is the array containing the merchants
    return merchants.find(function (merchant) {
        return merchant.id === merchantId;
    });
}

// Function to save changes for the edited merchant
function saveEditedMerchant() {
    var editedMerchantId = $('#edit-merchant-id').val();
    var editedMerchant = {
        name: $('#edit-merchant-name').val(),
        description: $('#edit-merchant-description').val(),
        description_html: $('#edit-merchant-description-html').val(),
        email: $('#edit-merchant-email').val(),
        phone_number: $('#edit-merchant-phone').val()
    };

    // Get the CSRF token from the cookie
    var csrftoken = getCookie('csrftoken');

    // Make an AJAX request to update the merchant
    $.ajax({
        url: '/merchant/api/' + editedMerchantId + '/',  // Adjust the URL based on your project structure
        method: 'PUT',  // Assuming PUT is used for updating
        data: editedMerchant,
        headers: { 'X-CSRFToken': csrftoken },  // Include the CSRF token in the headers
        success: function () {
            // If successful, refresh the table
            location.reload();
        },
        error: function (error) {
            console.log('Error updating merchant:', error);
            showError(error.responseJSON);
        }
    });
}


// Function to add a new merchant
function addNewMerchant() {
    var newMerchant = {
        name: $('#new-merchant-name').val(),
        description: $('#new-merchant-description').val(),
        description_html: $('#new-merchant-description-html').val(),
        email: $('#new-merchant-email').val(),
        phone_number: $('#new-merchant-phone').val()
    };

    // Get the CSRF token from the cookie
    var csrftoken = getCookie('csrftoken');

    // Make an AJAX request to add the new merchant
    $.ajax({
        url: '/merchant/api/',  // Adjust the URL based on your project structure
        method: 'POST',
        data: newMerchant,
        headers: { 'X-CSRFToken': csrftoken },  // Include the CSRF token in the headers
        success: function () {
            // If successful, refresh the table
            location.reload();
        },
        error: function (error) {
            console.log('Error adding new merchant:', error);
            showError(error.responseJSON);
        }
    });
}

// When the page is ready
$(document).ready(function () {
    // Make an AJAX request to the API endpoint
    $.ajax({
        url: '/merchant/api/',  // Adjust the URL based on your project structure
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            // Update the table with merchants
            updateMerchantTable(data);
        },
        error: function (error) {
            console.log('Error fetching data:', error);
            showError(error.responseJSON);
        }
    });
});

// Function to update the merchant table
function updateMerchantTable(_merchants) {
    merchants = _merchants;
    var merchantTableBody = $('#merchant-table-body');
    console.log(merchantTableBody);
    // Clear the existing table rows
    merchantTableBody.empty();
    // Append each merchant as a table row
    merchants.forEach(function (merchant) {
        var tableRow = $('<tr>');
        tableRow.append($('<td>').text(merchant.id));
        tableRow.append($('<td>').text(merchant.name));
        tableRow.append($('<td>').text(merchant.description));
        tableRow.append($('<td>').text(merchant.description_html));
        tableRow.append($('<td>').text(merchant.email));
        tableRow.append($('<td>').text(merchant.phone_number));
        tableRow.append($('<td>').text(merchant.created_at));
        tableRow.append($('<td>').text(merchant.updated_at));

        var editButton = $('<button>').addClass('btn btn-warning btn-sm mx-1').append($('<i>').addClass('bi bi-pen')).click(function () {
            editMerchant(merchant.id);
        });

        var deleteButton = $('<button>').addClass('btn btn-danger btn-sm').append($('<i>').addClass('bi bi-trash')).click(function () {
            deleteMerchant(merchant.id);
        });

        tableRow.append($('<td>').append([editButton, deleteButton]));
        merchantTableBody.append(tableRow);
    });
}

// Function to handle the delete operation
function deleteMerchant(merchantId) {
    // Get the CSRF token from the cookie
    var csrftoken = getCookie('csrftoken');

    // Make an AJAX request to delete the merchant
    $.ajax({
        url: '/merchant/api/' + merchantId + '/',  // Adjust the URL based on your project structure
        method: 'DELETE',
        headers: { 'X-CSRFToken': csrftoken },  // Include the CSRF token in the headers
        success: function () {
            // If successful, refresh the table
            location.reload();
        },
        error: function (error) {
            console.log('Error deleting merchant:', error);
            showError(error.responseJSON);
        }
    });
}

// Function to get the CSRF token from the cookie
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Check if the cookie name matches the requested name
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                // Extract and decode the cookie value
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}