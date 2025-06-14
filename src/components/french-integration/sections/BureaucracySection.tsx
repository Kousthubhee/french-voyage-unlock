
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export function BureaucracySection() {
  return (
    <Accordion type="multiple" className="mb-8">
      <AccordionItem value="polite-phrases">
        <AccordionTrigger>Polite Phrases</AccordionTrigger>
        <AccordionContent>
          Phrases: Je suis ici pour..., Pouvez-vous m’aider ?, Je ne comprends pas...
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="frustrations">
        <AccordionTrigger>Handling Frustrations</AccordionTrigger>
        <AccordionContent>
          Tips: Stay calm, ask supervisor, bring documents
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="templates">
        <AccordionTrigger>Email & Call Templates</AccordionTrigger>
        <AccordionContent>
          Example: Email + phone call script for follow-ups
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
