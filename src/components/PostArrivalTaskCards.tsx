
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Step {
  id: string;
  description: string;
}
interface Task {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  timeline: string;
  priority: "urgent" | "high";
  steps: Step[];
  documents: string[];
  faqs: { q: string; a: string }[];
  links: { label: string; url: string }[];
  glossary?: { term: string; explanation: string }[];
}

interface Props {
  tasks: Task[];
  completedSteps: string[];
  setCompletedSteps: (steps: string[]) => void;
  reminders: { [id: string]: string };
  setReminders: (obj: { [id: string]: string }) => void;
}

const GlossaryPopover = ({
  term,
  explanation,
}: {
  term: string;
  explanation: string;
}) => (
  <span className="relative group cursor-help underline decoration-dotted">
    {term}
    <span className="hidden group-hover:block absolute z-10 left-1/2 -translate-x-1/2 bg-white border border-gray-200 shadow-lg text-xs text-gray-900 px-3 py-1 rounded whitespace-pre w-60 mt-2">
      {explanation}
    </span>
  </span>
);

// Simple collapsible for details
function CollapsibleSection({trigger, children}: {trigger: React.ReactNode, children: React.ReactNode}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button className="w-full flex justify-between items-center px-2 py-1 text-sm hover:underline font-medium text-blue-700"
        onClick={() => setOpen(v=>!v)}
      >
        {trigger}
        <span className="ml-2">{open ? "▲" : "▼"}</span>
      </button>
      {open && <div className="mt-2">{children}</div>}
    </div>
  );
}

export const PostArrivalTaskCards = ({
  tasks,
  completedSteps,
  setCompletedSteps,
  reminders,
  setReminders,
}: Props) => {
  const handleStep = (taskId: string) => {
    if (!completedSteps.includes(taskId)) {
      setCompletedSteps([...completedSteps, taskId]);
    }
  };
  const getStatus = (taskId: string) => {
    return completedSteps.includes(taskId) ? "Completed" : "Not started";
  };

  return (
    <div className="space-y-6">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`bg-white rounded-xl shadow border px-6 py-5 flex flex-col md:flex-row items-start md:items-center gap-2 transition group relative`}
        >
          <div className="flex items-center gap-3 flex-1">
            <span className="text-xl">{task.icon}</span>
            <div>
              <span className="font-semibold text-base">{task.title}</span>
              <div className="flex flex-wrap items-center mt-0.5 gap-1">
                <span className={`text-xs px-2 py-0.5 rounded-full
                  ${task.priority==="urgent" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-800"}`}
                >
                  {task.priority.toUpperCase()}
                </span>
                <span className={`ml-1 text-xs px-2 py-0.5 rounded-full
                  ${getStatus(task.id)==="Completed" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}
                >
                  {getStatus(task.id)}
                </span>
                <span className="ml-1 text-xs text-gray-400">
                  {task.timeline}
                </span>
              </div>
              <div className="text-sm mt-1 text-gray-700">{task.description}</div>
            </div>
          </div>
          <div className="flex flex-col gap-2 ml-0 md:ml-8 w-full md:w-auto">
            {!completedSteps.includes(task.id) ? (
              <Button
                size="sm"
                className="bg-green-600 text-white hover:bg-green-700 transition"
                onClick={() => handleStep(task.id)}
              >
                Mark Complete
              </Button>
            ) : (
              <span className="text-green-600 font-medium text-xs">Completed</span>
            )}
            <CollapsibleSection trigger="Show Details">
              <div className="mb-2">
                <span className="font-semibold">Step-by-step guide:</span>
                <ol className="list-decimal ml-5 text-sm space-y-1 mt-1">
                  {task.steps.map((s) => (
                    <li key={s.id}>
                      <span>
                        {s.description}
                        {task.glossary &&
                          task.glossary.find((t) =>
                            s.description.includes(t.term)
                          ) &&
                          task.glossary
                            .filter((t) => s.description.includes(t.term))
                            .map((t) => (
                              <span key={t.term} className="ml-1">
                                <GlossaryPopover
                                  term={t.term}
                                  explanation={t.explanation}
                                />
                              </span>
                            ))}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Documents needed:</span>
                <ul className="list-disc ml-5 text-xs mb-1 mt-1">
                  {task.documents.map((doc) => (
                    <li key={doc}>{doc}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Helpful links:</span>
                <ul className="ml-3">
                  {task.links.map((link) => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:underline"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              {task.faqs.length > 0 && (
                <div className="mb-1">
                  <span className="font-semibold">FAQ:</span>
                  <ul className="mt-0.5 ml-3 list-disc text-xs">
                    {task.faqs.map((faq) => (
                      <li key={faq.q}>
                        <span className="font-medium">{faq.q}</span>
                        <div>{faq.a}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CollapsibleSection>
          </div>
        </div>
      ))}
    </div>
  );
};
