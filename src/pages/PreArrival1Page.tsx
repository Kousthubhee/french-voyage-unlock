import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ArrowLeft, CheckCircle, Calendar, ChevronDown, FileText, Clock, AlertCircle } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  age: number;
  nationality: string;
  educationLevel: string;
  hasWorkExperience: boolean;
  hasGapYear: boolean;
  gapYearDuration: number;
  targetCity: string;
  targetProgram: string;
  hasHealthIssues: boolean;
  isMarried: boolean;
  hasChildren: boolean;
}

interface PreArrival1PageProps {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
  userProfile?: UserProfile;
}

export const PreArrival1Page = ({ onBack, onComplete, isCompleted, userProfile }: PreArrival1PageProps) => {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // Dynamic document requirements based on user profile
  const getPersonalizedDocuments = () => {
    const baseDocuments = [
      "Degree/diploma certificates (original + copy)",
      "Resume (CV)",
      "Cover letter",
      "Admission letter",
      "Passport copy",
      "Photograph",
      "Campus France fee payment receipt"
    ];

    const conditionalDocuments = [];

    if (userProfile?.hasWorkExperience) {
      conditionalDocuments.push("Work experience certificates");
      conditionalDocuments.push("Employment reference letters");
    }

    if (userProfile?.hasGapYear && userProfile.gapYearDuration > 6) {
      conditionalDocuments.push("Gap year justification letter");
      conditionalDocuments.push("Activities during gap year documentation");
    }

    if (userProfile?.age && userProfile.age > 30) {
      conditionalDocuments.push("Statement of purpose explaining career change");
    }

    if (userProfile?.hasHealthIssues) {
      conditionalDocuments.push("Medical certificate from authorized doctor");
      conditionalDocuments.push("Health insurance documentation");
    }

    if (userProfile?.isMarried) {
      conditionalDocuments.push("Marriage certificate (translated)");
    }

    if (userProfile?.hasChildren) {
      conditionalDocuments.push("Children's birth certificates");
      conditionalDocuments.push("Custody documents (if applicable)");
    }

    if (userProfile?.nationality && userProfile.nationality !== 'French') {
      conditionalDocuments.push("Birth certificate (translated and apostilled)");
    }

    return [...baseDocuments, ...conditionalDocuments];
  };

  const getPersonalizedVFSDocuments = () => {
    const baseDocuments = [
      "Visa application form (signed)",
      "Passport + copy",
      "2 passport-size photos",
      "Campus France registration number + NOC",
      "Admission letter",
      "Tuition fee payment proof",
      "Proof of accommodation",
      "Proof of financial means",
      "Cover letter",
      "Travel insurance (3 months)",
      "Flight booking (dummy or real)"
    ];

    const conditionalDocuments = [];

    if (userProfile?.hasWorkExperience) {
      conditionalDocuments.push("Employment history and salary certificates");
    }

    if (userProfile?.hasGapYear && userProfile.gapYearDuration > 12) {
      conditionalDocuments.push("Detailed gap year explanation letter");
    }

    if (userProfile?.age && userProfile.age > 28) {
      conditionalDocuments.push("Motivation letter for late career change");
    }

    if (userProfile?.hasHealthIssues) {
      conditionalDocuments.push("Medical fitness certificate");
      conditionalDocuments.push("Vaccination records");
    }

    if (userProfile?.isMarried || userProfile?.hasChildren) {
      conditionalDocuments.push("Family status documentation");
      conditionalDocuments.push("Sponsor relationship proof (if applicable)");
    }

    if (userProfile?.targetProgram === 'PhD') {
      conditionalDocuments.push("Research proposal");
      conditionalDocuments.push("Supervisor acceptance letter");
    }

    return [...baseDocuments, ...conditionalDocuments];
  };

  const checklistItems = [
    {
      id: 'campus-france',
      title: "Campus France Registration",
      description: "Complete your Campus France application and interview",
      urgency: "high",
      timeline: "3-4 months before departure",
      documents: getPersonalizedDocuments(),
      process: [
        "Create account on Etudes en France portal",
        "Upload documents and submit application",
        "Attend Campus France interview",
        "Receive registration number and NOC"
      ],
      personalizedTips: userProfile ? [
        ...(userProfile.hasGapYear ? ["Be prepared to explain your gap year activities during the interview"] : []),
        ...(userProfile.hasWorkExperience ? ["Highlight how your work experience relates to your chosen program"] : []),
        ...(userProfile.age > 25 ? ["Prepare a clear explanation for your career transition"] : [])
      ] : []
    },
    {
      id: 'vfs',
      title: "VFS Visa Application",
      description: "Submit visa documents and attend biometric appointment",
      urgency: "high",
      timeline: "2-3 months before departure",
      documents: getPersonalizedVFSDocuments(),
      process: [
        "Gather all documents",
        "Book VFS appointment",
        "Submit documents + attend biometrics",
        "Await visa decision"
      ],
      personalizedTips: userProfile ? [
        ...(userProfile.hasHealthIssues ? ["Ensure all medical documents are recent (within 3 months)"] : []),
        ...(userProfile.isMarried ? ["Bring original marriage certificate for verification"] : []),
        ...(userProfile.nationality !== 'Indian' ? ["Check specific requirements for your nationality"] : [])
      ] : []
    },
    {
      id: 'documents',
      title: "Document Translation & Apostille",
      description: "Get official translations and apostille for legal documents",
      urgency: "medium",
      timeline: "2 months before departure",
      documents: [
        "Academic certificates",
        "Transcripts",
        "Birth certificate",
        ...(userProfile?.isMarried ? ["Marriage certificate"] : []),
        ...(userProfile?.hasChildren ? ["Children's birth certificates"] : []),
        ...(userProfile?.hasWorkExperience ? ["Experience letters"] : []),
        "Any non-English/French documents"
      ],
      process: [
        "Identify documents needing translation",
        "Get apostille from MEA (for Indian documents)",
        "Use certified translator in France or authorized translator",
        "Receive signed and stamped translations"
      ],
      personalizedTips: userProfile ? [
        ...(userProfile.nationality === 'Indian' ? ["Get apostille from MEA before traveling"] : []),
        ...(userProfile.hasChildren ? ["Children's documents may need additional authentication"] : [])
      ] : []
    },
    {
      id: 'insurance',
      title: "Travel & Health Insurance",
      description: "Purchase comprehensive travel and health insurance",
      urgency: "medium",
      timeline: "1 month before departure",
      documents: [
        "Passport copy",
        "Insurance certificate with name, dates, and coverage",
        ...(userProfile?.hasHealthIssues ? ["Pre-existing condition coverage documentation"] : [])
      ],
      process: [
        "Purchase 3-month comprehensive travel insurance",
        "Ensure coverage includes medical emergencies",
        "Attach policy document to visa file",
        ...(userProfile?.hasHealthIssues ? ["Declare pre-existing conditions"] : [])
      ],
      personalizedTips: userProfile ? [
        ...(userProfile.hasHealthIssues ? ["Ensure your insurance covers pre-existing conditions"] : []),
        ...(userProfile.age > 35 ? ["Consider higher medical coverage limits"] : [])
      ] : []
    },
    {
      id: 'flight',
      title: "Flight Booking",
      description: "Book your flight to France",
      urgency: "low",
      timeline: "1 month before departure",
      documents: [
        "Dummy or confirmed flight ticket",
        ...(userProfile?.hasChildren ? ["Children's tickets and documentation"] : [])
      ],
      process: [
        "For visa: get refundable or dummy ticket",
        "After visa approval: book actual ticket",
        ...(userProfile?.hasChildren ? ["Arrange for children's travel documents"] : [])
      ],
      personalizedTips: userProfile ? [
        ...(userProfile.targetCity ? [`Consider flying directly to ${userProfile.targetCity} if possible`] : []),
        ...(userProfile.hasChildren ? ["Book family-friendly flights with extra baggage allowance"] : [])
      ] : []
    }
  ];

  const handleStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const allStepsCompleted = completedSteps.length === checklistItems.length;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Checklist
        </Button>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            ✈️ Pre-Arrival Checklist (Part 1)
          </h1>
          <p className="text-lg text-gray-600">
            Campus France, VFS, and essential preparations
          </p>
          {userProfile && (
            <div className="mt-4 bg-blue-50 p-3 rounded-lg">
              <p className="text-blue-800 text-sm">
                Personalized for: <strong>{userProfile.name}</strong> | 
                Target: <strong>{userProfile.targetProgram}</strong> in <strong>{userProfile.targetCity}</strong>
              </p>
            </div>
          )}
          {isCompleted && (
            <div className="mt-4 bg-green-100 p-3 rounded-lg">
              <div className="flex items-center justify-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                <span className="text-green-800 font-medium">Module Completed! You earned a key 🗝️</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {checklistItems.map((item, index) => {
          const isStepCompleted = completedSteps.includes(item.id);
          const isOpen = openSections.includes(item.id);
          
          return (
            <Card key={index} className={`border-l-4 border-l-blue-500 ${isStepCompleted ? 'ring-2 ring-green-500' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 ${
                      isStepCompleted 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {isStepCompleted ? <CheckCircle className="h-4 w-4" /> : index + 1}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <p className="text-gray-600 mt-1">{item.description}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.urgency === 'high' 
                      ? 'bg-red-100 text-red-800' 
                      : item.urgency === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {item.urgency} priority
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    Timeline: {item.timeline}
                  </div>

                  <Collapsible 
                    open={isOpen} 
                    onOpenChange={() => toggleSection(item.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full justify-between">
                        <span className="flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          View Details ({item.documents.length} documents)
                        </span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </Button>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent className="mt-4 space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">📋 Documents Required:</h4>
                        <ul className="space-y-1">
                          {item.documents.map((doc, docIndex) => {
                            const isConditional = !["Degree/diploma certificates (original + copy)", "Resume (CV)", "Cover letter", "Admission letter", "Passport copy", "Photograph", "Campus France fee payment receipt", "Visa application form (signed)", "2 passport-size photos", "Campus France registration number + NOC", "Tuition fee payment proof", "Proof of accommodation", "Proof of financial means", "Travel insurance (3 months)", "Flight booking (dummy or real)", "Academic certificates", "Transcripts", "Insurance certificate with name, dates, and coverage"].includes(doc);
                            
                            return (
                              <li key={docIndex} className={`text-sm flex items-start ${isConditional ? 'text-orange-800' : 'text-blue-800'}`}>
                                <span className="mr-2">•</span>
                                {doc}
                                {isConditional && (
                                  <span className="ml-2 text-xs bg-orange-200 text-orange-800 px-1 rounded">
                                    Based on your profile
                                  </span>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-2">🔄 Process:</h4>
                        <ol className="space-y-1">
                          {item.process.map((step, stepIndex) => (
                            <li key={stepIndex} className="text-sm text-green-800 flex items-start">
                              <span className="mr-2 font-medium">{stepIndex + 1}.</span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>

                      {item.personalizedTips && item.personalizedTips.length > 0 && (
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-purple-900 mb-2 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            Personalized Tips:
                          </h4>
                          <ul className="space-y-1">
                            {item.personalizedTips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="text-sm text-purple-800 flex items-start">
                                <span className="mr-2">💡</span>
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CollapsibleContent>
                  </Collapsible>

                  <div className="flex items-center justify-between pt-2">
                    {!isStepCompleted && (
                      <Button 
                        size="sm"
                        onClick={() => handleStepComplete(item.id)}
                      >
                        Mark Complete
                      </Button>
                    )}
                    {isStepCompleted && (
                      <span className="text-green-600 text-sm font-medium">Completed ✓</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {allStepsCompleted && !isCompleted && (
        <Card className="mt-8 bg-green-50 border-green-200">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              All Steps Completed!
            </h3>
            <p className="text-green-700 mb-4">
              Great job! You've finished all steps in this module.
            </p>
            <Button 
              onClick={onComplete}
              className="bg-green-600 hover:bg-green-700"
            >
              Complete Module & Earn Key 🗝️
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="mt-4 text-center text-sm text-gray-500">
        Progress: {completedSteps.length} of {checklistItems.length} steps completed
      </div>
    </div>
  );
};