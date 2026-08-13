// PRAXIS — public enquiry form -> Cloud Firestore
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
import { db } from "./firebase-config.js";
const form = document.getElementById("projectForm");
const note = document.getElementById("formNote");
function setMessage(message, type = "info") { if (!note) return; note.textContent = message; note.dataset.type = type; }
if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); event.stopImmediatePropagation();
    const button = form.querySelector('button[type="submit"]');
    const original = button ? button.innerHTML : "Send project enquiry";
    const data = new FormData(form);
    const enquiry = {
      name: String(data.get("name") || "").trim(), business: String(data.get("business") || "").trim(),
      email: String(data.get("email") || "").trim().toLowerCase(), phone: String(data.get("phone") || "").trim(),
      project: String(data.get("project") || "").trim(), message: String(data.get("message") || "").trim(),
      status: "new", notes: "", source: "website", createdAt: serverTimestamp()
    };
    if (!enquiry.name || !enquiry.business || !enquiry.email) { setMessage("Please complete your name, business name and email address.", "error"); return; }
    if (button) { button.disabled = true; button.innerHTML = "Sending enquiry…"; }
    setMessage("Sending your enquiry…", "info");
    try {
      const docRef = await addDoc(collection(db, "enquiries"), enquiry);
      console.log("PRAXIS enquiry saved:", docRef.id);
      form.reset(); setMessage("Thanks — your enquiry has been sent. We'll be in touch soon.", "success");
      if (button) button.innerHTML = "Enquiry sent ✓";
      setTimeout(() => { if (button) { button.innerHTML = original; button.disabled = false; } }, 3500);
    } catch (error) {
      console.error("PRAXIS Firestore enquiry error:", error);
      let message = "We couldn't send your enquiry just now. Please try again.";
      if (error?.code === "permission-denied") message = "The enquiry form is connected, but Firebase is blocking the submission. Please check your Firestore rules.";
      else if (error?.message?.includes("network")) message = "We couldn't connect to Firebase. Please check your internet connection and try again.";
      setMessage(message, "error"); if (button) { button.innerHTML = original; button.disabled = false; }
    }
  }, true);
}
