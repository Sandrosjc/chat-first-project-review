# Chequetto.online — Plano de execução e documentação

**Objetivo:** transformar a página Chequetto.online em uma página internacional de autoridade e vendas de ebooks sobre cuidados capilares.

**Status geral:** estrutura comercial aprovada; implementação e validação final ainda pendentes. Não declarar o projeto 100% concluído até passar pelos testes descritos neste documento.

## 1. Estrutura aprovada da página inicial

### Primeira dobra: três objetivos claros
Em desktop, apresentar uma composição horizontal, limpa e responsiva, com duas áreas principais:

- **Área de vídeo:** vídeo de apresentação da marca em formato horizontal/cinematográfico (16:9), nunca recortado como vídeo vertical de celular. Reproduzir sem som, em loop e com controles acessíveis quando necessário. Preservar o arquivo original e usar imagem de capa enquanto o vídeo carrega.
- **Área comercial:** destacar o ebook principal **The 30-Day Hair Reset**, com capa, título, descrição curta, benefícios concretos, preço real cadastrado e botão principal de compra direcionado ao Payhip.
- **Alternativa gratuita na mesma área comercial:** chamada secundária para baixar o mini guia gratuito após informar o email. O cadastro deve ser explicado com clareza; o acesso ao produto gratuito no Payhip só será ligado quando o URL verdadeiro for fornecido e validado.

A composição pode usar uma grade 50/50 no desktop: vídeo de um lado e bloco de conversão do outro. Dentro do bloco comercial, organizar o ebook pago primeiro e o guia gratuito abaixo, com hierarquia visual evidente. Não criar três colunas estreitas que prejudiquem o vídeo horizontal ou a leitura.

### Abaixo da primeira dobra
- Mostrar os **três ebooks pagos complementares** em uma grade de três cards no desktop.
- Cada card deve conter capa, título, descrição, preço e links reais disponíveis: Payhip e Google Play Books.
- O ebook principal não deve aparecer duplicado entre os três complementares. Se fizer parte do catálogo geral, excluí-lo dessa seção complementar ou identificá-lo claramente como destaque já apresentado.
- Depois da coleção, manter journal/blog e demais conteúdos que apoiem confiança e descoberta, sem competir com a chamada principal.

### Responsividade
- Desktop: vídeo horizontal à esquerda; produto e captura de email à direita.
- Tablet: adaptar proporções sem comprimir texto, botões ou vídeo.
- Celular: empilhar vídeo, ebook principal, botão de compra e guia gratuito em sequência; manter o vídeo em proporção horizontal 16:9, sem simular formato vertical.

## 2. Hierarquia de conversão
1. CTA principal: comprar o ebook completo no Payhip.
2. CTA secundário: baixar o mini guia gratuito mediante email.
3. Bônus do ebook principal: aplicativo complementar de 30 dias, incluído como bônus da compra; não vender como assinatura independente.
4. Coleção complementar: três ebooks pagos abaixo da primeira dobra.

O mini guia gratuito é uma introdução ao método, não o produto completo. Não confundir as duas ofertas.

## 3. Regras de conteúdo e confiança
- Não inventar preços, resultados clínicos, depoimentos, URLs ou disponibilidade.
- Usar linguagem responsável: conteúdo educativo, sem prometer cura ou resultados garantidos contra queda capilar.
- Exibir somente links de compra reais e testados.
- Capturar email com consentimento explícito separado de qualquer cadastro meramente necessário para entregar o guia.
- Campanhas promocionais somente para contatos que autorizaram marketing; respeitar descadastro.
- Localização/idioma deve seguir a configuração aprovada e permitir troca manual de idioma.

## 4. Situação técnica verificada no repositório
Repositório: https://github.com/Sandrosjc/chat-first-project-review
Branch: main
Stack identificada: React, TypeScript, Vite/TanStack Start, Supabase e Tailwind.

Verificações feitas na leitura do código:
- A página inicial já contém uma tag de vídeo horizontal responsiva com `/videos/chequetto-intro.mp4`, `muted`, `loop` e `playsInline`; porém, a presença e reprodução do arquivo de vídeo no deploy ainda precisam ser confirmadas.
- A página inicial já mostra o bloco de guia gratuito e uma grade de ebooks.
- A grade consulta até três registros pagos no Supabase, ordenando os destacados primeiro.
- Os cards já suportam capa, descrição, preço e links Payhip/Google Play.
- O cadastro do guia chama a função de servidor `subscribeLead`; a função salva email, idioma e consentimento por RPC.
- O rastreamento de page views já foi implementado, mas depende da migration no Supabase e da confirmação de que o cabeçalho de país está disponível no ambiente de hospedagem.
- O rastreamento atual mede visualizações de página, não visitantes únicos.
- O componente de cadastro atualmente confirma o registro, mas o fluxo de entrega do guia pelo Payhip ainda precisa ser conectado e testado.
- A documentação e o código consultados não comprovam que todos os dados reais dos ebooks, URLs, preços, capas e vídeo estejam cadastrados e publicados.

## 5. Plano de trabalho de hoje — primeira tarefa
**Tarefa 1: ajustar a primeira dobra para a estrutura comercial aprovada.**

Critérios de aceite:
- Vídeo horizontal 16:9 em uma área ampla.
- Ebook principal ao lado, com capa, título, descrição, preço real e CTA de compra.
- Guia gratuito com captura de email visível como alternativa secundária.
- Layout responsivo para desktop, tablet e celular.
- Os três ebooks complementares aparecem abaixo, sem duplicar o principal.
- Nenhum link ou dado fictício.
- Não remover funcionalidades existentes nem alterar o painel administrativo sem necessidade.

Após a alteração, verificar build, lint e testes disponíveis; revisar visualmente os três tamanhos de tela. Só então marcar a tarefa como concluída.

## 6. Checklist para declarar o site pronto
- [ ] Vídeo real presente no deploy, carregando e reproduzindo em desktop e celular.
- [ ] Ebook principal com capa, descrição, preço e Payhip real validados.
- [ ] Guia gratuito com captura de email e URL Payhip real funcionando.
- [ ] Três ebooks complementares corretos, sem duplicação, com links testados.
- [ ] Idiomas e seletor manual funcionando.
- [ ] Consentimento, privacidade e descadastro testados.
- [ ] Downloads medidos apenas quando houver confirmação real do provedor; clique não é download.
- [ ] Vendas registradas somente por evento/retorno confiável do pagamento; clique não é venda.
- [ ] Painel administrativo protegido e métricas coerentes.
- [ ] Migrations Supabase aplicadas em produção.
- [ ] Build, lint, testes e QA responsivo aprovados.
- [ ] Domínio, SEO básico, metadados e links externos revisados.

**Definição de 100%:** todos os itens aplicáveis acima concluídos e verificados no ambiente publicado. Até lá, o projeto permanece em andamento.
