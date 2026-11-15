# Second Chance Animal Rescue Website

A community animal rescue website built across the Introduction to Web Development touchstones. Each touchstone extends the same site rather than starting a new one.

**Live preview:** https://munirnegash.github.io/touchstoneprojects/
**Repository:** https://github.com/munirnegash/touchstoneprojects

## Project Overview

| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | Mission, impact statistics, featured image, pet spotlight, director video, How You Can Help |
| Services | `services.html` | Adoption process, foster program, volunteer roles, role tracker |
| About | `about.html` | Organization story, core values, partner acknowledgments |
| Contact | `contact.html` | Volunteer or foster interest form with validation, service area, office hours |

## Project Structure

```
site/
├── index.html
├── services.html
├── about.html
├── contact.html
├── styles.css
├── script.js
├── images/
│   ├── rescue-feature-large_c.png
│   ├── rescue-feature-small_c.png
│   ├── rescue-pet-spotlight_c.png
│   ├── rescue-pet_c.png
│   └── rescue-volunteer_c.png
└── media/
    └── rescue-message_c.mp4
```

---

## Touchstone 4: Interactivity and Client-Side Data

Added JavaScript to the existing site.

**Features**

- **Volunteer role tracker** (`services.html`): visitors select roles and save them. Selections are stored in `localStorage` and restored on reload.
- **Form validation** (`contact.html`): checks required fields, name length, email format, and message length. Errors appear beside each field and clear as the user corrects them.
- **Saved details** (`contact.html`): name and email are saved after a valid submission and pre-filled on return visits. Saved roles are listed above the form.

**Files changed**

- `site/script.js` (new)
- `site/services.html`, `site/contact.html` (tracker, validation markup, script link)
- `site/styles.css` (error, success, and tracker styles)

**How the JavaScript is organized**

- `VOLUNTEER_ROLES` is an array of objects (`id`, `name`, `commitment`).
- `STORAGE_KEYS` is an object holding the localStorage keys.
- `saveToStorage` and `loadFromStorage` wrap localStorage with JSON conversion and error handling.
- `initRoleTracker` restores and saves role selections. `renderRoleSummary` builds the saved list.
- `validateName`, `validateEmail`, `validateRequired`, and `validateMessage` return an error message or an empty string. `showError` displays it and sets `aria-invalid`. `validateContactForm` runs every check.
- `initContactForm` pre-fills saved details, shows saved roles, re-checks fields as the user types, and handles submission.

**Limitations**

- The form does not send data to a server. A valid submission shows a thank-you message and saves name and email in the browser only.
- Saved data is stored per browser. Clear site data or use a private window to test again from scratch.

**Testing checklist**

- Select roles, save, reload `services.html`, and confirm they are restored.
- Open `contact.html` and confirm the saved roles appear above the form.
- Submit an empty form and confirm an error appears beside each required field.
- Enter an invalid email and confirm the email message appears.
- Correct each error and confirm it clears without retyping other fields.
- Submit a valid form, reload `contact.html`, and confirm name and email are pre-filled.
- Check the browser console for errors on both pages.

---

## Touchstone 3: Visual Design and Responsive Layout

Added CSS to the Touchstone 2 site.

**Design choices**

- **Palette:** deep teal `#1F5F5B`, warm amber `#F2A541`, cream `#FFFDF8`, charcoal `#222222`, with footer `#17403D`.
- **Fonts:** Georgia for headings, Trebuchet MS for body text and navigation.
- **Responsive layout:** mobile-first. A media query at 800px and wider switches the header and navigation to a row, increases section padding, and lays out the How You Can Help cards side by side.
- **Layout technique:** Flexbox for the header, navigation, and cards.
- **Accessibility:** visible focus outlines, and the current page is underlined in the navigation.

**Files changed**

- `site/styles.css` (new)
- All four HTML pages link to `styles.css`.

---

## Touchstone 2: Client Website Structure

Built the four-page HTML structure for the client.

**Required elements**

- One `h1` per page, with `header`, `nav`, `main`, and `footer`
- Navigation with an unordered list and relative paths
- Adoptable pet photo, volunteer photo, and pet spotlight `figure` with a caption
- One responsive image using the `picture` element
- Director video message with fallback text and a download link
- Contact form with labels, `fieldset`, `legend`, and built-in validation attributes

**Files**

- `site/index.html`, `services.html`, `about.html`, `contact.html`
- `site/images/` and `site/media/` (the media folder holds the video, which is not included in the repository)

**Note on the video:** the MP4 is about 100 MB, which GitHub rejects. It must be added to `site/media/` locally before testing, and it is excluded from the repository.

---

## Running the Site Locally

1. Open the `site/` folder in GitHub Codespaces, VS Code, or another editor.
2. Open `index.html` in a browser, or use Live Server.
3. Use the navigation to move between pages.

## Credits

Images and video are from the course-provided Animal Rescue asset pack. Organization name, impact figures, partners, and contact details are placeholder content written for this assignment.
