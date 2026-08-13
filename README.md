# PRAXIS — expanded website + Firebase enquiry CRM

PRAXIS — Technology that puts your business into action.

## Included
- `index.html` — main website
- `services.html` — services overview
- `service-websites.html` — new websites
- `service-redesign.html` — website transformation
- `service-systems.html` — digital systems
- `service-software.html` — bespoke software
- `admin.html` — private admin login + enquiry dashboard
- `admin.js` — Firebase Authentication + Firestore admin logic
- `firebase-enquiries.js` — public enquiry capture
- `firebase-config.js` — Firebase web app configuration placeholder
- `firestore.rules` — production-oriented Firestore rules
- `firebase.json` — optional Firebase Hosting/Firestore config
- `styles.css` / `script.js` — site styling and interaction

## Firebase setup

### 1. Create the Firebase project
Go to the Firebase Console and create a project for PRAXIS.

### 2. Add a Web App
In Firebase Console, open **Project settings** → **Your apps** → add a **Web app**. Copy the Firebase configuration object into `firebase-config.js`.

Do not add a service-account private key to this website. The web configuration values are intended for the browser; access is controlled by Firebase Authentication and Firestore Security Rules.

### 3. Enable Email/Password Authentication
Firebase Console → **Build** → **Authentication** → **Sign-in method** → enable **Email/Password**.

There is deliberately no sign-up form in `admin.html`. Admin users are created manually in Firebase Console.

### 4. Create the Firestore database
Firebase Console → **Build** → **Firestore Database** → **Create database**. Choose the region appropriate for your users and start with locked/secure rules if prompted.

### 5. Create the first admin account
In Firebase Console → **Authentication** → **Users** → **Add user**.

Create the admin email/password account you want to use for the PRAXIS dashboard.

Copy the user's **UID**.

Then go to Firestore → **Data** → create:

`users`

Inside it create a document whose document ID is exactly the admin user's UID.

Add this field:

`role` = `admin`

Do not create an admin sign-up page. This UID + role document is what authorises the account to read and manage enquiries.

### 6. Apply Firestore Security Rules
Open Firestore → **Rules**, replace the rules with the contents of `firestore.rules`, and publish them.

The intended access model is:
- Anyone can create a website enquiry.
- Unauthenticated visitors cannot read enquiries.
- Authenticated users without the admin role cannot read/write enquiries.
- Only an authenticated user with `users/{uid}.role == "admin"` can read, update or delete enquiries.

### 7. Add your Firebase configuration
Open `firebase-config.js` and replace:

- `YOUR_API_KEY`
- `YOUR_PROJECT_ID`
- `YOUR_MESSAGING_SENDER_ID`
- `YOUR_APP_ID`

with the values from your Firebase Web App configuration.

### 8. Deploy
You can host this package on Firebase Hosting, GitHub Pages, Netlify or Vercel. If using Firebase Hosting, the included `firebase.json` is a starting point.

For Firebase CLI deployment, install/login to the Firebase CLI, select the project, then deploy Hosting and Firestore rules. If you use another host, publish the files as a normal static site and make sure the Firebase config file is deployed with them.

## What the admin area does
- Admin-only login
- No public account creation
- Live Firestore enquiry feed
- Total / new / in-progress / won counts
- Search
- Filter by status
- Filter by project type
- Full enquiry view
- Clickable email addresses (`mailto:`)
- Clickable phone numbers (`tel:`)
- Status management
- Internal notes
- Delete enquiry
- Sign out

## Important production notes
- The public form writes directly to Firestore, so consider enabling Firebase App Check before launch to reduce abuse.
- Do not use open Firestore rules such as `allow read, write: if true` in production.
- Consider adding email notification automation (for example via a Cloud Function, Make/Zapier or your preferred email service) once the CRM is live.
- For a production system, add privacy/retention controls and a proper GDPR process for enquiry data.
