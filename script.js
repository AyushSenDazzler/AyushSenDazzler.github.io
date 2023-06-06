const postForm = document.getElementById('post-form');
const postsSection = document.getElementById('posts');
const posts = [];

// Load the Google Sign-In API
function initializeGoogleAuth() {
  gapi.load('auth2', () => {
    gapi.auth2.init({
      client_id: 'YOUR_CLIENT_ID',
    });
  });
}

// Sign in the user
function signIn() {
  gapi.auth2.getAuthInstance().signIn().then(() => {
    console.log('User signed in.');
  });
}

// Sign out the user
function signOut() {
  gapi.auth2.getAuthInstance().signOut().then(() => {
    console.log('User signed out.');
  });
}

// Check if the user is signed in
function isUserSignedIn() {
  return gapi.auth2.getAuthInstance().isSignedIn.get();
}

// Handle the sign-in status changes
function onSignInStatusChange(isSignedIn) {
  const signInButton = document.getElementById('sign-in-button');
  const signOutButton = document.getElementById('sign-out-button');
  const newPostSection = document.getElementById('new-post');

  if (isSignedIn) {
    signInButton.style.display = 'none';
    signOutButton.style.display = 'block';
    newPostSection.style.display = 'block';
  } else {
    signInButton.style.display = 'block';
    signOutButton.style.display = 'none';
    newPostSection.style.display = 'none';
  }
}

// Add event listeners to the sign-in and sign-out buttons
document.getElementById('sign-in-button').addEventListener('click', signIn);
document.getElementById('sign-out-button').addEventListener('click', signOut);

// Check the sign-in status on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeGoogleAuth();
  gapi.auth2.getAuthInstance().isSignedIn.listen(onSignInStatusChange);
  onSignInStatusChange(isUserSignedIn());
});

postForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  createPost(title, content);
  postForm.reset();
});

function createPost(title, content) {
  const post = {
    title: title,
    content: content
  };

  posts.push(post);
  displayPosts();
}

function displayPosts() {
  postsSection.innerHTML = '';

  posts.forEach((post, index) => {
    const postElement = document.createElement('div');
    postElement.className = 'post';

    const postTitle = document.createElement('h3');
    postTitle.textContent = post.title;

    const postContent = document.createElement('p');
    postContent.textContent = post.content;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      deletePost(index);
    });

    postElement.appendChild(postTitle);
    postElement.appendChild(postContent);
    postElement.appendChild(deleteButton);
    postsSection.appendChild(postElement);
  });
}

function deletePost(index) {
  posts.splice(index, 1);
  displayPosts();
}
