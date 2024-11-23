// Handle switching from Login to Sign Up
document.getElementById('goToSignUp').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default link behavior
    document.getElementById('loginForm').style.display = 'none'; // Hide Login Form
    document.getElementById('signUpForm').style.display = 'block'; // Show Sign Up Form
  });
  
  // Handle switching from Sign Up to Login
  document.getElementById('goToLogin').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default link behavior
    document.getElementById('signUpForm').style.display = 'none'; // Hide Sign Up Form
    document.getElementById('loginForm').style.display = 'block'; // Show Login Form
  });
  