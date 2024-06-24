document.addEventListener('DOMContentLoaded', () => {

    // Add an event listener to handle clicks on posts
    document.addEventListener('click', (event) => {

        const postWrapper = event.target.closest('.postWrapper');
        const postTitle = event.target.closest('.postTitle');

        // Check if the click was on a postWrapper element or postTitle element
        if (postWrapper || postTitle) {
            const commentForm = postWrapper ? postWrapper.querySelector('.commentForm') : postTitle.querySelector('.commentForm');

            // Toggle display of comment form only if clicking on the post content or title
            if (commentForm && (event.target.closest('.postContent') || event.target.closest('.postTitle'))) {
                commentForm.style.display = commentForm.style.display === 'none' ? 'block' : 'none';
            }
        }
    });

    // Event listener for comment form submission
    document.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (event.target.classList.contains('commentForm')) {

            const postId = event.target.dataset.postId;
            const commentText = event.target.querySelector('.comment-input').value.trim();


            if (commentText) {
                try {
                    const response = await fetch(`/api/comments`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ post_id: postId, comment_text: commentText })
                    });
                    if (response.ok) {
                        location.reload(); // Refresh the page after successful comment submission
                    } else {
                        console.error('Failed to add comment:', response.statusText);
                        alert("Failed to add comment.");
                    }
                } catch (error) {
                    console.error('Error adding comment:', error);
                    alert("Failed to add comment. Please try again.");
                }
            } else {
                alert("Comment text cannot be empty.");
            }
        }
    });
});
