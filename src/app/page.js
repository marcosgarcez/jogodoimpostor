"use client";

import { useState } from "react";

export default function Home() {
  // --- ESTADOS DO JOGO ---
  // setup, wait, reveal, end
  const [gameState, setGameState] = useState("setup");
  
  // Configurações
  const [mode, setMode] = useState("random"); // random ou manual
  const [totalPlayers, setTotalPlayers] = useState(4);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [manualWord, setManualWord] = useState("");
  
  // Dados da Partida
  const [playersData, setPlayersData] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  // Busca de dados no dicionario - se categoria vazia retorna aleatório
  async function getPalavra(category) {
    const url = category!='all' ? `./api/dic?category=${category}` : './api/dic';
    const res = await fetch(url);
    if(!res.ok || res.status != 200) {
      throw new Error('Falha ao buscar dados!')
    }
    const json = await res.json();
    console.log(res.status);
    return json;
  }

  // --- LÓGICA DO JOGO ---

  const startGame = () => {
    let word = "";
    let categoryName = "";

    // Validação Básica
    if (totalPlayers < 3) return alert("Mínimo de 3 jogadores!");

    if (mode === "manual") {
      if (!manualWord.trim()) return alert("Digite uma palavra secreta!");
      word = manualWord.trim();
      categoryName = "Manual";
    } else {
      // Sorteio
      word = getPalavra(selectedCategory);
      categoryName = selectedCategory=='all' ? " Misturado" : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);
    }

    // Gerar papéis
    const newPlayersData = [];
    const liarIndex = Math.floor(Math.random() * totalPlayers);

    for (let i = 0; i < totalPlayers; i++) {
      if (i === liarIndex) {
        newPlayersData.push({ type: "LIAR", text: "VOCÊ É O MENTIROSO!", category: categoryName });
      } else {
        newPlayersData.push({ type: "PLAYER", text: word, category: categoryName });
      }
    }

    setPlayersData(newPlayersData);
    setCurrentPlayerIndex(0);
    setManualWord(""); // Limpar segurança
    setGameState("wait");
  };

  const nextPlayer = () => {
    if (currentPlayerIndex + 1 < playersData.length) {
      setCurrentPlayerIndex((prev) => prev + 1);
      setGameState("wait");
    } else {
      setGameState("end");
    }
  };

  const resetGame = () => {
    setGameState("setup");
    setPlayersData([]);
    setCurrentPlayerIndex(0);
  };

  // --- RENDERIZAÇÃO ---

  return (
    <main className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-zinc-800 p-6 rounded-2xl shadow-xl border border-zinc-700">
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          🕵️ Jogo do Impostor
        </h1>

        {/* TELA 1: SETUP */}
        {gameState === "setup" && (
          <div className="space-y-6">
            {/* Abas */}
            <div className="flex bg-zinc-900 rounded-lg p-1">
              <button
                onClick={() => setMode("random")}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                  mode === "random" ? "bg-purple-600 text-white shadow-lg" : "text-zinc-400 hover:text-white"
                }`}
              >
                🎲 Sorteio
              </button>
              <button
                onClick={() => setMode("manual")}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                  mode === "manual" ? "bg-purple-600 text-white shadow-lg" : "text-zinc-400 hover:text-white"
                }`}
              >
                ✍️ Manual
              </button>
            </div>

            {/* Inputs do Sorteio */}
            {mode === "random" && (
              <div className="space-y-2">
                <label className="text-zinc-400 text-sm">Categoria</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 focus:outline-none focus:border-purple-500 transition"
                >
                  <option value="all">🔀 Misturado</option>
                  <option value="lugares">✈️ Lugares</option>
                  <option value="comida">🍕 Comida</option>
                  <option value="objetos">💡 Objetos</option>
                  <option value="animais">🐶 Animais</option>
                  <option value="profissoes">💼 Profissões</option>
                </select>
              </div>
            )}

            {/* Input Manual */}
            {mode === "manual" && (
              <div className="space-y-2">
                <label className="text-zinc-400 text-sm">Palavra Secreta</label>
                <input
                  type="password"
                  placeholder="Ex: Girafa"
                  value={manualWord}
                  onChange={(e) => setManualWord(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-center focus:outline-none focus:border-purple-500 transition"
                />
              </div>
            )}

            {/* Número de Jogadores */}
            <div className="space-y-2">
              <label className="text-zinc-400 text-sm">Jogadores: <span className="text-white font-bold">{totalPlayers}</span></label>
              <input
                type="range"
                min="3"
                max="20"
                value={totalPlayers}
                onChange={(e) => setTotalPlayers(Number(e.target.value))}
                className="w-full accent-purple-500 h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <button
              onClick={startGame}
              className="w-full bg-teal-500 hover:bg-teal-400 text-zinc-900 font-bold py-4 rounded-full text-lg shadow-lg transform active:scale-95 transition-all"
            >
              Iniciar Jogo
            </button>
          </div>
        )}

        {/* TELA 2: ESPERA (PASSAR CELULAR) */}
        {gameState === "wait" && (
          <div className="text-center py-10 space-y-6">
            <h2 className="text-2xl font-bold text-zinc-300">Jogador {currentPlayerIndex + 1}</h2>
            <div className="text-6xl">📱</div>
            <p className="text-zinc-400">Pegue o celular e garanta que ninguém está olhando.</p>
            <button
              onClick={() => setGameState("reveal")}
              className="w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-4 rounded-full text-lg shadow-lg transform active:scale-95 transition-all"
            >
              Ver Minha Função
            </button>
          </div>
        )}

        {/* TELA 3: REVELAÇÃO */}
        {gameState === "reveal" && (
          <div className="text-center py-6 space-y-6 animate-in fade-in zoom-in duration-300">
            <span className="inline-block px-3 py-1 bg-zinc-700 rounded-full text-xs text-zinc-400 uppercase tracking-wider">
              Categoria: {playersData[currentPlayerIndex]?.category}
            </span>
            
            <div className={`p-8 rounded-xl border-2 border-dashed ${
              playersData[currentPlayerIndex]?.type === "LIAR" 
                ? "border-red-500 bg-red-500/10" 
                : "border-teal-500 bg-teal-500/10"
            }`}>
              <h3 className={`text-3xl font-extrabold ${
                playersData[currentPlayerIndex]?.type === "LIAR" ? "text-red-400" : "text-white"
              }`}>
                {playersData[currentPlayerIndex]?.text}
              </h3>
            </div>

            <p className="text-zinc-400 italic text-sm">
              {playersData[currentPlayerIndex]?.type === "LIAR"
                ? "Engane a todos! Tente descobrir a palavra."
                : "Essa é a palavra secreta. Descubra o mentiroso."}
            </p>

            <button
              onClick={nextPlayer}
              className="w-full bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-4 rounded-full text-lg shadow-lg transform active:scale-95 transition-all"
            >
              Esconder e Passar
            </button>
          </div>
        )}

        {/* TELA 4: FIM */}
        {gameState === "end" && (
          <div className="text-center py-10 space-y-6">
            <div className="text-6xl">✅</div>
            <h2 className="text-2xl font-bold text-teal-400">Sorteio Finalizado!</h2>
            <p className="text-zinc-400">
              Todos já sabem suas funções. O jogo começou! Façam perguntas uns aos outros.
            </p>
            <button
              onClick={resetGame}
              className="w-full bg-pink-600 hover:bg-pink-500 text-white font-bold py-4 rounded-full text-lg shadow-lg transform active:scale-95 transition-all"
            >
              Nova Rodada
            </button>
          </div>
        )}
      </div>
    </main>
  );
}