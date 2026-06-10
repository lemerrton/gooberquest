// Daily-rotating libraries of specific, concrete actions for each quest line.
// Rotation is keyed off day-of-year so every day gets a different assignment.

export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  note?: string;
}

export interface Workout {
  name: string;
  focus: string;
  exercises: Exercise[];
  finisher?: string;
}

export interface EcomMission {
  title: string;
  category: string;
  timeEstimate: string;
  why: string;
  steps: string[];
}

export interface ContentIdea {
  title: string;
  hook: string;
  format: string;
  steps: string[];
}

export function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date.getTime() - start.getTime()) / 86400000);
}

export function weekOfYear(date: Date): number {
  return Math.floor(dayOfYear(date) / 7);
}

// ---------------------------------------------------------------------------
// FITNESS — Push/Pull/Legs split, 5 gym days. Rest Wed + Sun.
// Goal: lean bulk. He has muscle but is skinny — add size while staying lean.
// ---------------------------------------------------------------------------

export const WORKOUTS: Record<number, Workout> = {
  0: {
    name: 'Active Recovery',
    focus: 'Rest day — grow while you recover',
    exercises: [
      { name: '20-30 min walk', sets: '1', reps: '—', note: 'Outside if possible. Keeps you lean during the bulk.' },
      { name: 'Full-body stretch', sets: '1', reps: '10 min', note: 'Hips, hamstrings, shoulders, chest.' },
    ],
    finisher: 'Meal prep for the week. A bulk dies without food ready to go.',
  },
  1: {
    name: 'Push Day A',
    focus: 'Chest, shoulders, triceps — heavy',
    exercises: [
      { name: 'Barbell Bench Press', sets: '4', reps: '6-8', note: 'Top set heavy. Add 2.5-5 lbs when you hit 4x8.' },
      { name: 'Incline Dumbbell Press', sets: '3', reps: '8-10', note: 'Upper chest builds the shelf. Control the negative.' },
      { name: 'Seated Dumbbell Shoulder Press', sets: '3', reps: '8-10' },
      { name: 'Lateral Raises', sets: '4', reps: '12-15', note: 'Light weight, perfect form. Delts make you look wide.' },
      { name: 'Cable Triceps Pushdown', sets: '3', reps: '10-12' },
      { name: 'Overhead Triceps Extension', sets: '3', reps: '10-12' },
    ],
    finisher: 'Optional: 2 sets of push-ups to failure.',
  },
  2: {
    name: 'Pull Day A',
    focus: 'Back, rear delts, biceps — heavy',
    exercises: [
      { name: 'Pull-ups (weighted if 10+ easy)', sets: '4', reps: 'AMRAP', note: 'The king of width. Full hang at the bottom.' },
      { name: 'Barbell Row', sets: '4', reps: '6-8', note: 'Strict form — no body english until the last 2 reps.' },
      { name: 'Lat Pulldown', sets: '3', reps: '10-12' },
      { name: 'Face Pulls', sets: '3', reps: '15-20', note: 'Rear delts + posture. Do not skip these.' },
      { name: 'Barbell Curl', sets: '3', reps: '8-10' },
      { name: 'Hammer Curls', sets: '3', reps: '10-12', note: 'Brachialis = thicker-looking arms.' },
    ],
  },
  3: {
    name: 'Active Recovery',
    focus: 'Mid-week rest — recharge for legs tomorrow',
    exercises: [
      { name: '20-30 min walk or light cardio', sets: '1', reps: '—' },
      { name: 'Stretch + foam roll', sets: '1', reps: '10 min', note: 'Quads and hips especially — legs tomorrow.' },
    ],
    finisher: 'Extra sleep tonight. Tomorrow is the hardest day of the week.',
  },
  4: {
    name: 'Leg Day',
    focus: 'Quads, hamstrings, glutes, calves',
    exercises: [
      { name: 'Barbell Back Squat', sets: '4', reps: '6-8', note: 'Depth over weight. Hit parallel or below.' },
      { name: 'Romanian Deadlift', sets: '3', reps: '8-10', note: 'Feel the hamstring stretch, hinge at the hips.' },
      { name: 'Leg Press', sets: '3', reps: '10-12' },
      { name: 'Lying Leg Curl', sets: '3', reps: '12-15' },
      { name: 'Standing Calf Raises', sets: '4', reps: '12-15', note: 'Pause at the top and bottom.' },
      { name: 'Hanging Leg Raises', sets: '3', reps: '10-15', note: 'Abs are made in the kitchen but built here.' },
    ],
  },
  5: {
    name: 'Push Day B',
    focus: 'Shoulders priority, chest volume',
    exercises: [
      { name: 'Overhead Press', sets: '4', reps: '6-8', note: 'Standing, strict. Boulder shoulders start here.' },
      { name: 'Flat Dumbbell Press', sets: '3', reps: '10-12' },
      { name: 'Cable Chest Fly', sets: '3', reps: '12-15', note: 'Squeeze at the center for 1 second.' },
      { name: 'Lateral Raises', sets: '4', reps: '15-20', note: 'Second time this week. Width is the goal.' },
      { name: 'Dips', sets: '3', reps: 'AMRAP', note: 'Add weight when you hit 12+.' },
      { name: 'Triceps Rope Pushdown', sets: '3', reps: '12-15' },
    ],
  },
  6: {
    name: 'Pull Day B',
    focus: 'Back thickness, arms pump',
    exercises: [
      { name: 'Deadlift', sets: '3', reps: '5', note: 'Heavy but crisp. Reset every rep.' },
      { name: 'Chest-Supported Row', sets: '3', reps: '10-12' },
      { name: 'Single-Arm Dumbbell Row', sets: '3', reps: '10-12', note: 'Stretch at the bottom, drive to the hip.' },
      { name: 'Rear Delt Fly', sets: '3', reps: '15-20' },
      { name: 'Incline Dumbbell Curl', sets: '3', reps: '10-12', note: 'Full stretch — best biceps builder there is.' },
      { name: 'Cable Curl', sets: '2', reps: '15-20', note: 'Finish with a pump.' },
    ],
  },
};

