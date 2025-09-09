import { subscriptionPlans } from "@/lib/constants/subscriptionPlans";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

export const Pricing = () => {
  return (
    <section className="py-24 bg-secondary/70">
      <div className="container">
        {/* Heading */}
        <h2 className="text-4xl title-heading text-background text-center">
          Pricing
        </h2>
        <p className="normal-paragraph text-background text-center text-lg leading-tight mt-4">
          From personal use to premium options for teams and enterprises.
          <br />
          Every plan includes access to our full suite of features.
        </p>

        {/* Plans */}
        <div className="flex flex-col gap-6 items-center mt-10 lg:flex-row lg:justify-center lg:items-end">
          {subscriptionPlans.map(
            ({ title, monthlyPrice, cta, isPopular, features }, idx) => (
              <div
                key={idx}
                className={`p-10 rounded-4xl drop-shadow-3xl max-w-xs w-full bg-gradient-to-b from-muted to-background transition-transform ${
                  isPopular ? "border-4 border-primary scale-105" : "border-2"
                }`}
              >
                {/* Title + Badge */}
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-black">
                    {title}
                  </h3>
                  {isPopular && (
                    <span className="text-xs text-background bg-primary px-2 py-1 rounded-full font-medium">
                      Popular
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1 mt-8">
                  <span className="text-4xl font-bold tracking-tighter leading-none">
                    ${monthlyPrice}
                  </span>
                  <span className="tracking-tight font-bold text-black/50">
                    /month
                  </span>
                </div>

                {/* CTA */}
                <Button
                  variant={isPopular ? "secondary" : "default"}
                  className="w-full mt-8"
                >
                  {cta}
                </Button>

                {/* Features */}
                <ul className="flex flex-col gap-5 mt-6 text-left">
                  {features.map((feature, i) => (
                    <li key={i} className="text-sm flex items-center gap-3">
                      <CheckIcon className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};
