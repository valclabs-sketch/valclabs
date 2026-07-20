
document.querySelector('.menu').onclick=()=>document.querySelector('.navlinks').classList.toggle('open');
document.querySelectorAll('.navlinks a').forEach(a=>a.onclick=()=>document.querySelector('.navlinks').classList.remove('open'));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(e=>io.observe(e));
document.getElementById('year').textContent=new Date().getFullYear();
