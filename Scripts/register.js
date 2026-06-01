document
  .getElementById("step1Form")
  .addEventListener("submit", function (e) {

    e.preventDefault();

    const userData = {
      firstName:
        document.getElementById("firstName").value,

      lastName:
        document.getElementById("lastName").value,

      email:
        document.getElementById("email").value,

      password:
        document.getElementById("password").value
    };

    sessionStorage.setItem(
      "specialistData",
      JSON.stringify(userData)
    );

    window.location.href =
      "register-step2.html";
  });