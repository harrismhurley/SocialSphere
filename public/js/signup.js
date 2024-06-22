document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed'); // Log when DOM is fully loaded

  const signupForm = document.getElementById('signup-form');

  if (signupForm) {
    console.log('Signup form found'); // Log when signup form is found
    signupForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const usernameInput = document.getElementById('username');
      const passwordInput = document.getElementById('password');

      console.log('Username input value:', usernameInput.value); // Log username input value
      console.log('Password input value:', passwordInput.value); // Log password input value

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
  } else {
    console.error('Signup form not found'); // Log if signup form is not found
  }
});
