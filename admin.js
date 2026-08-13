import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { collection, query, orderBy, onSnapshot, doc, getDoc, updateDoc, deleteDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
import { auth, db } from "./firebase-config.js";

const loginView = document.getElementById('loginView');
const dashboardView = document.getElementById('dashboardView');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');
const adminUser = document.getElementById('adminUser');
const enquiryList = document.getElementById('enquiryList');
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');
const projectFilter = document.getElementById('projectFilter');
const resultCount = document.getElementById('resultCount');
const modalBackdrop = document.getElementById('modalBackdrop');
let enquiries = [];
let selected = null;
let unsubscribe = null;

function escapeHtml(value=''){
  return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}
function formatDate(timestamp){
  if(!timestamp) return 'Pending timestamp';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return new Intl.DateTimeFormat('en-GB',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}).format(date);
}
function normaliseStatus(status){return ['new','in-progress','qualified','won','lost'].includes(status) ? status : 'new';}
function statusLabel(status){return ({'new':'New','in-progress':'In progress','qualified':'Qualified','won':'Won','lost':'Lost'})[normaliseStatus(status)];}
function filtered(){
  const search = searchInput.value.trim().toLowerCase();
  const status = statusFilter.value;
  const project = projectFilter.value;
  return enquiries.filter(item=>{
    const hay = [item.name,item.business,item.email,item.phone,item.project,item.message].join(' ').toLowerCase();
    return (!search || hay.includes(search)) && (status==='all' || normaliseStatus(item.status)===status) && (project==='all' || item.project===project);
  });
}
function render(){
  const rows = filtered();
  resultCount.textContent = `${rows.length} ${rows.length===1?'enquiry':'enquiries'}`;
  if(!rows.length){ enquiryList.innerHTML='<div class="empty">No enquiries match your filters.</div>'; return; }
  enquiryList.innerHTML = rows.map(item=>{
    const phone = item.phone ? `<a href="tel:${escapeHtml(item.phone)}" onclick="event.stopPropagation()">${escapeHtml(item.phone)}</a>` : '<span style="color:#999;font-size:11px">No phone</span>';
    return `<div class="enquiry-row" data-id="${item.id}">
      <div class="person"><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(formatDate(item.createdAt))}</small></div>
      <div class="business-cell">${escapeHtml(item.business)}<small>${escapeHtml(item.source || 'website')}</small></div>
      <div class="contact-cell"><a href="mailto:${escapeHtml(item.email)}" onclick="event.stopPropagation()">${escapeHtml(item.email)}</a>${phone}</div>
      <div style="font-size:11px">${escapeHtml(item.project || '—')}</div>
      <div><span class="status ${normaliseStatus(item.status)}">${escapeHtml(statusLabel(item.status))}</span></div>
      <div class="row-arrow">↗</div>
    </div>`;
  }).join('');
  enquiryList.querySelectorAll('.enquiry-row').forEach(row=>row.addEventListener('click',()=>openModal(row.dataset.id)));
}
function renderStats(){
  const count = key => enquiries.filter(x=>normaliseStatus(x.status)===key).length;
  document.getElementById('totalCount').textContent=enquiries.length;
  document.getElementById('newCount').textContent=count('new');
  document.getElementById('progressCount').textContent=count('in-progress');
  document.getElementById('wonCount').textContent=count('won');
}
function openModal(id){
  selected=enquiries.find(x=>x.id===id); if(!selected) return;
  document.getElementById('modalName').textContent=selected.name || 'Enquiry';
  document.getElementById('modalBusiness').textContent=selected.business || '—';
  document.getElementById('modalProject').textContent=selected.project || '—';
  const email=document.getElementById('modalEmail'); email.textContent=selected.email || '—'; email.href=selected.email?`mailto:${selected.email}`:'#';
  const phone=document.getElementById('modalPhone'); phone.textContent=selected.phone || '—'; phone.href=selected.phone?`tel:${selected.phone}`:'#';
  document.getElementById('modalDate').textContent=formatDate(selected.createdAt);
  document.getElementById('modalSource').textContent=selected.source || 'website';
  document.getElementById('modalMessage').textContent=selected.message || 'No message supplied.';
  document.getElementById('modalStatus').value=normaliseStatus(selected.status);
  document.getElementById('modalNotes').value=selected.notes || '';
  document.getElementById('saveMessage').textContent='';
  modalBackdrop.classList.add('open');
}
function closeModal(){modalBackdrop.classList.remove('open');selected=null;}
async function verifyAdmin(user){
  const ref=doc(db,'users',user.uid);
  const snap=await getDoc(ref);
  return snap.exists() && snap.data().role==='admin';
}
async function loadEnquiries(){
  if(unsubscribe) unsubscribe();
  const q=query(collection(db,'enquiries'),orderBy('createdAt','desc'));
  unsubscribe=onSnapshot(q,snap=>{
    enquiries=snap.docs.map(d=>({id:d.id,...d.data()}));
    renderStats(); render();
  },error=>{
    console.error(error);
    enquiryList.innerHTML='<div class="empty">Unable to load enquiries. Check your Firebase Security Rules and admin user setup.</div>';
  });
}

loginForm.addEventListener('submit',async event=>{
  event.preventDefault(); loginError.textContent='';
  const email=document.getElementById('loginEmail').value.trim();
  const password=document.getElementById('loginPassword').value;
  try{await signInWithEmailAndPassword(auth,email,password);}
  catch(error){console.error(error);loginError.textContent='Sign in failed. Check your email and password.';}
});
logoutBtn.addEventListener('click',()=>signOut(auth));
searchInput.addEventListener('input',render); statusFilter.addEventListener('change',render); projectFilter.addEventListener('change',render);
document.getElementById('modalClose').addEventListener('click',closeModal); modalBackdrop.addEventListener('click',e=>{if(e.target===modalBackdrop)closeModal();});
document.getElementById('saveBtn').addEventListener('click',async()=>{
  if(!selected) return;
  const btn=document.getElementById('saveBtn'); const msg=document.getElementById('saveMessage'); btn.disabled=true; msg.textContent='Saving…';
  try{
    await updateDoc(doc(db,'enquiries',selected.id),{status:document.getElementById('modalStatus').value,notes:document.getElementById('modalNotes').value.trim(),updatedAt:serverTimestamp()});
    msg.textContent='Saved';
  }catch(error){console.error(error);msg.textContent='Could not save';}
  btn.disabled=false;
});
document.getElementById('deleteBtn').addEventListener('click',async()=>{
  if(!selected) return;
  if(!confirm('Delete this enquiry permanently?')) return;
  try{await deleteDoc(doc(db,'enquiries',selected.id));closeModal();}catch(error){console.error(error);alert('Could not delete this enquiry.');}
});

onAuthStateChanged(auth,async user=>{
  if(!user){
    loginView.hidden=false; dashboardView.hidden=true; logoutBtn.hidden=true; adminUser.textContent='';
    if(unsubscribe){unsubscribe();unsubscribe=null;} return;
  }
  try{
    const allowed=await verifyAdmin(user);
    if(!allowed){await signOut(auth);loginView.hidden=false;dashboardView.hidden=true;loginError.textContent='This account is not authorised for the PRAXIS admin area.';return;}
    loginView.hidden=true;dashboardView.hidden=false;logoutBtn.hidden=false;adminUser.textContent=user.email || '';
    await loadEnquiries();
  }catch(error){console.error(error);await signOut(auth);loginError.textContent='Admin access could not be verified.';}
});
