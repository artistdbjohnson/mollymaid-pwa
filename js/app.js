if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").catch(function () {});
}
var form = document.getElementById("quote");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    form.style.display = "none";
    var ok = document.getElementById("ok");
    if (ok) ok.style.display = "block";
  });
}
