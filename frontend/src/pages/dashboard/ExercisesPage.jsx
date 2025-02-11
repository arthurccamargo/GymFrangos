import { useState } from 'react';
import { Search, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";

const ExercisePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [selectedExercise, setSelectedExercise] = useState(null);

  // Sample data - replace with your database data
  const exercises = [
    {
      name: "Supino Reto",
      body_part: "Peito",
      equipment: "Barra",
      gif_url: "/api/placeholder/400/300",
      series: 4,
      repetitions: 12
    },
    {
      name: "Agachamento",
      body_part: "Pernas",
      equipment: "Barra",
      gif_url: "/api/placeholder/400/300",
      series: 3,
      repetitions: 15
    }
  ];

  // Get unique body parts for filter
  const bodyParts = [...new Set(exercises.map(ex => ex.body_part))];

  // Filter exercises based on search and body part
  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBodyPart = !selectedBodyPart || exercise.body_part === selectedBodyPart;
    return matchesSearch && matchesBodyPart;
  });

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 sticky top-4 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Pesquisar exercícios..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Body Part Filter */}
          <select
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedBodyPart}
            onChange={(e) => setSelectedBodyPart(e.target.value)}
          >
            <option value="">Todas as partes do corpo</option>
            {bodyParts.map(part => (
              <option key={part} value={part}>{part}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Exercise List */}
      <div className="space-y-2">
        {filteredExercises.map((exercise, index) => (
          <div
            key={index}
            onClick={() => setSelectedExercise(exercise)}
            className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <h2 className="text-xl font-semibold">{exercise.name}</h2>
            <p className="text-gray-600 text-sm mt-1">{exercise.body_part}</p>
          </div>
        ))}

        {filteredExercises.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhum exercício encontrado com os filtros selecionados.
          </div>
        )}
      </div>

      {/* Exercise Details Modal */}
      <Dialog open={!!selectedExercise} onOpenChange={() => setSelectedExercise(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {selectedExercise?.name}
            </DialogTitle>
          </DialogHeader>
          
          {selectedExercise && (
            <div className="mt-4 space-y-6">
              {/* Exercise Image */}
              <div className="rounded-lg overflow-hidden">
                <img
                  src={selectedExercise.gif_url}
                  alt={selectedExercise.name}
                  className="w-full h-64 object-cover"
                />
              </div>

              {/* Exercise Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-1">Parte do Corpo</h3>
                  <p className="text-gray-600">{selectedExercise.body_part}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-1">Equipamento</h3>
                  <p className="text-gray-600">{selectedExercise.equipment}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-1">Séries</h3>
                  <p className="text-gray-600">{selectedExercise.series}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-1">Repetições</h3>
                  <p className="text-gray-600">{selectedExercise.repetitions}</p>
                </div>
              </div>
            </div>
          )}

          <DialogClose className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5 text-gray-500" />
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExercisePage; 