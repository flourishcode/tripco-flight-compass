import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  Luggage,
  Leaf,
  Plane,
  Search,
  ShieldCheck,
} from "lucide-react";

import tripComLogo from "@/assets/trip-com-logo.png.asset.json";
import flightHero from "@/assets/flight-lookup-hero.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isValidDemoTrackingNumber } from "@/lib/flight-tracking";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flight tracker | Trip.com" },
      {
        name: "description",
        content: "Look up your Trip.com flight itinerary with a booking tracking number.",
      },
      { property: "og:title", content: "Flight tracker | Trip.com" },
      {
        property: "og:description",
        content: "Find your flight itinerary and review the details for your trip.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FlightTrackerPage,
});

function FlightTrackerPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState("");

  function submitTrackingNumber(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!isValidDemoTrackingNumber(trackingNumber)) {
      setHasSearched(false);
      setError("We couldn't find that tracking number. Please check it and try again.");
      return;
    }

    setHasSearched(true);
  }

  function returnToSearch() {
    setHasSearched(false);
    setError("");
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="site-header">
        <a className="brand-link" href="https://www.trip.com/" aria-label="Trip.com home">
          <img className="brand-logo" src={tripComLogo.url} alt="Trip.com" width={150} height={37} />
        </a>
        <span className="header-promise">
          <ShieldCheck aria-hidden="true" size={16} />
          Your trip, all in one place
        </span>
      </header>

      {!hasSearched ? (
        <>
          <section className="flight-hero" aria-labelledby="hero-title">
            <img
              className="flight-hero__photo"
              src={flightHero}
              alt="Airplane waiting at a sunny airport gate"
              width={1536}
              height={1024}
              fetchPriority="high"
            />
            <div className="flight-hero__content">
              <span className="eyebrow"><Plane aria-hidden="true" size={15} /> TRAVEL, MADE EASY</span>
              <h1 id="hero-title">A little closer to takeoff.</h1>
              <p>Your flight details, right when you need them.</p>
            </div>
          </section>

          <section className="lookup-section" aria-labelledby="lookup-title">
            <div className="lookup-intro">
              <div>
                <p className="section-kicker">FLIGHT DETAILS</p>
                <h2 id="lookup-title">Find your trip</h2>
                <p className="lookup-description">Enter your tracking number to view your itinerary.</p>
              </div>
              <span className="secure-note"><ShieldCheck aria-hidden="true" size={16} /> Secure lookup</span>
            </div>

            <form className="lookup-form" onSubmit={submitTrackingNumber} noValidate>
              <label className="tracking-field" htmlFor="tracking-number">
                <span>Tracking number</span>
                <span className="tracking-input-wrap">
                  <Search aria-hidden="true" className="tracking-search-icon" size={19} />
                  <Input
                    id="tracking-number"
                    name="tracking-number"
                    autoComplete="off"
                    spellCheck={false}
                    value={trackingNumber}
                    onChange={(event) => {
                      setTrackingNumber(event.target.value);
                      if (error) setError("");
                    }}
                    placeholder="Enter your tracking number"
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? "tracking-error" : undefined}
                    className="tracking-input"
                  />
                </span>
              </label>
              <Button className="lookup-button" type="submit" size="lg">
                Find my flight <ArrowRight aria-hidden="true" size={17} />
              </Button>
            </form>
            {error ? (
              <p className="tracking-error" id="tracking-error" role="alert">
                {error}
              </p>
            ) : null}
          </section>
          <footer className="page-footer">
            <p>Questions about your booking? Get in touch with your travel provider.</p>
            <span>Plan less. Travel more.</span>
          </footer>
        </>
      ) : (
        <FlightDetails onBack={returnToSearch} />
      )}
    </main>
  );
}

