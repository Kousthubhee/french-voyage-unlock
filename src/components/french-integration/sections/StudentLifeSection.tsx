
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export function StudentLifeSection() {
  return (
    <Accordion type="multiple" className="mb-8">
      <AccordionItem value="housing">
        <AccordionTrigger>Housing Etiquette</AccordionTrigger>
        <AccordionContent>
          Noise Limits: Quiet hours (weekdays/weekends)<br />
          Recycling Rules: Yellow, blue, green, brown bins<br />
          Greeting Neighbors: Introductions, doors, cleanliness
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="academic-culture">
        <AccordionTrigger>French Academic Culture</AccordionTrigger>
        <AccordionContent>
          Class Participation: Raise hand, address properly<br />
          Email Etiquette: Greetings, subject lines, closings
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="volunteering">
        <AccordionTrigger>Volunteering</AccordionTrigger>
        <AccordionContent>
          Options: University programs, local charities, associations
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="homesickness">
        <AccordionTrigger>Homesickness</AccordionTrigger>
        <AccordionContent>
          Support: Connect with internationals, events, forums
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="part-time-work">
        <AccordionTrigger>Part-Time Work</AccordionTrigger>
        <AccordionContent>
          Guidelines: Hour limits, job search tips, French skills
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="financial-planning">
        <AccordionTrigger>Financial Planning</AccordionTrigger>
        <AccordionContent>
          Tips: Cost breakdown, CAF aid, discount stores, student banks
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