export function getTodaysWorkout(date: Date): Workout {
  return WORKOUTS[date.getDay()];
}

// ---------------------------------------------------------------------------
// E-COMMERCE — two rotating mission decks: marketing (traffic) and store (conversion).
// Tuned for a brewing store that exists but has no real sales yet.
// ---------------------------------------------------------------------------

export const MARKETING_MISSIONS: EcomMission[] = [
  {
    title: 'Set up an abandoned checkout email flow',
    category: 'Email',
    timeEstimate: '45 min',
    why: 'Recovers 5-15% of lost sales automatically, forever. Highest ROI thing a new store can do.',
    steps: [
      'Open Shopify Admin → Marketing → Automations → Abandoned checkout.',
      'Build a 3-email sequence: Email 1 at 1 hour ("You left something behind"), Email 2 at 24 hours (answer the #1 objection — probably "is brewing hard?"), Email 3 at 48 hours with a 10% code.',
      'Write like a person, not a brand. Short, casual, one CTA button per email.',
      'Send yourself a test, check it on your phone, then turn it on.',
    ],
  },
  {
    title: 'Launch a $10/day retargeting ad on Meta',
    category: 'Paid Ads',
    timeEstimate: '1 hour',
    why: 'People who visited and left are your warmest traffic. Retargeting them is the cheapest conversion you will ever buy.',
    steps: [
      'Install the official Facebook & Instagram app in Shopify so the Pixel tracks visitors.',
      'In Meta Ads Manager, create a Custom Audience: "Website visitors, last 30 days".',
      'Make one ad: a clean product photo or 15-second clip, caption that handles the main objection, e.g. "Brewing your own is easier than making coffee."',
      'Set budget to $10/day, objective: Sales. Let it run 7 days minimum before judging it.',
    ],
  },
  {
    title: 'DM 10 micro-influencers in the homebrew niche',
    category: 'Influencers',
    timeEstimate: '1 hour',
    why: 'Micro-influencers (5k-50k followers) have the highest trust-to-cost ratio. Free product is often all it takes.',
    steps: [
      'Search TikTok/Instagram for: homebrew, kombucha, fermentation, craft beer. Save 10 accounts with 5k-50k followers and real engagement (comments, not just likes).',
      'DM template: "Hey [name], love your [specific video]. I run a small brewing store and I think your audience would be into our kits. Can I send you one free, zero strings attached?"',
      'Track who you messaged in a note or spreadsheet — follow up in 4 days if no reply.',
      'Goal: 10 sent today. Expect 2-3 replies. That is a win.',
    ],
  },
  {
    title: 'Add an email capture popup with a 10% hook',
    category: 'Email',
    timeEstimate: '30 min',
    why: 'Your email list is the only audience you own. 2-4% of visitors will trade their email for a discount.',
    steps: [
      'Install Shopify Forms (free) or use your email app\'s popup builder.',
      'Offer: "10% off your first brew kit." Trigger: after 5 seconds or 30% scroll. Don\'t fire it instantly — that kills trust.',
      'Keep it to one field (email only). Every extra field cuts signups roughly in half.',
      'Set the welcome email to deliver the code immediately, with your best product linked.',
    ],
  },
  {
    title: 'Post value-first in a brewing community',
    category: 'Organic',
    timeEstimate: '30 min',
    why: 'Communities like r/Homebrewing hate ads but love experts. Helping people builds profile clicks, and profile clicks become store visits.',
    steps: [
      'Open r/Homebrewing (or a Facebook homebrew group) and sort by New.',
      'Find 3 questions you can genuinely answer. Write helpful, specific answers — zero links, zero pitching.',
      'Make sure your profile bio mentions your store. People who like the answer will check.',
      'Note recurring questions — every one is content and FAQ material.',
    ],
  },
  {
    title: 'Set up Google Search Console + submit your sitemap',
    category: 'SEO',
    timeEstimate: '30 min',
    why: 'Free, compounding traffic. Google can\'t rank a store it can\'t crawl properly.',
    steps: [
      'Go to search.google.com/search-console and add your domain (verify via your DNS provider).',
      'Submit your sitemap: yourdomain.com/sitemap.xml (Shopify auto-generates it).',
      'Check the Pages report for crawl errors and fix anything flagged.',
      'Look at Performance → Queries to see what you already rank for — those are your blog post topics.',
    ],
  },
  {
    title: 'Write one SEO blog post targeting a long-tail keyword',
    category: 'SEO',
    timeEstimate: '1.5 hours',
    why: 'One good post targeting "how to brew X at home" can pull in buyers every month for years, free.',
    steps: [
      'Pick a long-tail keyword a beginner would search, e.g. "how long does homemade kombucha take" — specific beats broad.',
      'Write 800+ words that actually answer it. Use headers, short paragraphs, photos if you have them.',
      'Link naturally to your product 2-3 times ("the kit I use is...").',
      'Publish via Shopify\'s blog. Title = the exact question people search.',
    ],
  },
  {
    title: 'Film a UGC-style ad on your phone',
    category: 'Paid Ads',
    timeEstimate: '1 hour',
    why: 'Ads that look like a friend\'s recommendation outperform polished brand ads on TikTok/Reels, usually by a lot.',
    steps: [
      'Film yourself (phone, natural light): "I started brewing my own [product] and I\'m never buying store-bought again" — show the process, taste it, react.',
      '30-45 seconds max. Hook in the first 2 seconds or it\'s dead.',
      'Post it organically on the store\'s TikTok first to test. If it gets traction, put $10/day behind it.',
      'Save every clip you film — raw footage becomes future ad variations.',
    ],
  },
  {
    title: 'Run a giveaway to build your list and following',
    category: 'Organic',
    timeEstimate: '45 min',
    why: 'A giveaway converts attention into emails and followers — assets you keep after it ends.',
    steps: [
      'Prize: your best starter kit (~$50 value is plenty).',
      'Entry: follow + tag a friend + email signup via a link (the email is the real prize for you).',
      'Announce on TikTok/IG with a 7-day deadline. Post a reminder at day 5.',
      'After it ends: announce the winner publicly (proof it was real), then email everyone else a consolation 10% code. That email pays for the giveaway.',
    ],
  },
  {
    title: 'Set up free Google Shopping listings',
    category: 'SEO',
    timeEstimate: '45 min',
    why: 'Your products appear in Google Shopping tab results for free. Pure upside for a store with no traffic.',
    steps: [
      'Install the official "Google & YouTube" app from the Shopify App Store.',
      'Connect or create a Google Merchant Center account when prompted.',
      'Sync your products and fix any disapprovals (usually missing shipping or return policy pages).',
      'Free listings turn on automatically once approved — check back in 2-3 days.',
    ],
  },
  {
    title: 'Send a story-driven email to your list',
    category: 'Email',
    timeEstimate: '45 min',
    why: 'Even a tiny list converts when you write like a human. Story emails outperform discount blasts long-term.',
    steps: [
      'Subject line: curiosity, not commerce. "I almost quit this week" beats "10% OFF SALE".',
      'Tell one true short story — why you started the store, a batch that failed, a customer win.',
      'End with one soft CTA: "If you want to try it yourself, this is the kit I\'d start with."',
      'No list yet? This becomes your About page instead — same story, same structure.',
    ],
  },
  {
    title: 'Audit what\'s working and kill what isn\'t',
    category: 'Strategy',
    timeEstimate: '30 min',
    why: 'Doing more of what works beats doing more. You can\'t know what works without looking.',
    steps: [
      'Open Shopify Analytics: where did this week\'s sessions come from? Which channel grew?',
      'List every marketing thing you tried in the last 2 weeks with a gut score 1-5.',
      'Kill the 1s and 2s entirely. Double the time/budget on the 4s and 5s.',
      'Write down ONE focus for next week. One. Singular focus is the advantage small stores have.',
    ],
  },
];

