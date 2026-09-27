-- ========================================================
-- Script SQL para Supabase - Cumpleaños 18 de Leo
-- Pégalo en: Supabase Dashboard > SQL Editor > New Query > Run
-- ========================================================

-- 1. Tabla de Aportantes (acumulado por persona)
CREATE TABLE IF NOT EXISTS contributors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  normalized_name TEXT NOT NULL UNIQUE,
  total_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  contribution_count INT NOT NULL DEFAULT 1,
  last_contribution_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_message TEXT
);

-- 2. Tabla de Historial de Aportes Individuales
CREATE TABLE IF NOT EXISTS contributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contributor_id UUID REFERENCES contributors(id) ON DELETE CASCADE,
  contributor_name TEXT NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Índices para velocidad de consulta y ranking
CREATE INDEX IF NOT EXISTS idx_contributors_total_amount ON contributors(total_amount DESC);
CREATE INDEX IF NOT EXISTS idx_contributions_created_at ON contributions(created_at DESC);

-- 4. Habilitar Row Level Security (RLS)
ALTER TABLE contributors ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributions ENABLE ROW LEVEL SECURITY;

-- 5. Políticas de Acceso (Lectura pública y Escritura vía API)
CREATE POLICY "Permitir lectura publica de contributors" 
  ON contributors FOR SELECT USING (true);

CREATE POLICY "Permitir lectura publica de contributions" 
  ON contributions FOR SELECT USING (true);

CREATE POLICY "Permitir insercion y actualizacion en contributors" 
  ON contributors FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Permitir insercion y eliminacion en contributions" 
  ON contributions FOR ALL USING (true) WITH CHECK (true);
