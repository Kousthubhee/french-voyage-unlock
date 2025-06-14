
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export function CulturalComparisonSection() {
  return (
    <Accordion type="multiple" className="mb-8">
      <AccordionItem value="education-system">
        <AccordionTrigger>Education System</AccordionTrigger>
        <AccordionContent>
          Comparison: Lecture-based, critical thinking, flexible schedules
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="workplace">
        <AccordionTrigger>Workplace Communication</AccordionTrigger>
        <AccordionContent>
          Comparison: Direct, formal, balanced lifestyle
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="values">
        <AccordionTrigger>Value Systems</AccordionTrigger>
        <AccordionContent>
          Comparison: Individualism, equality, independence
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="formality-hierarchy">
        <AccordionTrigger>Formality & Hierarchy</AccordionTrigger>
        <AccordionContent>
          Comparison: Low hierarchy, informal after rapport
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
