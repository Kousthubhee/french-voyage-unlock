import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin } from "lucide-react";
import React from "react";

interface SchoolDetailProps {
  school: any;
  onBack: () => void;
}

export function SchoolDetail({ school, onBack }: SchoolDetailProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Schools
        </Button>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{school.name}</h1>
          <p className="text-lg text-gray-600">{school.description}</p>
          <div className="flex items-center justify-center text-gray-600 mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            {school.location}
          </div>
          {school.website && (
            <a
              href={school.website}
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

      {/* Add new info fields for richer presentation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {school.transport && (
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-gray-800 text-lg mb-3">🚆 Transport</h2>
              <p className="text-gray-700">{school.transport}</p>
            </CardContent>
          </Card>
        )}
        {school.famousPlaces && (
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-gray-800 text-lg mb-3">🏛️ Nearby Landmarks</h2>
              <p className="text-gray-700">{school.famousPlaces}</p>
            </CardContent>
          </Card>
        )}
        {school.sportsFacilities && (
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-gray-800 text-lg mb-3">🏟️ Sports Facilities</h2>
              <p className="text-gray-700">{school.sportsFacilities}</p>
            </CardContent>
          </Card>
        )}
        {school.studentLife && (
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-gray-800 text-lg mb-3">🎋 Student Life</h2>
              <p className="text-gray-700">{school.studentLife}</p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold text-gray-800 text-lg mb-3">🎓 Programs Offered</h2>
            <div className="flex flex-wrap gap-1">
              {school.programs.map((prog: string, idx: number) => (
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
              {school?.id === 'neoma-rouen' && (
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
              {school?.website && school?.id !== 'neoma-rouen' && (
                <>
                  <p>
                    <span className="font-medium">📧</span>{' '}
                    admissions@{school.website.replace(/https?:\/\/(www\.)?/, '').replace(/\/.*/, '')}
                  </p>
                  <p>
                    <span className="font-medium">📱</span> +33 1 XX XX XX XX
                  </p>
                  <p>
                    <span className="font-medium">🌐</span>{' '}
                    <a
                      href={school.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-blue-600"
                    >
                      {school.website.replace(/https?:\/\//, '')}
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
