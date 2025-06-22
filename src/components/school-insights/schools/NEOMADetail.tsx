import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Users, Calendar, Globe, Phone, Mail, Medal, BookOpen, Home, Globe2 } from "lucide-react";

interface NEOMADetailProps {
  onBack: () => void;
  campus: "Rouen" | "Reims" | "Paris" | "Virtual";
}

export function NEOMADetail({ onBack, campus }: NEOMADetailProps) {
  const isRouen = campus === "Rouen";
  const isReims = campus === "Reims";
  const isParis = campus === "Paris";
  const isVirtual = campus === "Virtual";

  // Campus-specific info
  const campusInfo = {
    Rouen: {
      description: "7‑hectare wooded estate near Mont‑Saint‑Aignan; trading room, library Mon–Sat, full accessibility.",
      transport: "15 min to Rouen centre by bus; 1h15 to Paris",
    },
    Reims: {
      description: "Two modern sites 5 min apart by tram; interactive labs, trading room, accessible facilities.",
      transport: "5 min tram from city centre",
    },
    Paris: {
      description: "6,650 m² eco‑responsible 5‑floor campus in 13ᵉ arr.; modern auditoria, collaborative zones.",
      transport: "Near Place d’Italie metro, close to Sorbonne & Station F",
    },
    Virtual: {
      description: "24/7 immersive virtual campus with avatar-based classes, events, and networking.",
      transport: "Accessible remotely anytime",
    },
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Button variant="outline" onClick={onBack} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Schools
      </Button>

      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-8 text-white mb-8">
        <div className="flex items-center">
          <div className="text-6xl mr-4">🏢</div>
          <div>
            <h1 className="text-3xl font-bold mb-2">NEOMA Business School</h1>
            <p className="text-xl opacity-90">{campus} Campus</p>
            <div className="flex items-center mt-2">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{campus}</span>
              <span className="ml-4 bg-white bg-opacity-20 px-2 py-1 rounded">
                Triple‑Crown Accredited
              </span>
            </div>
            <p className="mt-4">
              {campusInfo[campus].description}
              {!(isVirtual) && <span> {campusInfo[campus].transport}.</span>}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Programs Offered */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              Programs Offered
            </h3>
            <div className="space-y-3">
              {/* Condensed into bullets, campus-aware */}
              {isVirtual && (
                <div className="text-sm italic text-gray-600">
                  Virtual campus supports delivery of most programs digitally: BBA, MiM, MSc, EMBA.
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="font-medium">Programme Grande École (MiM)</span>
                <span className="text-sm text-blue-600">{isRouen || isReims ? "On‑site" : "Available via other campus"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Global BBA (4 years)</span>
                <span className="text-sm text-blue-600">Paris/Reims/Rouen</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">MSc Specialized Programs</span>
                <span className="text-sm text-blue-600">
                  {isRouen ? "AI, Supply Chain, Finance…" : isReims ? "Global Management, Luxury…" : isParis ? "Finance & Big Data, Marketing" : "All tracks available virtually"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Global Executive MBA</span>
                <span className="text-sm text-blue-600">Blended (mainly Paris)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Executive Certificates & Specialized Masters</span>
                <span className="text-sm text-blue-600">{isParis ? "Paris Exec Campus" : "Offered across campuses"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">PhD / Doctoral School</span>
                <span className="text-sm text-blue-600">All Campuses</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tuition Fees */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-green-600" />
              Tuition & Fees
            </h3>
            <div className="space-y-3">
              <div className="text-2xl font-bold text-green-600">€12,000–45,000/year</div>
              <ul className="text-sm text-gray-600 list-disc pl-5">
                <li>BBA: ~€12,000/year</li>
                <li>MiM: €17,500 (Sept intake) or €16,000 (Jan intake + gap semester)</li>
                <li>MSc: €18,500–30,300/year (≈€28,000–32,000 total for non‑EU)</li>
                <li>EMBA: €40,000 total (Early‑bird €37,000)</li>
                <li>Executive Masters/Certificates: €18,000–25,000</li>
                <li>Living costs: €8,400–€14,400/year (~€700–1,200/month)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Admission Requirements */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Globe2 className="h-5 w-5 mr-2 text-purple-600" />
              Admission Requirements
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>• BBA: High school diploma (Bac or equivalent), proficiency in English (IELTS 6.0) and/or French (B2+), application dossier & interview.</p>
              <p>• MiM/MSc: Bachelor’s degree (Bac+3/4), CV, motivation letter, 2 LORs, English test (TOEFL ≥ 85 or IELTS ≥ 6.0), GMAT/GRE optional, interview.</p>
              <p>• EMBA & Exec Certificates: several years professional experience + interviews/portfolio.</p>
              <p>• Virtual Campus: meets same academic requirements, classes accessible remotely.</p>
            </div>
          </CardContent>
        </Card>

        {/* Scholarships & Rankings */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Medal className="h-5 w-5 mr-2 text-yellow-600" />
              Accreditations & Scholarships
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>• **Triple‑Crown**: AACSB, EQUIS, AMBA.</p>
              <p>• Member of Conférence des Grandes Écoles; recognized by French Ministry.</p>
              <p>• Scholarships: €2,500–4,000 excellence discounts; CROUS grants; CESEM scholarships available.</p>
              <p>• Rankings:</p>
              <ul className="pl-5 list-disc">
                <li>Global BBA: 3rd in France (Le Figaro 2025)</li>
                <li>MSc International Finance: 24th worldwide, 8th in France (FT 2025)</li>
                <li>Master in Management: Top 6–8 nationally, ~25 globally (FT)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Contact & Website */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Phone className="h-5 w-5 mr-2 text-orange-600" />
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                <a href="mailto:international.admissions@neoma-bs.fr" className="text-blue-600 hover:underline">
                  international.admissions@neoma-bs.fr
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                <span>
                  {isRouen ? "+33 2 32 82 57 00" :
                   isReims ? "+33 3 26 77 47 47" :
                   isParis ? "+33 1 73 06 98 00" :
                   ""}
                </span>
              </div>
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-2 text-gray-400" />
                <a href="https://www.neoma-bs.com/en/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                  neoma‑bs.com/en/ <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Application Deadlines */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Application Deadlines 2025</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Round 1", "Round 2", "Round 3"].map((round, i) => (
              <div key={round} className={`p-4 rounded-lg ${i === 0 ? "bg-blue-50 text-blue-900" : i === 1 ? "bg-green-50 text-green-900" : "bg-purple-50 text-purple-900"}`}>
                <div className="font-semibold">{round}</div>
                <div className="text-sm">
                  September 2025 intake
                </div>
                <div className="text-xs mt-1">
                  {i === 0 ? "Deadline: December 15, 2024" : i === 1 ? "Deadline: March 31, 2025" : "Deadline: June 30, 2025"}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
