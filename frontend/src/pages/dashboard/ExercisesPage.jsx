import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Search, Loader2 } from 'lucide-react';
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
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [clickedExercise, setClickedExercise] = useState(null); // Armazena o exercício que foi clicado pelo usuário para abrir o modal de detalhes
  const [exercises, setExercises] = useState([]); // Armazena a lista de exercícios recebida da API
  const [loading, setLoading] = useState(true); // Indica se os exercícios ainda estão sendo carregados. True pois a requisição ainda não foi concluída
  const [loadingMore, setLoadingMore] = useState(false); // Indica se mais exercícios estão sendo carregados
  const [error, setError] = useState(null); // Armazena uma mensagem de erro caso a requisição falhe, null == false
  const [page, setPage] = useState(1); // Controla a página atual para paginação
  const [hasMore, setHasMore] = useState(true); // Indica se há mais exercícios para carregar
  const observer = useRef(); // Referência para o observer de interseção
  const lastExerciseElementRef = useRef(); // Referência para o último elemento da lista

  /* 
  useEffect é um hook do React, ele recebe dois argumentos
  Uma função de efeito (que será executada quando o componente renderizar), nesse caso fetchExercises
  Um array de dependências, nesse caso está vazio,então a função será executada apenas uma vez, quando o componente for montado
  */
  // Função para buscar exercícios com paginação
  const fetchExercises = useCallback(async (pageNumber = 1, shouldAppend = false) => {
    try {
      // Se estiver carregando a primeira página, mostra o indicador de carregamento principal
      if (pageNumber === 1) {
        setLoading(true);
      } else {
        // Se estiver carregando mais exercícios, mostra o indicador de carregamento de "carregar mais"
        setLoadingMore(true);
      }

      // Calcula o offset com base na página atual (20 itens por página)
      const offset = (pageNumber - 1) * 20;
      const response = await axios.get(`http://localhost:8000/api/exercises/?limit=20&offset=${offset}`);
      
      const newExercises = response.data.results || [];
      
      // Verifica se há mais exercícios para carregar
      setHasMore(newExercises.length === 20 && response.data.next !== null);
      
      // Atualiza a lista de exercícios (anexa ou substitui)
      if (shouldAppend) {
        setExercises(prev => [...prev, ...newExercises]);
      } else {
        setExercises(newExercises);
      }
    } catch (err) {
      console.error("Erro ao buscar exercícios:", err);
      setError("Erro ao carregar exercícios.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  // Carrega a primeira página de exercícios quando o componente é montado
  useEffect(() => {
    fetchExercises(1, false);
  }, [fetchExercises]);
  
  // Configura o observer de interseção para detectar quando o usuário chega ao final da lista
  useEffect(() => {
    // Função para observar o último elemento da lista
    const handleObserver = (entries) => {
      const [entry] = entries;
      // Se o elemento estiver visível e houver mais exercícios para carregar
      if (entry.isIntersecting && hasMore && !loading && !loadingMore) {
        setPage(prevPage => {
          const nextPage = prevPage + 1;
          fetchExercises(nextPage, true);
          return nextPage;
        });
      }
    };

    // Cria um novo observer
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    observer.current = new IntersectionObserver(handleObserver, options);
    
    // Observa o último elemento da lista, se existir
    if (lastExerciseElementRef.current) {
      observer.current.observe(lastExerciseElementRef.current);
    }
    
    // Limpa o observer quando o componente é desmontado
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [hasMore, loading, loadingMore, fetchExercises]);

  
  const bodyParts = [...new Set(exercises.map(ex => ex.body_part))]; // Cria lista únicas de partes do corpo para filtro, Set elimina duplicados
  const equipmentsUsed = [...new Set(exercises.map(ex => ex.equipment))]; // Cria lista únicas de equipamentos para filtro
  const difficultyLevel = [...new Set(exercises.map(ex => ex.difficulty))]

  // Efeito para resetar a paginação e buscar novos exercícios quando os filtros mudam
  useEffect(() => {
    // Reseta a página e busca exercícios novamente quando os filtros mudam
    setPage(1);
    // Implementação futura: enviar os filtros para o backend
    // Por enquanto, continuamos filtrando no frontend
    fetchExercises(1, false);
  }, [selectedBodyPart, selectedExercise, selectedDifficulty, fetchExercises]);

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
    const matchesDifficulty = !selectedDifficulty || exercise.difficulty === selectedDifficulty;
    return matchesSearch && matchesBodyPart && matchesEquipment && matchesDifficulty; // Retorna somente os exercícios que atendem aos 3 critérios
  });

  return (
    <div className="container mx-auto p-2 max-w-5xl">
      {/* Barra de Pesquisa e Filtros */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 sticky top-4 z-10">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
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
            <option value="">Corpo</option>
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

          <select
            className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)} //usuário escolhe um equipamento e selectedEquipment é atualizado
          >
            <option value="">Dificuldade</option>
            {difficultyLevel.map(eq => (
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
          {filteredExercises.map((exercise, index) => {
            // Verifica se é o último item da lista para adicionar a referência
            const isLastItem = index === filteredExercises.length - 1;
            
            return (
              <div
                key={exercise.id}
                // Adiciona a referência ao último elemento para o IntersectionObserver
                ref={isLastItem ? lastExerciseElementRef : null}
                // Usuário clica em um exercício, setClickedExercise(exercise) atualiza o estado e exibe o modal
                onClick={() => setClickedExercise(exercise)} 
                className="bg-white rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <h2 className="text-lg font-semibold">{exercise.name}</h2>
                <p className="text-gray-600 text-sm mt-1">{exercise.body_part}</p>
              </div>
            );
          })}

          {/* Indicador de carregamento para mais exercícios */}
          {loadingMore && (
            <div className="flex justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
              <span className="ml-2 text-gray-500">Carregando mais exercícios...</span>
            </div>
          )}

          {/* Se não houver exercícios na lista filtrada, exibe uma mensagem amigável para o usuário */}
          {filteredExercises.length === 0 && !loadingMore && (
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
              {/* Gift do Exercício */}
              <div className="rounded-lg overflow-hidden">
                <img
                  src={clickedExercise.gif_url}
                  alt={clickedExercise.name}
                  className="w-full max-h-[300px] object-contain"
                />
              </div>

              {/* Detalhes do Exercício */}
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

// ARRUMAR
// paginacao
// filtros (fazer lista de partes do corpo)
// pesquisa englobar paginacao
// filtro dificuldades (fazer igual corpo e equipamentos)

