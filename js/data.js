/**
 * TasteHub - Food Items Database
 * Array of 18 realistic food item objects with dedicated image paths across 6 categories.
 */

const foodData = [
    {
        id: 1,
        name: "Paneer Tikka Sizzler",
        category: "Starters",
        description: "Juicy paneer cubes marinated in rich Indian spices, grilled to perfection and served sizzling with mint chutney.",
        price: 249,
        image: "assets/paneer-tikka.jpg",
        rating: 4.8,
        isVeg: true
    },
    {
        id: 2,
        name: "Crispy Spring Rolls",
        category: "Starters",
        description: "Golden fried rolls stuffed with seasoned fresh vegetables and glass noodles, served with sweet chili dip.",
        price: 189,
        image: "assets/spring-rolls.jpg",
        rating: 4.5,
        isVeg: true
    },
    {
        id: 3,
        name: "Garlic Butter Prawns",
        category: "Starters",
        description: "Succulent tiger prawns tossed in rich garlic butter sauce, freshly crushed herbs, and red chili flakes.",
        price: 349,
        image: "assets/prawns.jpg",
        rating: 4.9,
        isVeg: false
    },
    {
        id: 4,
        name: "Hyderabadi Chicken Biryani",
        category: "Main Course",
        description: "Aromatic basmati rice layered with tender marinated chicken, saffron, caramelised onions, and authentic spices.",
        price: 329,
        image: "assets/biryani.jpg",
        rating: 4.9,
        isVeg: false
    },
    {
        id: 5,
        name: "Paneer Butter Masala",
        category: "Main Course",
        description: "Soft cottage cheese cubes cooked in a rich, creamy tomato and cashew butter gravy garnished with fresh cream.",
        price: 279,
        image: "assets/paneer-butter-masala.jpg",
        rating: 4.7,
        isVeg: true
    },
    {
        id: 6,
        name: "Creamy Penne Alfredo",
        category: "Main Course",
        description: "Penne pasta tossed in velvet white garlic parmesan cream sauce with broccoli, mushrooms, and herbs.",
        price: 299,
        image: "assets/pasta.jpg",
        rating: 4.6,
        isVeg: true
    },
    {
        id: 7,
        name: "Margherita Pizza",
        category: "Pizza",
        description: "Classic Italian pizza topped with fresh San Marzano tomato sauce, mozzarella cheese, and fresh basil leaves.",
        price: 249,
        image: "assets/pizza.jpg",
        rating: 4.8,
        isVeg: true
    },
    {
        id: 8,
        name: "Pepperoni Supreme Pizza",
        category: "Pizza",
        description: "Loaded with spicy beef pepperoni slices, extra mozzarella, tomato drizzle, and Italian oregano.",
        price: 399,
        image: "assets/pepperoni-pizza.jpg",
        rating: 4.9,
        isVeg: false
    },
    {
        id: 9,
        name: "Farmhouse Veggie Pizza",
        category: "Pizza",
        description: "Fresh bell peppers, sweet corn, black olives, onions, and mushrooms topped on a crispy hand-tossed crust.",
        price: 319,
        image: "assets/farmhouse-pizza.jpg",
        rating: 4.6,
        isVeg: true
    },
    {
        id: 10,
        name: "Classic Cheese Burger",
        category: "Burgers",
        description: "Flame-grilled juicy patty layered with melted cheddar cheese, crisp lettuce, ripe tomatoes, and house sauce.",
        price: 199,
        image: "assets/burger.jpg",
        rating: 4.7,
        isVeg: false
    },
    {
        id: 11,
        name: "Veggie Crunch Burger",
        category: "Burgers",
        description: "Crispy potato and vegetable patty stuffed with cheese, topped with tangy pickles and spicy mayonnaise.",
        price: 169,
        image: "assets/veggie-burger.jpg",
        rating: 4.4,
        isVeg: true
    },
    {
        id: 12,
        name: "Smoked Chicken Club Sandwich",
        category: "Burgers",
        description: "Triple-decker toasted bread filled with smoked chicken, fried egg, crisp lettuce, tomatoes, and mayo.",
        price: 229,
        image: "assets/sandwich.jpg",
        rating: 4.7,
        isVeg: false
    },
    {
        id: 13,
        name: "Molten Chocolate Lava Cake",
        category: "Desserts",
        description: "Warm chocolate cake with a rich molten chocolate center, served with vanilla ice cream and raspberry powder.",
        price: 179,
        image: "assets/lava-cake.jpg",
        rating: 4.9,
        isVeg: true
    },
    {
        id: 14,
        name: "Classic New York Cheesecake",
        category: "Desserts",
        description: "Rich, smooth, and creamy baked cheesecake on a buttery graham cracker crust with strawberry compote.",
        price: 219,
        image: "assets/cheesecake.jpg",
        rating: 4.8,
        isVeg: true
    },
    {
        id: 15,
        name: "Tiramisu Delight",
        category: "Desserts",
        description: "Classic Italian dessert made with espresso-soaked ladyfingers, velvety mascarpone cream, and cocoa dusting.",
        price: 199,
        image: "assets/tiramisu.jpg",
        rating: 4.8,
        isVeg: true
    },
    {
        id: 16,
        name: "Lemon Mint Mojito",
        category: "Drinks",
        description: "Refreshing cooler made with fresh crushed mint leaves, zesty limes, sparkling soda, and crushed ice.",
        price: 129,
        image: "assets/mojito.jpg",
        rating: 4.6,
        isVeg: true
    },
    {
        id: 17,
        name: "Cold Brew Iced Coffee",
        category: "Drinks",
        description: "Slow-steeped artisan arabica coffee served over ice with a swirl of sweetened condensed milk or almond milk.",
        price: 149,
        image: "assets/iced-coffee.jpg",
        rating: 4.7,
        isVeg: true
    },
    {
        id: 18,
        name: "Mango Passion Smoothie",
        category: "Drinks",
        description: "Thick creamy tropical blend of fresh Alphonso mangoes, passionfruit pulp, and Greek yogurt.",
        price: 159,
        image: "assets/smoothie.jpg",
        rating: 4.8,
        isVeg: true
    }
];