export const STORE_MISSIONS: EcomMission[] = [
  {
    title: 'Rewrite your hero product\'s title and opening copy',
    category: 'Conversion',
    timeEstimate: '45 min',
    why: 'Visitors decide in seconds. Benefit-first copy ("brew pub-quality beer in your kitchen") sells; spec-first copy doesn\'t.',
    steps: [
      'Open your best product\'s page. Read the first 3 lines as if you\'d never heard of brewing.',
      'Rewrite the title to outcome + product: "Home Brewing Kit — Pub-Quality Beer in 2 Weeks".',
      'First paragraph = the dream (what they get), second = how easy it is, third = what\'s in the box.',
      'Add "Perfect for beginners — no equipment needed" if true. That line removes the #1 fear.',
    ],
  },
  {
    title: 'Install a reviews app and seed your first reviews',
    category: 'Social Proof',
    timeEstimate: '45 min',
    why: 'A product with zero reviews reads as a gamble. Even 3-5 honest reviews can double conversion.',
    steps: [
      'Install Judge.me (free plan is fine) from the Shopify App Store.',
      'Enable the automatic post-purchase review request email (14 days after delivery).',
      'Text every past customer, friend, or family member who has genuinely tried the product and ask for an honest review.',
      'Display the star rating widget on product pages AND the homepage.',
    ],
  },
  {
    title: 'Speed audit: make the store load fast',
    category: 'Technical',
    timeEstimate: '45 min',
    why: 'Every extra second of load time costs roughly 7% of conversions. Slow mobile = invisible store.',
    steps: [
      'Run your homepage through pagespeed.web.dev — look at the Mobile score first (that\'s most of your traffic).',
      'Compress every image over 500KB (tinypng.com or Shopify\'s built-in optimization).',
      'Uninstall every Shopify app you aren\'t actively using — dead apps still load scripts.',
      'Re-run the test and screenshot the before/after. That\'s today\'s content, too.',
    ],
  },
  {
    title: 'Add an FAQ section that kills the top 5 objections',
    category: 'Conversion',
    timeEstimate: '45 min',
    why: 'Every unanswered question is an exit. FAQs convert fence-sitters without you being there.',
    steps: [
      'Write down the 5 questions stopping a beginner from buying: Is it hard? How long until I can drink it? What equipment do I need? How does shipping work? What if it doesn\'t work out?',
      'Answer each in 2-3 reassuring, specific sentences.',
      'Add as a collapsible FAQ section on every product page (most themes have an accordion block).',
      'Bonus: add FAQ schema later for Google rich results.',
    ],
  },
  {
    title: 'Create a bundle to raise average order value',
    category: 'Offer',
    timeEstimate: '45 min',
    why: 'Same traffic, bigger orders. A starter kit + refill bundle at 15% off beats discounting either alone.',
    steps: [
      'Pair your best seller with its natural companion (kit + refill pack, or kit + bottles).',
      'Create it as a new product: "The Complete Starter Bundle" priced ~15% under buying separately.',
      'Show the math on the page: "Bought separately: $X. Bundle: $Y. You save $Z."',
      'Link to the bundle from both individual product pages.',
    ],
  },
  {
    title: 'Checkout friction audit — buy from yourself on your phone',
    category: 'Conversion',
    timeEstimate: '30 min',
    why: '70% of carts are abandoned. Every field, surprise, and slow step in checkout costs you real money.',
    steps: [
      'On your phone, go through the entire purchase like a stranger (use a 100% discount code for the test).',
      'Time it. Note every point of hesitation: surprise shipping cost? Required account? Too many fields?',
      'Enable express options: Shop Pay, Apple Pay, PayPal (Settings → Payments).',
      'If shipping cost surprises people at checkout, show it earlier — on the product page or a banner.',
    ],
  },
  {
    title: 'Add trust signals across the store',
    category: 'Social Proof',
    timeEstimate: '30 min',
    why: 'Unknown store = risk. Trust badges, clear policies, and a human face lower the perceived risk to zero.',
    steps: [
      'Add a free-shipping threshold bar at the top: "Free shipping over $X" (set X slightly above your AOV).',
      'Put payment icons and a money-back guarantee line near the Add to Cart button.',
      'Make sure Refund, Shipping, and Contact pages exist and are linked in the footer (Shopify generates templates).',
      'Add your face and name to the About page. People buy from people.',
    ],
  },
  {
    title: 'Upgrade your product photos with a phone shoot',
    category: 'Conversion',
    timeEstimate: '1 hour',
    why: 'Photos do 80% of the selling. Lifestyle shots (product in use) outsell white-background shots.',
    steps: [
      'Shoot in natural window light, phone camera is plenty. No overhead lights.',
      'Get 4 shots per product: hero (clean angle), in-use (hands brewing), result (the finished drink), scale (next to common objects).',
      'First image on the product page = in-use or result shot, not the box.',
      'Edit lightly: brightness up, slight contrast bump, consistent crop across products.',
    ],
  },
  {
    title: 'Rewrite your About page as a founder story',
    category: 'Brand',
    timeEstimate: '45 min',
    why: 'A college student building a brewing brand is a story people root for — and buy from. Hiding it wastes your best asset.',
    steps: [
      'Structure: why you started → the problem with store-bought / existing options → what makes your kits different → where the brand is going.',
      'Write it in first person, 200-300 words. Add a photo of you, ideally mid-brew.',
      'End with: "Try a kit, and you\'re part of the story." Link your best seller.',
      'This same story is also a TikTok script. Two birds.',
    ],
  },
  {
    title: 'Set up a post-purchase upsell',
    category: 'Offer',
    timeEstimate: '30 min',
    why: 'The moment after buying is peak trust. One-click upsells convert at 10-15% with zero traffic cost.',
    steps: [
      'Install a free post-purchase upsell app (e.g. "ReConvert" or Shopify\'s native post-purchase offers).',
      'Offer the logical add-on to your best seller (refill, extra bottles, flavor pack) at 20% off, one-click add.',
      'One offer only — choices kill conversions here.',
      'Check results in a week: even 1 in 10 taking it is meaningful margin.',
    ],
  },
  {
    title: 'Build a "Which kit is right for you?" section',
    category: 'Conversion',
    timeEstimate: '45 min',
    why: 'Confused shoppers leave. A 3-option comparison turns browsing into deciding.',
    steps: [
      'Make a simple comparison: Beginner / Enthusiast / Gift — one recommended kit per column.',
      'Three rows max: what you make, time to first batch, price.',
      'Highlight the middle option as "Most Popular" (anchoring works).',
      'Put it on the homepage under the hero section.',
    ],
  },
  {
    title: 'Mobile homepage audit — the 5-second test',
    category: 'Conversion',
    timeEstimate: '30 min',
    why: '~80% of your traffic is mobile. If the first screen doesn\'t say what you sell and why it\'s great, you\'ve lost them.',
    steps: [
      'Open your store on your phone in incognito. Look at ONLY the first screen for 5 seconds.',
      'Can you tell: what\'s sold, why it\'s good, and what to tap next? If not, fix the hero: one product image, one benefit headline, one button.',
      'Cut anything above the fold that isn\'t doing a job (announcement clutter, vague taglines).',
      'Ask one friend to do the 5-second test and tell you what the store sells. Their answer is your headline grade.',
    ],
  },
];

