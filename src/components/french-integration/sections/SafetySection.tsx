
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export function SafetySection() {
  return (
    <Accordion type="multiple" className="mb-8">
      <AccordionItem value="emergency-contacts">
        <AccordionTrigger>Emergency Contacts</AccordionTrigger>
        <AccordionContent>
          Resources: 112, 17, 15; university help; night safety; lost documents
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
