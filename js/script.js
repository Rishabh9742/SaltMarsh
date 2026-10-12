(function () {
    "use strict";
  
    const form = document.getElementById("lead-form");
    const confirmation = document.getElementById("confirmation");
    const submitBtn = document.getElementById("submit-btn");
    const resetBtn = document.getElementById("reset-btn");
    const dateInput = document.getElementById("date");
  
    // Block past dates in the date picker
    const today = new Date();
    const todayStr = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0")
    ].join("-");
    dateInput.min = todayStr;
  
    // ---------- Validation rules ----------
    // Each rule returns an error message, or "" when the value is fine.
    const rules = {
      name(v) {
        v = v.trim();
        if (!v) return "Enter your full name.";
        if (v.length < 2) return "Your name needs at least 2 characters.";
        return "";
      },
      email(v) {
        v = v.trim();
        if (!v) return "Enter your email address.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
          return "Enter a valid email, like name@example.com.";
        }
        return "";
      },
      phone(v) {
        v = v.trim();
        if (!v) return ""; // optional
        const digits = v.replace(/\D/g, "");
        if (!/^[\d\s()+\-.]+$/.test(v) || digits.length < 7 || digits.length > 15) {
          return "Enter a phone number with 7 to 15 digits.";
        }
        return "";
      },
      tour(v) {
        return v ? "" : "Choose a tour.";
      },
      group(v) {
        if (v === "") return "Enter how many people are coming.";
        const n = Number(v);
        if (!Number.isInteger(n) || n < 1 || n > 8) {
          return "Group size must be a whole number from 1 to 8.";
        }
        return "";
      },
      date(v) {
        if (!v) return "Choose a preferred date.";
        if (v < todayStr) return "Choose today or a future date.";
        return "";
      },
      consent(_v, el) {
        return el.checked ? "" : "Tick the box so we can contact you.";
      }
    };
  
    function validateField(el) {
      const rule = rules[el.name];
      if (!rule) return true;
  
      const message = rule(el.value, el);
      const wrapper = el.closest(".field");
      const errorEl = document.getElementById(el.name + "-error");
  
      errorEl.textContent = message;
      wrapper.classList.toggle("invalid", Boolean(message));
      el.setAttribute("aria-invalid", message ? "true" : "false");
      if (message) {
        el.setAttribute("aria-describedby", errorEl.id);
      } else {
        el.removeAttribute("aria-describedby");
      }
      return !message;
    }
  
    const fields = Array.from(form.elements).filter((el) => rules[el.name]);
  
    // Validate on blur; once a field shows an error, re-check as the person types
    fields.forEach((el) => {
      el.addEventListener("blur", () => validateField(el));
      const live = el.type === "checkbox" || el.tagName === "SELECT" ? "change" : "input";
      el.addEventListener(live, () => {
        if (el.closest(".field").classList.contains("invalid")) validateField(el);
      });
    });
  
    // ---------- Submit ----------
    form.addEventListener("submit", (event) => {
      event.preventDefault();
  
      let firstInvalid = null;
      fields.forEach((el) => {
        if (!validateField(el) && !firstInvalid) firstInvalid = el;
      });
  
      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }
  
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
  
      const data = Object.fromEntries(new FormData(form).entries());
  
      // Demo only: this fakes a network call.
      // To go live, replace it with fetch("/your-endpoint", { method: "POST", body: JSON.stringify(data) })
      setTimeout(() => {
        showConfirmation(data);
        submitBtn.disabled = false;
        submitBtn.textContent = "Send request";
      }, 900);
    });
  
    function formatDate(iso) {
      const [y, m, d] = iso.split("-").map(Number);
      return new Date(y, m - 1, d).toLocaleDateString(undefined, {
        weekday: "long", day: "numeric", month: "long", year: "numeric"
      });
    }
  
    function showConfirmation(data) {
      document.getElementById("confirm-name").textContent = data.name.trim().split(" ")[0];
      document.getElementById("confirm-email").textContent = data.email.trim();
      document.getElementById("confirm-tour").textContent = data.tour;
      document.getElementById("confirm-date").textContent = formatDate(data.date);
      document.getElementById("confirm-group").textContent =
        data.group + (Number(data.group) === 1 ? " person" : " people");
  
      form.hidden = true;
      confirmation.hidden = false;
      confirmation.focus(); // moves screen-reader and keyboard focus to the new content
      confirmation.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  
    // ---------- Reset ----------
    resetBtn.addEventListener("click", () => {
      form.reset();
      fields.forEach((el) => {
        el.closest(".field").classList.remove("invalid");
        el.removeAttribute("aria-invalid");
        el.removeAttribute("aria-describedby");
        document.getElementById(el.name + "-error").textContent = "";
      });
      confirmation.hidden = true;
      form.hidden = false;
      document.getElementById("name").focus();
    });
  })();
  