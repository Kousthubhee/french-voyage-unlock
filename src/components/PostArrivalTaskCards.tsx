
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ReminderButton } from "@/components/ReminderButton";

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

function CollapsibleSection({
  trigger,
  children,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button
        variant="ghost"
        size="sm"
        className="px-2 font-medium underline decoration-dotted"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "Hide Details ▲" : "Show Details ▼"}
      </Button>
      {open && <div className="mt-4">{children}</div>}
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

  return (
    <div className="space-y-7">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`relative bg-white border ${
            task.priority === "urgent" ? "border-red-200" : "border-yellow-200"
          } rounded-xl shadow-sm px-8 py-6`}
        >
          {/* Top Row: title, actions right */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
            <div className="flex items-center gap-2">
              <span
                className={
                  task.priority === "urgent"
                    ? "text-blue-600 text-2xl"
                    : "text-yellow-700 text-2xl"
                }
              >
                {task.icon}
              </span>
              <span className="text-xl font-bold text-gray-900 mr-2">{task.title}</span>
              {task.priority === "urgent" && (
                <span className="ml-1 px-3 py-1 bg-red-50 text-red-700 text-xs rounded-full font-semibold">
                  urgent
                </span>
              )}
              {task.priority === "high" && (
                <span className="ml-1 px-3 py-1 bg-yellow-50 text-yellow-800 text-xs rounded-full font-semibold">
                  high
                </span>
              )}
            </div>
            {/* Actions on right */}
            <div className="flex gap-2 items-center mt-3 md:mt-0">
              <ReminderButton
                date={reminders[task.id]}
                onSet={(dt) => setReminders({ ...reminders, [task.id]: dt })}
              />
              {!completedSteps.includes(task.id) ? (
                <Button
                  size="sm"
                  className="bg-gray-900 text-white rounded-md px-4 py-1"
                  onClick={() => handleStep(task.id)}
                >
                  Mark Complete
                </Button>
              ) : (
                <span className="text-green-600 font-medium text-xs">Completed</span>
              )}
              <CollapsibleSection trigger="Show Details">
                {/* Details rendered lower, see below */}
              </CollapsibleSection>
            </div>
          </div>
          {/* Description and timeline below title */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
            <div className="text-gray-700 text-base font-normal flex-1">
              {task.description}
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-medium">Timeline:&nbsp;</span>
              {task.timeline}
            </div>
          </div>
          {/* Collapsible Details BELOW */}
          <div>
            <CollapsibleSection trigger={null}>
              <div className="mb-3">
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
              <div className="mb-3">
                <span className="font-semibold">Documents needed:</span>
                <ul className="list-disc ml-5 text-xs mb-1 mt-1">
                  {task.documents.map((doc) => (
                    <li key={doc}>{doc}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-3">
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
                <div className="mb-2">
                  <span className="font-semibold">FAQ:</span>
                  <ul className="mt-0.5 ml-3 list-disc text-xs">
                    {task.faqs.map((faq) => (
                      <li key={faq.q} className="mb-2">
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
