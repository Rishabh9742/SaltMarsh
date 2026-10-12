# Saltmarsh Kayak Co. Landing Page

A responsive landing page for a fictional kayak tour company. It includes a lead form with client-side validation and a confirmation screen. It is built with plain HTML, CSS and JavaScript, with no frameworks or build tools.

> Saltmarsh Kayak Co. is a fictional business made for demonstration purposes.

## Features

- **Lead form** with name, email, optional phone, tour, group size, preferred date, optional message and a consent checkbox
- **Validation** on blur and on submit, with clear inline error messages
- **Confirmation screen** that summarises the request and lets the visitor submit another
- **Mobile-first layout** that becomes two columns on desktop
- **Accessible by default**: labelled fields, `aria-live` error messages, visible focus states, focus moved to the confirmation, and reduced-motion support

## Folder structure

```
saltmarsh-kayak/
├── index.html        # page structure and form markup
├── css/
│   └── style.css     # styles, design tokens and responsive rules
├── js/
│   └── script.js     # validation and confirmation logic
└── README.md
```

## Running it locally

### Option 1: VS Code with Live Server (recommended)

1. Open VS Code and choose **File → Open Folder…**, then select `saltmarsh-kayak`.
2. Install the **Live Server** extension by Ritwick Dey from the Extensions panel.
3. Right-click `index.html` and choose **Open with Live Server**, or click **Go Live** in the status bar.
4. Your browser opens at `http://127.0.0.1:5500`. The page reloads whenever you save.

### Option 2: Open the file directly

Double-click `index.html`. No server is needed.

## Form validation rules

| Field | Rule |
| --- | --- |
| Full name | Required, at least 2 characters |
| Email | Required, must be a valid email format |
| Phone | Optional; if filled, 7 to 15 digits (spaces, dashes, brackets and `+` allowed) |
| Tour | Required |
| Group size | Required, whole number from 1 to 8 |
| Preferred date | Required, today or later |
| Consent | Must be ticked |
| Message | Optional, 300 characters max |

## Connecting the form to a real backend

The form currently simulates a submission, so no data leaves the browser. To collect real leads, open `js/script.js` and find the `setTimeout` block inside the submit handler. Replace it with a request to your own endpoint:

```js
fetch("https://your-endpoint.example.com/leads", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
})
  .then((res) => {
    if (!res.ok) throw new Error("Request failed");
    showConfirmation(data);
  })
  .catch(() => {
    alert("Something went wrong. Please try again.");
  })
  .finally(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send request";
  });
```

Hosted form services such as Formspree, Netlify Forms or Getform also work, and many of them only need the endpoint URL.

## Customising

- **Business name and copy:** edit `index.html`.
- **Colours and fonts:** change the variables in the `:root` block at the top of `css/style.css`.
- **Tour options:** update the `<select id="tour">` options in `index.html` and the matching cards in the `tours` section.
- **Group size limit:** change the `max` attribute on the group size input in `index.html`, and the `n > 8` check in `js/script.js`.

## Deploying

Because the site is static, you can host it for free on GitHub Pages, Netlify or Vercel by uploading the `saltmarsh-kayak` folder. Remember to connect the form to a real endpoint first.

## Browser support

Works in current versions of Chrome, Edge, Firefox and Safari. Fonts load from Google Fonts, and the page falls back to system fonts if they are unavailable.

<img width="955" height="861" alt="image" src="https://github.com/user-attachments/assets/1c72b3b1-caaf-4d34-a872-5e0ac43974a8" />

<img width="922" height="817" alt="image" src="https://github.com/user-attachments/assets/d05f63a4-91f0-4e14-84bc-0456d17bb294" />

