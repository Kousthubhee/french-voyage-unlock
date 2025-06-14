
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export function LanguageCommunicationSection() {
  return (
    <Accordion type="multiple" className="mb-8">
      <AccordionItem value="daily-phrases">
        <AccordionTrigger>Daily French Phrases for Survival</AccordionTrigger>
        <AccordionContent>
          <div>
            <b>Greetings:</b> Bonjour, Bonsoir, Salut, Au revoir<br />
            <b>Groceries:</b> Où est... ?, Combien ça coûte ?, Je voudrais..., Avez-vous...?<br />
            <b>Emergencies:</b> Aidez-moi !, Appelez une ambulance !, Je ne me sens pas bien., Où est l’hôpital ?
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="slang-formal">
        <AccordionTrigger>Slang vs Formal French Usage Guide</AccordionTrigger>
        <AccordionContent>
          Usage Guide: Use "vous"/"tu", avoid slang in business, wait for "tu" invite
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="voice-pronunciation">
        <AccordionTrigger>Voice & Pronunciation Practice</AccordionTrigger>
        <AccordionContent>
          Key Phrases: Pronunciations of Bonjour, Merci, Excusez-moi
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="gestures">
        <AccordionTrigger>Common Cultural Gestures</AccordionTrigger>
        <AccordionContent>
          Gestures: Shoulder shrug, la bise, pointing with lips
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="scenarios">
        <AccordionTrigger>Conversation Scenarios</AccordionTrigger>
        <AccordionContent>
          Examples: At boulangerie, prefecture, doctor’s
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
