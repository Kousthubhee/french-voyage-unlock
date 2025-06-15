import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, MapPin, Users, BookOpen, Info, Map, Star, Scale, Link } from 'lucide-react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { citiesData, School, City } from '@/data/schoolsData';
import { CityMap } from "@/components/CityMap";

// Helper to extract level from program name
function extractCourseLevel(program: string): string {
  // Accepts variants like "MSc", "MBA", "Masters", etc.
  const lower = program.toLowerCase();
  if (lower.startsWith('msc') || lower.startsWith('master')) return "Masters";
  if (lower.startsWith('mba')) return "MBA";
  if (lower.startsWith('bsc') || lower.startsWith('bachelor')) return "Bachelors";
  if (lower.startsWith('phd')) return "PhD";
  if (lower.startsWith('doctor')) return "PhD";
  if (lower.startsWith('license') || lower.startsWith('licence')) return "Bachelors";
  return "Other";
}

// --- Add city coordinates & demo facts. Real data can be plugged for each city later ---
const cityMeta: Record<string, { coords: [number, number], facts: { living: string, students: string, district: string } }> = {
  "paris":    { coords: [2.3522, 48.8566], facts: { living: "€1200/mo", students: "700k", district: "Latin Quarter" }},
  "lyon":     { coords: [4.8357, 45.7640], facts: { living: "€900/mo", students: "175k", district: "Vieux Lyon" }},
  "toulouse": { coords: [1.4442, 43.6047], facts: { living: "€850/mo", students: "120k", district: "Saint-Cyprien" }},
  "bordeaux": { coords: [-0.5792, 44.8378], facts: { living: "€950/mo", students: "88k", district: "Chartrons" }},
  "lille":    { coords: [3.0573, 50.6292], facts: { living: "€800/mo", students: "110k", district: "Wazemmes" }},
  "strasbourg": { coords: [7.7521,48.5734], facts: { living: "€850/mo", students: "80k", district: "Neudorf" }},
  // ... more as needed
};

