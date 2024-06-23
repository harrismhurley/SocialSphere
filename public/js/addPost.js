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