export function getTodaysMarketingMission(date: Date): EcomMission {
  return MARKETING_MISSIONS[dayOfYear(date) % MARKETING_MISSIONS.length];
}

export function getTodaysStoreMission(date: Date): EcomMission {
  return STORE_MISSIONS[dayOfYear(date) % STORE_MISSIONS.length];
}

// ---------------------------------------------------------------------------
// CONTENT — daily video ideas with hooks, built around documenting the journey.
// ---------------------------------------------------------------------------

export const CONTENT_IDEAS: ContentIdea[] = [
  {
    title: 'The $10K Challenge series update',
    hook: '"I have [X] days to get my store to $10K/month before I\'m back at SDSU. Day [N]."',
    format: 'Talking head + screen/b-roll cutaways, 30-45s',
    steps: [
      'Open with the hook and the countdown — the deadline IS the story.',
      'Show one thing you did today for the store (even a small one) and one number (visitors, followers, sales).',
      'End with tomorrow\'s plan in one sentence. Cliffhangers drive follows.',
      'This series is your anchor — post an update at least twice a week and the audience compounds.',
    ],
  },
  {
    title: 'Satisfying brewing process b-roll',
    hook: 'No words — the visual is the hook. Pouring, bubbling, fizzing, bottling.',
    format: 'Pure b-roll + trending audio, 15-25s',
    steps: [
      'Film 5-6 close-up clips of the most satisfying parts of brewing: the pour, the fizz, condensation, bottle capping.',
      'Use a trending calm/aesthetic sound (check your FYP for what\'s rising).',
      'Caption overlay: "making [product] from scratch, day 3 of fermentation".',
      'These are the cheapest videos to make — film once, get 3-4 posts from the clips.',
    ],
  },
  {
    title: '3 things nobody tells you about starting a business at 20',
    hook: '"Nobody tells you this about starting a business in college."',
    format: 'Talking head with text overlays, 30-45s',
    steps: [
      'Pick 3 real, specific lessons — the more honest, the better it performs.',
      'One sentence each, with a beat between. Don\'t over-explain.',
      'Text overlay each point as you say it.',
      'End: "Following along? I post the whole journey here." (CTA to follow)',
    ],
  },
  {
    title: 'Full day of eating on a lean bulk',
    hook: '"Everything I eat to gain muscle without getting fat — full day."',
    format: 'Quick-cut meal montage with calorie/protein overlays, 30-40s',
    steps: [
      'Film every meal today, 2-3 seconds each, top-down angle.',
      'Overlay calories + protein per meal, running total in the corner.',
      'End with the day\'s total and one line: "Day [N] of bulking for SDSU."',
      'Fitness food content has massive reach — this doubles as your nutrition tracking task.',
    ],
  },
  {
    title: 'Pack an order with me',
    hook: '"Someone in [state] just ordered from my little brewing store — let\'s pack it."',
    format: 'POV packing video, 20-30s',
    steps: [
      'Film POV: order screen → grabbing product → packing → sealing → label on box.',
      'Talk through it casually or use trending audio with captions.',
      'No orders yet? Pack a giveaway box or a sample box for an influencer — same video, total honesty: "no sales yet, but I\'m sending kits to creators."',
      'Small-business packing videos are a proven viral format. People love rooting for the underdog.',
    ],
  },
  {
    title: 'Morning routine of a student founder',
    hook: '"5:45 AM. Gym, then I run my store before class. This is the routine."',
    format: 'Aesthetic POV montage, 25-40s',
    steps: [
      'Film 8-10 short clips through your real morning: alarm, gym, shake, laptop, store dashboard.',
      'Keep clips 1-2 seconds each. Pace is everything.',
      'One text overlay max per clip. Less is more.',
      'End on the most aspirational shot (lifting, or the sunrise walk).',
    ],
  },
  {
    title: 'Brutally honest review of my own product',
    hook: '"I sell this. Here\'s my brutally honest review of it."',
    format: 'Talking head + product demo, 40-60s',
    steps: [
      'Rate your own product and actually name a flaw ("the instructions could be better — I\'m fixing that").',
      'The honesty is the hook — people trust a seller who admits imperfections.',
      'Show the product in use while you talk.',
      'End: "If you want to try it, link in bio. If not, the videos are free."',
    ],
  },
  {
    title: 'Reply-to-comment video',
    hook: 'Use TikTok\'s reply-to-comment sticker — the question is the hook.',
    format: 'Talking head answering one comment, 20-40s',
    steps: [
      'Find a question in your comments (or a common question from brewing communities if comments are quiet).',
      'Use the built-in "reply with video" feature so the comment shows on screen.',
      'Answer in under 30 seconds with one concrete tip.',
      'These massively boost engagement because the algorithm sees conversation.',
    ],
  },
  {
    title: 'How much my store made this week — full transparency',
    hook: '"Here\'s exactly how much my online store made this week. No fluff."',
    format: 'Screen recording + voiceover or talking head, 30-45s',
    steps: [
      'Show the real Shopify dashboard — even if it\'s $0. "$0 this week. Here\'s what I\'m changing."',
      'Transparency outperforms bragging every single time at small scale.',
      'Name the one lever you\'re pulling next week.',
      'This builds the most loyal followers of any format — they feel like co-founders.',
    ],
  },
  {
    title: '15-minute first brew tutorial',
    hook: '"You can start brewing your own [product] in 15 minutes. Watch."',
    format: 'Fast tutorial with steps on screen, 45-60s',
    steps: [
      'Compress the full setup process into 6-8 quick steps with text overlays.',
      'Show real hands doing it — no slides, no stock footage.',
      'Mention the kit makes it foolproof (soft sell, one mention).',
      'Tutorials get saved and shared — saves are rocket fuel for reach.',
    ],
  },
  {
    title: 'Gym transformation check-in',
    hook: '"Week [N] of bulking before SDSU. Progress check."',
    format: 'Physique check + lift PR clips, 20-30s',
    steps: [
      'Same pose, same lighting, same spot as last check-in (consistency makes the comparison real).',
      'Show one lift PR or heavy set from this week.',
      'Overlay current stats: weight, key lift numbers.',
      'Be honest about the week — missed days included. The honesty builds the audience.',
    ],
  },
  {
    title: 'What $50 of marketing got me',
    hook: '"I spent $50 marketing my store. Here\'s exactly what happened."',
    format: 'Results breakdown with screen recordings, 30-45s',
    steps: [
      'Show the spend, the ad/post, and the real numbers: impressions, clicks, sales.',
      'Verdict in one line: worth it or not, and why.',
      'Works even when results are bad — "I wasted $50 so you don\'t have to" is a great hook.',
      'Money-transparency content consistently outperforms in the business niche.',
    ],
  },
  {
    title: 'Things in my apartment that just make sense (founder edition)',
    hook: '"Things in my college apartment that just make sense — small business owner edition."',
    format: 'Trending format adaptation, quick cuts, 20-30s',
    steps: [
      'Adapt the viral "things that just make sense" format to your setup: brewing corner, packing station, whiteboard, protein shelf.',
      'Quick cuts, 1-2 seconds per item, trending audio.',
      'Your product appears naturally as one of the items — soft sell.',
      'Format-jacking trending structures is the fastest way to borrow reach.',
    ],
  },
  {
    title: 'My first 30 days: what failed',
    hook: '"My store\'s first 30 days: [X] visitors, [Y] sales. Here\'s what went wrong."',
    format: 'Talking head retrospective, 40-60s',
    steps: [
      'Lay out the real numbers up front — bad numbers are a better hook than good ones.',
      'Name 2 things that failed and 1 thing that showed promise.',
      'State the plan: "Next 30 days, I\'m only doing [the thing that worked]."',
      'Failure retrospectives get shared because everyone starting out is scared of exactly this.',
    ],
  },
];

