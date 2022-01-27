const addPostBtn = document.querySelector(".add-post");
const createPostBtn = document.querySelector("#v-pills-add-post-tab");

addPostBtn.addEventListener("click", () => createPostBtn.click());

const createPostForm = document.querySelector(".create-post-form");

createPostForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = createPostForm.title.value.trim();
  const country = createPostForm.country.value.trim();
  const imageUrl = createPostForm.imageUrl.value.trim();
  const imageFile = createPostForm.imageFile.files[0];
  const text = createPostForm.text.value.trim();

  const description = text
    .substring(0, text.substring(0, 200).lastIndexOf(" "))
    .concat("...");

  const data = new FormData();
  data.append("title", title);
  data.append("description", description);
  data.append("text", text);
  data.append("country", country);
  data.append("imageUrl", imageUrl);
  data.append("imageFile", imageFile);

  try {
    const result = await (
      await fetch("/posts", {
        method: "POST",
        body: data,
      })
    ).text();
    window.history.go();
  } catch (err) {
    console.log(err);
  }
});

const disableInput = (input1, input2) => {
  if (input1.value) {
    input2.disabled = true;
  } else {
    input2.disabled = false;
  }
};

const imageUrl = createPostForm.imageUrl;
const imageFile = createPostForm.imageFile;
imageUrl.addEventListener("change", () => disableInput(imageUrl, imageFile));
imageFile.addEventListener("change", () => disableInput(imageFile, imageUrl));
