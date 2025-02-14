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
        fetch('http://localhost:3000/enroll', {  // Changed from /enrollments to /enroll
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)  // Added JSON.stringify()
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Enrollment successful!');
                form.reset();
            } else {
                alert('Error: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to submit form. Please try again.');
        });

    });
});
