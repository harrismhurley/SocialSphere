document.getElementById("login-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.querySelector('input[name="username"]').value.trim();
  const password = document.querySelector('input[name="password"]').value.trim();

  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log in.");
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  // Event listener for logout
  document.getElementById('logout').addEventListener('click', async (event) => {
      event.preventDefault();
      console.log('Logout button clicked');
      
      const response = await fetch('/api/users/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
          console.log('Logged out successfully');
          document.location.replace('/');
      } else {
          console.error('Failed to log out');
          alert('Failed to log out.');
      }
  });
});