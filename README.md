<p align="center">
  <img src="icons/icon128.png" alt="TabPack" width="128" height="128">
</p>

<h1 align="center">TabPack</h1>

<p align="center">
  <strong>Compactador de Abas para Google Chrome</strong><br>
  Transforme dezenas de abas em grupos hibernados. Restaure quando precisar.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/manifest-v3-blue?logo=googlechrome" alt="Manifest V3">
  <img src="https://img.shields.io/badge/vanilla-js-f7df1e?logo=javascript" alt="Vanilla JS">
  <img src="https://img.shields.io/badge/license-CC%20BY--NC%204.0-lightgrey?logo=creativecommons" alt="CC BY-NC 4.0">
</p>

---

## ✨ Funcionalidades

- **📦 Compactar abas** — Selecione múltiplas abas abertas e transforme-as em um único grupo hibernado, liberando memória do navegador
- **🔍 Busca inteligente** — Filtre abas e grupos em tempo real por título ou URL
- **🤖 Classificação automática** — Abas são organizadas em categorias (YouTube, GitHub, IA, Redes Sociais, Google, etc.) com detecção de links duplicados
- **⬇️ Exportar / ⬆️ Importar** — Faça backup dos grupos em arquivo JSON e importe depois
- **🌓 Tema claro/escuro** — Alterne entre modos com um clique
- **🌐 PT-BR / EN** — Interface disponível em português e inglês
- **↗️ Restauração individual** — Reabra apenas uma aba do grupo sem perder as demais
- **✨ Restaurar tudo** — Recrie todas as abas de uma vez

---

## 🔧 Instalação

> ⚠️ **Importante:** O TabPack ainda não está publicado na Chrome Web Store (estamos trabalhando nisso!). Enquanto isso, a instalação é feita manualmente pelo **Modo do Desenvolvedor** do Chrome. Não se assuste — é simples, seguro e leva menos de **2 minutos**. Siga o passo a passo abaixo.

---

### 📥 1. Baixe o TabPack

**Opção A — Download direto (recomendado para iniciantes):**

1. No topo desta página do GitHub, clique no botão verde **`<> Code`**
2. No menu que abrir, clique em **`Download ZIP`**
3. Aguarde o download terminar
4. **Extraia o arquivo `.zip`** que acabou de baixar:
   - **Windows:** Clique com o botão direito no arquivo → `Extrair tudo...` → `Extrair`
   - **Mac:** Dê um duplo clique no arquivo `.zip` (ele extrai automaticamente)
   - **Linux:** Clique com o botão direito → `Extrair aqui`
5. Uma pasta chamada `tabpack-master` será criada. **Lembre-se onde ela está!** (você vai precisar selecioná-la daqui a pouco)

**Opção B — Git clone (para quem já tem Git instalado):**

```bash
git clone https://github.com/jottappe-dev/tabpack.git
```

---

### 🧩 2. Abra a página de extensões do Chrome

1. Abra o **Google Chrome**
2. Na barra de endereços (onde você digita os sites), escreva exatamente:

   ```
   chrome://extensions
   ```

3. Pressione **Enter**. Você verá a página com todas as suas extensões instaladas.

---

### 🔓 3. Ative o Modo do Desenvolvedor

1. No canto **superior direito** da página de extensões, procure por uma chave (toggle) chamada **`Modo do desenvolvedor`** (ou `Developer mode`)
2. **Clique na chave** para ativá-la — ela ficará azul / colorida
3. Três novos botões aparecerão no canto superior esquerdo

---

### 📦 4. Carregue o TabPack

1. Clique no botão **`Carregar sem compactação`** (ou `Load unpacked`)
2. Uma janela do explorador de arquivos será aberta
3. **Navegue até a pasta `tabpack-master`** que você extraiu no passo 1
   - ⚠️ Selecione a pasta que contém o arquivo `manifest.json` (a pasta raiz do projeto)
4. Clique em **`Selecionar pasta`** (Windows) ou **`Open`** (Mac)

---

### ✅ 5. Pronto!

O **TabPack** aparecerá na lista de extensões instaladas. O ícone 🧩 também estará na barra de ferramentas do Chrome (ao lado da barra de endereço).

> 💡 **Dica:** Se o ícone não aparecer na barra, clique no ícone de quebra-cabeça 🧩 no canto superior direito do Chrome e depois no 📌 **pin** ao lado do TabPack para fixá-lo.