function FlightDetails({ onBack }: { onBack: () => void }) {
  return (
    <section className="details-page" aria-labelledby="details-title">
      <button className="back-link" type="button" onClick={onBack}>
        <ArrowLeft aria-hidden="true" size={16} /> Back to flight lookup
      </button>

      <div className="details-heading">
        <div>
          <p className="section-kicker">YOUR TRIP</p>
          <h1 id="details-title">Istanbul to Orlando</h1>
          <p className="traveler-line">Itinerary for <strong>Gerald Pressley</strong></p>
        </div>
        <span className="booking-date"><span>MONDAY</span> 23 November</span>
      </div>

      <section className="trip-summary" aria-label="Trip overview">
        <div className="trip-summary__route">
          <span>FROM</span><strong>Istanbul, Türkiye</strong><small>Sabiha Gökçen (SAW)</small>
        </div>
        <ArrowRight aria-hidden="true" size={20} />
        <div className="trip-summary__route">
          <span>TO</span><strong>Orlando, Florida</strong><small>Orlando International (MCO)</small>
        </div>
        <div className="emissions-summary">
          <Leaf aria-hidden="true" size={18} />
          <span><strong>586 kg CO₂e</strong><small>Average emissions</small></span>
        </div>
      </section>

      <FlightLeg
        leg="1"
        airline="Pegasus"
        flight="PC 1251"
        aircraft="Airbus A321"
        departureTime="09:00"
        departureAirport="Sabiha Gökçen International Airport"
        departureCode="SAW"
        arrivalTime="10:45"
        arrivalAirport="Amsterdam Airport Schiphol"
        arrivalCode="AMS"
        duration="3 hrs 45 min"
        emissions="171 kg CO₂e"
        amenities={["Below-average legroom (71 cm)", "Stream media to your device"]}
      />

      <div className="layover-note">
        <Clock3 aria-hidden="true" size={17} />
        <span><strong>2 hrs 15 min layover</strong><small>Amsterdam (AMS)</small></span>
      </div>

      <FlightLeg
        leg="2"
        airline="Delta"
        flight="DL 91"
        aircraft="Airbus A330-900neo"
        departureTime="13:00"
        departureAirport="Amsterdam Airport Schiphol"
        departureCode="AMS"
        arrivalTime="17:05"
        arrivalAirport="Orlando International Airport"
        arrivalCode="MCO"
        duration="10 hrs 5 min"
        emissions="416 kg CO₂e"
        amenities={["Average legroom (79 cm)", "Free Wi-Fi", "In-seat power and USB outlets", "On-demand video"]}
      />

      <div className="below-flight-note">
        <span className="notice-icon"><Clock3 aria-hidden="true" size={19} /></span>
        <p><strong>Flight times shown in local time</strong><span>Confirm current departure and gate information with the airlines before travel.</span></p>
      </div>

      <div className="details-footer"><span>Departing flight · Monday 23 November</span><img src={tripComLogo.url} alt="Trip.com" width={110} height={27} /></div>
    </section>
  );
}

function FlightLeg({
  leg,
  airline,
  flight,
  aircraft,
  departureTime,
  departureAirport,
  departureCode,
  arrivalTime,
  arrivalAirport,
  arrivalCode,
  duration,
  emissions,
  amenities,
}: {
  leg: string;
  airline: string;
  flight: string;
  aircraft: string;
  departureTime: string;
  departureAirport: string;
  departureCode: string;
  arrivalTime: string;
  arrivalAirport: string;
  arrivalCode: string;
  duration: string;
  emissions: string;
  amenities: string[];
}) {
  return (
    <article className="flight-card itinerary-leg" aria-label={`Flight ${leg}: ${departureCode} to ${arrivalCode}`}>
        <div className="flight-card__top">
          <div className="route-heading">
            <p className="section-kicker">FLIGHT {leg} · {airline.toUpperCase()}</p>
            <h2>{departureCode} <ArrowRight aria-hidden="true" size={17} /> {arrivalCode}</h2>
          </div>
          <span className="flight-number">{flight}</span>
        </div>

        <div className="flight-route">
          <div className="route-endpoint">
            <span className="airport-time">{departureTime}</span>
            <span className="airport-code">{departureCode}</span>
            <strong>{departureAirport}</strong>
          </div>
          <div className="route-duration" aria-label={`Flight duration: ${duration}`}>
            <span>{duration}</span>
            <div className="route-line"><span><Plane aria-hidden="true" size={16} /></span></div>
            <span>Travel time</span>
          </div>
          <div className="route-endpoint route-endpoint--arrival">
            <span className="airport-time">{arrivalTime}</span>
            <span className="airport-code">{arrivalCode}</span>
            <strong>{arrivalAirport}</strong>
          </div>
        </div>

        <div className="flight-card__footer">
          <div className="airline-block">
            <span className="airline-mark" aria-hidden="true"><Plane size={18} /></span>
            <div><strong>{airline}</strong><span>{flight}</span></div>
          </div>
          <span className="flight-detail"><Plane aria-hidden="true" size={17} /><span><strong>{aircraft}</strong><small>Aircraft</small></span></span>
          <span className="flight-detail"><Luggage aria-hidden="true" size={17} /><span><strong>Economy</strong><small>Cabin</small></span></span>
          <span className="flight-detail"><Leaf aria-hidden="true" size={17} /><span><strong>{emissions}</strong><small>Emissions estimate</small></span></span>
        </div>

        <div className="flight-amenities">
          {amenities.map((amenity) => <span key={amenity}><Check aria-hidden="true" size={14} />{amenity}</span>)}
          <span><Clock3 aria-hidden="true" size={14} />Contrail warming potential: Medium</span>
        </div>
    </article>
  );
}
