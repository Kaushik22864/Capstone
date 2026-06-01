document
  .getElementById("step2Form")
  .addEventListener("submit", async (e) => {

    e.preventDefault();

    const step1Data =
      JSON.parse(
        sessionStorage.getItem(
          "specialistData"
        )
      );

    const finalData = {
      ...step1Data,

      hospital:
        document.getElementById("hospital").value,

      specialization:
        document.getElementById("specialization").value,

      experience:
        Number(
          document.getElementById("experience").value
        )
    };

    try {

      const response =
        await fetch(
          "http://localhost:5000/api/specialists/register",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json"
            },
            body:
              JSON.stringify(finalData)
          }
        );

      const data =
        await response.json();

      if (data.success) {

        sessionStorage.removeItem(
          "specialistData"
        );

        window.location.href =
          "verification-pending.html";

      } else {

        alert(data.message);
      }

    } catch (error) {

      console.error(error);

      alert(
        "Could not connect to backend"
      );
    }
  });document
  .getElementById("step2Form")
  .addEventListener("submit", async (e) => {

    e.preventDefault();

    const step1Data =
      JSON.parse(
        sessionStorage.getItem(
          "specialistData"
        )
      );

    const finalData = {
      ...step1Data,

      hospital:
        document.getElementById("hospital").value,

      specialization:
        document.getElementById("specialization").value,

      experience:
        Number(
          document.getElementById("experience").value
        )
    };

    try {

      const response =
        await fetch(
          "http://localhost:5000/api/specialists/register",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json"
            },
            body:
              JSON.stringify(finalData)
          }
        );

      const data =
        await response.json();

      if (data.success) {

        sessionStorage.removeItem(
          "specialistData"
        );

        window.location.href =
          "verification-pending.html";

      } else {

        alert(data.message);
      }

    } catch (error) {

      console.error(error);

      alert(
        "Could not connect to backend"
      );
    }
  });document
  .getElementById("step2Form")
  .addEventListener("submit", async (e) => {

    e.preventDefault();

    const step1Data =
      JSON.parse(
        sessionStorage.getItem(
          "specialistData"
        )
      );

    const finalData = {
      ...step1Data,

      hospital:
        document.getElementById("hospital").value,

      specialization:
        document.getElementById("specialization").value,

      experience:
        Number(
          document.getElementById("experience").value
        )
    };

    try {

      const response =
        await fetch(
          "http://localhost:5000/api/specialists/register",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json"
            },
            body:
              JSON.stringify(finalData)
          }
        );

      const data =
        await response.json();

      if (data.success) {

        sessionStorage.removeItem(
          "specialistData"
        );

        window.location.href =
          "verification-pending.html";

      } else {

        alert(data.message);
      }

    } catch (error) {

      console.error(error);

      alert(
        "Could not connect to backend"
      );
    }
  });