
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export function MentalHealthSection() {
  return (
    <Accordion type="multiple" className="mb-8">
      <AccordionItem value="culture-shock">
        <AccordionTrigger>Culture Shock</AccordionTrigger>
        <AccordionContent>
          Strategies: Gradual exposure, routines, connections
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="support-groups">
        <AccordionTrigger>Support Groups</AccordionTrigger>
        <AccordionContent>
          Resources: Associations, community centers, Facebook
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="mindfulness">
        <AccordionTrigger>Mindfulness</AccordionTrigger>
        <AccordionContent>
          Options: Headspace, YouTube, yoga classes
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
