# Roteiro definitivo de conclusão — Chequetto.online

**Objetivo:** concluir a página internacional de vendas e autoridade editorial sobre cuidados com os cabelos, preservando a aplicação e a infraestrutura já existentes. Trabalhar em etapas sequenciais, verificando cada etapa antes de avançar.

**Regra principal:** não reiniciar nem reconstruir o projeto. Manter o que já funciona: painel administrativo, Supabase, blog, Resend, campanhas de email, métricas, internacionalização e captura atual do guia. Fazer apenas ajustes necessários e incrementais.

## Estrutura comercial e de captação

1. **Vídeo institucional/editorial:** bloco permanente na página inicial. Não é produto e não será cadastrado como ebook no painel. O arquivo real do vídeo ainda precisa ser fornecido/configurado; não substituir silenciosamente por uma imagem nem afirmar que já existe vídeo.
2. **Ebook principal:** configurável pelo painel (capa, título, descrição, preço e links Payhip e Google Play Books).
3. **Aplicativo externo:** apresentar um bloco próprio com imagem, texto curto e endereço de acesso configurável. O aplicativo é desenvolvido/conhecido fora deste site; aqui precisamos apenas oferecer o caminho para acessá-lo e captar o email de quem veio por esse caminho. Não reconstruir nem documentar o funcionamento interno do aplicativo nesta etapa.
4. **Guia gratuito “Introdução aos 30 Dias”:** bloco e formulário próprios para captar email e entregar/encaminhar ao guia pelo destino configurado.
5. **Três ebooks complementares:** exatamente três produtos pagos abaixo dos quatro blocos anteriores, sem repetir o ebook principal.
6. **Blog/jornal:** preservar conteúdo editorial, navegação e chamadas para os produtos.

### Rastreamento independente das origens

- A captura do guia deve ser registrada com a origem `free_guide`.
- A captura feita pelo bloco do aplicativo deve ser registrada com a origem `app_access`.
- As duas rotas devem ter formulários/CTAs separados e a origem precisa permanecer visível no painel e disponível para segmentação de campanhas.
- Se a mesma pessoa usar os dois formulários com o mesmo email, registrar as duas origens sem sobrescrever uma pela outra.
- Não misturar consentimento de marketing com a entrega do guia ou com o pedido de acesso ao aplicativo. Campanhas promocionais somente para contatos com consentimento explícito.
- O site não precisa explicar nem reproduzir o aplicativo; basta apresentar o acesso externo e identificar corretamente a origem do contato.

## Regras comerciais

- Todo ebook pago deve ter destinos de compra Payhip e Google Play Books, gerenciados no painel. Não fixar links de compra no código.
- O link de entrega do guia gratuito deve ser configurável no painel.
- O endereço externo do aplicativo deve ser configurável no painel, separado dos links dos ebooks e do guia.
- Não inventar URLs, preços, capas, depoimentos, resultados ou conteúdo. Campos sem informação real devem permanecer sem configuração e não simular uma oferta ativa.
- Preservar a identidade editorial premium e internacional de cuidados capilares; não transformar a página em catálogo genérico de ecommerce.

## Etapas de conclusão

### 1. Administração dos produtos e destinos
- Confirmar edição dos dados do ebook principal e dos três complementares.
- Manter o limite correto de três ebooks complementares, sem duplicar o principal.
- Manter o campo administrativo do link Payhip do guia.
- Criar/confirmar configurações administrativas separadas para imagem/texto/link externo do aplicativo.
- Validar URLs e manter o painel como fonte dos destinos.

**Aceite:** administrador consegue atualizar os dados e destinos sem editar código.

### 2. Captura do guia e do aplicativo
- Preservar o formulário atual do guia e sua origem `free_guide`.
- Criar uma rota/formulário independente para o aplicativo, origem `app_access`.
- Ajustar o armazenamento para que um mesmo email possa ter registros de captura para ambas as origens, sem apagar a origem anterior.
- Exibir a origem no painel e permitir segmentação.
- Preservar consentimento, descadastro e regras de envio já existentes.

**Aceite:** testes com emails novos e repetidos confirmam que as duas origens ficam registradas corretamente.

### 3. Página inicial e hierarquia
- Vídeo horizontal 16:9 em bloco próprio, quando o arquivo real estiver disponível.
- Ebook principal com capa, descrição, preço e links de compra configurados.
- Bloco do aplicativo com CTA para endereço externo e captura de email independente.
- Bloco do guia gratuito com captura independente.
- Exibir exatamente três ebooks complementares abaixo, sem repetir o principal.
- Preservar o blog/jornal e suas chamadas para ação.
- Ajustar desktop, tablet e celular.

**Aceite:** os blocos aparecem na ordem definida e cada CTA conduz ao destino correto.

### 4. Catálogo e páginas individuais
- Confirmar dados vindos do banco e links do painel.
- Tratar ausência de capa, descrição ou link sem conteúdo fictício.
- Confirmar que o ebook principal não aparece novamente na coleção complementar.

### 5. Idiomas, conteúdo e confiança
- Verificar idioma automático e seletor manual.
- Revisar traduções de navegação, vendas, formulários e mensagens.
- Preservar o blog e revisar chamadas para ação.
- Verificar política de privacidade, consentimento e descadastro.
- Evitar promessas de cura ou resultados garantidos.

### 6. Email, leads e campanhas
- Preservar Resend e os fluxos de email existentes.
- Separar leads por origem (`free_guide` e `app_access`) para análise e segmentação.
- Só enviar campanhas a contatos com consentimento explícito.
- Testar entrega, erros, duplicidades e descadastro.

### 7. Painel, métricas e operação
- Preservar autenticação e permissões administrativas.
- Conferir métricas de leads, páginas, países e campanhas.
- Distinguir visualização, clique, cadastro, entrega/download confirmado e venda confirmada.
- Não chamar clique de download ou venda.
- Confirmar segredos no servidor e migrations aplicadas no Supabase.

### 8. Testes finais e publicação
- Confirmar o arquivo real do vídeo e sua reprodução.
- Testar links de ebooks, guia e aplicativo.
- Testar os dois formulários e a preservação das origens, inclusive email repetido.
- Executar build, lint e testes disponíveis.
- Revisar celular, acessibilidade, velocidade, SEO, metadados e domínio.
- Registrar o que foi efetivamente testado; não declarar conclusão sem evidências.

## Como trabalhar
Uma etapa por vez: inspecionar o código atual, implementar mudanças incrementais, revisar, testar e informar o que foi comprovado e o que depende de configuração externa. Não apagar nem substituir sistemas existentes. Não aplicar migrations em produção sem acesso/autorização e confirmação.

## Estado do roteiro
- [ ] Etapa 1 — Administração dos produtos e destinos
- [ ] Etapa 2 — Captura independente do guia e do aplicativo
- [ ] Etapa 3 — Página inicial e hierarquia comercial
- [ ] Etapa 4 — Catálogo e páginas individuais
- [ ] Etapa 5 — Idiomas, conteúdo e confiança
- [ ] Etapa 6 — Email, leads e campanhas
- [ ] Etapa 7 — Painel, métricas e operação
- [ ] Etapa 8 — Testes finais e publicação
