/* Second Chance Animal Rescue: Touchstone 4 JavaScript
   1. Volunteer role tracker (services.html): saves selected roles to localStorage
   2. Contact form validation and saved details (contact.html) */

// Data: one array of objects describing each volunteer role
const VOLUNTEER_ROLES = [
  { id: "shelter-care", name: "Shelter Care Assistant", commitment: "About 3 hours per shift" },
  { id: "event-helper", name: "Adoption Event Helper", commitment: "Weekend events" },
  { id: "transport", name: "Transport Driver", commitment: "Flexible, by arrangement" },
  { id: "admin", name: "Administrative Volunteer", commitment: "Remote or in-office" }
];

// Storage keys in one place so they are easy to change
const STORAGE_KEYS = {
  roles: "rescue.selectedRoles",
  contact: "rescue.contactDetails"
};

/* ---------- Helpers for browser storage ---------- */

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("Could not save to localStorage:", error);
  }
}

function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (error) {
    return fallback;
  }
}

/* ---------- 1. Volunteer role tracker ---------- */

function getSavedRoleIds() {
  return loadFromStorage(STORAGE_KEYS.roles, []);
}

function getRoleNamesFromIds(ids) {
  return VOLUNTEER_ROLES
    .filter(role => ids.includes(role.id))
    .map(role => role.name);
}

function getCheckedRoleIds() {
  return VOLUNTEER_ROLES
    .filter(role => document.getElementById("role-" + role.id).checked)
    .map(role => role.id);
}

function renderRoleSummary(ids) {
  const summary = document.getElementById("role-summary");
  if (!summary) return;
  summary.innerHTML = "";

  if (ids.length === 0) {
    summary.textContent = "You have not saved any roles yet.";
    return;
  }

  const list = document.createElement("ul");
  VOLUNTEER_ROLES.filter(role => ids.includes(role.id)).forEach(role => {
    const item = document.createElement("li");
    item.textContent = role.name + " (" + role.commitment + ")";
    list.appendChild(item);
  });
  summary.appendChild(list);
}

function initRoleTracker() {
  const saveButton = document.getElementById("save-roles");
  if (!saveButton) return;

  // Restore saved selections when the page opens
  const savedIds = getSavedRoleIds();
  VOLUNTEER_ROLES.forEach(role => {
    document.getElementById("role-" + role.id).checked = savedIds.includes(role.id);
  });
  renderRoleSummary(savedIds);

  // Save the selection when the user clicks the button
  saveButton.addEventListener("click", () => {
    const ids = getCheckedRoleIds();
    saveToStorage(STORAGE_KEYS.roles, ids);
    renderRoleSummary(ids);
    document.getElementById("role-status").textContent =
      ids.length === 0 ? "Your selection was cleared." : "Your selection has been saved.";
  });
}

/* ---------- 2. Contact form validation ---------- */

// Each validator returns an error message, or an empty string when the value is valid
function validateName(value) {
  if (value.trim() === "") return "Please enter your full name.";
  if (value.trim().length < 2) return "Your name must be at least 2 characters.";
  return "";
}

function validateEmail(value) {
  if (value.trim() === "") return "Please enter your email address.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter an email in the form name@example.com.";
  return "";
}

function validateRequired(value, message) {
  return value === "" ? message : "";
}

function validateMessage(value) {
  if (value.trim() === "") return "Please write a short message.";
  if (value.length > 500) return "Your message must be 500 characters or fewer.";
  return "";
}

// Show or clear the error next to a field, and mark the field for assistive technology
function showError(fieldId, errorId, message) {
  const field = document.getElementById(fieldId);
  const errorEl = document.getElementById(errorId);
  errorEl.textContent = message;
  if (field) field.setAttribute("aria-invalid", message ? "true" : "false");
}

function validateContactForm(form) {
  const petExperience = form.querySelector('input[name="pet_experience"]:checked');

  const errors = {
    name: validateName(form.full_name.value),
    email: validateEmail(form.email.value),
    interest: validateRequired(form.interest_type.value, "Please choose an interest type."),
    availability: validateRequired(form.availability.value, "Please choose your availability."),
    petExperience: validateRequired(petExperience ? petExperience.value : "", "Please choose your experience with pets."),
    message: validateMessage(form.message.value)
  };

  showError("full-name", "full-name-error", errors.name);
  showError("email", "email-error", errors.email);
  showError("interest-type", "interest-type-error", errors.interest);
  showError("availability", "availability-error", errors.availability);
  showError(null, "pet-experience-error", errors.petExperience);
  showError("message", "message-error", errors.message);

  // The form is valid only when every message is empty
  return Object.values(errors).every(message => message === "");
}

function initContactForm() {
  const form = document.getElementById("interest-form-element");
  if (!form) return;

  // Pre-fill name and email from the last time the user submitted
  const savedContact = loadFromStorage(STORAGE_KEYS.contact, null);
  if (savedContact) {
    form.full_name.value = savedContact.name;
    form.email.value = savedContact.email;
    document.getElementById("saved-note").textContent =
      "We filled in your name and email from your last visit.";
  }

  // Show the roles chosen on the services page
  const savedRoles = getRoleNamesFromIds(getSavedRoleIds());
  document.getElementById("saved-roles").textContent =
    savedRoles.length > 0
      ? "Roles you selected on the services page: " + savedRoles.join(", ") + "."
      : "";

  // Re-check a field as the user corrects it, so errors clear without restarting the form
  form.full_name.addEventListener("input", () => showError("full-name", "full-name-error", validateName(form.full_name.value)));
  form.email.addEventListener("input", () => showError("email", "email-error", validateEmail(form.email.value)));
  form.message.addEventListener("input", () => showError("message", "message-error", validateMessage(form.message.value)));

  form.addEventListener("submit", event => {
    event.preventDefault(); // No back end yet, so the page handles the submission
    const success = document.getElementById("form-success");
    success.textContent = "";

    if (!validateContactForm(form)) {
      form.querySelector('[aria-invalid="true"]').focus();
      return;
    }

    saveToStorage(STORAGE_KEYS.contact, {
      name: form.full_name.value.trim(),
      email: form.email.value.trim()
    });
    success.textContent = "Thank you, " + form.full_name.value.trim() + ". We will be in touch within three business days.";
    form.reset();
  });
}

// Run each feature only on the page that uses it
document.addEventListener("DOMContentLoaded", () => {
  initRoleTracker();
  initContactForm();
});
