{
  const postsList = document.querySelector(".posts-list");
  const updateBtn = document.querySelector("#v-pills-update-post-tab");
  const updateForm = document.querySelector(".update-post-form");
  const title = updateForm.updateTitle;
  const text = updateForm.updateText;
  let id;

  postsList.addEventListener("click", async (e) => {
    if (e.target.classList.contains("edit-btn")) {
      updateBtn.click();

      id = e.target.parentNode.parentNode.querySelector(".id").value;
      const postInfo = await (await fetch(`/posts/${id}`)).json();
      title.value = postInfo.title;
      text.value = postInfo.text;
    }
  });

  updateForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const description = text.value
      .substring(0, text.value.substring(0, 200).lastIndexOf(" "))
      .concat("...");

    try {
      await (
        await fetch(`/posts/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title.value,
            text: text.value,
            description,
          }),
        })
      ).text();
      window.history.go();
    } catch (err) {
      console.log(err);
    }
  });
}
