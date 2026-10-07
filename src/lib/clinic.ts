/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  MANYATTA DENTAL — CENTRAL CONTENT & CONFIGURATION LAYER
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  GROUP PROJECT NOTE
 *  ──────────────────
 *  This is the ONLY file you need to edit when verified clinic information
 *  becomes available. Every field marked with a [VERIFY_*] tag or set to
 *  `null` is a placeholder. Components render elegant "to be confirmed"
 *  states automatically until real values are provided here.
 *
 *  Nothing on the public site invents factual business information: names,
 *  numbers, hours, prices, reviews, or credentials are placeholders until
 *  confirmed by the clinic.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const clinic = {
  name: "Manyatta Dental",
  town: "Narok",
  county: "Narok County",
  country: "Kenya",
  tagline: "Calm, modern dental care in Narok.",
  description:
    "Manyatta Dental is a dental clinic in Narok, Kenya, designed around a simple idea: dental care should feel clear, comfortable and accessible.",
  /** [VERIFY_PHONE] — replace null with e.g. "+254700000000" */
  phone: null as string | null,
  /** [VERIFY_WHATSAPP] — WhatsApp number in international format, digits only, e.g. "254700000000" */
  whatsapp: null as string | null,
  /** [VERIFY_EMAIL] */
  email: null as string | null,
  /** [VERIFY_ADDRESS] — exact street/building address once confirmed */
  address: null as string | null,
  /** [VERIFY_MAPS] — Google Maps embed URL once the exact pin is confirmed */
  mapsEmbedUrl: null as string | null,
  mapsLinkUrl: null as string | null,
  /** [VERIFY_HOURS] — opening hours per day, e.g. { days: "Mon – Fri", time: "8:00 – 17:00" } */
  hours: [] as { days: string; time: string }[],
  /** [VERIFY_SOCIAL] — verified social profiles only */
  social: [] as { label: string; href: string }[],
} as const;

/** Display strings for unverified fields — visible placeholders, honest by design. */
export const placeholder = {
  phone: "[Clinic phone number — to be confirmed]",
  whatsapp: "[WhatsApp number — to be confirmed]",
  email: "[Clinic email — to be confirmed]",
  address: "[Exact clinic address — to be confirmed]",
  hours: "Hours to be confirmed",
  maps: "[Verified Google Maps location will appear here]",
  insurance: "[Accepted insurance providers — to be confirmed]",
  payment: "[Payment methods — to be confirmed]",
  emergency: "[Emergency contact pathway — to be confirmed]",
} as const;

export const year = new Date().getFullYear();

/** Phone href if configured. */
export const telHref = clinic.phone ? `tel:${clinic.phone.replace(/\s/g, "")}` : null;

