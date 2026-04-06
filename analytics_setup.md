# RockBox Analytics & Tracking Plan

## Google Analytics 4 Setup

### Measurement ID
Replace `GA_MEASUREMENT_ID` in `index.html` with your actual GA4 ID from:
Google Analytics > Admin > Data Streams > Web > Measurement ID

### Custom Events to Create

| Event Name | Trigger | Parameters | Purpose |
|------------|---------|-----------|---------|
| `buy_now_click` | Click on "Reserve Yours Now - CHF 199" button | `page_path` | Measure purchase intent (FAKE DOOR METRIC) |
| `waitlist_signup` | Submit waitlist form | `source` | Primary conversion metric |
| `preorder_form_submit` | Complete pre-order modal form | `source`, `queue_number` | Deep purchase intent signal |
| `preorder_form_start` | First input click in pre-order modal | - | Funnel drop-off point |
| `faq_expand` | Click FAQ accordion item | `question` | Content engagement |
| `nav_waitlist_click` | Click "Join Waitlist" in nav | - | Alternative conversion path |

### GA4 Funnel Setup
1. Go to Explore > Funnel Exploration
2. Create new funnel:
   - Step 1: `page_view` (entering the page)
   - Step 2: `buy_now_click` OR `waitlist_signup` (engagement)
   - Step 3: `preorder_form_submit` (conversion)
3. Add breakdown by: Traffic source, Device category

### Conversion Goals
1. **Primary Goal:** `preorder_form_submit` (marks real purchase intent)
2. **Secondary Goal:** `waitlist_signup` (interest signal)
3. **Tertiary Goal:** `buy_now_click` (consideration signal)

## Hotjar Setup

### Sign up at: hotjar.com
### Install tracking code in `<head>` of index.html

### Heatmap Configurations
- **All Pages** heatmap (default)
- **Hero Section** focus area
- **FAQ Section** focus area

### Recording Filters
- Filter for users from Switzerland
- Filter for sessions > 30 seconds
- Filter for users who clicked "Buy Now"

## Facebook Pixel Setup

### Create Pixel at: business.facebook.com
### Add to `<head>` of index.html

### Standard Events
| Event | Trigger | Purpose |
|-------|---------|---------|
| `ViewContent` | Page load | Track ad viewers |
| `Lead` | Waitlist form submit | Email collection |
| `InitiateCheckout` | Buy Now button click | Purchase intent |

## Email Platform (ConvertKit/MailerLite)

### Tags
- `waitlist` - General email signup from hero CTA
- `pre-order-intent` - Buy Now clickers who filled modal
- `source:instagram`, `source:google`, etc. - Traffic source tracking

### Segment: Pre-Order Intent (HIGH PRIORITY)
These are your hottest leads. They:
1. Were willing to commit money (CHF 199)
2. Filled out a form
3. Self-identified as interested

**Action:** Personal outreach to this segment for interviews.

## Daily Metrics Dashboard Template

```
DATE: ________

TRAFFIC:
- Page Views: _____
- Unique Visitors: _____
- Top Source: _____
- Bounce Rate: _____
- Avg. Time on Page: _____

CONVERSIONS:
- Waitlist Signups: _____ (Cumulative: _____)
- Buy Now Clicks: _____ (Cumulative: _____)
- Pre-Order Forms: _____ (Cumulative: _____)
- Buy CTR (clicks/views): _____%
- Conversion Rate (forms/views): _____%

COSTS (if running ads):
- Ad Spend Today: CHF _____
- Cost per Waitlist Signup: CHF _____
- Cost per Pre-Order Form: CHF _____

SOCIAL:
- Instagram Followers: _____ (+_____)
- TikTok Views Today: _____
- Engagement Rate: _____%
```

## Google Tag Manager Setup (Alternative)

If using GTM instead of direct code:
1. Create container at tagmanager.google.com
2. Add GTM code to <head> and <body>
3. Create triggers for:
   - Click ID: `#buyNowBtn` → Event: `buy_now_click`
   - Form submit: `#waitlistForm` → Event: `waitlist_signup`
   - Form submit: `#preorderForm` → Event: `preorder_form_submit`

## UTM Parameters for Ad Tracking

| Campaign | UTM Source | UTM Medium | UTM Campaign |
|----------|-----------|------------|-------------|
| Instagram Ad A (Design) | instagram | paid_social | rockbox_design |
| Instagram Ad B (Safety) | instagram | paid_social | rockbox_safety |
| Instagram Ad C (Sustainability) | instagram | paid_social | rockbox_eco |
| Google Search | google | cpc | rockbox_search |
| Facebook Groups | facebook | social | rockbox_organic |
| TikTok organic | tiktok | social | rockbox_content |

Example URL: `https://rockboxbaby.ch/?utm_source=instagram&utm_medium=paid_social&utm_campaign=rockbox_design`
