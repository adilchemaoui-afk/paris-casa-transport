export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-cream py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-bold text-moroccan-red mb-8">
          Mentions légales
        </h1>

        <div className="bg-white rounded-2xl shadow-md p-8 space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-deep-brown mb-3">Éditeur du site</h2>
            <p>Paris Casa Transport<br />
            Siège social : Paris, France<br />
            Email : contact@pariscasa-transport.com<br />
            Téléphone : +33 6 12 34 56 78</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-deep-brown mb-3">Hébergement</h2>
            <p>Ce site est hébergé par Vercel Inc.<br />
            340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-deep-brown mb-3">Propriété intellectuelle</h2>
            <p>L'ensemble du contenu de ce site (textes, images, logos, code) est la propriété exclusive de Paris Casa Transport. Toute reproduction ou utilisation sans autorisation préalable est interdite.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-deep-brown mb-3">Responsabilité</h2>
            <p>Paris Casa Transport s'efforce de garantir l'exactitude des informations publiées sur ce site. Toutefois, elle ne peut être tenue responsable d'erreurs ou d'omissions.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-deep-brown mb-3">Loi applicable</h2>
            <p>Les présentes mentions légales sont régies par la loi française. En cas de litige, les tribunaux français seront compétents.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
