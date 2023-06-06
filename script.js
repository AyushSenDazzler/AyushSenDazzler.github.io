const postForm = document.getElementById('post-form');
const postsSection = document.getElementById('posts');

postForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  createPost(title, content);
  postForm.reset();
});

function createPost(title, content) {
  const post = document.createElement('div');
  post.className = 'post';

  const postTitle = document.createElement('h3');
  postTitle.textContent = title;

  const postContent = document.createElement('p');
  postContent.textContent = content;

  post.appendChild(postTitle);
  post.appendChild(postContent);
  postsSection.appendChild(post);
}
