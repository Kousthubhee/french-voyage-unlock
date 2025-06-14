
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export function IndoFrenchSection() {
  return (
    <Accordion type="multiple" className="mb-8">
      <AccordionItem value="comparison">
        <AccordionTrigger>Cultural Comparison</AccordionTrigger>
        <AccordionContent>
          Differences: Education, workplace, values, hierarchy
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="community">
        <AccordionTrigger>Community Resources</AccordionTrigger>
        <AccordionContent>
          Support Options: Indian associations, temples, Facebook groups
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="food">
        <AccordionTrigger>Indian Food Preferences</AccordionTrigger>
        <AccordionContent>
          Grocery Tips: Where to shop, label checks
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="phrases">
        <AccordionTrigger>Phrases</AccordionTrigger>
        <AccordionContent>
          Phrases: Dietary declarations in French
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="homesickness">
        <AccordionTrigger>Homesickness</AccordionTrigger>
        <AccordionContent>
          Strategies: Community, festivals, cooking familiar food
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
