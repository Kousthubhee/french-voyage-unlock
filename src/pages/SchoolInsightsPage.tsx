import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CityCard } from "@/components/school-insights/CityCard";
import { CityInsightsCard } from "@/components/school-insights/CityInsightsCard";
import { InsightsDialog } from "@/components/school-insights/InsightsDialog";
import { SchoolDetail } from "@/components/school-insights/SchoolDetail";
import { schools, School } from "@/data/schoolData";
import { cityData, getCityDetails, City } from "@/data/cityData";

interface SchoolInsightsPageProps {
  onBack: () => void;
}

export function SchoolInsightsPage({ onBack }: SchoolInsightsPageProps) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [subjectFilter, setSubjectFilter] = useState<string>("All");
  const [showCityInsights, setShowCityInsights] = useState(false);

  // Track selected school for detail modal/page
  const [selectedSchool, setSelectedSchool] = useState<any | null>(null);

  // All unique cities from the data
  const cityList = Array.from(new Set(schools.map((s) => s.city)));

  // Schools for selected city
  const citySchools = selectedCity
    ? schools.filter((school) => school.city === selectedCity)
    : [];

  // Subjects for selected city
  const availableSubjects = selectedCity
    ? Array.from(
        new Set(citySchools.flatMap((s) => s.subjects || []))
      ).sort()
    : [];

  // Schools to display (subject filter applied if needed)
  let displayedSchools = citySchools;
  if (subjectFilter !== "All" && selectedCity) {
    displayedSchools = citySchools.filter((school) =>
      (school.subjects || []).includes(subjectFilter)
    );
  }

  const cityDetails = selectedCity ? getCityDetails(selectedCity) : null;

  // School details view: show only detail, with a back button to city
  if (selectedSchool) {
    return (
      <SchoolDetail
        school={{
          ...selectedSchool,
          programs: selectedSchool.subjects || [],
          website: selectedSchool.website || "",
          location: selectedSchool.city || "",
        }}
        onBack={() => setSelectedSchool(null)}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center mb-6">
        {/* Only show Checklist back button when in city selection view */}
        {!selectedCity ? (
          <>
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Checklist
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">School Insights</h1>
          </>
        ) : (
          <>
            {/* In city view or school grid, show Back to Cities */}
            <Button variant="ghost" onClick={() => setSelectedCity(null)} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Cities
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">{selectedCity} – Schools & Info</h1>
          </>
        )}
      </div>

      {/* Grid Card view for city selection */}
      {!selectedCity && (
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
                  onClick={() => setSelectedCity(city)}
                  localInsights={cityDef.localInsights}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* City Insights Card & Dialog */}
      {selectedCity && (
        <div className="mb-4">
          <CityInsightsCard
            cityName={cityDetails.name}
            transport={cityDetails.transport}
            famousPlaces={cityDetails.famousPlaces}
            sportsFacilities={cityDetails.sportsFacilities}
            studentLife={cityDetails.studentLife}
            onShowAll={() => setShowCityInsights(true)}
          />
          <InsightsDialog
            open={showCityInsights}
            onOpenChange={setShowCityInsights}
            cityName={cityDetails.name}
            localInsights={cityDetails.localInsights}
            transport={cityDetails.transport}
            famousPlaces={cityDetails.famousPlaces}
            sportsFacilities={cityDetails.sportsFacilities}
            studentLife={cityDetails.studentLife}
          />
        </div>
      )}

      {/* Filter by Subject: ONLY IF a city is selected AND there is >1 subject */}
      {selectedCity && availableSubjects.length > 1 && (
        <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
          <label htmlFor="subject-filter" className="font-medium text-gray-700">
            Filter by Subject:
          </label>
          <select
            id="subject-filter"
            className="border rounded px-2 py-2 text-sm md:w-64 w-full focus:outline-none"
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
          >
            <option value="All">All Subjects</option>
            {availableSubjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Insights Cards & Schools grid */}
      {selectedCity ? (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Schools in {selectedCity}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedSchools.length > 0 ? (
              displayedSchools.map((school) => (
                <Card
                  key={school.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() =>
                    setSelectedSchool({
                      ...school,
                      programs: school.subjects || [],
                      website: school.website || "",
                      location: school.city || "",
                    })
                  }
                >
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {school.name}
                    </h3>
                    <p className="text-sm text-gray-600">{school.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {(school.subjects || []).map((subj) => (
                        <span
                          key={subj}
                          className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                        >
                          {subj}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-gray-500 text-center">
                No schools found for this subject in {selectedCity}.
              </div>
            )}
          </div>
        </div>
      ) : (
        // Local insights view for when no city selected
        <div className="text-gray-500 text-center">
          Select a city to explore school insights.
        </div>
      )}
    </div>
  );
}
