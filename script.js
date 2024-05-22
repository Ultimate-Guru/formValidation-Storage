function SubmitForm() {
    // Get form elements
    const form = document.forms["employeeForm"];
    const firstName = form["firstName"];
    const lastName = form["lastName"];
    const dob = form["date"];
    const email = form["email"];
    const gender = form["gender"];
    const department = form["department"];
    const position = form["position"];
    const salary = form["salary"];

    // Error message containers
    const nameErr = document.getElementById("nameErr");
    const lastNameErr = document.getElementById("lastNameErr");
    const dateErr = document.getElementById("dateErr");
    const emailErr = document.getElementById("emailErr");
    const genderErr = document.getElementById("genderErr");

    // Clear previous error messages
    nameErr.innerHTML = "";
    lastNameErr.innerHTML = "";
    dateErr.innerHTML = "";
    emailErr.innerHTML = "";
    genderErr.innerHTML = "";

    // Validation flag
    let isValid = true;

    // Validate first name
    if (firstName.value.trim() === "") {
        nameErr.innerHTML = "First Name is required.";
        firstName.focus();
        isValid = false;
    }

    // Validate last name
    if (lastName.value.trim() === "") {
        lastNameErr.innerHTML = "Last Name is required.";
        lastName.focus();
        isValid = false;
    }

    // Validate date of birth
    if (dob.value === "") {
        dateErr.innerHTML = "Date of Birth is required.";
        dob.focus();
        isValid = false;
    } else if (new Date(dob.value) >= new Date()) {
        dateErr.innerHTML = "Date of Birth must be in the past.";
        dob.focus();
        isValid = false;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === "") {
        emailErr.innerHTML = "Email Address is required.";
        email.focus();
        isValid = false;
    } else if (!emailPattern.test(email.value)) {
        emailErr.innerHTML = "Enter a valid email address.";
        email.focus();
        isValid = false;
    }

    // Validate gender
    if (!gender.value) {
        genderErr.innerHTML = "Gender is required.";
        gender[0].focus();
        isValid = false;
    }

    // Validate department
    if (department.value === "Select") {
        alert("Please select a department.");
        department.focus();
        isValid = false;
    }

    // Validate position
    if (position.value === "Select") {
        alert("Please select a position.");
        position.focus();
        isValid = false;
    }

    // Validate salary
    if (salary.value.trim() === "") {
        alert("Salary is required.");
        salary.focus();
        isValid = false;
    }

    if (isValid) {
        // Create an object to store form data
        const formData = {
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            dob: dob.value,
            email: email.value.trim(),
            gender: gender.value,
            department: department.value,
            position: position.value,
            salary: parseFloat(salary.value)
        };

        // Generate unique user ID based on timestamp
        const userId = new Date().getTime();

        // Save form data to localStorage under unique user ID
        localStorage.setItem(`employeeFormData_${userId}`, JSON.stringify(formData));
        alert("Form submitted successfully!" + "\n" + "Your UserID is: " + userId + ".");
    }

    // Call Calculate to update the salary breakdown
    Calculate(salary.value);
    document.employeeForm.reset()

    // Returning true to allow the form submission to proceed only if isValid is true
    return false

}

function Calculate(salaryAmount) {
    // Calculate the breakdown percentages
    const basicAllowance = salaryAmount * 0.15; // 15% of salary
    const clothing = salaryAmount * 0.1; // 10% of salary
    const transport = salaryAmount * 0.1; // 10% of salary
    const tax = salaryAmount * 0.2; // 20% of salary
    const utility = salaryAmount * 0.1; // 10% of salary
    const pfa = salaryAmount * 0.15; // 15% of salary

    // Set the calculated values in the salary breakdown form
    document.getElementById("basicAllowance").value = basicAllowance.toFixed(2);
    document.getElementById("clothings").value = clothing.toFixed(2);
    document.getElementById("transport").value = transport.toFixed(2);
    document.getElementById("tax").value = tax.toFixed(2);
    document.getElementById("utility").value = utility.toFixed(2);
    document.getElementById("pfa").value = pfa.toFixed(2);
}
