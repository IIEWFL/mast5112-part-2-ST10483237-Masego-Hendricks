import React, { createContext, useState, ReactNode } from 'react';


export type Dish = {
  id: string;
  name: string;
  description: string;
  course: 'Starter' | 'Main' | 'Dessert' | string;
  price: number;
  image?: any;
};

type MenuContextType = {
  currentMenu: Dish[]; // list of dishes currently added
  addCustomDish: (course: string, name: string, description: string, price: number) => void; // adds new dish
  removeDishFromMenu: (dishId: string) => void; // removes a dish
  isCourseSelected: (course: string) => boolean; // checks if a course already has dishes
};

//Gives default empty values
export const MenuContext = createContext<MenuContextType>({
  currentMenu: [],
  addCustomDish: () => {},
  removeDishFromMenu: () => {},
  isCourseSelected: () => false,
});

// Help match image automatically by keyword
const matchImage = (name: string) => {
  const lower = name.toLowerCase(); // lowercase makes it easier to check for certain stuff

  // check what the dish name includes and return a matching image
  if (lower.includes('spring')) return require('../assets/food/springrolls.jpg');
  if (lower.includes('arancini')) return require('../assets/food/arancini.jpg');
  if (lower.includes('poppers')) return require('../assets/food/poppers.jpg');
  if (lower.includes('rib')) return require('../assets/food/ribs.jpg');
  if (lower.includes('calamari')) return require('../assets/food/calamari.jpg');
  if (lower.includes('wing')) return require('../assets/food/wings.jpg');
  if (lower.includes('cheese')) return require('../assets/food/cheesecake.jpg');
  if (lower.includes('malva')) return require('../assets/food/malva.jpg');
  if (lower.includes('brownie')) return require('../assets/food/brownie.jpg');
  if (lower.includes('churro')) return require('../assets/food/churros.jpg');
  if (lower.includes('beef')) return require('../assets/food/ribeye.jpg');

  // default fallback, incase no match is found
  return require('../assets/food/default.jpg');
};

export const MenuProvider = ({ children }: { children: ReactNode }) => {
   // This stores all the dishes that the chef has added
  const [currentMenu, setCurrentMenu] = useState<Dish[]>([]);

  // Function to add a new dish
  const addCustomDish = (course: string, name: string, description: string, price: number) => {
    const newDish: Dish = {
      id: Math.random().toString(),
      name,
      description,
      course,
      price,
      image: matchImage(name),
    };
    // Add the new dish to the list
    setCurrentMenu((prev) => [...prev, newDish]);
  };

   // This checks if a course already has any dishes added
  const removeDishFromMenu = (dishId: string) => {
    setCurrentMenu((prev) => prev.filter((i) => i.id !== dishId));
  };

  const isCourseSelected = (course: string) => {
    return currentMenu.some((item) => item.course === course);
  };

  // This makes all the data available to other screens
  return (
    <MenuContext.Provider value={{ currentMenu, addCustomDish, removeDishFromMenu, isCourseSelected }}>
      {children}
    </MenuContext.Provider>
  );
};