export function getTodaysContentIdea(date: Date): ContentIdea {
  return CONTENT_IDEAS[dayOfYear(date) % CONTENT_IDEAS.length];
}

// ---------------------------------------------------------------------------
// WEEKLY FOCUS — one e-commerce theme per week so effort compounds.
// ---------------------------------------------------------------------------

export interface WeeklyFocus {
  theme: string;
  target: string;
  detail: string;
}

export const WEEKLY_FOCUSES: WeeklyFocus[] = [
  {
    theme: 'Conversion Foundation',
    target: 'Make the store convert the traffic it gets',
    detail: 'Before buying traffic, fix the bucket: product copy, photos, reviews, FAQ, checkout. A store converting at 2% makes every future visitor twice as valuable as one converting at 1%.',
  },
  {
    theme: 'Traffic Week',
    target: 'Get 500 sessions this week',
    detail: 'Push every free channel at once: daily TikToks featuring the store, community posts, influencer DMs. Track which source shows up in Shopify Analytics and note the winner.',
  },
  {
    theme: 'List Building',
    target: 'Reach 100 email subscribers',
    detail: 'The list is the only audience the algorithm can\'t take away. Popup live, giveaway running, lead magnet considered ("Free 1-page first-brew checklist" works).',
  },
  {
    theme: 'Proof & Polish',
    target: 'Get 5 real reviews and social proof everywhere',
    detail: 'Reviews on product pages, star ratings on homepage, a UGC clip or testimonial screenshot in rotation. Unknown stores don\'t have a traffic problem, they have a trust problem.',
  },
];

export function getWeeklyFocus(date: Date): WeeklyFocus {
  return WEEKLY_FOCUSES[weekOfYear(date) % WEEKLY_FOCUSES.length];
}
