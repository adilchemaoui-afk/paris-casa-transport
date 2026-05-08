-- Création des tables pour Paris Casa Livraison
-- À exécuter dans l'éditeur SQL de Supabase Studio

-- Table des contacts
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Table des devis
CREATE TABLE IF NOT EXISTS quotes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company_name TEXT,
  shipment_type TEXT NOT NULL,
  origin_country TEXT NOT NULL,
  origin_city TEXT NOT NULL,
  destination_country TEXT NOT NULL,
  destination_city TEXT NOT NULL,
  weight_kg NUMERIC,
  volume_m3 NUMERIC,
  declared_value NUMERIC,
  package_count INTEGER DEFAULT 1,
  fragile BOOLEAN DEFAULT false,
  urgent BOOLEAN DEFAULT false,
  insurance_option TEXT,
  service_level TEXT NOT NULL,
  estimated_price NUMERIC DEFAULT 0,
  currency TEXT DEFAULT 'EUR',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'pending', 'accepted', 'rejected', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index pour les recherches
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_created ON quotes(created_at DESC);

-- Politique RLS (Row Level Security) - permet l'insertion anonyme
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- Politique : tout le monde peut insérer (pour le formulaire public)
CREATE POLICY "Allow anonymous insert on contacts" 
  ON contacts FOR INSERT TO anon USING (true) WITH CHECK (true);

CREATE POLICY "Allow anonymous insert on quotes" 
  ON quotes FOR INSERT TO anon USING (true) WITH CHECK (true);

-- Politique : seuls les utilisateurs authentifiés peuvent lire
CREATE POLICY "Allow authenticated read on contacts" 
  ON contacts FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated read on quotes" 
  ON quotes FOR SELECT TO authenticated USING (true);

-- Trigger pour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON quotes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
