const postsList = document.querySelector(".posts-list tbody");
const requestsList = document.querySelector("#v-pills-requests table tbody");
const emailsList = document.querySelector("#v-pills-mails table tbody");
const logOutBtn = document.querySelector(".logout-btn");

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

const initApp = async () => {
  const posts = await getPosts();
  postsDOM(posts);
  const callRequests = await getCallRequests();
  requestsDOM(callRequests);
  const emails = await getEmails();
  emailsDOM(emails);
};

const getPosts = async () => {
  return await (await fetch("/posts")).json();
};

const getCallRequests = async () => {
  return await (await fetch("/call-requests")).json();
};

const getEmails = async () => {
  return await (await fetch("/emails")).json();
};

const postsDOM = (posts) => {
  postsList.innerHTML = "";
  let i = 1;
  posts.forEach((post) => {
    let postHTML = `
        <tr>
            <td>${i++}<input type="hidden" class="id" value="${post.id}"></td>
            <td class="title">${post.title}</td>
            <td class="date">${post.date}</td>
            <td class="country">${post.country}</td>
            <td><button class="btn edit-btn btn-link p-0 text-decoration-none">Edit</button></td>
            <td><button class="btn remove-btn btn-link p-0 text-decoration-none">X</button></td>
        </tr>
        `;
    postsList.insertAdjacentHTML("beforeend", postHTML);
  });
};

const requestsDOM = (requests) => {
  requestsList.innerHTML = "";
  let i = 1;
  requests.forEach((req) => {
    let reqHTML = `
    <tr>
      <td>${i++}<input type="hidden" class="id" value="${req.id}"></td>
      <td class="phone">${req.phone}</td>
      <td class="date">${req.date}</td>
      <td><button class="btn remove-btn btn-link p-0 text-decoration-none">X</button></td>
    </tr>
    `;
    requestsList.insertAdjacentHTML("beforeend", reqHTML);
  });
};

const emailsDOM = (emails) => {
  emailsList.innerHTML = "";
  let i = 1;
  emails.forEach((email) => {
    let emailHTML = `
    <tr>
      <td>${i++}<input type="hidden" class="id" value="${email.id}"></td>
      <td class="phone">${email.name}</td>
      <td class="phone">${email.email}</td>
      <td class="phone">${email.message}</td>
      <td class="date">${email.date}</td>
      <td><button class="btn remove-btn btn-link p-0 text-decoration-none">X</button></td>
    </tr>
    `;
    emailsList.insertAdjacentHTML("beforeend", emailHTML);
  });
};

logOutBtn.addEventListener("click", () => {
  document.cookie.split(";").forEach(function (c) {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
  window.location.href = "/";
});
