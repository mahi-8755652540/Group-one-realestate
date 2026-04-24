import { createFileRoute, Outlet, useMatches } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { properties } from "@/lib/properties";
import { PropertyCard } from "@/components/site/PropertyCard";
import { SlidersHorizontal } from "lucide-react";

const searchSchema = z.object({
  city: z.string().optional(),
  type: z.string().optional(),
  budget: z.string().optional(),
  purpose: z.string().optional(),
  furnished: z.string().optional(),
});

const bedroomTypes = ["Flat", "Builder Floor", "Villa"] as const;

export const Route = createFileRoute("/properties")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Properties for Sale & Rent in Delhi NCR — Group One Realty" },
      {
        name: "description",
        content:
          "Browse verified flats, builder floors, villas, plots and commercial properties across Gurgaon, Noida, Delhi, Greater Noida, Ghaziabad and Faridabad.",
      },
      { property: "og:title", content: "Properties in Delhi NCR — Group One Realty" },
      {
        property: "og:description",
        content: "RERA approved listings with transparent pricing and zero brokerage deals.",
      },
    ],
  }),
  component: PropertiesRouteComponent,
});

function PropertiesRouteComponent() {
  const matches = useMatches();
  const isPropertyDetail = matches.some((match) => match.routeId === "/properties/$id");

  return isPropertyDetail ? <Outlet /> : <ListingsPage />;
}

