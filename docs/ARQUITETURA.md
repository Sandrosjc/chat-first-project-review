# CHEQUETTO.ONLINE — DOCUMENTO MESTRE (V2.0)

## 1. Negócio
- Funil: "Free 10-Page Guide" captura e-mail + idioma do leitor.
- Catálogo: três e-books pagos, sem biblioteca extensa. Cada e-book terá capa, título, descrição, preço e links comerciais cadastrados para Google Play Books e Payhip. A compra acompanha acesso ao aplicativo complementar por 30 dias, durante o protocolo do e-book.
- Nutrição: IA escreve campanhas de e-mail; envio pelo **Resend**.

## 2. Idiomas
- Site público construído em **inglês nativo** (idioma base e fallback).
- Abertura automática pelo idioma/região do navegador (`detectLang` em `src/lib/i18n.tsx`):
  pt → Português, es → Espanhol, demais suportados → próprio idioma, resto → Inglês.
- Seletor manual com 9 idiomas: en, pt, es, fr, de, it, nl, ja, zh. Escolha fica salva no navegador.
- O idioma ativo é gravado junto ao lead quando ele pede o guia grátis (Etapa 2).
- **Painel /admin 100% em Português (pt-BR).**
- A IA recebe comandos em português e escreve o e-mail no idioma do público escolhido.

## 3. Visual
Creme (fundo), vinho (primária), verde floresta (rodapé), dourado (detalhes).
Títulos: Cormorant Garamond. Textos: Karla. Tokens em `src/styles.css`.

## 4. Estrutura do código
```text
src/routes/__root.tsx        Layout global (topo, rodapé, idiomas, fontes)
src/routes/index.tsx         Home (hero, 3 e-books, blog)
src/routes/ebooks.tsx        Catálogo
src/routes/blog/index.tsx    Lista de artigos
src/routes/blog/$slug.tsx    Artigo
src/routes/about|contact|privacy|terms.tsx
src/components/site/         Layout, Sections (cards, guia), Page
src/lib/i18n.tsx             Traduções + detecção de idioma
src/lib/content.ts           E-books e artigos; a vitrine pública usa registros cadastrados
docs/ARQUITETURA.md          Este documento
```

## 5. Banco de dados (Etapa 2 — Lovable Cloud)
- **ebooks**: id, slug, title, subtitle, description, price, cover_image_url, product_url, payhip_url, google_play_url, download_url, is_free, is_featured, created_at. Os e-books são pagos; o aplicativo complementar não é item do catálogo.
- **leads**: id, email (único), first_name, language (default 'en'), source, opted_in, status ('active'|'unsubscribed'), created_at
- **campaigns**: id, title, ebook_id, target_language, subject, body_html, status ('draft'|'approved'|'sent'), sent_count, created_at
- **campaign_logs**: id, campaign_id, lead_id, resend_email_id, status, sent_at
- Administrador com login e papel "admin" em tabela separada de papéis.

## 6. Painel administrativo\n- `/admin` protegido por login Supabase e papel `admin` validado no servidor.\n- Cadastro, edição, exclusão e upload de capas no bucket `ebook-covers`.\n- O painel administra os e-books pagos; o visitante segue aos links de venda cadastrados.\n\n## 7. IA de campanhas (Etapa 3)
- Lovable AI, chamada só no servidor.
- Entrada: e-book (título, benefícios, preço, link Payhip), idioma, objetivo.
- Saída: subject, preview_text, body_html com botão "Get Your Copy on Payhip" (traduzido).
- Modo copiloto: nada é enviado sem o administrador aprovar a prévia.

## 8. Resend (Etapa 4)
- Chave só no servidor. Domínio próprio verificado no Resend é obrigatório.
- Só envia para leads com opted_in = true e status = 'active'.
- Todo e-mail tem link de descadastro em 1 clique.
- Máximo 2 e-mails por semana por leitor; registro em campaign_logs evita duplicados.
- Teste para o próprio e-mail antes do disparo geral.

## 9. Etapas
1. Site público (FEITO).
2. Lovable Cloud: tabelas, guia grátis salvando leads, login admin.
3. Painel /admin em português + IA de campanhas.
4. Conexão Resend, envio em lotes, descadastro, relatórios, modo automático por último.
