import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";

const ExercisePage = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Armazena o valor da barra de pesquisa
  const [selectedBodyPart, setSelectedBodyPart] = useState(''); // Armazena a parte do corpo selecionada no filtro
  const [selectedExercise, setSelectedExercise] = useState(''); // Armazena o equipamento selecionado no filtro
  const [clickedExercise, setClickedExercise] = useState(null); // Armazena o exercício que foi clicado pelo usuário para abrir o modal de detalhes
  const [exercises, setExercises] = useState([]); // Armazena a lista de exercícios recebida da API
  const [loading, setLoading] = useState(true); // Indica se os exercícios ainda estão sendo carregados. True pois a requisição ainda não foi concluída
  const [error, setError] = useState(null); // Armazena uma mensagem de erro caso a requisição falhe, null == false

  /* 
  useEffect é um hook do React, ele recebe dois argumentos
  Uma função de efeito (que será executada quando o componente renderizar), nesse caso fetchExercises
  Um array de dependências, nesse caso está vazio,então a função será executada apenas uma vez, quando o componente for montado
  */
  useEffect(() => { 
    /* Busca os exercícios na API e atualiza exercises com os resultados */
    const fetchExercises = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/exercises/');
        // salva os exercícios da API em exercises, um array vazio [] é usado para evitar erros caso response.data.results seja undefined ou null
        setExercises(response.data.results || []); 
      } catch (err) {
        console.error("Erro ao buscar exercícios:", err);
        setError("Erro ao carregar exercícios.");
      } finally {
        setLoading(false); // executado independentemente de o bloco try ter sucesso ou erro
      }
    };

    fetchExercises(); // chamada da função, após definição dela
  }, []);

  
  const bodyParts = [...new Set(exercises.map(ex => ex.body_part))]; // Cria lista únicas de partes do corpo para filtro, Set elimina duplicados
  const equipmentsUsed = [...new Set(exercises.map(ex => ex.equipment))]; // Cria lista únicas de equipamentos para filtro

  /* Filtra os exercícios com base no que foi digitado na barra de pesquisa e no filtro de partes do corpo */
  const filteredExercises = exercises.filter(exercise => {
    /*
    filter() percorre a lista de exercises e retorna apenas os exercícios que atendem aos critérios de busca e filtro 
    includes() verifica se o nome do exercício contém o que foi digitado (pode pesquisar "ble" para achar "cable")
    */
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()); 
    // Se nenhuma parte do corpo foi selecionada, então o false vira true e o filtro é ignorado
    // Se uma parte do corpo foi selecionada, true virou false com o !,logo, verifica se o parte do corpo do exercício de filter é igual ao selecionado
    const matchesBodyPart = !selectedBodyPart || exercise.body_part === selectedBodyPart;
    const matchesEquipment = !selectedExercise || exercise.equipment === selectedExercise;
    return matchesSearch && matchesBodyPart && matchesEquipment; // Retorna somente os exercícios que atendem aos 3 critérios
  });

  return (
    <div className="container mx-auto p-2 max-w-5xl">
      {/* Barra de Pesquisa e Filtros */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 sticky top-4 z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative col-span-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Pesquisar exercícios..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} //usuário digita e searchTerm é atualizado
            />
          </div>

          {/* Filtros */}
          <select
            className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedBodyPart}
            onChange={(e) => setSelectedBodyPart(e.target.value)} //usuário escolhe uma parte do corpo e selectedBodyPart é atualizado
          >
            <option value="">Partes do corpo</option>
            {bodyParts.map(part => (
              <option key={part} value={part}>{part}</option>
            ))}
          </select>

          <select
            className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedExercise}
            onChange={(e) => setSelectedExercise(e.target.value)} //usuário escolhe um equipamento e selectedEquipment é atualizado
          >
            <option value="">Equipamentos</option>
            {equipmentsUsed.map(eq => (
              <option key={eq} value={eq}>{eq}</option>
            ))}
          </select>
        </div>
      </div>

      {/* loaging false signfifica que já fez a requisição, logo, não aparece "Carregando exercícios..."" */}
      {loading && <div className="text-center py-8 text-gray-500">Carregando exercícios...</div>} 

      {/* Se a requisição falhar, o estado de erro é atualizado e exibido na tela */}
      {error && <div className="text-center py-8 text-red-500">{error}</div>}

      {/* 
      Antes de renderizar a Lista de Exercícios
      - Verifica se os dados já foram carregados (!loading)
      - Verifica se não há erros (!error)

      Percorre a lista filteredExercises (que contém apenas exercícios que passaram pelos filtros aplicados)
      Para cada exercício, retorna um <div> representando um item da lista
      - Define uma chave (key) única para cada item da lista (obrigatório)
      - Quando o usuário clica em um exercício, a função setClickedExercise(exercise) é chamada para abrir um modal
      */}
      
      {!loading && !error && (
        <div className="space-y-2">
          {filteredExercises.map((exercise) => (
            <div
              key={exercise.id}
            //usuário clica em um exercício, setClickedExercise(exercise) atualiza o estado e exibe o modal
              onClick={() => setClickedExercise(exercise)} 
              className="bg-white rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <h2 className="text-lg font-semibold">{exercise.name}</h2>
              <p className="text-gray-600 text-sm mt-1">{exercise.body_part}</p>
            </div>
          ))}

          {/* Se não houver exercícios na lista filtrada, exibe uma mensagem amigável para o usuário */}
          {filteredExercises.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhum exercício encontrado com os filtros selecionados.
            </div>
          )}
        </div>
      )}

      {/* 
      O modal abre quando clickedExercise não é null ou undefined, open={true}, e o modal será exibido
      O !! força clickedExercise a ser convertido para um valor booleano (true ou false).
      Quando o modal é fechado, a função setClickedExercise(null) é chamada, limpando o exercício selecionado

      clickedExercise?.name | operador opcional ? ,impede erros caso clickedExercise seja null
      */}
      <Dialog open={!!clickedExercise} onOpenChange={() => setClickedExercise(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {clickedExercise?.name}
            </DialogTitle>
          </DialogHeader>
          
          {clickedExercise && ( //Se clickedExercise existir, os detalhes são renderizados.
            <div className="mt-4 space-y-6">
              {/* Exercise Image */}
              <div className="rounded-lg overflow-hidden">
                <img
                  src={clickedExercise.gif_url}
                  alt={clickedExercise.name}
                  className="w-full h-64 object-cover"
                />
              </div>

              {/* Exercise Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-1">Parte do Corpo</h3>
                  <p className="text-gray-600">{clickedExercise.body_part}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-1">Equipamento</h3>
                  <p className="text-gray-600">{clickedExercise.equipment}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-1">Séries</h3>
                  <p className="text-gray-600">{clickedExercise.series}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-1">Repetições</h3>
                  <p className="text-gray-600">{clickedExercise.repetitions}</p>
                </div>
              </div>
            </div>
          )}

          {/* DialogClose já cuida do fechamento automático do modal */}
          <DialogClose className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full" />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExercisePage;
