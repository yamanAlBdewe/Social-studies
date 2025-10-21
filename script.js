function goTo(page) {

  document.body.classList.add("fade-out");
  setTimeout(() => {
    window.location.href = page;
  }, 600);
}


window.addEventListener("load", () => {
  document.body.classList.add("fade-in");
});
