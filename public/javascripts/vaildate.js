// <!DOCTYPE html>
// <html>
// <head>
//     <title>Email and Password Validation Example</title>
//     <script>
        function validateForm() {
            // Get the values from the form
            
            var email = document.forms["Login_Form"]["email"].value;
            var password = document.forms["Login_Form"]["password"].value;

            // Regular expression for email validation
            var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

            // Error message variables
            var emailError = "";
            var passwordError = "";

            // Validate email
            if (!email.match(emailPattern)) {
                emailError = "Please enter a valid email address";
            }

            // Validate password (you can add your own criteria)
            if (password.length < 6) {
                passwordError = "Password must be at least 6 characters long";
            }

            // Display error messages or submit the form
            if (emailError || passwordError) {
                document.getElementById("emailError").innerHTML = emailError;
                document.getElementById("passwordError").innerHTML = passwordError;
                return false;
            } else {
                return true;
            }
        }
//     </script>
// </head>
// <body>
//     <h2>Email and Password Validation Example</h2>
//     <form name="myForm" onsubmit="return validateForm()" method="post">
//         <label for="email">Email:</label>
//         <input type="text" id="email" name="email"><br>
//         <span id="emailError" style="color: red;"></span><br>

//         <label for="password">Password:</label>
//         <input type="password" id="password" name="password"><br>
//         <span id="passwordError" style="color: red;"></span><br>

//         <input type="submit" value="Submit">
//     </form>
// </body>
// </html>
