// script.js for Smart Event Planner

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("eventForm");
  const output = document.getElementById("output");

  // Event suggestion templates based on event type
  const suggestionTemplates = {
    birthday: [
      "Option 1 – Indoor LED party with snacks and DJ (perfect for evening vibe, includes custom decorations and vibrant lighting)",
      "Option 2 – Open-air garden celebration with games and cake (great for kids and families, includes playful activities)",
      "Option 3 – Virtual birthday bash with digital games and e-cakes (ideal for remote friends and budget-conscious hosts)"
    ],
    wedding: [
      "Option 1 – Banquet hall wedding with catering and live music (includes buffet-style meals, indoor décor, and dance floor)",
      "Option 2 – Outdoor lawn wedding with floral decor and buffet (ideal for nature-themed weddings and day ceremonies)",
      "Option 3 – Destination wedding package with stay and ceremony (all-in-one package including travel, stay, ceremony & reception)"
    ],
    "office party": [
      "Option 1 – Conference room party with team games and snacks (simple setup, ice-breaking activities, and snacks included)",
      "Option 2 – Rooftop evening with drinks and karaoke (fun-filled, relaxed vibe for colleagues to unwind)",
      "Option 3 – Virtual celebration with e-gift distribution (perfect for hybrid offices, includes games and digital giveaways)"
    ],
    anniversary: [
      "Option 1 – Candlelight dinner at a luxury restaurant (romantic atmosphere, gourmet menu, ideal for couples)",
      "Option 2 – Home garden party with fairy lights and music (intimate setup for family and close friends)",
      "Option 3 – Weekend getaway with couple spa package (romantic retreat including accommodation and couple massages)"
    ],
    "baby shower": [
      "Option 1 – Indoor baby-themed decorations and cupcakes (includes soft decor, games, and gift station)",
      "Option 2 – Outdoor picnic-style shower with balloon art (casual and cozy setup with fresh snacks and games)",
      "Option 3 – Café lounge event with custom cake and gifts (modern celebration in a stylish café with photo booth)"
    ],
    "corporate event": [
      "Option 1 – Seminar setup with projector, tea, and lunch (professional tone, includes refreshments and branded decor)",
      "Option 2 – Team-building event with activities and dinner (includes workshops, physical games, and evening meals)",
      "Option 3 – Annual gathering with awards and DJ night (celebratory evening with performances and trophy distribution)"
    ],
    "cultural fest": [
      "Option 1 – Stage setup with lights, mics, and performances (ideal for dance, drama, and speech events)",
      "Option 2 – Open ground fest with food stalls and art corners (vibrant, interactive with audience participation zones)",
      "Option 3 – Digital culture fest with online streaming (includes streaming software, live hosts, and remote performance slots)"
    ]
  };

  // Generates AI suggestions based on user input
  const generateSuggestions = ({ min, max, guests, location, type }) => {
    const budgetStr = `₹${min} - ₹${max}`;
    const base = suggestionTemplates[type.toLowerCase()] || [];

    return [
      `We found some amazing ideas for your ${type} at ${location} for ${guests} guests within your budget of ${budgetStr}:`,
      ...base
    ].join("\n\n");
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const minBudget = parseInt(form.minBudget.value.trim());
    const maxBudget = parseInt(form.maxBudget.value.trim());
    const eventDate = form.eventDate.value;
    const eventType = form.eventType.value;
    const description = form.description.value.trim();
    const guests = parseInt(form.guests.value.trim());
    const location = form.location.value.trim();
    const specialRequests = form.specialRequests.value.trim();
    const email = form.email.value.trim();

    if (maxBudget < minBudget) {
      output.innerHTML = `<p style="color:red;">Max budget should be greater than min budget.</p>`;
      return;
    }

    const summary = generateSuggestions({
      min: minBudget,
      max: maxBudget,
      guests,
      location,
      type: eventType
    });

    output.innerHTML = `
      <div class="suggestion-box">
        <p><strong>Date:</strong> ${eventDate}</p>
        <p><strong>Event Type:</strong> ${eventType}</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Guests:</strong> ${guests}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Special Requests:</strong> ${specialRequests || "None"}</p>
        <p><strong>Suggestions:</strong><br><br>${summary.replaceAll("\n", "<br>")}</p>
        <p><em>A detailed plan will be sent to: ${email}</em></p>
      </div>
    `;
  });

  // Smooth scroll to output for mobile
  const scrollToOutput = () => {
    const y = output.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  form.addEventListener("submit", () => {
    setTimeout(scrollToOutput, 300);
  });

  // Form field validation
  ["minBudget", "maxBudget", "guests", "email"].forEach(id => {
    const input = document.getElementById(id);
    input.addEventListener("blur", () => {
      if (!input.value.trim()) {
        input.style.borderColor = "red";
      } else {
        input.style.borderColor = "#4a148c";
      }
    });
  });

  // Animated header pulse effect
  const header = document.querySelector("header h1");
  setInterval(() => {
    header.classList.toggle("pulse");
  }, 2000);
});