---

### 🔄 Para atualizar no futuro

Quando uma nova versão for lançada, repita os passos:
1. Baixe o ZIP novamente e extraia (sobrescrevendo a pasta antiga)
2. Vá em `chrome://extensions`
3. Encontre o **TabPack** e clique no botão **🔄 Atualizar** (ícone de recarregar)

---

## 🎬 Como usar

### Compactar abas

1. Clique no ícone do **TabPack** na barra de ferramentas
2. Selecione as abas que deseja compactar (ou use "Selecionar todas")
3. Opcionalmente, dê um nome ao grupo (ex: "Pesquisa", "Trabalho")
4. Clique em **📦 Compactar**
5. Uma nova página de grupo será aberta com todas as abas hibernadas

### Gerenciar grupos salvos

- Abra o popup do TabPack para ver todos os grupos na seção "Grupos salvos"
- Clique em **↗** para abrir a página do grupo
- Clique em **✕** para excluir um grupo permanentemente

### Na página do grupo

- As abas são automaticamente **categorizadas** por serviço/domínio
- Categorias mostram contagem de abas e alerta de **duplicatas** ⚠️
- Expanda uma categoria para ver os cards das abas
- Clique em **↗ Abrir esta aba** para restaurar individualmente
- Use **✨ Restaurar todas** para recriar todas as abas de uma vez
- Use a **🔍 barra de busca** para encontrar abas específicas

### Backup

- Clique em **⬇ Exportar** para baixar um arquivo `.json` com todos os grupos
- Clique em **⬆ Importar** para carregar grupos de um backup anterior

---

## 🧩 Categorias reconhecidas

| Categoria | Serviços |
|-----------|----------|
| ▶️ YouTube | youtube.com, youtu.be |
| 🐙 GitHub | github.com, GitLab, Stack Overflow, npm, CodePen, Medium |
| 🤖 IA / LLMs | ChatGPT, Claude, Gemini, DeepSeek, Perplexity, Copilot, Hugging Face |
| 🔍 Google | Docs, Sheets, Drive, Gmail, Calendar, Meet, Photos, Search |
| 📧 Microsoft | Outlook, Office 365, Teams |
| 🐦 Redes sociais | X/Twitter, Reddit, LinkedIn, Instagram, Facebook, TikTok, Discord |
| 📰 Notícias | G1, CNN, BBC, UOL, Google News |
| 🛒 Shopping | Amazon, Mercado Livre, AliExpress, Shopee |
| 🎓 Aprendizado | Wikipedia, MDN, Udemy, Coursera, Notion, Figma, Trello |
| 🎵 Streaming | Spotify, Deezer, SoundCloud, Netflix, Twitch |
| 🌐 Outros | Agrupados por domínio |

---

## 📁 Estrutura do projeto

```
tabpack/
├── manifest.json       # Configuração da extensão (Manifest V3)
├── background.js       # Service worker — lógica principal
├── popup.html          # Interface do popup (400px)
├── popup.js            # Script do popup
├── group.html          # Página de exibição do grupo hibernado
├── group.js            # Script da página de grupo
├── shared.js           # Temas + i18n (PT/EN)
├── icons/              # Ícones (16, 32, 48, 128px)
└── README.md
```

## 🛠️ Stack

- **Manifest V3** com service worker
- **Vanilla JavaScript** — zero dependências
- **Chrome APIs** — `tabs`, `storage`
- **CSS custom properties** para theming dark/light
- **Fontes**: Sora (títulos) + JetBrains Mono (mono)

## 📄 Licença

[CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/deed.pt-br) © 2026

**Atribuição-NãoComercial 4.0 Internacional**

- ✅ **Permitido:** Baixar, instalar e usar gratuitamente para qualquer propósito pessoal ou educacional, modificar o código-fonte, redistribuir desde que com atribuição e sob a mesma licença
- ❌ **Proibido:** Vender o TabPack, redistribuir comercialmente, ou incorporar em produtos pagos sem autorização explícita do autor
- ℹ️ **Atribuição:** Qualquer redistribuição deve creditar o autor original e manter esta mesma licença

> Construído para a comunidade. Se você quer usar o TabPack em algo comercial, entre em contato.

---

<p align="center">
  <sub>Feito com 💙 para quem vive com 147 abas abertas</sub>
</p>
