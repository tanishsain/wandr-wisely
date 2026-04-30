import { ExternalLink, BedDouble, Plane, Ticket } from "lucide-react";
import { formatInr } from "@/lib/currency";
import {
  bookingHotelsLink,
  airbnbLink,
  skyscannerLink,
  getYourGuideLink,
} from "@/lib/affiliate";

interface Props {
  city: string;
  fromUSD?: number;
  variant?: "card" | "inline";
}

export function HotelAffiliateCard({ city, fromUSD, variant = "card" }: Props) {
  if (variant === "inline") {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <AffiliateButton href={bookingHotelsLink(city)} label="Booking.com" icon={BedDouble} />
        <AffiliateButton href={airbnbLink(city)} label="Airbnb" icon={BedDouble} />
        <AffiliateButton href={skyscannerLink("anywhere", city)} label="Flights" icon={Plane} />
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-card border border-border/60 p-6 shadow-soft">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary mb-1">
            <BedDouble className="h-3.5 w-3.5" /> Stay in {city}
          </div>
          <h4 className="font-display text-2xl font-semibold">Find a place</h4>
        </div>
        {typeof fromUSD === "number" && (
          <div className="text-right">
            <div className="text-xs text-muted-foreground">From</div>
            <div className="font-display text-2xl font-semibold text-primary">
              {formatInr(fromUSD)}
              <span className="text-xs font-sans text-muted-foreground font-normal"> /night</span>
            </div>
          </div>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-2">
        <AffiliateButton
          href={bookingHotelsLink(city)}
          label="Hotels on Booking.com"
          icon={BedDouble}
          primary
        />
        <AffiliateButton href={airbnbLink(city)} label="Airbnb stays" icon={BedDouble} />
        <AffiliateButton
          href={skyscannerLink("anywhere", city)}
          label="Flights via Skyscanner"
          icon={Plane}
        />
        <AffiliateButton
          href={getYourGuideLink(city)}
          label="Tours & tickets"
          icon={Ticket}
        />
      </div>

      <p className="text-xs text-muted-foreground mt-3">
        We may earn a small commission at no extra cost to you.
      </p>
    </div>
  );
}

function AffiliateButton({
  href,
  label,
  icon: Icon,
  primary,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored noopener noreferrer"
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
        primary
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "bg-secondary text-foreground/80 hover:bg-secondary/80"
      }`}
    >
      <Icon className="h-4 w-4" />
      <span className="flex-1">{label}</span>
      <ExternalLink className="h-3.5 w-3.5 opacity-60" />
    </a>
  );
}
