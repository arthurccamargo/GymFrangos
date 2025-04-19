import { useState, useCallback } from 'react';

const useExerciseFilters = () => {
    const [filters, setFilters] = useState({
        search: '',
        body_part: '',
        equipment: '',
        difficulty: '',
    });

    const updateFilter = useCallback((filterName, value) => {
        setFilters(prev => ({
          ...prev,
          [filterName]: value
        }));
      }, []);

    return {
    filters,
    updateFilter,
    };
};

export default useExerciseFilters;