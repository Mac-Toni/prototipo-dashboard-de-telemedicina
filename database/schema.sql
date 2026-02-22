-- Script de criação da tabela de agendamentos no PostgreSQL (Supabase)

CREATE TABLE IF NOT EXISTS agendamentos (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  especialidade TEXT NOT NULL,
  valor INTEGER NOT NULL
);

-- Habilitar permissões básicas (opcional, dependendo da sua RLS)
ALTER TABLE agendamentos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir inserções públicas" ON agendamentos FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir leitura pública" ON agendamentos FOR SELECT USING (true);