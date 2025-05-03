const startBtn = document.getElementById('start-btn');
const zeroPage = document.getElementById('zero-page');
const testPage = document.getElementById('test-page');

startBtn.addEventListener('click', function() {
  zeroPage.style.display = 'none';
  testPage.style.display = 'block';
});
