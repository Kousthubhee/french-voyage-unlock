
import React from "react";
export const ModuleBureaucracy = () => (
  <div className="space-y-6">
    <section>
      <h3 className="font-bold mb-2">1. Polite Phrases for Navigating Prefectures, OFII, CAF, CPAM</h3>
      <ul className="list-disc pl-8">
        <li>Bonjour, je suis ici pour... (Good morning, I’m here for...)</li>
        <li>Pourriez-vous m’aider ? (Could you help me?)</li>
        <li>Je ne comprends pas, pouvez-vous expliquer ? (I don’t understand, can you explain?)</li>
      </ul>
    </section>
    <section>
      <h3 className="font-bold mb-2">2. How to Handle Administrative Frustrations Respectfully</h3>
      <ul className="list-disc pl-8">
        <li>Stay calm and polite, say "Je suis désolé(e)"</li>
        <li>Ask to speak to a supervisor if needed</li>
        <li>Bring all documents and copies</li>
      </ul>
    </section>
    <section>
      <h3 className="font-bold mb-2">3. Template Emails & Scripts for Polite Follow-ups</h3>
      <ul className="list-disc pl-8">
        <li>
          <b>Example:</b>
          <div className="bg-gray-50 border p-2 rounded mt-1 text-xs">
            Subject: Suivi de ma demande (Follow-up on my request)
            <br /><br />
            Bonjour Madame/Monsieur,<br />
            Je vous écris concernant ma demande du [date]. Merci de me tenir informé(e).<br />
            Cordialement, [Your Name]
          </div>
        </li>
        <li>
          Call script: Bonjour, je suis [Name], j’appelle pour suivre ma demande.
        </li>
      </ul>
    </section>
  </div>
);
