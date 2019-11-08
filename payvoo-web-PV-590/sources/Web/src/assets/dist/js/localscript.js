  function emailResendLink() {
    document.getElementById("emailResendLink").style.color = "green";
  }
  function mobileResendLink() {
    document.getElementById("mobileResendLink").style.color = "green";
  }
  function showPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  function hidePassword() {
    var x = document.getElementById("password");
    if (x.type === "text") {
      x.type = "password";
    } else {
      x.type = "text";
    }
  }
  function AvoidSpace(event) {
  var k = event ? event.which : window.event.keyCode;
  if (k == 32) return false;
   }
