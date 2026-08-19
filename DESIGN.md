# Barracks interface direction

## Surface

Desktop-first web prototype spanning a public brand landing page, customer account, staff operations, and management oversight.

## Chosen world

Shop-floor ledger: a dark mineral workspace inspired by the physical rhythm of a barbershop board, appointment book, and chair markers. The old PDF’s information hierarchy stays familiar; the compact dark UI is replaced by more breathing room, stronger type, layered surfaces, and clearer action states.

## Material and palette

- Ink: `#0a0e0f` and `#0e1415` for the room and shell.
- Mineral surfaces: `#12191a`, `#182021`, and `#1e2728` for panels and controls.
- Paper text: `#f0eee8` with `#b3bdbb` and `#778482` for supporting information.
- Signal colors: blue for primary interaction, green for healthy/active, amber for time/loyalty/commission, red for risk, violet for management context.
- Borders are restrained 1px lines; depth comes from separation, soft shadows, and grouped space rather than gradients.

## Typography

Geist is the working UI face. Display headings and the Barracks wordmark use a high-contrast old-style serif stack to give the brand a crafted, editorial voice without hiding operational copy.

## Composition

Public pages use an editorial, chair-led reading path with a schedule-board hero, service ledger, barber roster, and location close. Internal views use a 238px persistent sidebar, sticky context bar, page header, metrics row, panel grids, and readable tables. Management keeps the same shell but changes the workspace signal to violet.

## Components

`app/components/ui/index.tsx` contains the shared logo, avatar, buttons, metrics, page headers, panels, inputs, selects, badges, tabs, progress bars, modal, empty state, toggle, and toast patterns. `app/components/ui/icons.tsx` is the shared stroke icon language. The screen-level pages live under `app/pages/public`, `app/pages/customer`, `app/pages/staff`, and `app/pages/admin`; reusable shell and UI primitives remain under `app/components`. Replaceable synthetic data lives in the per-entity modules under `app/data`.

## Interaction language

All navigation, tabs, search fields, filters, row actions, modal forms, status changes, restocks, payment completion, notification/profile menus, and settings toggles work locally in the browser. No state is persisted and no backend or authentication is implied.

## Open replacement list

- Replace synthetic customer, staff, barber, service, inventory, revenue, and transaction data with verified production data.
- Replace abstract hero/map artwork with approved shop photography or brand assets when available.
- Connect authentication, persistence, payments, and business rules in a later backend pass.

## Direction contract

FORM: shop-floor ledger / assigned operate direction #4 / seed `9b063d5b`.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
