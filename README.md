# Touchstone Tasks 2 and 3: Second Chance Animal Rescue Website

A four-page website for a community animal rescue nonprofit. Task 2 built the HTML structure. Task 3 added the CSS for visual design and responsive layout.

## Live Preview

Preview: https://YOUR-USERNAME.github.io/YOUR-REPO/

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home: mission, impact statistics, featured image, pet spotlight, director video, How You Can Help |
| `services.html` | Adoption process, foster program, volunteer role descriptions |
| `about.html` | Organization story, core values, partner acknowledgments |
| `contact.html` | Volunteer or foster interest form, service area, office hours |

## Project Structure

```
site/
├── index.html
├── services.html
├── about.html
├── contact.html
├── styles.css
├── images/
│   ├── rescue-feature-large_c.png
│   ├── rescue-feature-small_c.png
│   ├── rescue-pet-spotlight_c.png
│   ├── rescue-pet_c.png
│   └── rescue-volunteer_c.png
└── media/
    └── rescue-message_c.mp4
```

## Design Summary

- **Colors:** deep teal `#1F5F5B`, warm amber `#F2A541`, cream `#FFFDF8`, charcoal `#222222`
- **Fonts:** Georgia (headings) and Trebuchet MS (body text)
- **Responsive layout:** mobile-first. A media query at 800px and wider switches the header and navigation to a row and lays out the How You Can Help cards side by side.
- **Layout technique:** Flexbox for navigation, cards, and header.

## Running Locally

1. Clone the repository.
2. Open the `site/` folder in GitHub Codespaces or your editor.
3. Open `index.html` in a browser. Use the navigation links to check each page.

If the video doesn't play, make sure `site/media/rescue-message_c.mp4` is present. The page includes a download link and a text summary as fallback.

## Credits

Images and video are from the course-provided Animal Rescue asset pack. The organization name, impact figures, partners, and contact details are placeholder content written for this assignment.
