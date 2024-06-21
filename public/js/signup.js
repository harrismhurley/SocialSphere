document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");
  
    signupForm.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      // Create a FormData object from the form
      const formData = new FormData();
      formData.append("username", document.querySelector("#username").value.trim());
      formData.append("password", document.querySelector("#password").value.trim());
  
      try {
        const response = await fetch("/api/users/signup", {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          document.location.replace("/dashboard");
        } else {
          alert("Failed to sign up. Use a unique username and strong password!");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to sign up. Use a unique username and strong password!");
      }
    });
  });