function ListingsPage() {
  const initial = Route.useSearch();
  const [city, setCity] = useState(initial.city ?? "");
  const [type, setType] = useState(initial.type ?? "");
  const [budget, setBudget] = useState(initial.budget ?? "");
  const [purpose, setPurpose] = useState(initial.purpose ?? "");
  const [furnished, setFurnished] = useState(initial.furnished ?? "");
  const [bedrooms, setBedrooms] = useState("");
  const [sort, setSort] = useState("featured");
  const showBedroomFilter = !type || bedroomTypes.includes(type as (typeof bedroomTypes)[number]);

  const budgetOptions =
    purpose === "Rent"
      ? [
          { value: "rent-under-20k", label: "Under ₹20K/mo" },
          { value: "rent-20k-40k", label: "₹20K – ₹40K" },
          { value: "rent-40k-75k", label: "₹40K – ₹75K" },
          { value: "rent-75k-plus", label: "₹75K+/mo" },
        ]
      : [
          { value: "sale-under-50l", label: "Under ₹50L" },
          { value: "sale-50l-1cr", label: "₹50L – ₹1Cr" },
          { value: "sale-1cr-3cr", label: "₹1Cr – ₹3Cr" },
          { value: "sale-3cr-plus", label: "₹3Cr+" },
        ];

  const filtered = useMemo(() => {
    let list = properties.filter((p) => {
      if (city && p.city !== city) return false;
      if (type && p.type !== type) return false;
      if (purpose && p.purpose !== purpose) return false;
      if (furnished && p.furnished !== furnished) return false;
      if (showBedroomFilter && bedrooms && String(p.bedrooms ?? 0) !== bedrooms) return false;
      if (budget) {
        const [min, max] = getBudgetRange(budget);
        if (min != null && p.price < min) return false;
        if (max != null && p.price > max) return false;
      }
      return true;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "featured")
      list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
    return list;
  }, [city, type, purpose, furnished, bedrooms, budget, sort, showBedroomFilter]);

  return (
    <div className="pt-28 pb-20">
      <section className="bg-gradient-navy text-navy-foreground py-14">
        <div className="mx-auto max-w-7xl container-px">
          <span className="text-gold font-semibold text-sm uppercase tracking-widest">
            Listings
          </span>
          <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold">
            Properties in Delhi NCR
          </h1>
          <p className="mt-3 text-white/75 max-w-2xl">
            Verified, RERA-approved properties — handpicked for buyers, investors, and renters
            across NCR.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl container-px mt-8 grid lg:grid-cols-[280px_1fr] gap-8">
        <aside className="bg-card rounded-2xl p-6 shadow-card border border-border h-fit lg:sticky lg:top-24">
          <div className="flex items-center gap-2 mb-5">
            <SlidersHorizontal className="h-4 w-4 text-gold" />
            <h3 className="font-display text-lg font-semibold">Filters</h3>
          </div>
          <div className="mb-5">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              I want to
            </label>
            <div className="mt-1.5 grid grid-cols-3 gap-1.5">
              {[
                { v: "", l: "All" },
                { v: "Buy", l: "Buy" },
                { v: "Rent", l: "Rent" },
                { v: "Resale", l: "Resale" },
              ]
                .slice(1)
                .map((o) => (
                  <button
                    key={o.v}
                    type="button"
                    onClick={() => {
                      setPurpose(purpose === o.v ? "" : o.v);
                      setBudget("");
                    }}
                    className={`rounded-lg px-2 py-2 text-xs font-semibold border transition-colors ${
                      purpose === o.v
                        ? "bg-navy text-navy-foreground border-navy"
                        : "bg-background text-foreground border-input hover:border-gold"
                    }`}
                  >
                    {o.l}
                  </button>
                ))}
            </div>
          </div>
          <FilterSelect
            label="City"
            value={city}
            setValue={setCity}
            options={["", "Gurgaon", "Noida", "Greater Noida", "Delhi", "Ghaziabad", "Faridabad"]}
          />
          <FilterSelect
            label="Property Type"
            value={type}
            setValue={(value) => {
              setType(value);
              if (value && !bedroomTypes.includes(value as (typeof bedroomTypes)[number])) {
                setBedrooms("");
              }
            }}
            options={["", "Flat", "Builder Floor", "Villa", "Plot", "Shop", "Office"]}
          />
          {showBedroomFilter && (
            <FilterSelect
              label="Bedrooms"
              value={bedrooms}
              setValue={setBedrooms}
              options={["", "1", "2", "3", "4"]}
            />
          )}
          <FilterSelect
            label="Furnishing"
            value={furnished}
            setValue={setFurnished}
            options={["", "Unfurnished", "Semi-Furnished", "Furnished"]}
            labels={{
              Unfurnished: "Raw / Unfurnished",
              "Semi-Furnished": "Semi-Furnished",
              Furnished: "Fully Furnished",
            }}
          />
          <div className="mb-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Budget
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="mt-1.5 w-full bg-background border border-input rounded-lg px-3 py-2.5 text-sm"
            >
              <option value="">Any Budget</option>
              {budgetOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => {
              setCity("");
              setType("");
              setBedrooms("");
              setBudget("");
              setPurpose("");
              setFurnished("");
            }}
            className="w-full text-sm font-medium text-navy hover:text-gold mt-2"
          >
            Reset filters
          </button>
        </aside>

        <div>
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div className="text-sm text-muted-foreground">
              <strong className="text-foreground">{filtered.length}</strong> properties found
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-background border border-input rounded-lg px-3 py-2 text-sm"
            >
              <option value="featured">Sort: Featured first</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
          {filtered.length === 0 ? (
            <div className="bg-secondary rounded-2xl p-12 text-center text-muted-foreground">
              No properties match your filters. Try adjusting them.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <PropertyCard key={p.id} p={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function getBudgetRange(value: string): [number | null, number | null] {
  const ranges: Record<string, [number | null, number | null]> = {
    "rent-under-20k": [null, 20000],
    "rent-20k-40k": [20000, 40000],
    "rent-40k-75k": [40000, 75000],
    "rent-75k-plus": [75000, null],
    "sale-under-50l": [null, 5000000],
    "sale-50l-1cr": [5000000, 10000000],
    "sale-1cr-3cr": [10000000, 30000000],
    "sale-3cr-plus": [30000000, null],
    "0.2": [null, 20000],
    "0.4": [20000, 40000],
    "0.75": [40000, 75000],
    "50": [null, 5000000],
    "100": [5000000, 10000000],
    "300": [10000000, 30000000],
  };

  if (value === "9999") return [null, null];
  return ranges[value] ?? [null, null];
}

function FilterSelect({
  label,
  value,
  setValue,
  options,
  labels = {},
}: {
  label: string;
  value: string;
  setValue: (v: string) => void;
  options: string[];
  labels?: Record<string, string>;
}) {
  return (
    <div className="mb-4">
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="mt-1.5 w-full bg-background border border-input rounded-lg px-3 py-2.5 text-sm"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o === "" ? `All ${label}` : (labels[o] ?? o)}
          </option>
        ))}
      </select>
    </div>
  );
}
