# PRAXIS — Full website + Firebase enquiry CRM

PRAXIS — Technology that puts your business into action.

This package contains the full PRAXIS marketing website, service pages and private enquiry admin area connected to Firebase.

## Website pages
- `index.html` — main PRAXIS website
- `services.html` — services overview and interactive recommendation tool
- `service-websites.html` — new website service
- `service-redesign.html` — website transformation service
- `service-systems.html` — digital systems service
- `service-software.html` — bespoke software service

## Admin
- `admin.html` — private PRAXIS enquiry dashboard
- `admin.js` — Firebase Authentication + Firestore dashboard logic
- No public registration page
- Admin users are created manually in Firebase Authentication
- Admin access is additionally checked against `users/{uid}.role == "admin"`

## Firebase
The supplied Firebase Web App configuration for project `praxis-363bf` is already included in `firebase-config.js`.

The package uses Firebase's modular browser SDK via the official Google CDN. Firebase recommends the modular API for new web integrations, and the browser-module approach is supported for getting started without a bundler.

## Firebase setup checklist

### 1. Authentication
Firebase Console → Authentication → Sign-in method → enable **Email/Password**.

Create your admin user manually under Authentication → Users → Add user.

There is intentionally no public sign-up form.

### 2. Firestore
Firebase Console → Firestore Database → Create database.

Create a collection called `users`.
Create a document whose ID is exactly the Firebase Authentication user's UID.
Add:

- `role` = `admin`

The dashboard checks this role before loading enquiries.

### 3. Firestore rules
Publish the included `firestore.rules` file in Firebase Console → Firestore Database → Rules.

The rules allow:
- public visitors to create a valid website enquiry;
- only authorised PRAXIS admins to read, update or delete enquiries;
- non-admin users to be denied access to the enquiry collection.

### 4. Hosting
The included `firebase.json` is ready for Firebase Hosting. Run:

`firebase login`

then from this folder:

`firebase init hosting`

and select the existing Firebase project `praxis-363bf`.

Then deploy with:

`firebase deploy`

If you are deploying to GitHub Pages or another static host, keep the Firebase web configuration files and deploy all files in the package. Firebase Authentication and Firestore still work from the deployed domain, provided the domain is authorised in Firebase Authentication settings.

## Important
The Firebase web configuration object is not a server secret. Do not put Firebase Admin SDK service-account credentials or private keys into this website package.

## Enquiry flow
1. Visitor completes the PRAXIS project form.
2. `firebase-enquiries.js` writes the enquiry to Firestore.
3. The enquiry starts with `status: "new"`.
4. The private admin dashboard listens for changes in real time.
5. Admin can open an enquiry, email/call the prospect, change status, add internal notes or delete it.

## Recommended production additions
- Custom domain email for PRAXIS
- Firebase App Check
- Analytics
- Automated enquiry acknowledgement email
- CRM pipeline and quote management
- Backups / export process
- Privacy policy and cookie controls

## Enquiry form behaviour
The public enquiry form is now Firebase-only. It does **not** use `mailto:` and will never open a visitor's email provider. A successful submission creates a new document in the Firestore `enquiries` collection with status `new`.

If the form says Firebase is blocking the submission, publish the included `firestore.rules` file in Firebase Console. If the page is being tested from a local `file://` URL, deploy it through Firebase Hosting, GitHub Pages, Netlify or another web server first because browser ES modules and Firebase web SDK requests should be served over HTTP(S).

A cache-busting query (`?v=3`) is included on the Firebase form module so an older deployed `mailto:` version is less likely to remain cached.
