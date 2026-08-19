"use client";

import { useState } from "react";
import { barbers } from "@/app/data/barbers";
import { landingServices } from "@/app/data/landing";
import type { ViewId } from "@/app/types/domain";
import { Avatar, Button, Logo } from "@/app/components/ui";
import { Icon } from "@/app/components/ui/icons";

export function LandingPage({ go }: { go: (view: ViewId) => void }) {
  const [serviceId, setServiceId] = useState("haircut");

  return (
    <div className="public-site">
      <nav className="public-nav">
        <Logo onClick={() => go("landing")} />
        <div className="public-nav__links">
          <a href="#services">Services</a>
          <a href="#barbers">The barbers</a>
          <a href="#visit">Find us</a>
        </div>
        <div className="public-nav__actions">
          <button
            className="text-button"
            type="button"
            onClick={() => go("login")}
          >
            Staff sign in <Icon name="arrowRight" size={15} />
          </button>
          <Button size="sm" icon="calendar" onClick={() => go("customer")}>
            Book a chair
          </Button>
        </div>
      </nav>

      <main>
        <section className="landing-hero">
          <div className="landing-hero__copy">
            <span className="hero-kicker">
              <span className="hero-kicker__line" />A sharper kind of ritual
            </span>
            <h1>
              Come in
              <br />
              <em>unrushed.</em>
              <br />
              Leave sharper.
            </h1>
            <p>
              Barracks is a modern barbershop built around good work, good
              conversation, and the quiet confidence of a clean finish.
            </p>
            <div className="landing-hero__actions">
              <Button size="lg" icon="calendar" onClick={() => go("customer")}>
                Book a chair
              </Button>
              <button
                className="text-button text-button--muted"
                type="button"
                onClick={() =>
                  document
                    .getElementById("services")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore the ritual <Icon name="arrowDown" size={15} />
              </button>
            </div>
            <div className="landing-hero__proof">
              <div className="proof-avatars">
                <Avatar initials="KM" tone="blue" size="sm" />
                <Avatar initials="MS" tone="green" size="sm" />
                <Avatar initials="RA" tone="amber" size="sm" />
                <span>+</span>
              </div>
              <span>
                <strong>3 barbers on the floor</strong>
                <small>Today until 8:00 PM</small>
              </span>
            </div>
          </div>

          <div
            className="landing-hero__visual"
            aria-label="Barracks shop floor preview"
          >
            <div className="hero-board__top">
              <span>BAR-01 / SHOP FLOOR</span>
              <span>
                OPEN <i />
              </span>
            </div>
            <div className="hero-board__title">
              <span>Today at Barracks</span>
              <strong>
                14<span>·</span>04<span>·</span>26
              </strong>
            </div>
            <div className="hero-board__scene">
              <div className="scene-ring scene-ring--outer" />
              <div className="scene-ring scene-ring--inner" />
              <div className="scene-chair">
                <span className="scene-chair__number">04</span>
                <span className="scene-chair__label">THE CHAIR</span>
              </div>
              <div className="scene-label scene-label--top">
                <span>01</span>
                <small>FIRST POUR</small>
              </div>
              <div className="scene-label scene-label--right">
                <span>02</span>
                <small>HOT TOWEL</small>
              </div>
              <div className="scene-label scene-label--bottom">
                <span>03</span>
                <small>FINAL DETAIL</small>
              </div>
              <div className="scene-line scene-line--a" />
              <div className="scene-line scene-line--b" />
              <div className="scene-line scene-line--c" />
            </div>
            <div className="hero-board__schedule">
              <div>
                <span className="schedule-status schedule-status--green" />
                <strong>Now serving</strong>
                <span>Michael Chen</span>
              </div>
              <span className="hero-board__time">2:30 PM</span>
            </div>
          </div>
        </section>

        <section className="landing-intro">
          <span className="section-stamp">B / 01</span>
          <div>
            <h2>
              Not a quick fix.
              <br />
              <span>A proper reset.</span>
            </h2>
          </div>
          <div className="landing-intro__copy">
            <p>
              Every detail has a place here. The first hello. The tool in the
              hand. The hot towel. The look in the mirror when the chair turns
              back around.
            </p>
            <p className="muted-copy">
              We keep the pace deliberate, the standards high, and the room
              worth returning to.
            </p>
          </div>
        </section>

        <section className="landing-services" id="services">
          <div className="landing-section-head">
            <div>
              <span className="section-stamp">THE MENU</span>
              <h2>Choose your finish.</h2>
            </div>
            <span className="section-note">
              All services include consultation
              <br />
              and a final detail.
            </span>
          </div>
          <div className="service-list">
            {landingServices.map((service) => (
              <button
                className={
                  "service-list__row " +
                  (serviceId === service.id ? "is-active" : "")
                }
                key={service.id}
                type="button"
                onClick={() => setServiceId(service.id)}
              >
                <span className="service-list__number">{service.number}</span>
                <span className="service-list__name">
                  <strong>{service.name}</strong>
                  <small>{service.description}</small>
                </span>
                <span className="service-list__duration">
                  {service.duration}
                </span>
                <span className="service-list__price">{service.price}</span>
                <Icon name="arrowRight" size={18} />
              </button>
            ))}
          </div>
          <div className="service-note">
            <Icon name="info" size={16} />
            <span>
              {
                landingServices.find((service) => service.id === serviceId)
                  ?.name
              }{" "}
              is available to book now. Select another service to compare the
              menu.
            </span>
          </div>
        </section>

        <section className="landing-barbers" id="barbers">
          <div className="landing-section-head">
            <div>
              <span className="section-stamp">THE PEOPLE</span>
              <h2>Good hands matter.</h2>
            </div>
            <button
              className="text-button"
              type="button"
              onClick={() => go("customer")}
            >
              Meet the team <Icon name="arrowRight" size={15} />
            </button>
          </div>
          <div className="barber-grid">
            {barbers.slice(0, 3).map((barber, index) => (
              <article className="landing-barber" key={barber.id}>
                <div
                  className={
                    "landing-barber__portrait landing-barber__portrait--" +
                    barber.tone
                  }
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Avatar
                    initials={barber.initials}
                    tone={barber.tone}
                    size="xl"
                  />
                </div>
                <div className="landing-barber__meta">
                  <div>
                    <h3>{barber.name}</h3>
                    <p>{barber.specialty}</p>
                  </div>
                  <span className="barber-rating">
                    <Icon name="star" size={13} /> {barber.rating}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-visit" id="visit">
          <div className="landing-visit__copy">
            <span className="section-stamp">FIND US</span>
            <h2>The chair is ready.</h2>
            <p>
              Walk in when the mood strikes. Book ahead when the day is full.
              Either way, we will keep a place for the ritual.
            </p>
            <div className="visit-details">
              <span>
                <Icon name="mapPin" size={16} />
                <strong>14 Jupiter Street, Makati</strong>
              </span>
              <span>
                <Icon name="clock" size={16} />
                <strong>Mon–Sat · 10:00 AM–8:00 PM</strong>
              </span>
              <span>
                <Icon name="phone" size={16} />
                <strong>+63 917 555 0144</strong>
              </span>
            </div>
            <Button size="lg" icon="arrowRight" onClick={() => go("customer")}>
              Reserve your chair
            </Button>
          </div>
          <div className="landing-visit__map">
            <div className="map-grid" />
            <span className="map-pin">
              <Icon name="mapPin" size={18} />
            </span>
            <span className="map-label map-label--one">Jupiter St.</span>
            <span className="map-label map-label--two">Barracks</span>
            <span className="map-label map-label--three">
              Makati / 14°33&apos;N
            </span>
          </div>
        </section>
      </main>

      <footer className="public-footer">
        <Logo />
        <span>© 2026 Barracks Barbers &amp; Shaves</span>
        <div>
          <button type="button" onClick={() => go("login")}>
            Team access
          </button>
          <button type="button" onClick={() => go("customer")}>
            Customer account
          </button>
        </div>
      </footer>
    </div>
  );
}
