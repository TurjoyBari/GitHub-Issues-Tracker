document.getElementById("login-btn").addEventListener("click", function () {
  const userInput = document.getElementById("input-user");
  const contactNumber = userInput.value;
  console.log(contactNumber);

  const inputPin = document.getElementById("input-pin");
  const pin = inputPin.value;
  console.log(pin);

  if (contactNumber == "admin" && pin == "admin123") {
    // alert("login Success");

    window.location.assign("/home.html");
  } else {
    // alert("login Failed");
    return;
  }
});
