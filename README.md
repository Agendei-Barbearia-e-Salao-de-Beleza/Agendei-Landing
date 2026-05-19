# 💈 Agendei - Landing Page Profissional para Barbearias

Um site moderno, responsivo e elegante para apresentar a plataforma Agendei de gestão para barbearias. Desenvolvido com foco em performance, acessibilidade e experiência do usuário.

## 🎨 Features

✅ **Tema Claro e Escuro** - Troca dinâmica com transições suaves
✅ **Responsivo** - Funciona perfeitamente em desktop, tablet e mobile
✅ **Múltiplas Páginas** - Estrutura completa com navegação intuitiva
✅ **Internacionalização** - Suporte para PT-BR, EN e ES
✅ **Animações Elegantes** - Scroll suave e efeitos visuais com GSAP
✅ **Sem Framework Pesado** - HTML, CSS e JavaScript puro para máxima performance
✅ **Acessibilidade** - Semântica HTML correta e contraste adequado

## 📁 Estrutura do Projeto

```
agendei-landing/
├── index.html              # Página inicial
├── css/
│   └── styles.css         # Estilos globais (tema claro/escuro)
├── js/
│   └── main.js            # Scripts principais
├── pages/
│   ├── funcionalidades.html  # Página de funcionalidades
│   ├── precos.html          # Página de preços
│   └── sobre.html           # Página sobre
├── assets/                # Imagens e recursos
└── README.md             # Este arquivo
```

## 🚀 Como Usar

### 1. **Instalação**

Não há dependências complexas! Apenas clone/baixe o projeto e abra `index.html` em seu navegador.

```bash
cd agendei-landing
# Abra index.html com um servidor local (recomendado)
python -m http.server 8000
```

### 2. **Navegação**

- **Home** (`index.html`) - Apresentação principal
- **Funcionalidades** (`pages/funcionalidades.html`) - Detalhes das features
- **Preços** (`pages/precos.html`) - Planos e tabela comparativa
- **Sobre** (`pages/sobre.html`) - História, equipe e missão

## 🎨 Sistema de Temas

O sistema de temas usa variáveis CSS e muda automaticamente ao clicar nos botões de tema.

```javascript
// Tema escuro
document.documentElement.setAttribute('data-theme', 'dark');

// Tema claro
document.documentElement.setAttribute('data-theme', 'light');
```

## 🌐 Internacionalização

Suporta 3 idiomas: PT-BR, EN e ES com sistema i18n integrado.

## ✨ Recursos Técnicos

- **GSAP** - Animações suaves
- **ScrollTrigger** - Trigger de animações ao scroll
- **Lenis** - Smooth scrolling moderno
- **CSS Moderno** - Variáveis CSS, Grid, Flexbox
- **JavaScript Modular** - Classes e padrões limpos

## 📱 Responsividade

Breakpoints: 640px, 768px, 1024px, 1280px

## 🚀 Deploy

- **Vercel** (recomendado)
- **GitHub Pages**
- **Netlify**
- Qualquer hosting estático

## 📝 Licença

© 2026 Agendei. Todos os direitos reservados.

---

**Desenvolvido com ❤️ para barbearias que buscam excelência**
