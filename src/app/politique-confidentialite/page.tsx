export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen bg-cream py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-bold text-moroccan-red mb-8">
          Politique de confidentialité
        </h1>

        <div className="bg-white rounded-2xl shadow-md p-8 space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-deep-brown mb-3">Collecte des données</h2>
            <p>Nous collectons les informations suivantes lorsque vous remplissez un formulaire de devis ou de contact : nom, email, téléphone, entreprise, et détails de votre demande de transport.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-deep-brown mb-3">Finalité du traitement</h2>
            <p>Vos données sont utilisées uniquement pour :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Traiter vos demandes de devis</li>
              <li>Vous contacter concernant votre demande</li>
              <li>Envoyer des emails de confirmation</li>
              <li>Améliorer nos services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-deep-brown mb-3">Conservation</h2>
            <p>Vos données sont conservées pendant 3 ans à compter du dernier contact, conformément aux obligations légales françaises.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-deep-brown mb-3">Vos droits</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants : accès, rectification, effacement, limitation du traitement, portabilité, et opposition. Pour exercer ces droits, contactez-nous à privacy@pariscasa-transport.com.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-deep-brown mb-3">Sécurité</h2>
            <p>Vos données sont stockées sur des serveurs sécurisés (Supabase) et ne sont jamais vendues à des tiers. Les communications sont chiffrées via HTTPS.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-deep-brown mb-3">Cookies</h2>
            <p>Ce site utilise uniquement des cookies techniques nécessaires au fonctionnement du site. Aucun cookie de traçage publicitaire n'est utilisé.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
