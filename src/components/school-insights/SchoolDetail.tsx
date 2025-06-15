
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin } from "lucide-react";
import React from "react";

interface SchoolDetailProps {
  school: any;
  onBack: () => void;
}

export function SchoolDetail({ school, onBack }: SchoolDetailProps) {
  // Add safe fallback for all props
  const programs = school?.programs ?? [];
  const location = school?.location || school?.city || "—";
  const website = school?.website || "";

  function renderOrPlaceholder(data: any, labelIfMissing = "Not available") {
    if (Array.isArray(data) && data.length === 0) return <span className="text-xs text-gray-400">{labelIfMissing}</span>;
    if (!data) return <span className="text-xs text-gray-400">{labelIfMissing}</span>;
    if (typeof data === "string" && data.trim() === "") return <span className="text-xs text-gray-400">{labelIfMissing}</span>;
    return data;
  }

  // -------- ADDING ALL DETAILS SECTIONS, SHOWING PLACEHOLDER IF MISSING --------
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Schools
        </Button>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{school.name}</h1>
          <p className="text-lg text-gray-600">{renderOrPlaceholder(school.description)}</p>
          <div className="flex items-center justify-center text-gray-600 mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            {renderOrPlaceholder(location)}
          </div>
          <div className="mt-2">
            <a
              href={school.website ? school.website : "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center text-blue-600 underline hover:text-blue-800 ${
                !school.website ? "pointer-events-none text-gray-400" : ""
              }`}
            >
              <span className="mr-1">{school.website ? "Official website" : "Website not available"}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6h8m0 0v8m0-8l-8 8" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold text-gray-800 text-lg mb-3">🎓 Programs Offered</h2>
            <div className="flex flex-wrap gap-1">
              {Array.isArray(programs) && programs.length > 0 ? (
                programs.map((prog: string, idx: number) => (
                  <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {prog}
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-400">Not available</span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold text-gray-800 text-lg mb-3">📅 Tuition & Fees</h2>
            <div className="text-sm text-gray-700 mb-2">
              {renderOrPlaceholder(school.tuition)}
            </div>
            <ul className="text-sm text-gray-700 list-disc ml-4 space-y-1">
              <li>Application fee: €100–200</li>
              <li>Living expenses: €800–1,200/month</li>
              <li>Books & materials: €500–800/year</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold text-gray-800 text-lg mb-3">🌐 Admission Process</h2>
            <ul className="text-sm text-gray-700 list-disc ml-4 space-y-1">
              {Array.isArray(school.admissionProcess) && school.admissionProcess.length > 0 ? (
                school.admissionProcess.map((line: string, idx: number) => (
                  <li key={idx}>{line}</li>
                ))
              ) : (
                <li className="text-xs text-gray-400">Not available</li>
              )}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold text-gray-800 text-lg mb-3">🗣️ Language Requirements</h2>
            <ul className="text-sm text-gray-700 list-disc ml-4 space-y-1">
              {Array.isArray(school.languageRequirements) && school.languageRequirements.length > 0 ? (
                school.languageRequirements.map((line: string, idx: number) => (
                  <li key={idx}>{line}</li>
                ))
              ) : (
                <li className="text-xs text-gray-400">Not available</li>
              )}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold text-gray-800 text-lg mb-3">🤝 Support & Features</h2>
            <ul className="text-sm text-gray-700 list-disc ml-4 space-y-1">
              {Array.isArray(school.supportAndFeatures) && school.supportAndFeatures.length > 0 ? (
                school.supportAndFeatures.map((feat: string, idx: number) => (
                  <li key={idx}>{feat}</li>
                ))
              ) : (
                <li className="text-xs text-gray-400">Not available</li>
              )}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold text-gray-800 text-lg mb-3">✨ Key Highlights</h2>
            <ul className="text-sm text-gray-700 list-disc ml-4 space-y-1">
              {Array.isArray(school.keyHighlights) && school.keyHighlights.length > 0 ? (
                school.keyHighlights.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))
              ) : (
                <li className="text-xs text-gray-400">Not available</li>
              )}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold text-gray-800 text-lg mb-3">🏅 Rankings & Metrics</h2>
            <div className="text-sm text-gray-700">
              {school.ranking ? school.ranking : <span className="text-xs text-gray-400">Not available</span>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold text-gray-800 text-lg mb-3">📞 Contacts</h2>
            <ul className="text-sm text-gray-700 list-disc ml-4 space-y-1">
              {Array.isArray(school.contacts) && school.contacts.length > 0 ? (
                school.contacts.map((contact: any, idx: number) => (
                  <li key={idx}>
                    <span className="font-medium">{contact.type}: </span>
                    {contact.value}
                  </li>
                ))
              ) : (
                <li className="text-xs text-gray-400">Not available</li>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardContent className="p-6">
          <h2 className="font-semibold text-gray-800 text-lg mb-3">📌 Application Deadlines</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.isArray(school.applicationDeadlines) && school.applicationDeadlines.length > 0
              ? school.applicationDeadlines.map(
                  (dl: { label: string; deadline: string }, idx: number) => (
                    <div key={idx} className="bg-blue-50 p-3 rounded-lg">
                      <h3 className="font-semibold text-sm text-blue-800">{dl.label}</h3>
                      <p className="text-xs text-gray-500">Deadline: {dl.deadline}</p>
                    </div>
                  )
                )
              : (
                <div className="text-xs text-gray-400 bg-gray-50 py-8 col-span-full text-center rounded">
                  Not available
                </div>
              )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

