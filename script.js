document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll("section");
  sections.forEach(section => {
    section.style.display = "none";
  });

  document.getElementById("test-page-1").style.display = "block";

  document.getElementById("test-page-1-btn-next").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("test-page-1").style.display = "none";
    document.getElementById("test-page-2").style.display = "block";
  });

  document.getElementById("test-page-2-btn-next").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("test-page-2").style.display = "none";
    document.getElementById("test-page-3").style.display = "block";
  });

  document.getElementById("test-page-2-btn-back").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("test-page-2").style.display = "none";
    document.getElementById("test-page-1").style.display = "block";
  });

  document.getElementById("test-page-3-btn-back").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("test-page-3").style.display = "none";
    document.getElementById("test-page-2").style.display = "block";
  });
});