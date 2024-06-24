document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', async (event) => {
        if (event.target.classList.contains('updateBtn')) {
            const postId = event.target.dataset.id;
            const updatedTitle = document.getElementById('postTitle').value;
            const updatedContent = document.getElementById('postContent').value;

            try {
                const response = await fetch(`/api/posts/${postId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: updatedTitle,
                        content: updatedContent,
                    }),
                });

                if (response.ok) {
                    console.log('Post updated successfully');
                    document.location.reload(); // Reload the page after successful update
                } else {
                    console.error('Failed to update post:', response.statusText);
                    alert('Failed to update post.');
                }
            } catch (error) {
                console.error('Error updating post:', error);
                alert('Failed to update post. Please try again.');
            }
        }
    });
});