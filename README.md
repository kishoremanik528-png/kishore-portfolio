# Developer Portfolio

## Run locally

```bash
npm install
npm run dev
```

Vite prints the local URL when the development server starts. Create a production build with `npm run build`.

## Project structure

- `src/components/` contains the navigation, hero, reusable scroll reveal, About, Skills, Projects, Experience, Contact, and footer components.
- `src/styles/` contains shared, navigation, hero, and section styles.
- `src/App.jsx` assembles the page and owns the light/dark theme state.
- `src/main.jsx` starts React and loads stylesheets.
- The Hero portrait is loaded from `public/images/km-2.jpeg`.

## Personalize before publishing

- Set your professional email, phone number, GitHub profile URL, LinkedIn profile URL, and project demo/repository URLs in `src/config/portfolio.js`. Leave unknown details as empty strings; unset contact and project links are not rendered.
- Place the original resume PDF at `public/resume.pdf`. The navbar links to `/resume.pdf` and downloads it as `Kishore_Manik_Resume.pdf`.
- EmailJS contact form setup:
  1. In the EmailJS dashboard, configure the email service to send to the inbox where you want to receive messages.
  2. Open the template associated with the configured Template ID and set:
     - **To Email:** your receiving email address.
     - **Subject:** `Portfolio Contact: {{subject}}`
     - **From Name:** `{{name}}`
     - **Reply To:** `{{email}}`
     - **Message body:** include `{{name}}`, `{{email}}`, `{{subject}}`, and `{{message}}`.
  3. The project-root `.env` must contain `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY`. `.env` is ignored by Git; `.env.example` contains placeholders only.
  4. Restart the Vite development server after changing `.env`. Never put an EmailJS private key or secret in a `VITE_` variable; Vite exposes these values in the browser.
  5. Submit the contact form with a valid message and verify EmailJS reports success and the message reaches your configured inbox. A successful browser build alone does not verify email delivery.
- Add your own image inside the About photo placeholder when ready.
