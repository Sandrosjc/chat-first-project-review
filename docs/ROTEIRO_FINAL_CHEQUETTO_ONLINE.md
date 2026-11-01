# Roteiro definitivo de conclusão — Chequetto.online

**Objetivo:** concluir a página internacional de venda de ebooks sobre cuidados com os cabelos, trabalhando em etapas sequenciais. Só avançaremos para a etapa seguinte depois de verificar os critérios de aceite da etapa atual.

**Regra de execução:** uma etapa por vez. Não marcar como concluída por intenção ou apenas por ter enviado código ao GitHub. Exigir implementação, verificação e, quando aplicável, teste no site publicado.

## Regras comerciais definitivas

1. Todo ebook pago deve ter **dois destinos de compra**: Payhip e Google Play Books.
2. Os dois endereços, preço, capa, título e descrição são preenchidos/alterados pelo administrador no painel. Não inserir links de compra fixos no código.
3. O mini guia gratuito tem um campo próprio no painel para o administrador cadastrar/alterar seu **link do Payhip**. Depois do cadastro do email, o visitante recebe acesso por esse endereço.
4. O guia gratuito não conta entre os quatro ebooks pagos: é um material de entrada separado.
5. O produto principal é **The 30-Day Hair Reset**. A coleção abaixo dele contém exatamente três ebooks pagos complementares, sem repetir o principal.
6. O aplicativo de 30 dias é bônus da compra do ebook principal, não uma assinatura ou produto separado.
7. Nunca inventar URLs, preços, capas, depoimentos, resultados ou informações dos produtos. Se um dado ainda não foi fornecido, deixar o campo vazio/indicar que falta configuração.

## Etapas — 8 no total

### 1. Fechar o cadastro e a administração dos produtos e links
- Confirmar o formulário administrativo para cadastrar/editar os quatro ebooks pagos.
- Garantir Payhip e Google Play Books obrigatórios em cada ebook pago.
- Ajustar limite administrativo e validação do banco para quatro pagos: um principal + três complementares.
- Criar no painel o campo **Link Payhip do guia gratuito**, com salvar, editar e carregar o endereço.
- Garantir que o painel seja a única fonte dos links; validar URLs antes de salvar.
- Testar criar, editar e excluir sem perder os dados existentes.

**Aceite:** administrador consegue manter os quatro produtos pagos e o link Payhip do guia sem editar código.

### 2. Ligar o guia gratuito ao Payhip
- Após o cadastro do email, apresentar/abrir o link Payhip configurado para o guia.
- Se o link não estiver cadastrado, mostrar mensagem clara e não simular entrega.
- Preservar consentimento de marketing separado da entrega do guia.
- Testar cadastro válido, email duplicado, falha de rede e link ausente.

**Aceite:** visitante cadastra email e chega ao guia correto no Payhip; administrador pode trocar o link no painel.

### 3. Finalizar a página inicial e a hierarquia comercial
- Vídeo horizontal 16:9 de um lado.
- Ebook principal do outro, com capa, descrição, preço e os dois botões: Payhip e Google Play Books.
- Guia gratuito abaixo do produto principal, visualmente secundário.
- Exibir três ebooks pagos complementares abaixo, sem duplicar o principal.
- Mostrar o aplicativo de 30 dias como bônus do ebook principal.
- Ajustar desktop, tablet e celular.

**Aceite:** estrutura aprovada aparece corretamente e todos os botões levam aos destinos cadastrados.

### 4. Conferir catálogo e páginas individuais
- Revisar a página de coleção e cada página de ebook.
- Confirmar que cada produto usa os dados do banco e links do painel.
- Garantir que os quatro pagos estejam identificados corretamente: um principal e três complementares.
- Tratar produto sem capa/dado/link sem criar conteúdo fictício.

**Aceite:** catálogo e páginas individuais consistentes com o cadastro administrativo.

### 5. Idiomas, conteúdo e confiança
- Verificar idioma automático conforme configuração aprovada e seletor manual.
- Revisar traduções de navegação, vendas, formulário e mensagens.
- Revisar textos do blog e chamadas para ação.
- Verificar política de privacidade, consentimento e descadastro.
- Manter linguagem educativa, sem promessas de cura ou resultados garantidos.

**Aceite:** visitante consegue navegar e entender ofertas no idioma selecionado, com comunicação clara e responsável.

### 6. Email, leads e entrega
- Revisar captura de email e armazenamento de consentimento.
- Configurar confirmação/entrega do guia quando a infraestrutura de email estiver definida.
- Implementar descadastro e respeitar autorização de marketing.
- Só enviar campanhas a contatos com consentimento explícito.
- Testar erros, duplicidades e estados de descadastro.

**Aceite:** fluxo de email funciona e respeita consentimento e descadastro.

### 7. Painel, métricas e operação
- Revisar autenticação e permissão de administrador.
- Conferir indicadores de leads e visualizações.
- Separar visualização, clique, download confirmado e venda confirmada.
- Não chamar clique de download ou venda.
- Configurar integrações/segredos necessários sem expor chaves no navegador.
- Confirmar migrations aplicadas no Supabase de produção.

**Aceite:** painel protegido, métricas honestas e integrações essenciais operacionais.

### 8. Teste final e publicação
- Confirmar arquivo real do vídeo e reprodução.
- Testar todos os links Payhip e Google Play Books, inclusive o link do guia.
- Testar cadastro e entrega em desktop e celular.
- Executar build, lint e testes disponíveis.
- Revisar acessibilidade básica, velocidade, SEO, metadados e domínio.
- Corrigir erros encontrados e repetir os testes.
- Registrar evidências e só então declarar 100%.

**Aceite:** checklist final aprovado no ambiente publicado.

## Como vamos trabalhar
- Uma etapa por vez, na ordem acima.
- Em cada etapa: inspecionar o código atual, implementar, revisar alterações, executar verificações possíveis e informar o que foi comprovado e o que depende de você (por exemplo, fornecer URLs reais).
- Não iniciar a etapa seguinte sem fechar a atual ou explicar claramente o bloqueio.
- Não aplicar migrations em produção sem acesso/autorização e confirmação.
- Não declarar o projeto concluído enquanto houver critérios de aceite pendentes.

## Estado inicial do roteiro
- [ ] Etapa 1 — Administração dos produtos e links
- [ ] Etapa 2 — Entrega do guia gratuito pelo Payhip
- [ ] Etapa 3 — Página inicial e hierarquia comercial
- [ ] Etapa 4 — Catálogo e páginas individuais
- [ ] Etapa 5 — Idiomas, conteúdo e confiança
- [ ] Etapa 6 — Email, leads e entrega
- [ ] Etapa 7 — Painel, métricas e operação
- [ ] Etapa 8 — Teste final e publicação