export const SchoolInsightsPage = ({ onBack }: { onBack: () => void }) => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [showInsights, setShowInsights] = useState(false);

  // --- New two-level filter state ---
  const [courseLevelFilter, setCourseLevelFilter] = useState<string>('all');
  const [programFilter, setProgramFilter] = useState<string>('all');

  // Gather all programs across all cities for two-level filter
  const programsByLevel: Record<string, Set<string>> = {};
  Object.values(citiesData).forEach(city => {
    city.schools.forEach(school => {
      school.programs.forEach(prog => {
        const level = extractCourseLevel(prog);
        if (!programsByLevel[level]) programsByLevel[level] = new Set();
        programsByLevel[level].add(prog);
      });
    });
  });
  const allLevels = Object.keys(programsByLevel).sort((a, b) => {
    // Prioritize main ones first for user-friendliness.
    const order = ["Bachelors", "Masters", "MBA", "PhD", "Other"];
    return order.indexOf(a) - order.indexOf(b);
  });

  // Subjects/programs for current selected level, for use in subject filter
  const programSubjects =
    courseLevelFilter === 'all'
      ? Object.values(programsByLevel).flatMap(set => Array.from(set)).sort()
      : Array.from(programsByLevel[courseLevelFilter] || []).sort();

  // Helper: Filter schools given the two-level filter.
  function filterSchools(schools: School[]) {
    return schools.filter(school => {
      // Both course level and (if selected) subject must match.
      const hasProgramWithLevel = school.programs.some(
        p => courseLevelFilter === 'all' || extractCourseLevel(p) === courseLevelFilter
      );
      const hasSpecificProgram =
        programFilter === 'all' ||
        school.programs.some(p => p === programFilter);
      return hasProgramWithLevel && hasSpecificProgram;
    });
  }

  // SCHOOL CONTACT INFORMATION DISPLAY
  const getContact = (school: School) => school.contact || {};

  // Find the school currently displayed
  const findSchoolById = (id: string | undefined): School | undefined => {
    if (!id) return undefined;
    for (const cityKey of Object.keys(citiesData)) {
      const city = citiesData[cityKey];
      const sch = city.schools.find((s) => s.id === id);
      if (sch) return sch;
    }
    return undefined;
  };

  // --- School comparison state & logic ---
  const [compareSchools, setCompareSchools] = useState<string[]>([]);
  const maxCompare = 3;

  const toggleCompare = (schoolId: string) => {
    setCompareSchools(prev => 
      prev.includes(schoolId)
        ? prev.filter(id => id !== schoolId)
        : prev.length < maxCompare ? [...prev, schoolId] : prev
    );
  };

  // Detailed School View
  if (selectedSchool) {
    const contact = getContact(selectedSchool);
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" onClick={() => setSelectedSchool(null)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Schools
          </Button>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedSchool.name}</h1>
            <p className="text-lg text-gray-600">{selectedSchool.description}</p>
            <div className="flex items-center justify-center text-gray-600 mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {selectedSchool.location}
            </div>
            {selectedSchool.website && (
              <a
                href={selectedSchool.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-2 text-blue-600 underline hover:text-blue-800"
              >
                <span className="mr-1">Official website</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6h8m0 0v8m0-8l-8 8" />
                </svg>
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-gray-800 text-lg mb-3">🎓 Programs Offered</h2>
              <div className="flex flex-wrap gap-1">
                {selectedSchool.programs.map((prog, idx) => (
                  <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {prog}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-gray-800 text-lg mb-3">📅 Tuition & Fees</h2>
              <ul className="text-sm text-gray-700 list-disc ml-4 space-y-1">
                <li>Application fee: €100–200</li>
                <li>Living expenses: €800–1,200/month</li>
                <li>Books & materials: €500–800/year</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-gray-800 text-lg mb-3">🌐 Admission Requirements</h2>
              <ul className="text-sm text-gray-700 list-disc ml-4 space-y-1">
                <li>Bachelor's degree (any field)</li>
                <li>GMAT/GRE scores</li>
                <li>English proficiency (TOEFL/IELTS)</li>
                <li>Personal statement</li>
                <li>2–3 recommendation letters</li>
                <li>Work experience (preferred)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-gray-800 text-lg mb-3">📞 Contact Information</h2>
              <div className="text-sm text-gray-700 space-y-1">
                {selectedSchool?.id === 'neoma-rouen' && (
                  <>
                    <p>
                      <span className="font-medium">📧</span>{' '}
                      <a href="mailto:international.admissions@neoma-bs.fr" className="underline text-blue-600">
                        international.admissions@neoma-bs.fr
                      </a>
                    </p>
                    <p>
                      <span className="font-medium">📱</span>{' '}
                      <a href="tel:+33344633300" className="underline text-blue-600">
                        +33 3 44 63 33 00
                      </a>
                    </p>
                    <p>
                      <span className="font-medium">🌐</span>{' '}
                      <a
                        href="https://www.neoma-bs.com/en/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-blue-600"
                      >
                        www.neoma-bs.com/en/
                      </a>
                    </p>
                  </>
                )}
                {selectedSchool?.website && selectedSchool?.id !== 'neoma-rouen' && (
                  <>
                    <p>
                      <span className="font-medium">📧</span>{' '}
                      admissions@{selectedSchool.website.replace(/https?:\/\/(www\.)?/, '').replace(/\/.*/, '')}
                    </p>
                    <p>
                      <span className="font-medium">📱</span> +33 1 XX XX XX XX
                    </p>
                    <p>
                      <span className="font-medium">🌐</span>{' '}
                      <a
                        href={selectedSchool.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-blue-600"
                      >
                        {selectedSchool.website.replace(/https?:\/\//, '')}
                      </a>
                    </p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h2 className="font-semibold text-gray-800 text-lg mb-3">📌 Application Deadlines</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <h3 className="font-semibold text-sm text-blue-800">Fall Intake</h3>
                <p className="text-sm text-gray-700">September 2025</p>
                <p className="text-xs text-gray-500">Deadline: March 15, 2025</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <h3 className="font-semibold text-sm text-green-800">Spring Intake</h3>
                <p className="text-sm text-gray-700">January 2026</p>
                <p className="text-xs text-gray-500">Deadline: October 15, 2025</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <h3 className="font-semibold text-sm text-purple-800">Summer Intake</h3>
                <p className="text-sm text-gray-700">June 2025</p>
                <p className="text-xs text-gray-500">Deadline: January 15, 2025</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // City-Specific View with Schools and Local Insights (add two-level filter here)
  if (selectedCity && citiesData[selectedCity]) {
    const cityData = citiesData[selectedCity];
    const meta = cityMeta[selectedCity] || { coords: [2.35, 48.85], facts: { living: "€900/mo", students: "n/a", district: "Central" }};

    // All schools in this city filtered by courseLevel and program
    const filteredSchools = filterSchools(cityData.schools);

    // Program subjects for this city only and current level (for tabs/subjects dropdown)
    const cityProgramsByLevel: Record<string, Set<string>> = {};
    cityData.schools.forEach(school => {
      school.programs.forEach(prog => {
        const level = extractCourseLevel(prog);
        if (!cityProgramsByLevel[level]) cityProgramsByLevel[level] = new Set();
        cityProgramsByLevel[level].add(prog);
      });
    });
    const citySubjects =
      courseLevelFilter === 'all'
        ? Object.values(cityProgramsByLevel).flatMap(set => Array.from(set)).sort()
        : Array.from(cityProgramsByLevel[courseLevelFilter] || []).sort();

    // Find school with most unique programs (unique offering highlight)
    let uniquePrograms: Record<string, number> = {};
    cityData.schools.forEach(sch => {
      sch.programs.forEach(prog => {
        uniquePrograms[prog] = (uniquePrograms[prog] || 0) + 1;
      });
    });
    // Find "most unique" schools (with largest number of rare programs)
    const schoolUniqueScore = (school: School) =>
      school.programs.reduce((sum, prog) => sum + (uniquePrograms[prog] === 1 ? 1 : 0), 0);
    const maxUniq = Math.max(...cityData.schools.map(schoolUniqueScore));

    // For comparison modal:
    const compareData = cityData.schools.filter(s => compareSchools.includes(s.id));

    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" onClick={() => {
            setSelectedCity(null);
            setCourseLevelFilter('all');
            setProgramFilter('all');
          }} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Cities
          </Button>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">🏫 {cityData.name} - School & Local Insights</h1>
            <p className="text-lg text-gray-600">{cityData.description}</p>
          </div>
        </div>

        {/* --- Two-level filters --- */}
        <div className="flex flex-wrap gap-4 items-center justify-end mb-6">
          <div>
            <label htmlFor="city-course-level-filter" className="block text-xs mb-1 text-gray-700">Filter by Level</label>
            <Select value={courseLevelFilter} onValueChange={val => {
              setCourseLevelFilter(val);
              setProgramFilter('all');
            }}>
              <SelectTrigger className="w-40" id="city-course-level-filter">
                <SelectValue>{courseLevelFilter === "all" ? "All Levels" : courseLevelFilter}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {Object.keys(cityProgramsByLevel).sort((a, b) => allLevels.indexOf(a) - allLevels.indexOf(b)).map(lvl =>
                  <SelectItem key={lvl} value={lvl}>{lvl}</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="city-program-filter" className="block text-xs mb-1 text-gray-700">Filter by Subject</label>
            <Select value={programFilter} onValueChange={setProgramFilter}>
              <SelectTrigger className="w-64" id="city-program-filter">
                <SelectValue>{programFilter === "all" ? "All Subjects" : programFilter}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {citySubjects.map((p) => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Local Data, Map, Compare bar */}
        <div className="flex flex-wrap items-center gap-8 mb-8">
          <div className="flex items-center gap-6 flex-1 min-w-[220px]">
            <div>
              <span className="font-medium text-sm text-primary flex gap-2 items-center"><Users size={14} /> Students</span>
              <div className="mb-1 text-base">{meta.facts.students}</div>
            </div>
            <div>
              <span className="font-medium text-sm text-green-700 flex gap-2 items-center"><Map size={14} /> Main student area</span>
              <div className="mb-1 text-base">{meta.facts.district}</div>
            </div>
            <div>
              <span className="font-medium text-sm text-blue-700 flex gap-2 items-center"><BookOpen size={14} /> Living Cost</span>
              <div className="mb-1 text-base">{meta.facts.living}</div>
            </div>
          </div>
          <div className="w-52 shrink-0 min-w-[180px]">
            <CityMap longitude={meta.coords[0]} latitude={meta.coords[1]} />
          </div>
          <div>
            <button
              className={`bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow transition disabled:bg-purple-400`}
              disabled={compareSchools.length < 2}
              onClick={() => document.getElementById("compare-modal")?.classList.remove("hidden")}
            >
              <Scale className="inline h-4 w-4 mr-2 -mt-1" />
              Compare ({compareSchools.length})
            </button>
          </div>
        </div>

        {/* Local Insights Section with actionable links */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Info className="h-5 w-5 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Local Insights for {cityData.name}</h2>
              </div>
              <Button onClick={() => setShowInsights(true)} variant="outline">
                View All Tips
              </Button>
            </div>
            <p className="text-gray-600 mb-4">Get insider knowledge about living and studying in {cityData.name}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cityData.localInsights.map((insight, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2 flex gap-2 items-center">
                    {/* Use icons for specific categories */}
                    {insight.title.includes("Transport") ? <Map className="inline h-4 w-4 text-blue-500" /> : null}
                    {insight.title.includes("Culture") || insight.title.includes("Life") ? <Star className="inline h-4 w-4 text-yellow-500" /> : null}
                    {insight.title.includes("Recreation") ? <Users className="inline h-4 w-4 text-green-600" /> : null}
                    {insight.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {insight.description}
                  </p>
                  {/* Actionable tips: linkify URLs and app names */}
                  <ul className="mt-2 space-y-1">
                    {insight.tips
                      ?.slice(0, 2)
                      .map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <span className="text-blue-400">•</span>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: tip
                                .replace(/((https?:\/\/|www\.)\S+)/g, url =>
                                  `<a href="${url.startsWith("http") ? url : "https://"+url}" target="_blank" class="underline text-blue-600">${url}</a>`
                                )
                                .replace(/(\w+ app)/gi, match =>
                                  `<span class="bg-purple-100 text-purple-800 px-1 rounded">${match}</span>`
                                )
                            }}
                          />
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchools.length === 0 ? (
            <div className="col-span-3 text-center py-8 text-gray-500">No schools found for selected filters.</div>
          ) : filteredSchools.map((school, index) => {
            // Highlight if this school has rare/unique programs
            const isUnique = schoolUniqueScore(school) === maxUniq && maxUniq > 0;

            return (
              <Card
                key={school.id}
                className={`relative hover:shadow-lg transition-shadow ${compareSchools.includes(school.id) ? "outline outline-purple-600 ring-2" : ""}`}
                onClick={() => setSelectedSchool(school)}
              >
                {/* Unique badge */}
                {isUnique && (
                  <div className="absolute top-2 right-2 z-10">
                    <span className="inline-flex items-center gap-1 bg-yellow-400/90 text-yellow-900 px-2 py-0.5 rounded-full text-xs font-semibold shadow">
                      <Star className="h-3 w-3" /> Unique!
                    </span>
                  </div>
                )}
                {/* Compare checkbox */}
                <input
                  type="checkbox"
                  checked={compareSchools.includes(school.id)}
                  onClick={e => e.stopPropagation()}
                  onChange={e => {
                    e.stopPropagation();
                    toggleCompare(school.id);
                  }}
                  className="absolute left-2 top-2 h-5 w-5 accent-purple-600 rounded border border-purple-400 bg-white shadow"
                  title="Select for comparison"
                />

                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg flex gap-2 items-center">
                        {school.name}
                      </CardTitle>
                      <div className="flex items-center text-gray-600 mt-1">
                        <Map className="h-4 w-4 mr-1" />
                        {school.location}
                      </div>
                    </div>
                    <div>
                      {school.website && (
                        <a href={school.website} target="_blank" rel="noopener noreferrer" className="inline-block text-blue-500 hover:text-blue-700" onClick={e => e.stopPropagation()}>
                          <Link className="inline w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{school.description}</p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="text-sm">{school.tuition || 'Contact for details'}</span>
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <BookOpen className="h-4 w-4 mr-2 text-green-600" />
                        <span className="text-sm font-medium">Programs:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {school.programs.map((program, idx) => (
                          <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {program}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button className="w-full mt-4">View Details</Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* --- School Comparison Modal --- */}
        <div
          id="compare-modal"
          className="fixed hidden top-0 left-0 z-50 w-full h-full bg-black/40 backdrop-blur-sm flex items-center justify-center"
          onClick={e => (e.target as any).id === "compare-modal" && e.currentTarget.classList.add("hidden")}
        >
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg relative animate-fade-in">
            <button className="absolute top-3 right-4 text-gray-500 hover:text-gray-700" onClick={() => document.getElementById("compare-modal")?.classList.add("hidden")}>
              ×
            </button>
            <h3 className="text-xl font-bold mb-4 flex gap-2 items-center"><Scale /> Compare Schools</h3>
            <div className="overflow-x-auto">
              <table className="w-full border text-sm">
                <thead>
                  <tr>
                    <th className="bg-gray-100 border px-3 py-2">School</th>
                    <th className="bg-gray-100 border px-3 py-2">Location</th>
                    <th className="bg-gray-100 border px-3 py-2">Programs</th>
                    <th className="bg-gray-100 border px-3 py-2">Tuition</th>
                  </tr>
                </thead>
                <tbody>
                  {compareData.map(s => (
                    <tr key={s.id}>
                      <td className="border px-3 py-2 font-semibold">{s.name}</td>
                      <td className="border px-3 py-2">{s.location}</td>
                      <td className="border px-3 py-2">
                        {s.programs.map((prog, pi) => (
                          <span key={pi} className="inline-block bg-blue-100 text-blue-800 px-2 py-0.5 rounded mr-1 mb-1">{prog}</span>
                        ))}
                      </td>
                      <td className="border px-3 py-2">{s.tuition || "?"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Local Insights Modal */}
        <Dialog open={showInsights} onOpenChange={setShowInsights}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Local Insights for {cityData.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {cityData.localInsights.map((insight, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{insight.title}</h3>
                    <p className="text-gray-600 mb-4">{insight.description}</p>
                    <ul className="space-y-2">
                      {insight.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          <span className="text-sm text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Main Cities View — add top-level filters here
  // Compute which cities to display based on filters:
  const citiesFiltered = Object.entries(citiesData).map(([cityKey, city]) => ({
    cityKey,
    city,
    schools: filterSchools(city.schools),
  })).filter(({ schools }) => schools.length > 0);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Checklist
        </Button>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">🏫 School & Local Insights</h1>
          <p className="text-lg text-gray-600">Explore French schools and get local insights for each city</p>
        </div>
      </div>

      {/* --- Two-level filter bar (global) --- */}
      <div className="flex flex-wrap gap-4 items-center justify-end mb-8">
        <div>
          <label htmlFor="main-course-level-filter" className="block text-xs mb-1 text-gray-700">Filter by Level</label>
          <Select value={courseLevelFilter} onValueChange={val => {
            setCourseLevelFilter(val);
            setProgramFilter('all');
          }}>
            <SelectTrigger className="w-40" id="main-course-level-filter">
              <SelectValue>{courseLevelFilter === "all" ? "All Levels" : courseLevelFilter}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              {allLevels.map(lvl =>
                <SelectItem key={lvl} value={lvl}>{lvl}</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="main-program-filter" className="block text-xs mb-1 text-gray-700">Filter by Subject</label>
          <Select value={programFilter} onValueChange={setProgramFilter}>
            <SelectTrigger className="w-64" id="main-program-filter">
              <SelectValue>{programFilter === "all" ? "All Subjects" : programFilter}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {programSubjects.map((p) => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {citiesFiltered.length === 0 ? (
          <div className="col-span-3 text-center py-8 text-gray-500">No schools found for selected filters.</div>
        ) : citiesFiltered.map(({ cityKey, city, schools }) => (
          <Card key={cityKey} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedCity(cityKey)}>
            <CardHeader>
              <CardTitle className="text-lg">{city.name} {city.emoji}</CardTitle>
              <p className="text-sm text-gray-600">{city.description}</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{schools.length} Schools</span>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Local Tips</span>
                </div>
                <Button size="sm">Explore</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
