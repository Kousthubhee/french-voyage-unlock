
import React from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

// Helper for list rendering
const Bullet = ({ children }: { children: React.ReactNode }) => (
  <li className="mb-1">{children}</li>
);

export function FrenchIntegrationTabs() {
  return (
    <Tabs defaultValue="lang" className="w-full">
      <TabsList className="flex flex-wrap gap-2 mb-6 bg-gray-100 mt-2">
        <TabsTrigger value="lang">🗣️ Language</TabsTrigger>
        <TabsTrigger value="etiquette">🤝 Etiquette</TabsTrigger>
        <TabsTrigger value="food">🍽️ Food/Living</TabsTrigger>
        <TabsTrigger value="student">🎓 Student Life</TabsTrigger>
        <TabsTrigger value="bureaucracy">📄 Bureaucracy</TabsTrigger>
        <TabsTrigger value="mental">🧠 Mental Health</TabsTrigger>
        <TabsTrigger value="cultural">🌐 Cultural Bridge</TabsTrigger>
        <TabsTrigger value="practical">📍 Practical</TabsTrigger>
        <TabsTrigger value="safety">🛡️ Safety</TabsTrigger>
        <TabsTrigger value="indo">🇮🇳 Indo-French</TabsTrigger>
      </TabsList>

      {/* Language & Communication */}
      <TabsContent value="lang">
        <Card className="mb-4">
          <CardContent>
            <CardTitle className="mb-3">1. Daily French Phrases for Survival</CardTitle>
            <Accordion type="multiple">
              <AccordionItem value="greetings">
                <AccordionTrigger>Greetings</AccordionTrigger>
                <AccordionContent>
                  <ul>
                    <Bullet>Bonjour (Good morning/afternoon) – Used until 6 PM</Bullet>
                    <Bullet>Bonsoir (Good evening) – Used after 6 PM</Bullet>
                    <Bullet>Salut (Hi/Bye) – Informal for friends</Bullet>
                    <Bullet>Au revoir (Goodbye) – Formal farewell</Bullet>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="groceries">
                <AccordionTrigger>Groceries</AccordionTrigger>
                <AccordionContent>
                  <ul>
                    <Bullet>Où est… ? (Where is…?)</Bullet>
                    <Bullet>Combien ça coûte ? (How much does it cost?)</Bullet>
                    <Bullet>Je voudrais… (I would like…)</Bullet>
                    <Bullet>Avez-vous… ? (Do you have…?)</Bullet>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="emergencies">
                <AccordionTrigger>Emergencies</AccordionTrigger>
                <AccordionContent>
                  <ul>
                    <Bullet>Aidez-moi ! (Help me!)</Bullet>
                    <Bullet>Appelez une ambulance ! (Call an ambulance!)</Bullet>
                    <Bullet>Je ne me sens pas bien. (I don’t feel well.)</Bullet>
                    <Bullet>Où est l’hôpital ? (Where is the hospital?)</Bullet>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <CardTitle className="mt-6 mb-3">2. Slang vs Formal French Usage Guide</CardTitle>
            <ul>
              <Bullet>Use "vous" with strangers, elderly, and professionals</Bullet>
              <Bullet>Use "tu" with friends and peers; slang like "cool" or "sympa"</Bullet>
              <Bullet>Start formal, wait for "tu" invitation</Bullet>
              <Bullet>Avoid slang in business settings</Bullet>
            </ul>
            <CardTitle className="mt-6 mb-3">3. Voice & Pronunciation Practice</CardTitle>
            <ul>
              <Bullet>
                <span>Bonjour <span className="italic">(bohn-zhoor)</span> – Practice nasal “on” sound</span>
              </Bullet>
              <Bullet>
                <span>Merci <span className="italic">(mair-see)</span> – Soft “r” and clear “i”</span>
              </Bullet>
              <Bullet>
                <span>Excusez-moi <span className="italic">(ex-koo-zay-mwa)</span> – Emphasize “mwa”</span>
              </Bullet>
            </ul>
            <CardTitle className="mt-6 mb-3">4. Common Cultural Gestures and What They Mean</CardTitle>
            <ul>
              <Bullet>Shrugging shoulders – Indifference or “I don’t know”</Bullet>
              <Bullet>Cheek kiss (la bise) – Greeting close friends</Bullet>
              <Bullet>Pointing with lips – Directing attention subtly</Bullet>
            </ul>
            <CardTitle className="mt-6 mb-3">5. Conversation Scenarios</CardTitle>
            <ul>
              <Bullet>At a bakery: <span className="italic">Bonjour, une baguette s’il vous plaît.</span></Bullet>
              <Bullet>At prefecture: <span className="italic">Bonjour, je suis ici pour ma carte de séjour.</span></Bullet>
              <Bullet>At doctor’s: <span className="italic">Bonjour, j’ai besoin d’une consultation.</span></Bullet>
            </ul>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Cultural Etiquette */}
      <TabsContent value="etiquette">
        <Card>
          <CardContent>
            <CardTitle className="mb-3">1. French Social Norms</CardTitle>
            <ul>
              <Bullet>Arrive on time for professional meetings</Bullet>
              <Bullet>Maintain arm’s length personal space</Bullet>
              <Bullet>Directness is common, don’t take it personally</Bullet>
            </ul>
            <CardTitle className="mt-6 mb-3">2. Do’s and Don’ts in Public Settings</CardTitle>
            <Accordion type="multiple">
              <AccordionItem value="metro">
                <AccordionTrigger>Métro</AccordionTrigger>
                <AccordionContent>
                  <ul>
                    <Bullet>Keep voice low, no loud calls</Bullet>
                    <Bullet>Offer seats to elderly or pregnant passengers</Bullet>
                    <Bullet>Avoid eating or drinking</Bullet>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="markets">
                <AccordionTrigger>Markets</AccordionTrigger>
                <AccordionContent>
                  <ul>
                    <Bullet>Greet vendors with "Bonjour"</Bullet>
                    <Bullet>Don’t haggle, prices are fixed</Bullet>
                    <Bullet>Carry cash for small purchases</Bullet>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <CardTitle className="mt-6 mb-3">3. Dining Etiquette in France</CardTitle>
            <ul>
              <Bullet>Place bread on table, not plate</Bullet>
              <Bullet>Say "bon appétit" before eating</Bullet>
              <Bullet>Keep hands on table, not lap</Bullet>
              <Bullet>Tipping 5-10% for exceptional service</Bullet>
            </ul>
            <CardTitle className="mt-6 mb-3">4. How to Greet</CardTitle>
            <ul>
              <Bullet>La bise (cheek kisses) for close friends, 2–4 times</Bullet>
              <Bullet>Handshake for formal or first meetings</Bullet>
              <Bullet>Use "Monsieur" or "Madame" with titles</Bullet>
            </ul>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Food & Living */}
      <TabsContent value="food">
        <Card>
          <CardContent>
            <CardTitle className="mb-3">1. French Eating Habits</CardTitle>
            <ul>
              <Bullet>Lunch at 12–2 PM, dinner at 7–9 PM</Bullet>
              <Bullet>Cold food (e.g., salads) common</Bullet>
              <Bullet>Smaller portions, multiple courses</Bullet>
              <Bullet>Coffee after meals, not during</Bullet>
            </ul>
            <CardTitle className="mt-6 mb-3">2. Reading Food Labels and Identifying Dietary Needs</CardTitle>
            <ul>
              <Bullet>Look for "végétarien" or "sans viande"</Bullet>
              <Bullet>Halal marked as "halal" on packaging</Bullet>
              <Bullet>Check ingredients for pork (porc)</Bullet>
              <Bullet>
                Ask staff if unsure: <span className="italic">"Est-ce végétarien/halal ?"</span>
              </Bullet>
            </ul>
            <CardTitle className="mt-6 mb-3">3. Tips for Specialty Grocery Shopping</CardTitle>
            <ul>
              <Bullet>Specialty items at Carrefour or Leclerc</Bullet>
              <Bullet>Visit local Asian or African markets for diverse spices</Bullet>
              <Bullet>Check online stores for international products</Bullet>
              <Bullet>Explore ethnic food shops in major cities</Bullet>
            </ul>
            <CardTitle className="mt-6 mb-3">4. Explaining Allergies or Dietary Restrictions in French</CardTitle>
            <ul>
              <Bullet>Je suis allergique à... (I am allergic to...)</Bullet>
              <Bullet>Je ne mange pas de... (I don’t eat...)</Bullet>
              <Bullet>Pouvez-vous éviter...? (Can you avoid...?)</Bullet>
              <Bullet>Je suis végétarien/vegan. (I am vegetarian/vegan.)</Bullet>
            </ul>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Student Life & Events */}
      <TabsContent value="student">
        <Card>
          <CardContent>
            <CardTitle className="mb-3">1. Housing Etiquette</CardTitle>
            <Accordion type="multiple">
              <AccordionItem value="noise">
                <AccordionTrigger>Noise Limits</AccordionTrigger>
                <AccordionContent>
                  <ul>
                    <Bullet>Quiet hours: 10 PM to 7 AM on weekdays</Bullet>
                    <Bullet>Quiet hours: 10 PM to 8 AM on weekends</Bullet>
                    <Bullet>No loud music after quiet hours</Bullet>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="recycling">
                <AccordionTrigger>Recycling Rules</AccordionTrigger>
                <AccordionContent>
                  <ul>
                    <Bullet>Yellow bins for plastic and metal</Bullet>
                    <Bullet>Blue bins for paper and cardboard</Bullet>
                    <Bullet>Green bins for glass</Bullet>
                    <Bullet>Brown bins for organic waste</Bullet>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="greet-neigh">
                <AccordionTrigger>Greeting Neighbors</AccordionTrigger>
                <AccordionContent>
                  <ul>
                    <Bullet>Introduce yourself when moving in</Bullet>
                    <Bullet>Hold doors for others</Bullet>
                    <Bullet>Keep common areas clean</Bullet>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <CardTitle className="mt-6 mb-3">2. French Academic Culture</CardTitle>
            <Accordion type="multiple">
              <AccordionItem value="participation">
                <AccordionTrigger>Class Participation</AccordionTrigger>
                <AccordionContent>
                  <ul>
                    <Bullet>Raise hand before speaking</Bullet>
                    <Bullet>Address professors as "Monsieur" or "Madame"</Bullet>
                    <Bullet>Participate in discussions</Bullet>
                    <Bullet>Ask questions during designated times</Bullet>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="email">
                <AccordionTrigger>Email Etiquette</AccordionTrigger>
                <AccordionContent>
                  <ul>
                    <Bullet>Use "Monsieur/Madame" in greetings</Bullet>
                    <Bullet>Include clear subject lines</Bullet>
                    <Bullet>End with "Cordialement"</Bullet>
                    <Bullet>Use proper punctuation</Bullet>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <CardTitle className="mt-6 mb-3">3. Volunteering & Community Involvement</CardTitle>
            <ul>
              <Bullet>Join university volunteer programs</Bullet>
              <Bullet>Participate in local charity events</Bullet>
              <Bullet>Engage with student associations</Bullet>
            </ul>
            <CardTitle className="mt-6 mb-3">4. Dealing with Homesickness</CardTitle>
            <ul>
              <Bullet>Connect with international student communities</Bullet>
              <Bullet>Attend cultural events to feel connected</Bullet>
              <Bullet>Join online forums for expatriates</Bullet>
            </ul>
            <CardTitle className="mt-6 mb-3">5. Part-Time Work and Internships</CardTitle>
            <ul>
              <Bullet>Allowed 964 hours/year part-time, get work permit via prefecture</Bullet>
              <Bullet>Check university job boards, Indeed France, or LinkedIn for internships</Bullet>
              <Bullet>Dress formally for interviews, emphasize teamwork skills</Bullet>
              <Bullet>Basic French often required, improve with daily practice</Bullet>
            </ul>
            <CardTitle className="mt-6 mb-3">6. Financial Planning for Students</CardTitle>
            <ul>
              <Bullet>Monthly Costs: Rent €400–700, food €200–300, transport €50–100</Bullet>
              <Bullet>Apply for CAF housing aid, student meal vouchers (1.50€/meal)</Bullet>
              <Bullet>Shop at discount stores (Lidl, Aldi), use second-hand markets</Bullet>
              <Bullet>Open a free student account at BNP Paribas or Société Générale</Bullet>
            </ul>
            <CardTitle className="mt-6 mb-3">7. Festivals & Social Events</CardTitle>
            <Accordion type="multiple">
              <AccordionItem value="holidays-events">
                <AccordionTrigger>French Public Holidays and Cultural Events (2025)</AccordionTrigger>
                <AccordionContent>
                  <ul>
                    <Bullet>New Year’s Day (January 1)</Bullet>
                    <Bullet>Easter Monday (April 21)</Bullet>
                    <Bullet>Labor Day (May 1)</Bullet>
                    <Bullet>Victory Day (May 8)</Bullet>
                    <Bullet>Ascension Day (May 29)</Bullet>
                    <Bullet>Whit Monday (June 9)</Bullet>
                    <Bullet>Bastille Day (July 14)</Bullet>
                    <Bullet>Assumption Day (August 15)</Bullet>
                    <Bullet>All Saints’ Day (November 1)</Bullet>
                    <Bullet>Armistice Day (November 11)</Bullet>
                    <Bullet>Christmas Day (December 25)</Bullet>
                  </ul>
                  <b className="block my-2">Events</b>
                  <ul>
                    <Bullet>Fête de la Musique (June 21)</Bullet>
                    <Bullet>Tour de France (July 5–27)</Bullet>
                    <Bullet>Summer Sales (June 25–July 22)</Bullet>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="join-meetups">
                <AccordionTrigger>Joining Local Events & Meetups</AccordionTrigger>
                <AccordionContent>
                  <ul>
                    <Bullet>Use Meetup for local groups</Bullet>
                    <Bullet>Join Erasmus events at universities</Bullet>
                    <Bullet>Attend city festivals (e.g., Nice Carnival)</Bullet>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="potluck">
                <AccordionTrigger>How to Host/Attend a Potluck or Party in France</AccordionTrigger>
                <AccordionContent>
                  <ul>
                    <Bullet>Bring a dish to share</Bullet>
                    <Bullet>Arrive 15 minutes late (quart d’heure de politesse)</Bullet>
                    <Bullet>Offer to help clean up</Bullet>
                    <Bullet>Thank host with "Merci pour l’invitation"</Bullet>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Bureaucracy & Everyday Life */}
      <TabsContent value="bureaucracy">
        <Card>
          <CardContent>
            <CardTitle className="mb-3">1. Polite Phrases for Navigating Prefectures, OFII, CAF, CPAM</CardTitle>
            <ul>
              <Bullet>Bonjour, je suis ici pour... (Good morning, I’m here for...)</Bullet>
              <Bullet>Pourriez-vous m’aider ? (Could you help me?)</Bullet>
              <Bullet>Je ne comprends pas, pouvez-vous expliquer ? (I don’t understand, can you explain?)</Bullet>
            </ul>
            <CardTitle className="mt-6 mb-3">2. How to Handle Administrative Frustrations Respectfully</CardTitle>
            <ul>
              <Bullet>Stay calm and polite, say "Je suis désolé(e)"</Bullet>
              <Bullet>Ask to speak to a supervisor if needed</Bullet>
              <Bullet>Bring all documents and copies</Bullet>
            </ul>
            <CardTitle className="mt-6 mb-3">3. Template Emails & Scripts for Polite Follow-ups</CardTitle>
            <div>
              <b>Example Email:</b>
              <div className="bg-gray-100 p-2 my-2 rounded">
                Subject: Suivi de ma demande (Follow-up on my request)<br />
                Bonjour Madame/Monsieur, Je vous écris concernant ma demande du [date].<br />
                Merci de me tenir informé(e).<br />
                Cordialement, [Your Name]
              </div>
              <b>Call script:</b>
              <div className="bg-gray-100 p-2 my-2 rounded">
                Bonjour, je suis [Name], j’appelle pour suivre ma demande.
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Mental Health & Practical Living */}
      <TabsContent value="mental">
        <Card>
          <CardContent>
            <CardTitle className="mb-3">1. Tips for Culture Shock Management</CardTitle>
            <ul>
              <Bullet>Take time to adjust, explore gradually</Bullet>
              <Bullet>Keep a routine (e.g., daily walks)</Bullet>
              <Bullet>Connect with other internationals</Bullet>
            </ul>
            <CardTitle className="mt-6 mb-3">2. Where to Find Support Groups</CardTitle>
            <ul>
              <Bullet>International Student Associations at universities</Bullet>
              <Bullet>Local community centers</Bullet>
              <Bullet>Online groups (e.g., Facebook expat groups)</Bullet>
            </ul>
            <CardTitle className="mt-6 mb-3">3. Mindfulness or Meditation Resources</CardTitle>
            <ul>
              <Bullet>Apps: Headspace (English)</Bullet>
              <Bullet>Online: YouTube meditation videos</Bullet>
              <Bullet>Local yoga classes in cities</Bullet>
            </ul>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Cultural Comparison & Indo-French Integration */}
      <TabsContent value="cultural">
        <Card>
          <CardContent>
            <CardTitle className="mb-3">1. Education System Differences</CardTitle>
            <ul>
              <Bullet>French system: Lecture-based with group projects</Bullet>
              <Bullet>Emphasis on critical thinking and discussion</Bullet>
              <Bullet>Flexible schedules with independent study</Bullet>
            </ul>
            <CardTitle className="mt-6 mb-3">2. Workplace Communication Styles</CardTitle>
            <ul>
              <Bullet>French style: Direct and formal</Bullet>
              <Bullet>Debate and discussion encouraged</Bullet>
              <Bullet>Focus on work-life balance</Bullet>
            </ul>
            <CardTitle className="mt-6 mb-3">3. Value Systems: Collectivist vs Individualist</CardTitle>
            <ul>
              <Bullet>France: Individualist, prioritizes personal freedom</Bullet>
              <Bullet>Emphasis on equality in social settings</Bullet>
              <Bullet>Value privacy and independence</Bullet>
            </ul>
            <CardTitle className="mt-6 mb-3">4. Formality and Hierarchy Differences</CardTitle>
            <ul>
              <Bullet>Less hierarchical, titles used formally</Bullet>
              <Bullet>Informal after rapport is built</Bullet>
              <Bullet>Respect for personal boundaries</Bullet>
            </ul>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Practical Living */}
      <TabsContent value="practical">
        <Card>
          <CardContent>
            <CardTitle className="mb-3">1. Weather Awareness and Seasonal Tips</CardTitle>
            <ul>
              <Bullet>June is warm (20–25°C), bring light clothing, sunscreen, stay hydrated</Bullet>
              <Bullet>Autumn (September–November) rainy, carry umbrella, waterproof shoes</Bullet>
              <Bullet>Winter (December–February) cold (0–5°C), pack warm coats, scarves</Bullet>
              <Bullet>Join winter markets or summer beach activities in coastal cities</Bullet>
            </ul>
            <CardTitle className="mt-6 mb-3">2. Navigating French Public Transport</CardTitle>
            <ul>
              <Bullet>Buy Navigo pass in Paris or city-specific cards, validate tickets</Bullet>
              <Bullet>Check SNCF or RATP apps for train/métro times, especially during holidays</Bullet>
              <Bullet>Show student ID for 50–75% off train tickets (SNCF Carte Jeune)</Bullet>
              <Bullet>Use Vélib’ in Paris or city bikes, follow lane rules</Bullet>
            </ul>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Safety */}
      <TabsContent value="safety">
        <Card>
          <CardContent>
            <CardTitle className="mb-3">1. Emergency Contacts and Safety Tips</CardTitle>
            <ul>
              <Bullet>Helplines: 112 (emergency), 17 (police), 15 (medical)</Bullet>
              <Bullet>Contact university security for on-campus issues</Bullet>
              <Bullet>Avoid isolated areas at night, stay in well-lit zones</Bullet>
              <Bullet>Lost documents: Report to prefecture and your embassy</Bullet>
            </ul>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Indo-French Integration */}
      <TabsContent value="indo">
        <Card>
          <CardContent>
            <CardTitle className="mb-3">1. Indo-French Cultural Comparison</CardTitle>
            <Accordion type="multiple">
              <AccordionItem value="educationI">
                <AccordionTrigger>Education</AccordionTrigger>
                <AccordionContent>
                  <ul>
                    <Bullet>France: Lecture-based, India: Exam-focused</Bullet>
                    <Bullet>France: Group projects, India: Individual study</Bullet>
                    <Bullet>France: Flexible schedules, India: Structured</Bullet>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="workplaceI">
                <AccordionTrigger>Workplace</AccordionTrigger>
                <AccordionContent>
                  <ul>
                    <Bullet>France: Direct and formal, India: Respectful and indirect</Bullet>
                    <Bullet>France: Debate encouraged, India: Hierarchy respected</Bullet>
                    <Bullet>France: Work-life balance, India: Long hours</Bullet>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="valuesI">
                <AccordionTrigger>Values</AccordionTrigger>
                <AccordionContent>
                  <ul>
                    <Bullet>France: Individualist, India: Collectivist (family/community focus)</Bullet>
                    <Bullet>France: Equality in social settings, India: Respect for elders</Bullet>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="formalityI">
                <AccordionTrigger>Formality and Hierarchy</AccordionTrigger>
                <AccordionContent>
                  <ul>
                    <Bullet>France: Less hierarchical, India: Strong hierarchy by age/status</Bullet>
                    <Bullet>France: Informal after rapport, India: Formal longer</Bullet>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <CardTitle className="mt-6 mb-3">2. Indian Community Resources</CardTitle>
            <ul>
              <Bullet>Join Indian Student Associations at universities</Bullet>
              <Bullet>Visit temples (e.g., Sri Sri Radha Krishna Temple in Paris)</Bullet>
              <Bullet>Connect via online groups (e.g., Facebook Indian in France)</Bullet>
            </ul>
            <CardTitle className="mt-6 mb-3">3. Indian Dietary Preferences</CardTitle>
            <Accordion type="multiple">
              <AccordionItem value="grocerytipsI">
                <AccordionTrigger>Grocery Tips</AccordionTrigger>
                <AccordionContent>
                  <ul>
                    <Bullet>Find dal, masala, and atta at Indian stores or Carrefour</Bullet>
                    <Bullet>Rice and spices at Tang Frères or ethnic markets</Bullet>
                    <Bullet>Check for vegetarian/halal labels</Bullet>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="phrasesI">
                <AccordionTrigger>Phrases</AccordionTrigger>
                <AccordionContent>
                  <ul>
                    <Bullet>Je suis végétarien et j’évite le porc. (I am vegetarian and avoid pork.)</Bullet>
                    <Bullet>Avez-vous des plats sans viande ? (Do you have meat-free dishes?)</Bullet>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <CardTitle className="mt-6 mb-3">4. Managing Homesickness with Indian Context</CardTitle>
            <ul>
              <Bullet>Connect with Indian student communities</Bullet>
              <Bullet>Celebrate festivals like Diwali with local groups</Bullet>
              <Bullet>Cook familiar dishes to feel at home</Bullet>
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
