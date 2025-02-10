document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('enrollmentForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Collect form data
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Convert the data to JSON
        const jsonData = JSON.stringify(data);

        // Send data to the Node.js endpoint using fetch
        fetch('http://localhost:3000/enrollment', {  // Replace with your actual URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.status);
            }
            return response.json(); // Assuming your server returns JSON
        })
        .then(data => {
            console.log('Success:', data);
            alert('Enrollment data saved!'); // Display success message to the user
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while saving enrollment data.'); // Display error message
        });

    });
});
