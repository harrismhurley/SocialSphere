document
  .getElementById("signup-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document
      .querySelector('input[name="username"]')
      .value.trim();
    const password = document
      .querySelector('input[name="password"]')
      .value.trim();

    if (username && password) {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/");
      } else {
        const result = await response.json();
        if (result.message === "Username already exists") {
          alert("Username already exists. Please choose a different username.");
        } else {
          alert("Failed to sign up.");
        }
      }
    }
  });
