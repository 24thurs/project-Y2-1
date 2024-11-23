document.getElementById('goToSignUp').addEventListener('click', function (event) {
    event.preventDefault(); //ลิ้งค์กัน
    document.getElementById('loginForm').style.display = 'none'; 
    document.getElementById('signUpForm').style.display = 'block'; 
  });
  
  document.getElementById('goToLogin').addEventListener('click', function (event) {
    event.preventDefault(); 
    document.getElementById('signUpForm').style.display = 'none'; 
    document.getElementById('loginForm').style.display = 'block'; 
  });
  
