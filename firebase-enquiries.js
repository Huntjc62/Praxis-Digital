import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const form = document.getElementById('projectForm');
const note = document.getElementById('formNote');

if (form) {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const button = form.querySelector('button[type="submit"]');
    const original = button.innerHTML;
    button.disabled = true;
    button.innerHTML = 'Sending enquiry…';
    note.textContent = '';

    try {
      await addDoc(collection(db, 'enquiries'), {
        name: String(data.get('name') || '').trim(),
        business: String(data.get('business') || '').trim(),
        email: String(data.get('email') || '').trim().toLowerCase(),
        phone: String(data.get('phone') || '').trim(),
        project: String(data.get('project') || '').trim(),
        message: String(data.get('message') || '').trim(),
        status: 'new',
        notes: '',
        source: 'website',
        createdAt: serverTimestamp()
      });

      form.reset();
      note.textContent = 'Thanks — your enquiry has been sent. We’ll be in touch soon.';
      button.innerHTML = 'Enquiry sent ✓';
      setTimeout(() => { button.innerHTML = original; button.disabled = false; }, 3500);
    } catch (error) {
      console.error(error);
      note.textContent = 'We couldn’t send your enquiry just now. Please email hello@praxis.digital instead.';
      button.innerHTML = original;
      button.disabled = false;
    }
  });
}
