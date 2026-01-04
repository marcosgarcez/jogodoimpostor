# 🕵️ Jogo do Impostor

> Um Web App moderno para partidas do jogo social "O Impostor" (estilo Spyfall), com sorteio automático via API.

![Badge](https://img.shields.io/badge/Status-Online-brightgreen)
![Badge](https://img.shields.io/badge/Tech-Next.js_14-black)
![Badge](https://img.shields.io/badge/Style-Tailwind_CSS-blue)
![Badge](https://img.shields.io/badge/Deploy-Vercel-black)

## 🔗 Acesse agora
👉 **[jogodoimpostor.vercel.app](https://jogodoimpostor.vercel.app/)**

## 📖 Sobre o Projeto

O **Jogo do Impostor** é uma ferramenta digital para facilitar a brincadeira em festas e reuniões. O objetivo é distribuir secretamente uma "Palavra Chave" para todos os jogadores, exceto um: o **Impostor**.

Diferente de versões simples em HTML, esta versão foi construída como uma **Aplicação Fullstack** usando Next.js. O frontend consome uma **API própria (Serverless)** para garantir aleatoriedade e segurança no sorteio das palavras.

## 🚀 Funcionalidades

* **Sorteio Inteligente via API:**
    * O frontend solicita uma palavra ao backend.
    * Suporte a categorias específicas (Comida, Lugares, Profissões, etc.).
    * **Modo Misturado:** A API escolhe aleatoriamente uma categoria e depois uma palavra dentro dela.
* **Modo Manual:** O moderador pode digitar uma palavra personalizada (piadas internas).
* **Interface Responsiva:** Design "Mobile First" com tema escuro (Dark Mode) estilizado com Tailwind CSS.
* **Proteção de Tela:** Fluxo de UI/UX pensado para passar o celular de mão em mão sem revelar o segredo.

## 🛠️ Tecnologias Utilizadas

* **[Next.js](https://nextjs.org/) (App Router):** Framework React para frontend e backend.
* **[React Hooks](https://react.dev/):** Gerenciamento de estado do jogo (`useState`, `useEffect`).
* **[Tailwind CSS](https://tailwindcss.com/):** Estilização utilitária rápida e moderna.
* **[Vercel](https://vercel.com/):** Hospedagem e execução das Serverless Functions (API).

## 🎮 Como Jogar

1.  Reúna os amigos (mínimo de 3 pessoas).
2.  Acesse **[jogodoimpostor.vercel.app](https://jogodoimpostor.vercel.app/)** pelo celular.
3.  Escolha o modo (Sorteio Automático ou Manual).
4.  Defina o número de jogadores.
5.  O app indicará "Jogador 1". Passe o celular para essa pessoa.
6.  O jogador vê sua função (Inocente ou Impostor) e esconde.
7.  Repita até todos saberem suas funções.
8.  **A Rodada:** Façam perguntas uns aos outros. O Impostor deve mentir e tentar descobrir qual é a palavra secreta sem ser pego!

## ⚙️ Instalação Local

Se quiser rodar este projeto no seu computador:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/SEU-USUARIO/jogo-do-impostor.git](https://github.com/SEU-USUARIO/jogo-do-impostor.git)
    ```

2.  **Instale as dependências:**
    ```bash
    cd jogo-do-impostor
    npm install
    ```

3.  **Rode o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 📝 Licença

Este projeto é de código aberto e livre para uso pessoal. Sinta-se à vontade para contribuir!

---
*Desenvolvido com 💜 e Next.js.*