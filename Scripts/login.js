document
  .getElementById("loginForm")
  .addEventListener(
    "submit",
    async (e) => {

      e.preventDefault();

      const email =
        document.getElementById(
          "email"
        ).value;

      const password =
        document.getElementById(
          "password"
        ).value;

      try {

        const response =
          await fetch(
            "http://localhost:5000/api/specialists/login",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body:
                JSON.stringify({
                  email,
                  password
                })
            }
          );

        const data =
          await response.json();

        if (data.success) {

          localStorage.setItem(
            "token",
            data.token
          );

          localStorage.setItem(
            "specialist",
            JSON.stringify(
              data.specialist
            )
          );

          alert(
            "Login Successful"
          );

          window.location.href =
            "analysis.html"; // SHOULD REDIRECT TO DASHBOARD AFTER DASHBOARD IS MADE!

        } else {

          alert(data.message);
        }

      } catch (error) {

        console.error(error);

        alert(
          "Could not connect to server"
        );
      }
    }
  );