import React, { createContext, useEffect, useState, ReactNode } from 'react';

export type Dish = {
  id: string;
  name: string;
  description: string;
  course: 'Starter' | 'Main' | 'Dessert' | string;
  price: number;
  image?: any;
};

type MenuContextType = {
  catalog: Dish[];
  currentMenu: Dish[];
  addDishToMenu: (dishId: string) => void;
  removeDishFromMenu: (dishId: string) => void;
  stats: () => { total: number; avgByCourse: Record<string, number> };
  isCourseSelected: (course: string) => boolean;
};

export const MenuContext = createContext<MenuContextType>({
  catalog: [],
  currentMenu: [],
  addDishToMenu: () => {},
  removeDishFromMenu: () => {},
  stats: () => ({ total: 0, avgByCourse: {} }),
  isCourseSelected: () => false,
});

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [catalog, setCatalog] = useState<Dish[]>([]);
  const [currentMenu, setCurrentMenu] = useState<Dish[]>([]);

  useEffect(() => {
    const sampleCatalog: Dish[] = [
      
      {
        id: 's1',
        name: 'Spicy Arancini',
        description: 'Aubergine, feta, mozzarella, spicy tomato sauce',
        course: 'Starter',
        price: 75,
        image: require('../assets/food/arancini.jpg'),
      },
      {
        id: 's2',
        name: 'Vegetable Spring Rolls',
        description: 'Crispy rolls with veggies, served with sweet chilli',
        course: 'Starter',
        price: 75,
        image: require('../assets/food/springrolls.jpg'),
      },
      {
        id: 's3',
        name: 'Jalapeño Poppers',
        description: 'Cream cheese, baby spinach, spicy mayo',
        course: 'Starter',
        price: 79,
        image: require('../assets/food/poppers.jpg'),
      },

      
      {
        id: 'm1',
        name: 'Beef Rib-Eye (350g)',
        description: 'Sweet potato, beetroot, marrow jus',
        course: 'Main',
        price: 330,
        image: require('../assets/food/ribeye.jpg'),
      },
      {
        id: 'm2',
        name: 'Grilled Calamari',
        description: 'Teriyaki dressing, sesame seeds',
        course: 'Main',
        price: 125,
        image: require('../assets/food/calamari.jpg'),
      },
      {
        id: 'm3',
        name: 'BBQ Beef Ribs',
        description: 'Smoked BBQ glaze, house slaw, sesame',
        course: 'Main',
        price: 135,
        image: require('../assets/food/ribs.jpg'),
      },
      {
        id: 'm4',
        name: 'Tempo Chicken Wings',
        description: 'Spicy peri-peri or smoked BBQ glaze',
        course: 'Main',
        price: 135,
        image: require('../assets/food/wings.jpg'),
      },

      
      {
        id: 'd1',
        name: 'Strawberry Cheesecake',
        description: 'Baked cheesecake, coulis, strawberry gelato',
        course: 'Dessert',
        price: 125,
        image: require('../assets/food/cheesecake.jpg'),
      },
      {
        id: 'd2',
        name: 'Classic Malva Sponge',
        description: 'Spice cake, custard, poached pear, vanilla gelato',
        course: 'Dessert',
        price: 120,
        image: require('../assets/food/malva.jpg'),
      },
      {
        id: 'd3',
        name: 'Warm Chocolate Brownie',
        description: 'Dark chocolate, caramel sauce, hazelnut crumble',
        course: 'Dessert',
        price: 95,
        image: require('../assets/food/brownie.jpg'),
      },
      {
        id: 'd4',
        name: 'Churros',
        description: 'Cinnamon sugar, Nutella or caramel dip',
        course: 'Dessert',
        price: 125,
        image: require('../assets/food/churros.jpg'),
      },
    ];

    setCatalog(sampleCatalog);
   
  }, []);

  const addDishToMenu = (dishId: string) => {
    const dish = catalog.find((d) => d.id === dishId);
    if (!dish) return;
    setCurrentMenu((prev) => (prev.some((i) => i.id === dishId) ? prev : [...prev, dish]));
  };

  const removeDishFromMenu = (dishId: string) => {
    setCurrentMenu((prev) => prev.filter((i) => i.id !== dishId));
  };

  const stats = () => {
    const total = currentMenu.length;
    const courses = ['Starter', 'Main', 'Dessert'];
    const avgByCourse: Record<string, number> = {};
    courses.forEach((c) => {
      const items = currentMenu.filter((i) => i.course === c);
      const avg = items.length ? items.reduce((s, it) => s + (it.price || 0), 0) / items.length : 0;
      avgByCourse[c] = Math.round(avg * 100) / 100;
    });
    return { total, avgByCourse };
  };

  const isCourseSelected = (course: string) => currentMenu.some((item) => item.course === course);

  return (
    <MenuContext.Provider value={{ catalog, currentMenu, addDishToMenu, removeDishFromMenu, stats, isCourseSelected }}>
      {children}
    </MenuContext.Provider>
  );
};
