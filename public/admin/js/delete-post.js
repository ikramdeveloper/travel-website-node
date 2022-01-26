{
  const postsList = document.querySelector(".posts-list");

  postsList.addEventListener("click", async (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const id = e.target.parentNode.parentNode.querySelector(".id").value;
      try {
        await (
          await fetch(`http://localhost:3000/posts/${id}`, {
            method: "DELETE",
          })
        ).text();
        window.history.go();
      } catch (err) {
        console.log(err);
      }
    }
  });
}
