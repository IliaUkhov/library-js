document.addEventListener("submit", e => {
  e.preventDefault();
  const form = e.target;

  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.status == 200) {
      showBooks(this.responseText);
    }
  };
  let url = new URL("http://localhost:8000/ajax/books");
  if (form.startDate.value)
    url.searchParams.append("startDate", form.startDate.value);
  if (form.endDate.value)
    url.searchParams.append("endDate", form.endDate.value);
  if (form.available.checked && !form.given.checked)
    url.searchParams.append("show", "available");
  if (form.given.checked && !form.available.checked)
    url.searchParams.append("show", "given");
  console.log(url.toString());
  xhttp.open("GET", url.toString(), true);
  xhttp.send();
});

function showBooks(booksHtml) {
  console.log(booksHtml);
  document.getElementsByClassName("masonry")[0].innerHTML = booksHtml;
}
