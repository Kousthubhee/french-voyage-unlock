
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export function FoodGrocerySection() {
  return (
    <Accordion type="multiple" className="mb-8">
      <AccordionItem value="habits">
        <AccordionTrigger>French Eating Habits</AccordionTrigger>
        <AccordionContent>
          General Habits: Meal times, portion sizes, coffee after meals
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="labels">
        <AccordionTrigger>Reading Food Labels</AccordionTrigger>
        <AccordionContent>
          Tips: Vegetarian/halal markers, pork = "porc", ask staff
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="specialty">
        <AccordionTrigger>Specialty Grocery Shopping</AccordionTrigger>
        <AccordionContent>
          Where to Find: Carrefour, Asian markets, online stores, ethnic shops
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="allergies">
        <AccordionTrigger>Explaining Allergies</AccordionTrigger>
        <AccordionContent>
          Phrases: Allergies, avoiding food, being vegetarian/vegan
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
