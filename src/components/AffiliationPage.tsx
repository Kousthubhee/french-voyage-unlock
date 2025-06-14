import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, ExternalLink, Star, Users } from 'lucide-react';

export const AffiliationPage = () => {
  const partners = [
    // BANKING PARTNERS
    {
      id: 1,
      name: 'HDFC Bank (India)',
      type: 'Banking Partner',
      description: 'Preferred Indian bank offering international education loans and forex cards for students going abroad.',
      services: ['Student loans', 'Forex card', 'Remittance'],
      rating: 4.7,
      users: '1M+',
      logo: '🏦',
      website: 'https://www.hdfcbank.com/personal/borrow/education-loan',
      affiliate: true
    },
    {
      id: 2,
      name: 'Niyo Global',
      type: 'Neobank',
      description: 'A global card for Indian students—easy international transactions, great forex rates, and student discounts.',
      services: ['Prepaid forex card', 'Zero mark-up', 'Easy account opening'],
      rating: 4.8,
      users: '500K+',
      logo: '💳',
      website: 'https://www.goniyo.com/niyo-global/',
      affiliate: true
    },
    {
      id: 3,
      name: 'BNP Paribas',
      type: 'French Bank',
      description: 'Top French bank trusted by international students for easy account opening and affordable services.',
      services: ['Bank account', 'Student offers', 'Nationwide branches'],
      rating: 4.5,
      users: '10M+',
      logo: '🇫🇷',
      website: 'https://mabanque.bnpparibas/en/opening-bank-account/france-student',
      affiliate: true
    },
    {
      id: 4,
      name: 'Société Générale',
      type: 'French Bank',
      description: 'Popular among students, offers special packages and English-speaking support for internationals.',
      services: ['Student bank account', 'International card', 'Mobile banking'],
      rating: 4.4,
      users: '5M+',
      logo: '🏛️',
      website: 'https://www.societegenerale.com/en/individuals/france/students',
      affiliate: true
    },
    {
      id: 5,
      name: 'Wise (ex-TransferWise)',
      type: 'Money Transfer',
      description: 'Send money abroad with real exchange rates and low fees, perfect for fees and living expenses.',
      services: ['International transfer', 'Multi-currency account'],
      rating: 4.9,
      users: '16M+',
      logo: '🌍',
      website: 'https://wise.com/in/student/',
      affiliate: true
    },
    {
      id: 6,
      name: 'Revolut',
      type: 'Neobank',
      description: 'Open a Euro account before arriving in France. Card works globally. App for students.',
      services: ['Mobile account', 'Free card', 'Easy signup'],
      rating: 4.8,
      users: '30M+',
      logo: '💸',
      website: 'https://www.revolut.com',
      affiliate: true
    },
    // SIM/MOBILE OPERATORS
    {
      id: 7,
      name: 'Orange France',
      type: 'SIM Card & Telecom',
      description: 'France’s largest mobile network provider. Get a French SIM at airport or online.',
      services: ['Prepaid SIM', 'Student offers', 'Nationwide coverage'],
      rating: 4.3,
      users: '20M+',
      logo: '📱',
      website: 'https://boutique.orange.fr/mobile/cartes-sim-prepayees',
      affiliate: true
    },
    {
      id: 8,
      name: 'Free Mobile',
      type: 'SIM Card & Telecom',
      description: 'Student-friendly prepaid plans—get a SIM quickly at airport kiosks or partner stores.',
      services: ['Prepaid SIM', 'Affordable plans', 'No contract'],
      rating: 4.2,
      users: '13M+',
      logo: '📶',
      website: 'https://mobile.free.fr/forfaits/forfait-free-2-euros.html',
      affiliate: false
    },
    {
      id: 9,
      name: 'Bouygues Telecom',
      type: 'SIM Card & Telecom',
      description: 'Great coverage, affordable SIM plans, English-speaking support for internationals.',
      services: ['Prepaid SIM', 'Student promotions'],
      rating: 4.2,
      users: '15M+',
      logo: '📲',
      website: 'https://www.bouyguestelecom.fr/forfaits-mobiles/cartes-prepayees',
      affiliate: false
    },
    {
      id: 10,
      name: 'SFR',
      type: 'SIM Card & Telecom',
      description: 'Major French operator. Various prepaid and 4G/5G SIM offers for students.',
      services: ['Prepaid SIM', '4G/5G data', 'Student discounts'],
      rating: 4.0,
      users: '17M+',
      logo: '📡',
      website: 'https://www.sfr.fr/offre-mobile-forfait-mobile.html',
      affiliate: false
    },
    // ... keep some institutional partners (Campus France etc.) if space
    {
      id: 11,
      name: 'Campus France',
      type: 'Govt. Agency',
      description: 'Official agency for French study—guides students with visas, university selection, and scholarships.',
      services: ['Visa guidance', 'University advice', 'Scholarship info'],
      rating: 4.8,
      users: '100K+',
      logo: '🎓',
      website: 'https://www.campusfrance.org/en'
    },
    {
      id: 12,
      name: 'CAF',
      type: 'Financial Support',
      description: 'France family support agency—apply for student housing and monthly financial aid.',
      services: ['CAF housing aid', 'Social benefits'],
      rating: 4.2,
      users: '2M+',
      logo: '💰',
      website: 'https://www.caf.fr'
    },
  ];

  const partnershipBenefits = [
    'Get the best deals for students via our affiliate links',
    'Direct access to official and private providers',
    'Streamlined banking and telecom onboarding',
    'Trusted services and supports',
    'Priority consultancy support if you use our links'
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Building2 className="h-8 w-8 mr-3 text-red-600" />
          Our Partners & Student Offers
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We connect you with trusted banks, NeoBanks, SIM providers, and institutions to help you settle in France. 
          By registering or opening an account using our links, you support our student consultancy and get special benefits.
        </p>
      </div>

      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Partnership Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partnershipBenefits.map((benefit, index) => (
              <div key={index} className="flex items-center">
                <div className="text-blue-600 mr-2">✓</div>
                <span className="text-blue-800">{benefit}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <Card key={partner.id} className={`hover:shadow-lg transition-all duration-300 hover:scale-105 ${partner.affiliate ? 'border-2 border-green-300' : ''}`}>
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{partner.logo}</div>
                <h3 className="text-lg font-semibold text-gray-900">{partner.name}</h3>
                <span className={`text-sm px-2 py-1 rounded
                  ${
                    partner.type === 'SIM Card & Telecom'
                      ? 'bg-orange-100 text-orange-600'
                      : partner.type.toLowerCase().includes('bank')
                      ? 'bg-green-100 text-green-600'
                      : 'bg-blue-100 text-blue-600'
                  }`
                }>
                  {partner.type}
                </span>
                {partner.affiliate && (
                  <span className="ml-2 text-xs bg-green-200 text-green-800 px-2 py-1 rounded inline-block">Affiliate</span>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-4 text-center">
                {partner.description}
              </p>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span>{partner.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-400 mr-1" />
                    <span>{partner.users}</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-gray-500 mb-2">Services:</div>
                  <div className="flex flex-wrap gap-1">
                    {partner.services.map((service, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className={`w-full ${partner.affiliate ? 'bg-green-600 hover:bg-green-700 text-white' : ''}`} size="sm" variant={partner.affiliate ? "default" : "outline"}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit {new URL(partner.website).hostname}
                </Button>
              </a>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8 bg-green-50 border-green-200">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold text-green-900 mb-4">
            Why Use Our Affiliate/Referral Links?
          </h3>
          <p className="text-green-700 mb-4 max-w-2xl mx-auto">
            By opening your account, applying for a loan, or getting a SIM card with our listed partners using the above links, 
            you support our consultancy at zero extra cost and often unlock exclusive rates or student bonuses. This helps us keep offering free guidance and services for students like you!
            <br />
            <span className="text-green-900 font-semibold">Thank you for supporting our student community!</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-green-600 hover:bg-green-700">
              Partnership Inquiry
            </Button>
            <Button variant="outline" className="border-green-600 text-green-600">
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
