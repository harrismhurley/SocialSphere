document.addEventListener('DOMContentLoaded', () => {

  const signupForm = document.getElementById('signup-form');

  if (signupForm) {
    signupForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const usernameInput = document.getElementById('username');
      const passwordInput = document.getElementById('password');

      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();

      if (username && password) {
        try {
          const response = await fetch('/api/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
          });

          if (response.ok) {
            document.location.replace('/dash');
          } else {
            const errorMessage = await response.json();
            alert(`Failed to sign up: ${errorMessage.error}`);
          }
        } catch (error) {
          console.error('Error signing up:', error);
          alert('Failed to sign up');
        }
      }
    });
  } 
});
