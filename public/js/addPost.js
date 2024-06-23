// function for menu popup
document.addEventListener('DOMContentLoaded', () => {
  const toggleAddPostBtn = document.getElementById('toggleAddPostBtn');
  const addPostWrapper = document.getElementById('addPostWrapper');

  toggleAddPostBtn.addEventListener('click', () => {
    // Toggle visibility
    if (addPostWrapper.style.display === 'none' || addPostWrapper.style.display === '') {
      addPostWrapper.style.display = 'block';
    } else {
      addPostWrapper.style.display = 'none';
    }
  });
});

// Function for adding a post
document.querySelector("#post-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.querySelector("#postTitle").value.trim();
  const content = document.querySelector("#postContent").value.trim();

  // Check if both title and content are provided
  if (!title || !content) {
    alert("Please provide both title and content for the post.");
    return;
  }

  const response = await fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title,
      content
    }),
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert("Failed to create post");
  }
});