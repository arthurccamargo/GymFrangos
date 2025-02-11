import { Home, Dumbbell } from 'lucide-react';

export const menuItems = [
  { 
    name: "Página Inicial", 
    path: "/dashboard",
    icon: <Home className="w-6 h-6" />
  },
  { 
    name: "Treinos", 
    path: "/dashboard/workouts",
    icon: <Dumbbell className="w-6 h-6" />
  }
];
