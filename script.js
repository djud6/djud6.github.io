const root = document.documentElement;
const themeButtons = [
  document.getElementById('theme-toggle'),
  document.getElementById('mobile-theme-toggle')
].filter(Boolean);

function setThemeIcon(){
  const dark = root.classList.contains('dark');
  themeButtons.forEach(btn => {
    const icon = btn.querySelector('i');
    if(icon){
      icon.className = dark ? 'fas fa-sun' : 'fas fa-moon';
    }
  });
}
themeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    root.classList.toggle('dark');
    localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
    setThemeIcon();
  });
});
if(localStorage.getItem('theme') === 'dark'){
  root.classList.add('dark');
}
setThemeIcon();

const menuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');
if(menuBtn && mobileNav){
  menuBtn.addEventListener('click', () => mobileNav.classList.toggle('open'));
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));
}

const year = document.getElementById('current-year');
if(year) year.textContent = new Date().getFullYear();
