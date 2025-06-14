
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export function PracticalLivingSection() {
  return (
    <Accordion type="multiple" className="mb-8">
      <AccordionItem value="weather">
        <AccordionTrigger>Weather & Seasonal Tips</AccordionTrigger>
        <AccordionContent>
          Preparation: Clothes for June, fall, winter; activities
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="transport">
        <AccordionTrigger>Public Transport</AccordionTrigger>
        <AccordionContent>
          Tips: Navigo passes, apps, discounts, bike use
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
