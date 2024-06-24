document.addEventListener('DOMContentLoaded', () => {

  // Event listener for logout
  document.getElementById('logout').addEventListener('click', async (event) => {
      event.preventDefault();
      
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