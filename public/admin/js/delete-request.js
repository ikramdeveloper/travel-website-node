{
  const requestsList = document.querySelector("#v-pills-requests table tbody");

  requestsList.addEventListener("click", async (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const id = e.target.parentNode.parentNode.querySelector(".id").value;
      try {
        await (
          await fetch(`/call-requests/${id}`, {
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
