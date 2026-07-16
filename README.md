# hgplinks - Avant Browser Download Website

Este é um website de página única (landing page) moderno, responsivo e esteticamente premium projetado para download local do **Avant Browser**.

O site possui efeitos visuais modernos (como glassmorphism, sombras neon e rastreamento de brilho nos cartões de recursos com o mouse) e serve o instalador original `absetup.exe` de forma direta e otimizada.

## 🚀 Como Executar o Site Localmente

O projeto inclui um servidor web ultraleve e sem dependências externas escrito em Node.js (`server.js`).

1. Certifique-se de ter o **Node.js** instalado em seu computador.
2. Abra o terminal na pasta do projeto e execute:
   ```bash
   node server.js
   ```
3. Abra o seu navegador e acesse:
   [http://localhost:3000](http://localhost:3000)

## ✨ Principais Recursos da Página
- **Interface Premium**: Design em Dark Mode com cores coordenadas e efeitos visuais imersivos.
- **Rastreamento de Brilho**: Cartões de recursos que brilham dinamicamente conforme você move o ponteiro do mouse sobre eles.
- **Download em Tempo Real**: O botão de download fornece feedback interativo durante a transmissão do arquivo.
- **Transmissão Otimizada**: O servidor utiliza Node.js Streams para servir o executável de forma eficiente.

## 📁 Estrutura de Arquivos
- `index.html` - Estrutura e marcação semântica HTML5.
- `style.css` - Estilos modernos e responsividade.
- `script.js` - Micro-interações e efeitos visuais interativos.
- `server.js` - Servidor HTTP nativo.
- `absetup.exe` - Instalador offline do Avant Browser (4.33 MB).
- `.gitignore` - Arquivo de configuração de exclusão do Git.
