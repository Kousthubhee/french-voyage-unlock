import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Users, Calendar, Globe, Phone, Mail, ExternalLink, BookOpen } from "lucide-react";

interface HECParisDetailProps {
  onBack: () => void;
}

export function HECParisDetail({ onBack }: HECParisDetailProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <Button variant="outline" onClick={onBack} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Schools
      </Button>

      <div className="bg-gradient-to-r from-red-600 to-blue-600 rounded-lg p-8 text-white mb-8">
        <div className="flex items-center">
          <div className="text-6xl mr-4">🏛️</div>
          <div>
            <h1 className="text-3xl font-bold mb-2">HEC Paris</h1>
            <p className="text-xl opacity-90">Europe's Leading Business School</p>
            <div className="flex items-center mt-2">
              <MapPin className="h-4 w-4 mr-2" />
              <span>Jouy‑en‑Josas (Paris Region)</span>
              <span className="ml-4 bg-white bg-opacity-20 px-2 py-1 rounded">
                #1 in Europe (FT 2024)
              </span>
            </div>
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
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Master in Management (Grande École)</span>
                <span className="text-blue-600">#1 Europe</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">MSc Programs</span>
                <span className="text-blue-600">Wide variety</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">MBA (Full‑time & 12‑Month option)</span>
                <span className="text-blue-600">Top 10 Global</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Executive MBA & TRIUM Global EMBA</span>
                <span className="text-blue-600">Highly ranked</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">PhD in Management</span>
                <span className="text-blue-600">Research Excellence</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tuition & Fees */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-green-600" />
              Tuition & Fees
            </h3>
            <div className="space-y-3 text-sm">
              <div className="text-2xl font-bold text-green-600">€56,000–98,000</div>
              <p>• Master in Management: €55,800 total (2 years) + €1,950 services & €950 admin/year :contentReference[oaicite:1]{index=1}</p>
              <p>• Full-Time MBA: ~€76,500–98,000; 12‑month and 16‑month formats :contentReference[oaicite:2]{index=2}</p>
              <p>• MSc Specialized: €34,500–45,900 (e.g. €45,900 for International Finance) :contentReference[oaicite:3]{index=3}</p>
              <p>• Executive MBA: Executive-level fees, high-end :contentReference[oaicite:4]{index=4}</p>
              <p>• Living cost: ~€1,000–2,000/month; books & materials ~€1,000/year :contentReference[oaicite:5]{index=5}</p>
            </div>
          </CardContent>
        </Card>

        {/* Admission Requirements */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Globe className="h-5 w-5 mr-2 text-purple-600" />
              Admission Requirements
            </h3>
            <div className="space-y-2 text-sm">
              <p>• Master in Management: Bachelor’s degree + competitive concours&nbsp;:contentReference[oaicite:6]{index=6}</p>
              <p>• MSc: Bachelor’s + applied program-specific criteria (GMAT/GRE optional) :contentReference[oaicite:7]{index=7}</p>
              <p>• MBA: Bachelor’s, GMAT ~690+, 2–10 yrs exp, essays, interview ... :contentReference[oaicite:8]{index=8}</p>
              <p>• Executive MBA: 8–14 yrs of managerial exp required :contentReference[oaicite:9]{index=9}</p>
              <p>• TRIUM EMBA: Senior executives; strong global track record :contentReference[oaicite:10]{index=10}</p>
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
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                <a href="mailto:admissions@hec.fr" className="text-blue-600 hover:underline">
                  admissions@hec.fr
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                <span>+33 1 39 67 70 00</span>
              </div>
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-2 text-gray-400" />
                <a
                  href="https://www.hec.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center"
                >
                  hec.edu <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* MSc & MBA Breakdown */}
        <Card className="col-span-2">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
              Detailed MSc & MBA Specializations
            </h3>
            <div className="space-y-4 text-sm">
              <strong>MSc Programs:</strong>
              <ul className="list-disc pl-5">
                <li>International Finance (€45,900) :contentReference[oaicite:11]{index=11}</li>
                <li>Accounting, Finance & Management (€40,150) :contentReference[oaicite:12]{index=12}</li>
                <li>Economics & Finance (€40,150) :contentReference[oaicite:13]{index=13}</li>
                <li>Strategic Management (€40,150) :contentReference[oaicite:14]{index=14}</li>
                <li>Marketing (€34,500) :contentReference[oaicite:15]{index=15}</li>
                <li>Sustainability & Social Innovation (€34,500) :contentReference[oaicite:16]{index=16}</li>
                <li>Data Science & AI (X‑HEC, €27,900) :contentReference[oaicite:17]{index=17}</li>
                <li>MSc Innovation & Entrepreneurship (online/blended) :contentReference[oaicite:18]{index=18}</li>
                <li>Coaching & Consulting, X‑HEC Entrepreneurs, Media/LLM tracks, etc. :contentReference[oaicite:19]{index=19}</li>
              </ul>

              <strong>MBA Specializations:</strong>
              <p className="mb-2">
                7 tracks in second (customizable) phase: Marketing, Finance, Strategy, Entrepreneurship, Deep Tech & AI, Sustainable & Disruptive Innovation, Advanced Management :contentReference[oaicite:20]{index=20}
              </p>
              <p>
                Available in both 16‑month standard and new **12‑month accelerated** MBA (starting Jan 2025) :contentReference[oaicite:21]{index=21}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Application Deadlines */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Application Deadlines 2025</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="font-semibold text-blue-900">Round 1 (Early)</div>
              <div className="mt-1">September 2025 intake</div>
              <div className="text-xs text-blue-600">Deadline: October 1, 2024</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="font-semibold text-green-900">Round 2 (Main)</div>
              <div className="mt-1">September 2025 intake</div>
              <div className="text-xs text-green-600">Deadline: January 7, 2025</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="font-semibold text-purple-900">Round 3 (Final)</div>
              <div className="mt-1">September 2025 intake</div>
              <div className="text-xs text-purple-600">Deadline: April 14, 2025</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
