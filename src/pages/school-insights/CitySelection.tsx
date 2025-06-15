
import { CityCard } from "@/components/school-insights/CityCard";
import { getCityDetails } from "@/data/cityData";

interface CitySelectionProps {
  cityList: string[];
  onSelect: (city: string) => void;
}

export function CitySelection({ cityList, onSelect }: CitySelectionProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3 text-gray-800">Explore by City</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-6">
        {cityList.map((city) => {
          const cityDef = getCityDetails(city);
          return (
            <CityCard
              key={city}
              name={cityDef.name}
              emoji={cityDef.emoji}
              description={cityDef.description}
              schoolsCount={cityDef.schoolsCount}
              onClick={() => onSelect(city)}
              localInsights={cityDef.localInsights}
            />
          );
        })}
      </div>
    </div>
  );
}
