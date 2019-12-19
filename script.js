const posts = document.getElementsByClassName('posts')[0];

fetch('http://localhost:3000/posts')
.then((res) => res.json())
.then(data => {
  let postData = '';
  data.forEach(post => {
    postData += `
      <ul>
        <li>${post.title}</li>
        <li>${post.date}</li>
        <li>${post.description}</li>
        <li>${post._id}</li>
      </ul>
    `;
  });
  posts.innerHTML = postData;
});