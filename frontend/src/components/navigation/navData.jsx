import { Home, Dumbbell, CircleUserRound } from 'lucide-react';

export const menuItems = [
  { 
    name: "Página Inicial", 
    path: "/dashboard",
    icon: <Home className="w-7 h-7" />
  },
  { 
    name: "Treinos", 
    path: "/dashboard/workouts",
    icon: <Dumbbell className="w-7 h-7" />
  },
  { 
    name: "Perfil", 
    path: "/dashboard/profile",
    icon: <CircleUserRound className="w-7 h-7" />
  }
];
