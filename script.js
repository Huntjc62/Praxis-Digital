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

document.querySelectorAll('.project-filter').forEach(button=>{
  button.addEventListener('click',()=>{
    document.querySelectorAll('.project-filter').forEach(b=>b.classList.remove('active'));
    button.classList.add('active');
    const filter=button.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card=>{
      card.classList.toggle('hidden',filter!=='all' && card.dataset.category!==filter);
    });
  });
});

document.querySelectorAll('.placeholder-link').forEach(link=>{
  link.addEventListener('click',e=>{
    e.preventDefault();
    const old=link.textContent;
    link.textContent=link.dataset.placeholder || 'Link coming soon';
    setTimeout(()=>{link.textContent=old},1800);
  });
});


// PRAXIS website replacement quiz
const websiteQuizForm = document.querySelector('#websiteQuizForm');
if (websiteQuizForm) {
  const questions = [...websiteQuizForm.querySelectorAll('.quiz-question')];
  const progressText = document.querySelector('#quizProgressText');
  const progressBar = document.querySelector('#quizProgressBar');
  const error = document.querySelector('#quizError');
  const result = document.querySelector('#quizResult');
  const resultTitle = document.querySelector('#resultTitle');
  const resultText = document.querySelector('#resultText');
  const resultNext = document.querySelector('#resultNext');
  const resultMark = document.querySelector('#resultMark');
  const retake = document.querySelector('#retakeQuiz');

  const updateQuizProgress = () => {
    const answered = questions.filter(q => q.querySelector('input:checked')).length;
    progressText.textContent = `${answered} / ${questions.length} answered`;
    progressBar.style.width = `${(answered / questions.length) * 100}%`;
  };

  websiteQuizForm.querySelectorAll('input[type="radio"]').forEach(input => {
    input.addEventListener('change', () => {
      updateQuizProgress();
      error.hidden = true;
      const current = input.closest('.quiz-question');
      current?.classList.add('answered');
    });
  });

  websiteQuizForm.addEventListener('submit', event => {
    event.preventDefault();
    const unanswered = questions.filter(q => !q.querySelector('input:checked'));
    if (unanswered.length) {
      error.textContent = `Please answer all ${questions.length} questions to see your result.`;
      error.hidden = false;
      unanswered[0].scrollIntoView({behavior:'smooth', block:'center'});
      return;
    }

    let riskScore = 0;
    questions.forEach(question => {
      const selected = question.querySelector('input:checked');
      if (selected?.value === 'risk') riskScore += 1;
    });

    let data;
    if (riskScore <= 2) {
      data = {
        mark:'01',
        title:"Your website probably doesn't need replacing yet.",
        text:"Your answers suggest the core of your website is still doing its job. A full rebuild may not be the best use of your budget right now. Focus on improving content, conversion, performance and the parts of the customer journey that are holding you back.",
        next:"PRAXIS recommendation: keep the foundations that work and improve the areas that don't. If your business has changed, a focused redesign or optimisation project may still be worthwhile."
      };
    } else if (riskScore <= 5) {
      data = {
        mark:'02',
        title:'Your website could benefit from a transformation.',
        text:"Your business has probably moved on faster than your website. There are enough friction points to justify a strategic redesign, but you may not need to throw everything away. The right transformation can improve your messaging, UX, mobile experience, speed and conversion while preserving what already works.",
        next:"PRAXIS recommendation: map the current site, identify what should stay, then rebuild the experience around your current customers and goals."
      };
    } else {
      data = {
        mark:'03',
        title:'It may be time to rebuild from the ground up.',
        text:"Several core parts of your website are working against the business. A new foundation is likely to give you more value than continually patching an outdated experience. That could mean a new website, a new CMS, better integrations or even a wider digital system.",
        next:"PRAXIS recommendation: start with the business problem rather than the page count. We can map the right structure, technology and customer journey before anything is built."
      };
    }

    resultMark.textContent = data.mark;
    resultTitle.textContent = data.title;
    resultText.textContent = data.text;
    resultNext.textContent = data.next;
    result.hidden = false;
    result.scrollIntoView({behavior:'smooth', block:'start'});
  });

  retake?.addEventListener('click', () => {
    websiteQuizForm.reset();
    questions.forEach(q => q.classList.remove('answered'));
    result.hidden = true;
    error.hidden = true;
    updateQuizProgress();
    document.querySelector('#quiz')?.scrollIntoView({behavior:'smooth', block:'start'});
  });

  updateQuizProgress();
}
