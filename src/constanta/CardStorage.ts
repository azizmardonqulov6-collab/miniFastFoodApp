import { create } from 'zustand';
import burgerConbo from '../assets/card/burgerConbo.png'
export interface Item {
  id: number;
  name: string;
  price: number;
  presence: boolean;
  ingredients: string;
  image: string;
  Quontity: number;
}

export interface ProductCategory {
  id: number;
  category: string;
  name: string;
  items: Item[];
}

export interface StoreState {
  products: ProductCategory[];
  order: Item[];
  selected: Item[];


  addSelect: (product: Item) => void;
  addToOrder: (product: Item) => void;
  removeFromOrder: (id: number) => void;

  addProduct: (product: ProductCategory) => void;
  removeProduct: (id: number) => void;

  increaseQuantity: (id: number) => void;
  increaseQuantity2: (id: number) => void;
  DescreaseQuantity: (id: number) => void;
  DescreaseQuantity2: (id: number) => void;
  removeOrder: () => void;
}
interface PhoneState {
  orderBottom: boolean;
  setOrderBottom: () => void;  
  phoneOpen: boolean;
  setPhoneOpen: () => void;
  isInfo: boolean;
  setIsInfo: () => void;
}

export const useStore = create<StoreState>((set, get) => ({

  products: [
    {
      id: 1,
      category: "Combos",
      name: "Combolar",
      items: [
        {
          id: 1,
          name: "Bir kishilik combo",
          price: 55,
          presence: true,
          ingredients: "Burger, kartoshka fri, 0.5 cola",
          image: `${burgerConbo}`,
          Quontity: 1,
        },
        {
          id: 2,
          name: "Ikki kishilik combo",
          price: 98,
          presence: true,
          ingredients: "2 dona burger, 2 dona fri, 1L cola",
          image: "https://png.pngtree.com/png-clipart/20241123/original/pngtree-burger-sandwiches-png-image_17287494.png",
          Quontity: 1,
        },
        {
          id: 3,
          name: "Tovuqli combo",
          price: 62,
          presence: true,
          ingredients: "Tovuq burger, fri, 0.5 cola",
          image: "https://eda.yandex.ru/images/1473782/b154062e81719efa67027ee7bc120ed9-216x188.jpeg",
          Quontity: 1,
        },
        {
          id: 4,
          name: "Maxi combo",
          price: 74,
          presence: true,
          ingredients: "Katta burger, katta fri, 1L cola",
          image: "https://png.pngtree.com/png-clipart/20250221/original/pngtree-arabic-meat-shawarma-dish-with-potatoes-and-pickles-toopers-png-image_20488586.png",
          Quontity: 1,
        }
      ]
    },

    {
      id: 2,
      category: "Lavashs",
      name: "Lavashlar",
      items: [
        {
          id: 5,
          name: "Mini lavash",
          price: 28,
          presence: true,
          ingredients: "Go'sht, sir, pamidor, bodring",
          image: "https://png.pngtree.com/png-clipart/20250221/original/pngtree-arabic-meat-shawarma-dish-with-potatoes-and-pickles-toopers-png-image_20488586.png",
          Quontity: 1,
        },
        {
          id: 6,
          name: "Katta lavash",
          price: 35,
          presence: true,
          ingredients: "Go'sht, chips, sir, salat",
          image: "https://png.pngtree.com/png-clipart/20250221/original/pngtree-arabic-meat-shawarma-dish-with-potatoes-and-pickles-toopers-png-image_20488586.png",
          Quontity: 1,
        },
        {
          id: 7,
          name: "Tovuq lavash",
          price: 30,
          presence: true,
          ingredients: "Tovuq go'sht, mayonez, bodring",
          image: "https://png.pngtree.com/png-clipart/20250221/original/pngtree-arabic-meat-shawarma-dish-with-potatoes-and-pickles-toopers-png-image_20488586.png",
          Quontity: 1,
        },
        {
          id: 8,
          name: "Pishloqli lavash",
          price: 33,
          presence: true,
          ingredients: "Go'sht, ko'p sir, salat",
          image: "https://png.pngtree.com/png-clipart/20250221/original/pngtree-arabic-meat-shawarma-dish-with-potatoes-and-pickles-toopers-png-image_20488586.png",
          Quontity: 1,
        }
      ]
    },

    {
      id: 3,
      category: "Hotdogs",
      name: "Hotdoglar",
      items: [
        {
          id: 9,
          name: "Oddiy hotdog",
          price: 18,
          presence: true,
          ingredients: "Sosiska, ketchup, xantal",
          image: "https://png.pngtree.com/png-clipart/20250105/original/pngtree-hotdog-with-sausage-and-salad-ingredients-png-image_19086249.png",
          Quontity: 1,
        },
        {
          id: 10,
          name: "Double hotdog",
          price: 24,
          presence: true,
          ingredients: "Ikki sosiska, ketchup, chips",
          image: "https://png.pngtree.com/png-clipart/20250105/original/pngtree-hotdog-with-sausage-and-salad-ingredients-png-image_19086249.png",
          Quontity: 1,
        },
        {
          id: 11,
          name: "Tovuq hotdog",
          price: 20,
          presence: true,
          ingredients: "Tovuq sosiska, salat, sous",
          image: "https://png.pngtree.com/png-clipart/20250105/original/pngtree-hotdog-with-sausage-and-salad-ingredients-png-image_19086249.png",
          Quontity: 1,
        }
      ]
    },

    {
      id: 4,
      category: "Burgers",
      name: "Burgerlar",
      items: [
        {
          id: 12,
          name: "Classic burger",
          price: 35,
          presence: true,
          ingredients: "Go'sht kotlet, salat, sir",
          image: "https://png.pngtree.com/png-vector/20240829/ourmid/pngtree-delicious-and-testy-cheese-burger-png-image_13659847.png",
          Quontity: 1,
        },
        {
          id: 13,
          name: "Chicken burger",
          price: 32,
          presence: true,
          ingredients: "Tovuq kotlet, salat, sous",
          image: "https://png.pngtree.com/png-vector/20240923/ourmid/pngtree-delicious-crispy-chicken-burger-png-image_13890825.png",
          Quontity: 1,
        },
        {
          id: 14,
          name: "Cheese burger",
          price: 30,
          presence: true,
          ingredients: "Go'sht, ikki qavat sir",
          image: "https://png.pngtree.com/png-clipart/20230325/original/pngtree-juicy-burgers-with-a-transparent-background-png-image_9002761.png",
          Quontity: 1,
        },
        {
          id: 15,
          name: "Double burger",
          price: 48,
          presence: true,
          ingredients: "Ikki go'sht kotlet, sir, salat",
          image: "https://png.pngtree.com/png-clipart/20231017/original/pngtree-burger-food-png-free-download-png-image_13329458.png",
          Quontity: 1,
        }
      ]
    },

    {
      id: 5,
      category: "Pizzas",
      name: "Pitsalar",
      items: [
        {
          id: 16,
          name: "Pepperoni pizza",
          price: 58,
          presence: true,
          ingredients: "Pepperoni, sir, pomidor sous",
          image: "https://png.pngtree.com/png-clipart/20240716/original/pngtree-chicken-pizza-top-view-png-image_15567987.png",
          Quontity: 1,
        },
        {
          id: 17,
          name: "Tovuqli pizza",
          price: 52,
          presence: true,
          ingredients: "Tovuq go'sht, sir, zaytun",
          image: "https://png.pngtree.com/png-clipart/20250119/original/pngtree-veggie-loaded-pizza-png-image_19948705.png",
          Quontity: 1,
        },
        {
          id: 18,
          name: "Go'shtli pizza",
          price: 60,
          presence: true,
          ingredients: "Mol go'sht, sir, qalampir",
          image: "https://png.pngtree.com/png-clipart/20240924/original/pngtree-closeup-of-a-chicken-pizza-with-mouthwatering-toppings-png-image_16083305.png",
          Quontity: 1,
        },
        {
          id: 19,
          name: "Vegetarian pizza",
          price: 50,
          presence: true,
          ingredients: "Sabzavotlar, zaytun, sir",
          image: "https://png.pngtree.com/png-clipart/20250119/original/pngtree-veggie-loaded-pizza-png-image_19948705.png",
          Quontity: 1,
        },
        {
          id: 20,
          name: "Mix pizza",
          price: 65,
          presence: true,
          ingredients: "Go'sht, tovuq, pepperoni, sir",
          image: "https://png.pngtree.com/png-clipart/20250118/original/pngtree-fresh-vegetable-pizza-png-image_19948697.png",
          Quontity: 1,
        }
      ]
    }
  ],

  order: [],
  selected: [],

  addSelect: (product) => set(() => ({
    selected: [product]
  })),
addToOrder: (item) =>
  set((state) => {
    const exist = state.order.find((i) => i.id === item.id);

    if (exist) {
      return {
        order: state.order.map((i) =>
          i.id === item.id
            ? { ...i, Quontity: i.Quontity + item.Quontity }
            : i
        ),
      };
    }

    return {
      order: [...state.order, item],
    };
  }),

  removeFromOrder: (id) => set((state) => ({
    order: state.order.filter(item => item.id !== id)
  })),
  removeOrder: () => set(() => ({
    order: []
  })),

  addProduct: (product) => set((state) => ({
    products: [...state.products, product]
  })),

  removeProduct: (id) => set((state) => ({
    products: state.products.filter(item => item.id !== id)
  })),

  increaseQuantity: (productId: number): void =>
    set((state) => ({
      selected: state.selected.map((item) =>
        item.id === productId
          ? { ...item, Quontity: item.Quontity + 1 }
          : item
      ),
    })),
  increaseQuantity2: (productId: number): void =>
    set((state) => ({
      order: state.order.map((item) =>
        item.id === productId
          ? { ...item, Quontity: item.Quontity + 1 }
          : item
      ),
    })),
  DescreaseQuantity: (productId: number): void =>
    set((state) => ({
      selected: state.selected.map((item) =>
        item.id === productId
          ? { ...item, Quontity: item.Quontity - 1 }
          : item
      ),
    })),
  DescreaseQuantity2: (productId: number): void =>
    set((state) => ({
      order: state.order.map((item) =>
        item.id === productId
          ? { ...item, Quontity: item.Quontity - 1 }
          : item
      ),
    })),
  getOrderTotal: (): number =>
    get().order.reduce((total, item) => {
      return total + item.price * item.Quontity;
    }, 0),

}));

export const useUnser = create((set)=> ({
  user:[],
  PhoneNom: "",
  PhoneBooleon: false,

  setPhoneNom: (nomer : string) : void => set(() => ({
    PhoneNom: [nomer]
  })),
  
}) )

export const OpenStore = create<PhoneState>((set) => ({
  orderBottom: false,

  setOrderBottom: () =>{
    set((state) => ({
      orderBottom: !state.orderBottom
    }))
  },

  phoneOpen: false,

  setPhoneOpen: () =>
    set((state) => ({
      phoneOpen: !state.phoneOpen,
    })),
  isInfo: false,

  setIsInfo: () =>
    set((state) => ({
      isInfo: !state.isInfo,
    })),
}));