/** WhatsApp link with a pre-filled appointment request (only when configured). */
export function whatsappHref(message?: string): string | null {
  if (!clinic.whatsapp) return null;
  const text =
    message ??
    `Hello ${clinic.name}, I would like to request an appointment.`;
  return `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const isConfigured = (value: string | null | undefined): value is string =>
  typeof value === "string" && value.length > 0;

/* ───────────────────────────────────────── Navigation ── */

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/patient-info", label: "Patient Info" },
  { href: "/contact", label: "Contact" },
] as const;

/* ─────────────────────────────────────── Icon registry ── */

export const serviceIconNames = [
  "stethoscope",
  "sparkles",
  "layers",
  "activity",
  "syringe",
  "baby",
  "gem",
  "align-center",
  "crown",
  "anchor",
  "leaf",
  "alarm-clock",
] as const;

export type ServiceIconName = (typeof serviceIconNames)[number];

/* ─────────────────────────────────────────── Services ──
 *
 *  PROPOSED RANGE OF CARE — [VERIFY_SERVICE]
 *  These are common dental services presented for design and planning.
 *  The clinic must confirm which services are offered before launch.
 *  A discreet note on the site communicates this honestly.
 */

export type Service = {
  slug: string;
  name: string;
  icon: ServiceIconName;
  tagline: string;
  summary: string;
  involves: string[];
  aftercare: string[];
  faqs: { q: string; a: string }[];
  featured?: boolean;
  note?: string;
};

export const services: Service[] = [
  {
    slug: "dental-check-ups",
    name: "Dental Check-ups",
    icon: "stethoscope",
    tagline: "Routine examinations that keep small problems small.",
    summary:
      "A calm, unhurried look at your teeth, gums, bite and soft tissues — with time to talk through anything you have noticed. Regular check-ups help catch concerns early, when they are usually simplest (and most affordable) to manage.",
    involves: [
      "A review of your dental and general health history",
      "Careful examination of each tooth, your gums and soft tissues",
      "An assessment of your bite and jaw comfort",
      "Clear, personalised advice and a plan for any next steps",
    ],
    aftercare: [
      "Book your next review at the interval your dentist suggests",
      "Brush twice daily with a fluoride toothpaste",
      "Mention any new sensitivity or changes early — do not wait",
      "Jot down questions between visits and bring them along",
    ],
    faqs: [
      {
        q: "How often should I have a check-up?",
        a: "Many people benefit from a review about every six months, but the right interval depends on your individual oral health. Your dentist will recommend what suits you.",
      },
      {
        q: "Will a check-up hurt?",
        a: "A routine examination should not be painful. If you feel nervous, tell the team before you sit down — extra time and a gentler pace make a real difference.",
      },
    ],
    featured: true,
  },
  {
    slug: "teeth-cleaning",
    name: "Teeth Cleaning",
    icon: "sparkles",
    tagline: "Professional scaling and polishing for a fresher, healthier smile.",
    summary:
      "Even excellent brushing leaves some plaque behind, which hardens into tartar that only professional instruments can remove. A clean gently lifts away build-up, polishes the tooth surface and gives your gums a chance to stay healthy.",
    involves: [
      "Scaling to remove hardened tartar above and below the gumline",
      "Polishing to smooth the tooth surface and lift surface stains",
      "A gum health check, with honest feedback on your brushing",
      "Practical home-care guidance you can actually follow",
    ],
    aftercare: [
      "Mild sensitivity for a day or two is normal and settles quickly",
      "Keep brushing gently — do not avoid tender areas",
      "Limit strong staining foods and drinks for the first day",
      "Maintain the recall rhythm your dentist recommends",
    ],
    faqs: [
      {
        q: "Does cleaning damage my teeth?",
        a: "No. Professional instruments are designed to remove deposits, not tooth structure. Smooth, clean surfaces actually make it harder for plaque to stick.",
      },
      {
        q: "How long does it take?",
        a: "Most routine cleans fit comfortably within a single visit, depending on how much build-up is present.",
      },
    ],
    featured: true,
  },
  {
    slug: "fillings",
    name: "Fillings",
    icon: "layers",
    tagline: "Restoring the strength and shape of a tooth after decay.",
    summary:
      "When decay creates a cavity, a filling seals and rebuilds the tooth before the problem grows deeper. Modern tooth-coloured materials restore function discreetly, and the visit is usually straightforward.",
    involves: [
      "Numbing the area so the visit stays comfortable",
      "Gently removing the decayed part of the tooth",
      "Placing and shaping a tooth-coloured filling",
      "Checking your bite so the tooth feels natural when you chew",
    ],
    aftercare: [
      "Wait until the numbness wears off before eating",
      "Expect brief sensitivity to cold or pressure for a few days",
      "Chew on the other side for the first hours if advised",
      "Call the clinic if your bite feels high or uneven afterwards",
    ],
    faqs: [
      {
        q: "How do I know if I need a filling?",
        a: "Common signs include sensitivity to sweet or cold, a visible dark spot, or food catching in one place. Only an examination can confirm it — small cavities rarely announce themselves loudly.",
      },
      {
        q: "Will the filling be visible?",
        a: "Tooth-coloured materials are matched to your natural shade, so most fillings are very hard to spot.",
      },
    ],
  },
  {
    slug: "root-canal-treatment",
    name: "Root Canal Treatment",
    icon: "activity",
    tagline: "Relieving deep pain while keeping your natural tooth.",
    summary:
      "When decay or injury reaches the nerve of a tooth, root canal treatment removes the infection from inside, relieves pain and lets you keep your own tooth. Despite its reputation, modern treatment is usually no more dramatic than a longer filling appointment.",
    involves: [
      "Thorough numbing so the tooth is comfortable throughout",
      "Cleaning the infection from the tiny canals inside the tooth",
      "Sealing the canals to protect against reinfection",
      "Planning a crown afterwards in many cases to strengthen the tooth",
    ],
    aftercare: [
      "Mild tenderness when biting is normal for a few days",
      "Take any prescribed medication exactly as directed",
      "Avoid chewing hard foods on the tooth until fully restored",
      "Return for the permanent crown or filling as advised",
    ],
    faqs: [
      {
        q: "Is root canal treatment painful?",
        a: "The goal of the treatment is to get you out of pain. With proper numbing most patients are surprised by how manageable the appointment feels.",
      },
      {
        q: "Why not simply remove the tooth?",
        a: "Keeping your natural tooth usually protects your bite and neighbouring teeth better than removing it. Your dentist will walk you through the honest options for your situation.",
      },
    ],
  },
  {
    slug: "tooth-extraction",
    name: "Tooth Extraction",
    icon: "syringe",
    tagline: "Careful, gentle removal when a tooth cannot be saved.",
    summary:
      "Sometimes a tooth is too damaged to repair, or removing it is the healthiest option for the rest of your mouth. Extractions are planned carefully, numbed properly and followed by clear aftercare so healing is smooth.",
    involves: [
      "An assessment — with imaging where useful — before removal",
      "Local anaesthesia so the area is fully numb",
      "Gentle removal with respect for the surrounding tissue",
      "Clear written and spoken instructions for recovery",
    ],
    aftercare: [
      "Bite on the provided gauze as instructed to help a clot form",
      "Avoid vigorous rinsing or straws for the first 24 hours",
      "Choose soft, cool foods on the first day",
      "Use pain relief as advised, and call if bleeding persists",
    ],
    faqs: [
      {
        q: "How long does healing take?",
        a: "The gum usually closes over one to two weeks, with deeper healing continuing beyond that. Most people return to normal routines within a day or two.",
      },
      {
        q: "What are my options for replacing the tooth?",
        a: "Depending on the tooth, options can include an implant, a bridge or a denture. It is worth discussing replacement early — your dentist will explain what suits your mouth and budget.",
      },
    ],
  },
  {
    slug: "childrens-dentistry",
    name: "Children's Dentistry",
    icon: "baby",
    tagline: "Gentle first experiences that build lifelong healthy habits.",
    summary:
      "Early, positive dental visits shape how a child feels about care for the rest of their life. Appointments for children move at their pace — plenty of explaining, showing and encouragement — so the dentist's chair never becomes a scary place.",
    involves: [
      "Friendly, unhurried introductions to the dental environment",
      "Gentle examination of growing teeth and gums",
      "Guidance on brushing, diet and habits for parents",
      "Preventive care and early spotting of crowding or decay",
    ],
    aftercare: [
      "Keep praise going at home — make brushing a shared routine",
      "Limit frequent sugary snacks and drinks between meals",
      "Supervise brushing until your child has the dexterity to do it well",
      "Keep regular review visits, even when nothing seems wrong",
    ],
    faqs: [
      {
        q: "When should my child first see a dentist?",
        a: "A first visit around the appearance of the first teeth helps a child get comfortable early — and gives parents useful guidance from the start.",
      },
      {
        q: "What if my child is anxious?",
        a: "That is completely normal. A calm, tell-show-do approach — where everything is explained and demonstrated first — helps most children settle within a visit or two.",
      },
    ],
  },
  {
    slug: "teeth-whitening",
    name: "Teeth Whitening",
    icon: "gem",
    tagline: "A brighter smile, approached safely and honestly.",
    summary:
      "Whitening gently lightens the natural shade of your teeth. A proper assessment comes first — whitening is not right for every mouth, and existing fillings or crowns do not change colour, so honest advice matters more than promises.",
    involves: [
      "An examination to confirm whitening is suitable for you",
      "A discussion of realistic shades and options",
      "Professional-grade materials with clear instructions",
      "Guidance on managing sensitivity during the process",
    ],
    aftercare: [
      "Expect temporary sensitivity — it settles and can be managed",
      "Follow the wear-time instructions exactly",
      "Cut back on heavily staining foods and drinks for best results",
      "Keep up routine cleans so results last longer",
    ],
    faqs: [
      {
        q: "Will whitening damage my enamel?",
        a: "Professionally supervised whitening, used as directed, is considered safe for healthy teeth. Unsupervised products are where problems usually start.",
      },
      {
        q: "How long do results last?",
        a: "It varies with diet and habits — months to a few years is typical, and top-ups can refresh the shade when needed.",
      },
    ],
    note: "Suitability is always confirmed with an examination first.",
  },
  {
    slug: "orthodontic-care",
    name: "Orthodontic Care",
    icon: "align-center",
    tagline: "Guiding teeth into healthier, easier-to-clean alignment.",
    summary:
      "Straighter teeth are not only about appearance — aligned teeth are easier to clean, wear more evenly and can improve how your bite works. Orthodontic planning starts with a careful assessment of where your teeth are and where they should be.",
    involves: [
      "An assessment of alignment, bite and jaw relationship",
      "A conversation about goals, timelines and options",
      "A treatment plan — which may involve braces or aligners",
      "Regular review visits to guide progress safely",
    ],
    aftercare: [
      "Follow wear or adjustment instructions consistently",
      "Take extra care cleaning around brackets or aligners",
      "Report broken wires or lost aligners promptly",
      "Wear retainers exactly as directed — they protect the result",
    ],
    faqs: [
      {
        q: "Am I too old to straighten my teeth?",
        a: "Adults of many ages complete orthodontic treatment successfully. Suitability depends on your gum and bone health more than your age.",
      },
      {
        q: "How long does treatment take?",
        a: "Simple alignment can take months; comprehensive corrections take longer. An assessment gives a realistic estimate for your case.",
      },
    ],
    note: "The level of orthodontic care available at the clinic is being confirmed — some cases may be planned with or referred to a specialist.",
  },
  {
    slug: "dental-crowns",
    name: "Dental Crowns",
    icon: "crown",
    tagline: "A custom-made cap that protects a weakened tooth.",
    summary:
      "When a tooth is heavily filled, cracked or root-treated, a crown wraps around it like a protective shell — restoring strength, shape and appearance. Modern ceramics blend in so well that most are indistinguishable from natural teeth.",
    involves: [
      "Assessing the tooth and discussing material options",
      "Preparing the tooth and taking precise impressions or scans",
      "A temporary crown while the final one is crafted",
      "Fitting and fine-tuning the final crown for a comfortable bite",
    ],
    aftercare: [
      "Be gentle with the temporary crown — avoid sticky foods",
      "Brush and floss normally around the finished crown",
      "Avoid using the tooth as a tool (opening packets, cracking shells)",
      "Mention any looseness, chip or bite change promptly",
    ],
    faqs: [
      {
        q: "How long does a crown last?",
        a: "With good care, many crowns serve well for ten years or more. Longevity depends on the tooth underneath and how it is looked after.",
      },
      {
        q: "Does getting a crown hurt?",
        a: "The tooth is numbed for preparation, and the appointment is generally comfortable. Some short-lived sensitivity afterwards is normal.",
      },
    ],
  },
  {
    slug: "dental-implants",
    name: "Dental Implants",
    icon: "anchor",
    tagline: "A modern, stable way to replace a missing tooth.",
    summary:
      "An implant replaces the root of a missing tooth with a small titanium post, which then supports a crown that looks and works like your own tooth. It is a staged, carefully planned process — and a proper assessment decides whether it is right for you.",
    involves: [
      "A full assessment of gum and bone health, with imaging",
      "A transparent plan covering stages, healing time and costs",
      "Placement of the implant, followed by a healing period",
      "Fitting the final crown once the implant has integrated",
    ],
    aftercare: [
      "Follow surgical aftercare instructions closely after placement",
      "Keep the area clean with the recommended gentle routine",
      "Avoid smoking during healing — it significantly affects success",
      "Attend every review so integration can be monitored",
    ],
    faqs: [
      {
        q: "Is everyone suitable for implants?",
        a: "No — healthy gums, adequate bone and well-managed general health all matter. Where an implant is not suitable, alternatives like bridges or dentures are discussed openly.",
      },
      {
        q: "How long does the whole process take?",
        a: "Typically several months from placement to final crown, because healing between stages is what makes the result stable.",
      },
    ],
    note: "Implant availability at the clinic is being confirmed — assessment and planning advice is always a sensible first step.",
  },
  {
    slug: "gum-care",
    name: "Gum Care",
    icon: "leaf",
    tagline: "Treating bleeding gums and protecting the foundations of your smile.",
    summary:
      "Bleeding when you brush is a signal, not something to ignore. Gum care focuses on calming inflammation, deep-cleaning the areas your toothbrush cannot reach and giving you the routine that keeps gums firm and healthy.",
    involves: [
      "Measuring gum health around every tooth",
      "Deep cleaning below the gumline where needed",
      "Honest coaching on technique — not blame",
      "A review plan to confirm the gums are healing",
    ],
    aftercare: [
      "Expect some tenderness after a deep clean — keep cleaning gently",
      "Clean between teeth daily with floss or interdental brushes",
      "Watch for bleeding reducing over the following two weeks",
      "Keep review appointments — gum health responds to consistency",
    ],
    faqs: [
      {
        q: "My gums bleed — is that normal?",
        a: "Common, yes. Healthy, no. Bleeding usually signals inflammation, and the encouraging part is that early gum disease is very treatable.",
      },
      {
        q: "Can gum disease be reversed?",
        a: "Early inflammation (gingivitis) is usually fully reversible with professional cleaning and good home care. More advanced disease is managed rather than cured — another reason to act early.",
      },
    ],
  },
  {
    slug: "emergency-dental-care",
    name: "Emergency Dental Care",
    icon: "alarm-clock",
    tagline: "Prompt attention when pain simply cannot wait.",
    summary:
      "Toothache that keeps you awake, a broken tooth, a lost filling or a swollen face all deserve quick attention. The clinic's emergency pathway is being confirmed — until then, request an appointment and describe your situation so the team can advise on urgency.",
    involves: [
      "A focused assessment of the problem and its cause",
      "Getting you comfortable first — pain relief is the priority",
      "Stabilising the tooth or gum issue",
      "A clear plan for definitive treatment and follow-up",
    ],
    aftercare: [
      "Follow any medication instructions exactly",
      "Return for definitive care even if the pain has settled",
      "Avoid chewing on the affected side until reviewed",
      "Keep the contact details you are given for any worsening symptoms",
    ],
    faqs: [
      {
        q: "What counts as a dental emergency?",
        a: "Severe or persistent pain, facial swelling, trauma, uncontrolled bleeding, or a knocked-out tooth. Swelling with fever or difficulty swallowing needs urgent medical attention.",
      },
      {
        q: "What should I do for a knocked-out tooth?",
        a: "Hold it by the crown (not the root), rinse briefly without scrubbing, and keep it moist — ideally replaced in the socket, or in milk — then seek care immediately. Time matters enormously.",
      },
    ],
    note: "Emergency care availability is being confirmed with the clinic. [VERIFY_SERVICE]",
  },
];

export const serviceBySlug = (slug: string) =>
  services.find((service) => service.slug === slug);

export const featuredServices = services.filter((service) => service.featured);

/* ──────────────────────────────── Patient experience ── */

export const visitSteps = [
  {
    number: "01",
    title: "Request an appointment",
    text: "Choose a service and a day that suits you — online, by phone or on WhatsApp. No queues, no paperwork yet.",
  },
  {
    number: "02",
    title: "Meet your dental team",
    text: "A warm welcome and an honest conversation about your concerns, your history and what you hope for.",
  },
  {
    number: "03",
    title: "Understand your options",
    text: "Findings are explained in plain language, with clear options and transparent next steps — never pressure.",
  },
  {
    number: "04",
    title: "Receive personalised care",
    text: "Treatment paced to your comfort, delivered carefully, with everything explained before it happens.",
  },
  {
    number: "05",
    title: "Continue with follow-up",
    text: "Clear aftercare guidance and simple recall visits, so the results of your care actually last.",
  },
] as const;

export const values = [
  {
    title: "Clarity before treatment",
    text: "You should always know what is happening, why it matters and what it costs — before anything begins.",
  },
  {
    title: "Comfort is not a luxury",
    text: "A calm environment, gentle hands and an unhurried pace are part of good dentistry, not extras.",
  },
  {
    title: "Honest, pressure-free advice",
    text: "Recommendations are explained with the reasoning behind them. The decision always stays with you.",
  },
  {
    title: "Care for our community",
    text: "Quality dental care should not require a long journey. Narok deserves modern care, close to home.",
  },
] as const;

export const approachPoints = [
  {
    icon: "message-square-text",
    title: "Clear communication",
    text: "Every finding and every option is explained in language that makes sense — in English or Kiswahili.",
  },
  {
    icon: "scan-line",
    title: "Careful diagnosis",
    text: "Good treatment starts with understanding. We assess thoroughly before recommending anything.",
  },
  {
    icon: "graduation-cap",
    title: "Patient education",
    text: "You leave each visit knowing how to look after your smile between appointments.",
  },
  {
    icon: "heart-handshake",
    title: "Comfort-focused care",
    text: "A gentle pace, honest pain management and time for questions — on every visit, for every patient.",
  },
] as const;

/* ───────────────────────────────────── Placeholder content ── */

/** [VERIFY_TESTIMONIALS] — real, consented patient stories will replace these slots. */
export const testimonialPlaceholders = [
  { id: 1, label: "Patient story — slot one" },
  { id: 2, label: "Patient story — slot two" },
  { id: 3, label: "Patient story — slot three" },
] as const;

/** [VERIFY_TEAM] — clinicians appear here only with verified name, role and qualifications. */
export const teamPlaceholders = [
  { id: 1, caption: "Lead clinician" },
  { id: 2, caption: "Dental clinician" },
  { id: 3, caption: "Patient care team" },
] as const;

/* ────────────────────────────────────────── Site-wide FAQ ── */

export type Faq = {
  q: string;
  a: string;
  kind: "guidance" | "clinic";
};

export const faqs: Faq[] = [
  {
    q: "How do I request an appointment?",
    a: "Use the booking page to choose a service, a preferred day and a time window, then leave your contact details. The clinic will respond to arrange a confirmed time. You can also reach out by phone or WhatsApp once our verified numbers are published.",
    kind: "clinic",
  },
  {
    q: "What should I bring to my first visit?",
    a: "Bring your national ID, a list of any medications you take, and any previous dental records or X-rays you may have. If you use insurance, bring your policy details too. Arriving with questions written down always helps.",
    kind: "guidance",
  },
  {
    q: "Do you treat children?",
    a: "Children's dentistry is part of the range of care being planned for Manyatta Dental. Please confirm availability with the clinic when requesting an appointment — gentle, early visits are always worth planning for.",
    kind: "clinic",
  },
  {
    q: "Do you offer emergency dental care?",
    a: "Emergency dental care is among the services being confirmed with the clinic. If you have severe pain, facial swelling or a dental injury, request an appointment and describe your symptoms — or seek urgent care if swelling affects breathing or swallowing.",
    kind: "clinic",
  },
  {
    q: "What payment methods are available?",
    a: "Payment options — including mobile money and card payments where offered — will be published here once confirmed by the clinic. The verified list will appear on the patient information page.",
    kind: "clinic",
  },
  {
    q: "Do you accept insurance?",
    a: "The list of accepted insurance providers is being finalised and will be published once verified. If you hold cover, mention your provider when booking so the clinic can advise.",
    kind: "clinic",
  },
  {
    q: "How often should I have a dental check-up?",
    a: "For many people, about every six months works well — but the ideal interval depends on your individual oral health, and your dentist will recommend what suits you. Early checks nearly always mean simpler, more affordable treatment.",
    kind: "guidance",
  },
];

export const educationDisclaimer =
  "Information on this website is for general educational purposes and does not replace a professional dental assessment, diagnosis or treatment plan.";
