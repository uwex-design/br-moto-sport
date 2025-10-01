# BR Moto Sport - Arquivos CSS e JS

Projeto para organização e deploy de arquivos CSS e JavaScript para integração com Webflow.

## 🚀 Tecnologias

- **SCSS** - Pré-processador CSS
- **JavaScript** - ES6+
- **Gulp** - Sistema de build
- **GitHub Pages** - Deploy automático

## 📁 Estrutura

```
src/
├── css/           # CSS puro
│   ├── main.css
│   ├── header.css
│   ├── swiper-custom.css
│   └── sections.css
├── scss/          # SCSS (pré-processador)
│   └── main.scss
└── js/            # JavaScript
    ├── libs.js
    ├── common.js
    └── pages/
        └── home.js

dist/              # Arquivos compilados (gerados automaticamente)
├── css/
│   └── main.css
└── js/
    ├── libs.js
    ├── common.js
    └── pages/
        └── home.js
```

## 🛠️ Comandos

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev        # Compila e observa mudanças
npm run watch      # Apenas observa mudanças
```

### Produção
```bash
npm run build      # Compila tudo para produção
npm run clean      # Limpa pasta dist
```

## 🌐 Integração com Webflow

### Head Code
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/seuusuario/br-moto-sport@main/dist/css/main.css">
```

### Body Code
```html
<script src="https://cdn.jsdelivr.net/gh/seuusuario/br-moto-sport@main/dist/js/libs.js"></script>
<script src="https://cdn.jsdelivr.net/gh/seuusuario/br-moto-sport@main/dist/js/common.js"></script>
<script src="https://cdn.jsdelivr.net/gh/seuusuario/br-moto-sport@main/dist/js/pages/home.js"></script>
```

## 📝 Como Usar

1. **Editar arquivos** em `src/`
2. **Compilar** com `npm run build`
3. **Fazer commit** e push para GitHub
4. **Usar links** no Webflow

## 🔄 Workflow

1. Desenvolver em `src/`
2. `npm run build`
3. `git add .`
4. `git commit -m "Atualização"`
5. `git push`
6. Arquivos ficam disponíveis automaticamente no CDN

## 📞 Contato

Desenvolvido para BR Moto Sport
