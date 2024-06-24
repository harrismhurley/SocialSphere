document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.dashPostWrapper').forEach(post => {
        // Event listener to toggle post view
        post.addEventListener('click', (event) => {
            if (!event.target.closest('.updateBtn') && !event.target.closest('.deleteBtn')) {
                togglePostView(post);
            }
        });
        
    });

    // Event listener for return button inside expanded post view
    document.addEventListener('click', async (event) => {
        if (event.target.classList.contains('returnBtn')) {
            console.log('Return button clicked');
            document.location.reload(); // Reloads the page
        }
    });
});

function togglePostView(post) {
    const postId = post.getAttribute('data-post-id');
    const postTitleElement = post.querySelector('.dashPostTitle h1');
    const postDateElement = post.querySelector('.postDate p');
    const postContent = post.getAttribute('data-post-content'); // Use getAttribute to retrieve post content
    const postUsername = post.getAttribute('data-post-username'); // Use getAttribute to retrieve post username

    if (!postTitleElement || !postDateElement) {
        console.error('Error: Missing post title or date element');
        return;
    }

    const postTitle = postTitleElement.textContent.trim();
    const postDate = postDateElement.textContent.trim();

    post.innerHTML = `
        <div class="dashBigPost" data-post-id="${postId}">
            <!-- Post header -->
            <div class="postHeader">
                <div class="postTitle">
                    <h1>Update post</h1>
                </div>
                <div class="postDate">
                    <h1>or Delete post</h1>
                </div>
            </div>
  
            <!-- Post content -->
            <div class="postContainer">
                <form id="update-post-form" class="form">
                <div class="field">
                    <input id="postTitle" class="input" type="text" name="postTitle" placeholder="${postTitle}" />
                </div>
                <div class="field">
                    <input id="postContent" class="input" type="text" name="postContent" placeholder="${postContent}" />
                </div>
            </form>
  
                <!-- Action buttons -->
                <div class="postActions">
                    <button class="dashBtn returnBtn" data-id="${postId}">Return</button>
                    <button class="dashBtn updateBtn" data-id="${postId}">Update Post</button>
                    <button class="dashBtn deleteBtn" data-id="${postId}">Delete</button>
                </div>
            </div>
        </div>
    `;
}
