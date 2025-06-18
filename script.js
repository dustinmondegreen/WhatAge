document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("section").forEach(s => s.style.display = "none");
  showSection("test-page-1");

  addNav("test-page-1-btn-next", "test-page-1", "test-page-2", validatePage1);
  addNav("test-page-2-btn-next", "test-page-2", "test-page-3", validatePage2);
  addNav("test-page-2-btn-back", "test-page-2", "test-page-1");
  addNav("test-page-3-btn-back", "test-page-3", "test-page-2");
  addNav("test-page-3-btn-next", "test-page-3", "test-page-1", validatePage3);

  const inputLimits = {
    bone_density: { min: -3, max: 3 },
    cholesterol: { min: 0, max: 400 },
    bmi: { min: 0, max: 100 },
    glucose: { min: 0, max: 500 },
    vision: { min: 0, max: 1 },
    stress: { min: 0, max: 10 },
    pollution: { min: 0, max: 10 },
    sun: { min: 0, max: 10 },
    cognitive: { min: 0, max: 100 },
    hearing: { min: 0, max: 200 }
  };

  document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', function () {
      const limits = inputLimits[this.name];
      if (!limits) return;
      let val = parseFloat(this.value);
      if (!isNaN(val)) {
        this.value = Math.min(Math.max(val, limits.min), limits.max);
      }
    });
  });

  document.querySelectorAll("#test-page-1 input:not([type='radio']), #test-page-2 input:not([type='radio']), #test-page-3 input:not([type='radio'])")
    .forEach(input => {
      input.addEventListener("input", () => {
        const formInput = input.closest(".form-input");
        if (input.value.trim() !== "") {
          formInput.querySelectorAll('input').forEach(innerInput => {
            innerInput.style.border = ""; 
          });
        }
      });
    });

  document.querySelectorAll("input[type='radio']").forEach(radio => {
    radio.addEventListener("change", () => {
      const formInput = radio.closest(".form-input");
      if (radio.checked) {
        formInput.querySelectorAll(".radio-box").forEach(rb => rb.classList.remove("error"));
      }
    });
  });
});


function addNav(buttonId, fromId, toId, validator = null) {
  document.getElementById(buttonId).addEventListener("click", function (e) {
    e.preventDefault();
    if (validator && !validator()) return;
    showSection(toId);
    hideSection(fromId);
  });
}

// Validasi halaman 1
function validatePage1() {
  let valid = true;

  document.querySelectorAll("#test-page-1 input:not([type='radio'])").forEach(input => {
    if (input.value.trim() === "") {
      input.style.border = "1px solid red";
      valid = false;
    }
  });

  const genderRadios = document.querySelectorAll("input[name='gender']");
  const selected = Array.from(genderRadios).some(r => r.checked);
  if (!selected) {
    genderRadios.forEach(r => r.closest(".radio-box").classList.add("error"));
    valid = false;
  }

  return valid;
}

function validatePage2() {
  let valid = true;

  document.querySelectorAll("#test-page-2 input[type='number']").forEach(input => {
    if (input.value.trim() === "") {
      input.style.border = "1px solid red";
      valid = false;
    }
  });

  return valid;
}

function validatePage3() {
  let valid = true;

  const radioGroups = [
    "bloodPressure", "activity", "smoking", "alcohol", "diet", "chronic",
    "medication", "family", "mental", "sleep", "education", "income"
  ];

  radioGroups.forEach(name => {
    const radios = document.querySelectorAll(`input[name='${name}']`);
    const selected = Array.from(radios).some(r => r.checked);

    if (!selected) {
      radios.forEach(r => r.closest(".radio-box").classList.add("error"));
      valid = false;
    } else {
      radios.forEach(r => r.closest(".radio-box").classList.remove("error"));
    }
  });

  return valid;
}

function showSection(id) {
  document.getElementById(id).style.display = "block";
}

function hideSection(id) {
  document.getElementById(id).style.display = "none";
}
