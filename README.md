# PRAXIS Digital

Full PRAXIS Digital website package. Includes clean URLs, SEO, website quiz, Firebase enquiries/admin, mobile navigation, and a Firebase-powered Resources library for PDFs/files.

## Resources library setup
1. In Firebase Console, enable **Storage** for the project `praxis-363bf`.
2. Deploy Firestore and Storage rules from this package (`firestore.rules` and `storage.rules`).
3. Sign into `/admin/` using your existing Firebase admin account.
4. Use **Resource library** to upload PDFs/files, add a title/description, and publish them.
5. Published resources appear automatically at `/resources/` and can be linked from other pages using their public download URL.

Maximum upload size in the website: 25MB.


RESOURCE PAGE FIX (2026-08-27)
- Fixed Firebase config import paths for nested /resources/ and /admin/ pages.
- Resources page now loads /firebase-config.js from the site root.
- Admin resource library uses the same root Firebase config.
- Added cache-busting version to resources/admin module scripts.
