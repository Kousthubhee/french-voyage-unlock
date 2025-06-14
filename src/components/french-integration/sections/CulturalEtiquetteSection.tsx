
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export function CulturalEtiquetteSection() {
  return (
    <Accordion type="multiple" className="mb-8">
      <AccordionItem value="social-norms">
        <AccordionTrigger>French Social Norms</AccordionTrigger>
        <AccordionContent>
          General Norms: Punctuality, personal space, directness
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="public-settings">
        <AccordionTrigger>Do’s and Don’ts in Public Settings</AccordionTrigger>
        <AccordionContent>
          <b>Métro:</b> Be quiet, offer seats, no food
          <br />
          <b>Markets:</b> Greet vendors, don’t haggle, carry cash
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="dining">
        <AccordionTrigger>Dining Etiquette</AccordionTrigger>
        <AccordionContent>
          Rules: Bread on table, say "bon appétit", hands on table, tipping
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="greeting">
        <AccordionTrigger>How to Greet</AccordionTrigger>
        <AccordionContent>
          Methods: La bise, handshake, use titles
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
