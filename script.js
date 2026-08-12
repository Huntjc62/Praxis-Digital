const menu=document.querySelector('.menu');menu.addEventListener('click',()=>document.querySelector('.nav nav').classList.toggle('show'));document.querySelectorAll('.nav nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.nav nav').classList.remove('show')));
document.getElementById('form').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target);const subject=encodeURIComponent('New PRAXIS project enquiry — '+f.get('business'));const body=encodeURIComponent(`Name: ${f.get('name')}
Business: ${f.get('business')}
Email: ${f.get('email')}
Current position: ${f.get('stage')}

Goals:
${f.get('message')}`);document.getElementById('note').textContent='Opening your email app with the enquiry prepared…';window.location.href=`mailto:hello@praxis.digital?subject=${subject}&body=${body}`;});
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});document.querySelectorAll('.section,.service-grid article,.steps article,.mini-card').forEach(x=>{x.classList.add('reveal');io.observe(x)});