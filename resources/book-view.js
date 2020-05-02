function openEditForm() {
  document.getElementById("edit-form-wrapper").style.display = "inline-block";
  document.getElementById("reader-form-wrapper").style.display = "none";
}

function hideEditForm() {
  document.getElementById("edit-form-wrapper").style.display = "none";
}

function openReaderForm() {
  document.getElementById("reader-form-wrapper").style.display = "inline-block";
  document.getElementById("edit-form-wrapper").style.display = "none";
}

function hideReaderForm() {
  document.getElementById("reader-form-wrapper").style.display = "none";
}

document.addEventListener("submit", e => {
  e.preventDefault();
  const form = e.target;
  const xhttp = new XMLHttpRequest();
  let url = new URL(window.location.href);
  var book = {};

  if (form.id === "edit-form") {
    xhttp.onreadystatechange = function() {
      if (this.status == 200) {
        window.location.href = "/books";
      }
    };
    if (form.title.value) book.title = form.title.value;
    if (form.author.value) book.title = form.author.value;
    if (form.publishDate.value) book.publishDate = form.publishDate.value;
    if (form.description.value) book.description = form.description.value;
  } else if (form.id === "reader-form") {
    xhttp.onreadystatechange = function() {
      if (this.status == 200) {
        window.location.href = "/books";
      }
      book.reader = {};
      if (form.name.value) book.reader.name = form.name.value;
      if (form.due.value) book.reader.due = form.due.value;
      book.reader.given = true;
    };
  }

  xhttp.open("POST", url.toString(), true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify(book));
});

function returnBook() {
  const xhttp = new XMLHttpRequest();
  let url = new URL(window.location.href);
  var book = { reader: {} };

  xhttp.onreadystatechange = function() {
    if (this.status == 200) {
      window.location.href = "/books";
    }
  };

  xhttp.open("POST", url.toString(), true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify(book));
}

function deleteBook() {
  const xhttp = new XMLHttpRequest();
  let url = new URL(window.location.href);

  xhttp.onreadystatechange = function() {
    if (this.status == 200) {
      window.location.href = "/books";
    }
  };

  xhttp.open("DELETE", url.toString(), true);
  xhttp.send();
}
