const landmarks = document.querySelector(".landmarks");
const callForm = document.querySelector(".call-form");
const contactForm = document.querySelector(".contact-form");

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

const initApp = async () => {
  const posts = await getPosts();
  postsDOM(posts);
};

const getPosts = async () => {
  return await (await fetch("/posts")).json();
};

const postsDOM = (posts) => {
  landmarks.innerHTML = "";
  posts.forEach((post) => {
    let postHTML = `
        <div class="col">
            <div class="card">
                <img src="${post.imageUrl}" class="card-img-top" alt="${post.title}" />
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">
                        ${post.description}
                    </p>
                    <a href="/landmark?id=${post.id}"><button class="btn btn-primary">Details</button></a>
                </div>
            </div>
        </div>
        `;
    landmarks.insertAdjacentHTML("beforeend", postHTML);
  });
};

callForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const phone = callForm.phone.value;
  try {
    await (
      await fetch("/call-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      })
    ).text();
    alert("We will call you back ASAP");
    callForm.reset();
  } catch (err) {
    console.log(err);
  }
});

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = contactForm.name.value;
  const message = contactForm.message.value;
  const email = contactForm.email.value;

  try {
    await (
      await fetch("/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          message,
          email,
        }),
      })
    ).text();
    alert("We will contact you ASAP");
    contactForm.reset();
  } catch (err) {
    console.log(err);
  }
});
