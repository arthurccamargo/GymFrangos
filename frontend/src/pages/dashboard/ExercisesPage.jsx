import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Search, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import useExerciseFilters from '@/hooks/useExerciseFilters';
import FilterSelect from '@/components/FilterSelect';

// Opções de filtro definidas localmente
const FILTER_OPTIONS = {
  bodyParts: [
    'back', 'cardio', 'chest','lower arms', 'lower legs', 
    'neck', 'shoulders', 'upper arms', 'upper legs', 'waist',
  ],
  equipments: [
    'assisted' , 'band', 'barbell', 'body weight', 'bosu ball', 'cable, dumbbell', 'elliptical machine', 'ez barbell', 'hammer', 'kettlebell', 'leverage machine', 'medicine ball', 'olympic barbell', 'resistance band', 'roller', 'rope', 'skierg machine', 'sled machine', 'smith machine', 'stability ball', 'stationary bike', 'stepmill machine', 'tire', 'trap bar', 'upper body ergometer', 'weighted', 'wheel roller'
  ],
  difficulties: [
    'beginner', 'intermediate', 'advanced'
  ]
};

const ExercisePage = () => {
  const [clickedExercise, setClickedExercise] = useState(null); // Armazena o exercício que foi clicado pelo usuário para abrir o modal de detalhes
  const [exercises, setExercises] = useState([]); // Armazena a lista de exercícios recebida da API
  const [loading, setLoading] = useState(true); // Estado inicial de carregamento
  const [loadingMore, setLoadingMore] = useState(false); // Indica se mais exercícios estão sendo carregados
  const [error, setError] = useState(null); // Armazena uma mensagem de erro caso a requisição falhe, null == false
  const [nextPage, setNextPage] = useState(null); // URL da próxima página

  const { filters, updateFilter } = useExerciseFilters(); // Importa o hook de filtros de exercícios
  const { search, body_part, equipment, difficulty } = filters; // Desestrutura os filtros para fácil acesso

  // Função para buscar exercícios com paginação
  const fetchExercises = useCallback(async (url, shouldAppend = false) => {
    try {
      // true carrega mais itens ao rolar, false carregamento inicial ou quando aplica filtros
      shouldAppend ? setLoadingMore(true) : setLoading(true);

      // Construa a URL com os filtros ativos
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (body_part) params.append('body_part', body_part);
      if (equipment) params.append('equipment', equipment);
      if (difficulty) params.append('difficulty', difficulty);
      
      const requestUrl = url 
        ? `${url}&${params.toString()}`
        : `http://localhost:8000/api/exercises/?${params.toString()}`;


      const response = await axios.get(requestUrl);
      
      setExercises(prev => shouldAppend 
        ? [...prev, ...(response.data.results || [])] 
        : response.data.results || []);

      setNextPage(response.data.next);
    } catch {
      setError("Erro ao carregar exercícios.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [search, body_part, equipment, difficulty]);

  // Carregar exercícios quando os filtros mudam
  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  // Config do IntersectionObserver API do navegador que observa quando elementos entram/saem da viewport
  useEffect(() => {
    // Não observa se:
    // loading === false (já terminou o carregamento inicial)
    // loadingMore === false (não está no meio de um carregamento adicional)
    // nextPage !== null (existem mais itens para carregar)
    if (loading || loadingMore || !nextPage) return;

    const observer = new IntersectionObserver( // Instância que observa o último elemento da lista
      (entries) => {
        // Quando o último elemento fica visível
        if (entries[0].isIntersecting) {
          fetchExercises(nextPage, true); // Carrega mais itens
        }
      },
      { threshold: 0.1 } // Dispara quando 10% do elemento está visível
    );

    // Encontra e observa o último elemento da lista
    const lastElement = document.querySelector('.exercise-item:last-child');
    if (lastElement) observer.observe(lastElement);

    return () => observer.disconnect(); // Limpeza: desconecta o observer quando o componente desmonta
  }, [loading, loadingMore, nextPage, fetchExercises]); // Define quando o useEffect deve ser executado novamente 

  return (
    <div className="w-full px-0 md:container md:mx-auto">
      {/* Barra de Pesquisa e Filtros */}
      <div className="bg-white rounded-lg mb-3 shadow-sm p-3 sticky top-0 z-10">
        <div className="flex flex-col gap-3">
          {/* Search */}  
          <div className="relative w-full"> 
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Pesquisar exercícios..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-black-500 focus:border-black-500"
              value={search}
              onChange={(e) => updateFilter('search', e.target.value)}
            />
          </div>

          {/* Filtros usando o componente FilterSelect */}
          <div className='grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4'>
            <FilterSelect
              value={equipment}
              options={FILTER_OPTIONS.equipments}
              placeholder="Equipamentos"
              onChange={(e) => updateFilter('equipment', e.target.value)}
              activeColor="blue"
            />
            <FilterSelect
              value={difficulty}
              options={FILTER_OPTIONS.difficulties}
              placeholder="Dificuldade"
              onChange={(e) => updateFilter('difficulty', e.target.value)}
              activeColor="red"
            />
            <FilterSelect
              value={body_part}
              options={FILTER_OPTIONS.bodyParts}
              placeholder="Parte do Corpo"
              onChange={(e) => updateFilter('body_part', e.target.value)}
              activeColor="green"
              className='col-span-2 md:col-span-1'
            />
          </div>
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
        <div className="space-y-2 px-3">
          {exercises.map((exercise, index) => (          
              <div
                key={`${exercise.id}-${index}`}
                onClick={() => setClickedExercise(exercise)}
                className="exercise-item bg-white rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <h2 className="text-lg font-semibold">{exercise.name}</h2>
                <div className="flex items-center text-sm gap-4 mt-2">
                  <p className="bg-green-100 text-green-600 rounded-full px-1">{exercise.body_part}</p>
                  <p className="bg-blue-100 text-blue-500 rounded-full px-1">{exercise.equipment}</p>
                  <p className="bg-red-100 text-red-500 rounded-full px-1">{exercise.difficulty}</p>
                </div>
              </div>
          ))}

          {/* Indicador de carregamento para mais exercícios */}
          {loadingMore && (
            <div className="flex justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
              <span className="ml-2 text-gray-500">Carregando mais exercícios...</span>
            </div>
          )}

          {/* Se não houver exercícios na lista filtrada, exibe uma mensagem para o usuário */}
          {exercises.length === 0 && !loadingMore && (
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
        <DialogContent className="sm:max-w-2xl w-full max-w-[95vw] max-h-[90vh] rounded-xl mx-auto p-4">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold items-center flex justify-center sm:text-2xl ">
              {clickedExercise?.name}
            </DialogTitle>
          </DialogHeader>
          
          {clickedExercise && ( //Se clickedExercise existir, os detalhes são renderizados.
            <div className="">
              {/* Gift do Exercício */}
              <div className="rounded-lg overflow-hidden">
                <img
                  src={clickedExercise.gif_url}
                  alt={clickedExercise.name}
                  className="w-full max-h-[250px] sm:max-h-[300px] object-contain"
                />
              </div>

              {/* Detalhes do Exercício */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-gray-50 p-4 rounded-lg text-center flex flex-col items-center">
                  <h3 className="font-semibold text-gray-700 mb-1">Parte do Corpo</h3>
                  <p className="text-gray-600">{clickedExercise.body_part}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center flex flex-col items-center">
                  <h3 className="font-semibold text-gray-700 mb-1">Equipamento</h3>
                  <p className="text-gray-600">{clickedExercise.equipment}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center flex flex-col items-center">
                  <h3 className="font-semibold text-gray-700 mb-1">Dificuldade</h3>
                  <p className="text-gray-600">{clickedExercise.difficulty}</p>
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


