# Blog Style Guide: Indus Solar Solutions

Who reads these posts: Kanpur homeowners and small-business owners comparing
solar quotes, often on a phone, often checking a number they were told by
another installer. They want a straight answer, figures they can check, and
what to do next.

The rules marked **(tested)** are enforced by `src/data/blog.test.ts`. The
build fails if a post breaks them, so fix the writing rather than the test.

## Every post must have

- **A short answer first (tested, 25–70 words).** Answer the question in the
  title before any background. This is also what Google and AI assistants
  quote.
- **Real figures (tested, at least 8).** Use rupees, units, kW, days and
  percentages from a source you can link. Write "₹1.65–1.95 lakh", not
  "prices vary". If you can't find a number, say what it depends on and how
  to find it out. Don't write around it.
- **At least 2 links to our own pages (tested).** Link to the calculator,
  subsidy page, kW system pages or other posts, using `[text](/path)`. The
  test checks that each link resolves to a real route.
- **At least 2 sources, one official (tested).** That means pmsuryaghar.gov.in,
  upneda.org.in, uperc.org or kesco.co.in. Third-party pages are fine for
  market prices, and name them in the label.
- **At least 3 FAQs (tested).** Use questions people actually type, answered
  in one to three sentences. No question may repeat one on `/faq` or in
  another post (tested in `seo.test.ts`).
- **Title ≤ 65 characters and meta description 110–160 characters (tested).**
- **A named author and a real `lastUpdated` date.** Update the date only when
  the content actually changed.

## How to write

- **Short sentences (tested).** No sentence over 40 words, and an average
  under 22. No paragraph over 90 words.
- **Say it plainly.** "You pay the full price first, and the subsidy arrives
  after commissioning" beats "It's important to understand the payment
  timeline."
- **Show the working.** For any savings claim, show the bill before and after
  on the real KESCO slabs. Readers trust a table they can check against their
  own bill.
- **Name the trade-offs.** Every post should say who the product or advice is
  a bad fit for. That is what separates a guide from an ad.
- **Local detail only we would know.** KESCO (not "your DISCOM"), monsoon
  and fog months, RCC roofs vs tin sheds, society NOCs, Kidwai Nagar and
  Kalyanpur roofs. Generic India-wide content ranks nowhere.
- **Em dashes: at most 2 per post (tested).** Use a full stop or a comma.
- **Never invent anything.** No made-up customers, quotes, testimonials,
  project figures or "we've installed X systems". Case studies use real jobs
  with the customer's permission.

## Banned words (tested)

honest/honestly, delve, navigate, journey, unlock, seamless, robust, leverage,
game-changer, comprehensive, "in today's", "it's worth noting", furthermore,
moreover, "whether you're", "look no further", embark, elevate, landscape,
tapestry, "in conclusion", ever-evolving, "harness the power", "peace of
mind", cutting-edge, state-of-the-art, hassle-free, stress-free, "complete
guide", "ultimate guide", "a testament to", "rest assured", one-stop,
world-class, best-in-class.

If you keep reaching for one of these, the sentence probably has nothing to
say. Delete it.

## Cadence

One post a week, published only when it passes the tests and the owner has
checked the figures. One solid post beats three thin ones. Re-check subsidy
and tariff figures every quarter and whenever UPERC issues a new tariff
order, then bump `lastUpdated`.

## 12-week topic plan

Each post links to the money page in brackets. Items marked **needs owner
input** can't be written well without real data from our own jobs.

| Week | Post (target search) | Links to |
|---|---|---|
| 1 | KESCO net metering in Kanpur: forms, meter cost, timeline | /solar-subsidy-kanpur |
| 2 | 3kW vs 5kW for a Kanpur home: which size for your bill | /3kw-solar-system-kanpur, /5kw-solar-system-kanpur |
| 3 | Case study: a 3kW install in Kidwai Nagar, bills before and after. **Needs owner input:** a real customer's 12 months of KESCO bills and permission | /solar-panel-installation-kidwai-nagar |
| 4 | DCR vs non-DCR panels: what it means for your subsidy | /blog/solar-panel-cost-kanpur-guide |
| 5 | On-grid, hybrid or off-grid: what Kanpur power cuts mean for your choice | /products/inverter |
| 6 | How much roof space do you need for 1, 3 and 5kW? | /rooftop-solar-kanpur |
| 7 | Case study: a shop or small factory rooftop. **Needs owner input:** load profile and bills | /commercial-solar-kanpur |
| 8 | Solar in monsoon and winter fog: monthly output for a Kanpur system. **Needs owner input:** generation data from an installed inverter app | /solar-calculator-kanpur |
| 9 | Solar for housing societies and RWAs in Kanpur: common-area bills | /residential-solar-kanpur |
| 10 | Solar loans under PM Surya Ghar: bank rates and EMIs compared | /pm-surya-ghar-kanpur |
| 11 | Cleaning and maintenance: dust, bird droppings and what AMC should cover | /services |
| 12 | 10 questions to ask any solar installer before you sign | /solar-panel-installation-kanpur |

## What the owner can send that will make these posts rank

1. Real KESCO bills (before and after) from 2–3 customers willing to be named
   or quoted by first name and area.
2. Screenshots of monthly generation from 1–2 installed inverter apps.
3. Photos from real installs: roof before, structure, finished array,
   net meter.
4. Our actual price range per kW, so posts can quote our own figures and not
   only market lists.
