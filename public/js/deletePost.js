document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', async (event) => {
        if (event.target.classList.contains('deleteBtn')) {
            const postId = event.target.dataset.id;

            try {
                const response = await fetch(`/api/posts/${postId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    console.log('Post deleted successfully');
                    document.location.reload(); // Reload the page after successful deletion
                } else {
                    console.error('Failed to delete post:', response.statusText);
                    alert('Failed to delete post.');
                }
            } catch (error) {
                console.error('Error deleting post:', error);
                alert('Failed to delete post. Please try again.');
            }
        }
    });
});
