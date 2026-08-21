const loginBtn = document.querySelector('.js-login-button');
const modalOverlay = document.querySelector('.js-modal-overlay');
const closeModal = document.querySelector('.js-close-modal');
const switchToSignup = document.querySelector('.js-switch-to-signup');
const switchToLogin = document.querySelector('.js-switch-to-login');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

// 打開彈窗
loginBtn.addEventListener('click', () => {
  modalOverlay.classList.add('modal-active');
});

// 關閉彈窗 (按 X 或點擊背景)
closeModal.addEventListener('click', () => {
  modalOverlay.classList.remove('modal-active');
});

window.addEventListener('click', (e) => {
  if (e.target === modalOverlay) modalOverlay.classList.remove('modal-active');
});

// 切換登入/註冊
switchToSignup.addEventListener('click', (e) => {
  e.preventDefault();
  loginForm.style.display = 'none';
  signupForm.style.display = 'block';
});

switchToLogin.addEventListener('click', (e) => {
  e.preventDefault();
  signupForm.style.display = 'none';
  loginForm.style.display = 'block';
});
