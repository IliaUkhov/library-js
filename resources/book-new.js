document.addEventListener("submit", e => {
  e.preventDefault();
  const form = e.target;
  const xhttp = new XMLHttpRequest();
  let url = new URL(window.location.href);
  var book = {};

  xhttp.onreadystatechange = function() {
    if (this.status == 200) {
      window.location.href = "/books";
    }
  };
  if (form.title.value) book.title = form.title.value;
  if (form.author.value) book.author = form.author.value;
  if (form.publishDate.value) book.publishDate = form.publishDate.value;
  if (form.description.value) book.description = form.description.value;

  console.log(JSON.stringify(book));
  xhttp.open("POST", url.toString(), true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify(book));
});
