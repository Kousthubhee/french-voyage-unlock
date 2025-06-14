
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export function FestivalsEventsSection() {
  return (
    <Accordion type="multiple" className="mb-8">
      <AccordionItem value="public-holidays">
        <AccordionTrigger>Public Holidays & Events</AccordionTrigger>
        <AccordionContent>
          2025 Holidays: Jan 1, May 1, July 14, Dec 25, etc.<br />
          Events: Fête de la Musique, Tour de France, Summer Sales
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="joining-local-events">
        <AccordionTrigger>Joining Local Events</AccordionTrigger>
        <AccordionContent>
          Options: Meetup, Erasmus, city fests
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="potluck">
        <AccordionTrigger>Hosting/Attending Potluck</AccordionTrigger>
        <AccordionContent>
          Tips: Bring a dish, be fashionably late, help, thank host
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
