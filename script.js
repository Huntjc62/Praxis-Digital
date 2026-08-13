document.querySelector('.menu')?.addEventListener('click',()=>{
  document.querySelector('.nav nav')?.classList.toggle('mobile-open');
});
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const target=document.querySelector(a.getAttribute('href'));
    if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth'});}
  });
});
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('in');observer.unobserve(entry.target);}
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.querySelectorAll('.faq-item button').forEach(button=>{
  button.addEventListener('click',()=>button.parentElement.classList.toggle('open'));
});

const selectorButtons=document.querySelectorAll('.selector-buttons button');
const result=document.querySelector('.selector-result');
const resultTitle=document.querySelector('.selector-result h3');
const resultText=document.querySelector('.selector-result p');
if(selectorButtons.length && result){
  const answers={
    new:`A new website is usually the right starting point. We'll build the structure, content direction, visual identity and technology from the ground up.`,
    old:`A website transformation could be the answer. We'll keep what works, remove what doesn't and give the site a completely new digital experience.`,
    system:`You may need more than a website. We can design a bespoke system around your workflow — CRM, booking, portals, dashboards or automation.`,
    unsure:`That's fine. Start with a conversation. We'll help you work out what technology will actually move the business forward.`
  };
  selectorButtons.forEach(button=>{
    button.addEventListener('click',()=>{
      selectorButtons.forEach(b=>b.classList.remove('active'));
      button.classList.add('active');
      const key=button.dataset.answer;
      resultTitle.textContent=button.textContent;
      resultText.textContent=answers[key];
      result.hidden=false;
    });
  });
}

document.querySelectorAll('.capability-row').forEach(button=>{
  button.addEventListener('click',()=>{
    const answer=button.nextElementSibling;
    const isOpen=button.getAttribute('aria-expanded')==='true';

    document.querySelectorAll('.capability-row[aria-expanded="true"]').forEach(other=>{
      if(other!==button){
        other.setAttribute('aria-expanded','false');
        other.nextElementSibling.classList.remove('open');
      }
    });

    button.setAttribute('aria-expanded',String(!isOpen));
    answer.classList.toggle('open',!isOpen);
  });
});
