const initialRestaurants = [
  {
    id: "hotel_ronak",
    name: "Hotel Ronak",
    description: "Experience authentic Indian cuisine in a luxurious setting. Our chefs prepare traditional dishes with a modern twist, using the finest ingredients.",
    logo: "hotel ronak/ronak logo.avif",
    rating: 4.5,
    deliveryTime: 35,
    distance: 2.8,
    priceRange: "₹₹₹",
    priceValue: 3,
    hours: "11:00 AM - 11:00 PM",
    cuisines: ["North Indian", "Mughlai", "Biryani", "Desserts"],
    categories: ["Paneer Corner", "Kaju Special", "Platters", "Biryani's and Rice"],
    menu: [
      {
        id: "ronak_paneer_kolhapuri",
        name: "Paneer Kolhapuri",
        description: "A rich and spicy Maharashtrian curry made with fresh paneer, aromatic spices, and a special Kolhapuri masala.",
        price: 350,
        image: "hotel ronak/menu/paneer kolhapuri.jpg",
        category: "Paneer Corner",
        rating: 4.4,
        isVeg: true,
        isBestseller: true
      },
      {
        id: "ronak_paneer_lababdar",
        name: "Paneer Lababdar",
        description: "A creamy and luxurious North Indian curry with soft paneer cubes in a rich tomato-based gravy, finished with cream and butter.",
        price: 380,
        image: "hotel ronak/menu/paneer lababdar.jpg",
        category: "Paneer Corner",
        rating: 4.6,
        isVeg: true,
        isBestseller: false
      },
      {
        id: "ronak_butter_paneer",
        name: "Butter Paneer",
        description: "A classic North Indian delicacy featuring soft paneer cubes in a rich, creamy tomato gravy with a perfect blend of spices and butter.",
        price: 360,
        image: "hotel ronak/menu/butter paneer.jpg",
        category: "Paneer Corner",
        rating: 4.7,
        isVeg: true,
        isBestseller: true
      },
      {
        id: "ronak_paneer_malai_tikka",
        name: "Paneer Malai Tikka",
        description: "Succulent paneer cubes marinated in a creamy malai mixture, grilled to perfection, and served with mint chutney.",
        price: 320,
        image: "hotel ronak/menu/paneer malai tikka.jpg",
        category: "Paneer Corner",
        rating: 4.3,
        isVeg: true,
        isBestseller: false
      },
      {
        id: "ronak_kaju_curry",
        name: "Kaju Curry",
        description: "A rich and creamy curry made with cashews, aromatic spices, and fresh cream. A perfect blend of nutty flavors and Indian spices.",
        price: 400,
        image: "hotel ronak/menu/kaju curry.jpg",
        category: "Kaju Special",
        rating: 4.5,
        isVeg: true,
        isBestseller: false
      },
      {
        id: "ronak_kaju_masala",
        name: "Kaju Masala",
        description: "Whole cashews cooked in a spicy and aromatic masala gravy, garnished with fresh coriander. A royal delicacy for special occasions.",
        price: 420,
        image: "hotel ronak/menu/kaju masala.jpg",
        category: "Kaju Special",
        rating: 4.6,
        isVeg: true,
        isBestseller: true
      },
      {
        id: "ronak_kaju_paneer",
        name: "Kaju Paneer",
        description: "A luxurious combination of fresh paneer and cashews in a rich, creamy gravy. The perfect fusion of two beloved ingredients.",
        price: 440,
        image: "hotel ronak/menu/kaju paneer.jpg",
        category: "Kaju Special",
        rating: 4.8,
        isVeg: true,
        isBestseller: true
      },
      {
        id: "ronak_chinese_platter",
        name: "Chinese Platter",
        description: "A delightful assortment of Chinese favorites including spring rolls, manchurian, noodles, and fried rice. Perfect for sharing.",
        price: 899,
        image: "hotel ronak/menu/chinese platter.jpg",
        category: "Platters",
        rating: 4.7,
        isVeg: true,
        isBestseller: true
      },
      {
        id: "ronak_veg_biryani",
        name: "Veg Biryani",
        description: "Fragrant basmati rice cooked with fresh vegetables, aromatic spices, and herbs. Served with raita and salan.",
        price: 280,
        image: "hotel ronak/menu/veg biryani.jpg",
        category: "Biryani's and Rice",
        rating: 4.2,
        isVeg: true,
        isBestseller: false
      },
      {
        id: "ronak_hyderabadi_veg_biryani",
        name: "Hyderabadi Veg Biryani",
        description: "A royal vegetarian delight prepared with premium basmati rice, fresh vegetables, and authentic Hyderabadi spices.",
        price: 320,
        image: "hotel ronak/menu/hyderabadi veg biryani.jpg",
        category: "Biryani's and Rice",
        rating: 4.6,
        isVeg: true,
        isBestseller: true
      },
      {
        id: "ronak_chicken_biryani",
        name: "Chicken Biryani",
        description: "Tender chicken pieces marinated and cooked with aromatic rice and special blend of spices. A flavorful classic.",
        price: 380,
        image: "hotel ronak/menu/chicken biryani.jpg",
        category: "Biryani's and Rice",
        rating: 4.8,
        isVeg: false,
        isBestseller: true
      },
      {
        id: "ronak_chicken_handi_biryani",
        name: "Chicken Handi Biryani",
        description: "A special preparation cooked in a traditional handi, giving it a unique earthy flavor. Served with special gravy.",
        price: 420,
        image: "hotel ronak/menu/chicken handi biryani.jpg",
        category: "Biryani's and Rice",
        rating: 4.5,
        isVeg: false,
        isBestseller: false
      },
      {
        id: "ronak_mutton_biryani",
        name: "Mutton Biryani",
        description: "Succulent pieces of mutton cooked with finest basmati rice and signature spice blend. A rich and aromatic delicacy.",
        price: 450,
        image: "hotel ronak/menu/mutton biryani.jpg",
        category: "Biryani's and Rice",
        rating: 4.7,
        isVeg: false,
        isBestseller: true
      },
      {
        id: "ronak_mutton_handi_biryani",
        name: "Mutton Handi Biryani",
        description: "Our signature handi-cooked mutton biryani with tender meat pieces and aromatic rice. Served with special gravy.",
        price: 480,
        image: "hotel ronak/menu/mutton handi biryani.jpg",
        category: "Biryani's and Rice",
        rating: 4.9,
        isVeg: false,
        isBestseller: true
      }
    ]
  },
  {
    id: "dominos",
    name: "Dominos",
    description: "Enjoy the world's best pizzas with our signature crust and fresh toppings. Fast delivery and hot, delicious pizzas every time.",
    logo: "dominos/logo.avif",
    rating: 4.8,
    deliveryTime: 25,
    distance: 1.5,
    priceRange: "₹₹",
    priceValue: 2,
    hours: "10:00 AM - 12:00 AM",
    cuisines: ["Pizza", "Fast Food", "Italian", "Desserts"],
    categories: ["Veg Pizzas", "Non-Veg Pizzas", "Cheese Burst"],
    menu: [
      {
        id: "dominos_fresh_veggie",
        name: "Fresh Veggie Pizza",
        description: "A delightful combination of fresh vegetables including capsicum, onion, tomato, and sweet corn on a crispy crust.",
        price: 399,
        image: "dominos/menu/Fresh Veggie Pizza.jpg",
        category: "Veg Pizzas",
        rating: 4.5,
        isVeg: true,
        isBestseller: false
      },
      {
        id: "dominos_farmhouse",
        name: "Farmhouse Pizza",
        description: "A hearty pizza loaded with fresh vegetables, mushrooms, and a perfect blend of herbs and spices.",
        price: 459,
        image: "dominos/menu/Farmhouse Pizza.jpg",
        category: "Veg Pizzas",
        rating: 4.8,
        isVeg: true,
        isBestseller: true
      },
      {
        id: "dominos_peppy_paneer",
        name: "Peppy Paneer Pizza",
        description: "Chunky paneer with crisp capsicum and spicy red pepper, topped with our signature sauce.",
        price: 499,
        image: "dominos/menu/Peppy Paneer Pizza.jpg",
        category: "Veg Pizzas",
        rating: 4.6,
        isVeg: true,
        isBestseller: true
      },
      {
        id: "dominos_spiced_double_chicken",
        name: "Spiced Double Chicken",
        description: "Double the chicken, double the flavor! Loaded with spicy chicken and a perfect blend of herbs.",
        price: 549,
        image: "dominos/menu/Spiced Double Chicken.jpg",
        category: "Non-Veg Pizzas",
        rating: 4.7,
        isVeg: false,
        isBestseller: true
      },
      {
        id: "dominos_pepper_barbecue",
        name: "Pepper Barbecue Chicken Pizza",
        description: "Grilled chicken with a smoky barbecue sauce, topped with onions and capsicum.",
        price: 529,
        image: "dominos/menu/Pepper Barbecue Chicken Pizza.jpg",
        category: "Non-Veg Pizzas",
        rating: 4.5,
        isVeg: false,
        isBestseller: false
      },
      {
        id: "dominos_blazing_chicken_paprika",
        name: "Blazing Chicken & Paprika",
        description: "Spicy chicken with a fiery paprika sauce, perfect for those who love extra heat!",
        price: 559,
        image: "dominos/menu/Blazing Chicken & Paprika Pizza.jpg",
        category: "Non-Veg Pizzas",
        rating: 4.6,
        isVeg: false,
        isBestseller: false
      },
      {
        id: "dominos_veggie_paradise_cb",
        name: "Veggie Paradise Cheese Burst",
        description: "A paradise of fresh vegetables with an extra layer of cheese bursting with flavor.",
        price: 599,
        image: "dominos/menu/Veggie Paradise Cheese Burst.jpg",
        category: "Cheese Burst",
        rating: 4.7,
        isVeg: true,
        isBestseller: true
      },
      {
        id: "dominos_peppy_paneer_cb",
        name: "Peppy Paneer Cheese Burst",
        description: "Chunky paneer with an extra layer of cheese that bursts with every bite.",
        price: 649,
        image: "dominos/menu/Peppy Paneer Cheese Burst.jpg",
        category: "Cheese Burst",
        rating: 4.8,
        isVeg: true,
        isBestseller: true
      },
      {
        id: "dominos_chicken_sausage_cb",
        name: "Chicken Sausage Cheese Burst",
        description: "Juicy chicken sausages with an extra layer of cheese that makes every bite special.",
        price: 699,
        image: "dominos/menu/Chicken Sausage Cheese Burst.jpg",
        category: "Cheese Burst",
        rating: 4.5,
        isVeg: false,
        isBestseller: false
      },
      {
        id: "dominos_chicken_pepperoni_cb",
        name: "Chicken Pepperoni Cheese Burst",
        description: "Classic pepperoni with an extra layer of cheese that bursts with flavor.",
        price: 729,
        image: "dominos/menu/Chicken Pepperoni Cheese Burst.jpg",
        category: "Cheese Burst",
        rating: 4.9,
        isVeg: false,
        isBestseller: true
      },
      {
        id: "dominos_indi_chicken_tikka_cb",
        name: "Indi Chicken Tikka Cheese Burst",
        description: "Indian spiced chicken tikka with an extra layer of cheese that bursts with every bite.",
        price: 699,
        image: "dominos/menu/Indi Chicken Tikka Cheese Burst.jpg",
        category: "Cheese Burst",
        rating: 4.8,
        isVeg: false,
        isBestseller: true
      }
    ]
  },
  {
    id: "dear_momo",
    name: "Dear Momo",
    description: "Experience authentic and innovative momos in a cozy setting. Our chefs prepare delicious dumplings with fresh ingredients and unique flavors.",
    logo: "Dear Momo/logo.avif",
    rating: 4.9,
    deliveryTime: 20,
    distance: 2.1,
    priceRange: "₹₹",
    priceValue: 2,
    hours: "11:00 AM - 10:30 PM",
    cuisines: ["Tibetan", "Chinese", "Fast Food", "Beverages"],
    categories: ["Momos", "Sides", "Desserts", "Beverages"],
    menu: [
      {
        id: "momo_veg_steamed",
        name: "Veg Steamed Momos",
        description: "Delicious steamed dumplings filled with fresh vegetables. (6 Pieces)",
        price: 129,
        image: "Dear Momo/menu/Veg Steamed Momos [6 Pieces].avif",
        category: "Momos",
        rating: 4.7,
        isVeg: true,
        isBestseller: true
      },
      {
        id: "momo_veg_fried",
        name: "Veg Fried Momos",
        description: "Crispy fried dumplings with vegetable filling.",
        price: 149,
        image: "Dear Momo/menu/Veg Fried Momos.avif",
        category: "Momos",
        rating: 4.5,
        isVeg: true,
        isBestseller: false
      },
      {
        id: "momo_tandoori_cheese",
        name: "Tandoori Cheese Momos",
        description: "Cheese-filled momos marinated in tandoori spices and grilled. (6 Pieces)",
        price: 169,
        image: "Dear Momo/menu/Tandoori Cheese Momos [6 Pieces].avif",
        category: "Momos",
        rating: 4.8,
        isVeg: true,
        isBestseller: true
      },
      {
        id: "momo_veg_pizza",
        name: "Veg Pizza Momos",
        description: "Pizza-flavored momos packed with melted cheese and sweet corn. (6 Pieces)",
        price: 179,
        image: "Dear Momo/menu/Veg Pizza Momos [6 Pieces].avif",
        category: "Momos",
        rating: 4.6,
        isVeg: true,
        isBestseller: false
      },
      {
        id: "momo_veg_fried_cheese",
        name: "Veg Fried Cheese Momos",
        description: "Crispy golden fried momos with cheese and vegetable center. (6 Pieces)",
        price: 189,
        image: "Dear Momo/menu/Veg Fried Cheese Momos [6 Pieces].avif",
        category: "Momos",
        rating: 4.8,
        isVeg: true,
        isBestseller: true
      },
      {
        id: "momo_schezwan",
        name: "Spicy Schezwan Momos",
        description: "Spicy momos tossed in a fiery home-made Schezwan sauce. (6 Pieces)",
        price: 159,
        image: "Dear Momo/menu/Spicy Schezwan Momos [6 Pieces].jpg",
        category: "Momos",
        rating: 4.6,
        isVeg: true,
        isBestseller: false
      },
      {
        id: "momo_fries_plain",
        name: "Plain Salted French Fries",
        description: "Crispy golden skin-on fries with a light dusting of sea salt.",
        price: 99,
        image: "Dear Momo/menu/Plain Salted French Fries.jpeg",
        category: "Sides",
        rating: 4.1,
        isVeg: true,
        isBestseller: false
      },
      {
        id: "momo_fries_peri",
        name: "Peri Peri Fries",
        description: "Spicy and tangy peri-peri seasoned french fries.",
        price: 119,
        image: "Dear Momo/menu/Peri Peri Fries.jpeg",
        category: "Sides",
        rating: 4.4,
        isVeg: true,
        isBestseller: true
      },
      {
        id: "momo_brownie_blast",
        name: "Brownie Blast",
        description: "Rich chocolate fudge brownie served hot with a scoop of vanilla ice cream.",
        price: 149,
        image: "Dear Momo/menu/Brownie Blast.jpeg",
        category: "Desserts",
        rating: 4.7,
        isVeg: true,
        isBestseller: true
      },
      {
        id: "momo_cold_coffee",
        name: "Cold Coffee",
        description: "Creamy blended cold coffee with chocolate syrup and vanilla ice cream scoop.",
        price: 129,
        image: "Dear Momo/menu/Cold Coffee.jpeg",
        category: "Beverages",
        rating: 4.5,
        isVeg: true,
        isBestseller: false
      }
    ]
  },
  {
    id: "sukhsagar_pizza_hub",
    name: "Sukhsagar Pizza Hub",
    description: "Experience delicious fast food and beverages in a vibrant setting. Our menu features a wide variety of burgers, sandwiches, fries, and momos.",
    logo: "sukhsagar pizz hub/logo.avif",
    rating: 4.3,
    deliveryTime: 30,
    distance: 3.2,
    priceRange: "₹₹",
    priceValue: 2,
    hours: "10:00 AM - 10:00 PM",
    cuisines: ["Fast Food", "Burgers", "Sandwiches", "Momos"],
    categories: ["Burgers", "Sandwiches", "Fries", "Momos"],
    menu: [
      {
        id: "sukhsagar_veg_burger",
        name: "Veg Burger",
        description: "Classic golden vegetable patty with fresh lettuce, tomatoes, and mayonnaise.",
        price: 80,
        image: "sukhsagar pizz hub/menu/veg burger.avif",
        category: "Burgers",
        rating: 4.1,
        isVeg: true,
        isBestseller: false
      },
      {
        id: "sukhsagar_veg_cheese_burger",
        name: "Veg Cheese Burger",
        description: "Delicious vegetable patty with a slice of processed cheese and creamy mayo.",
        price: 100,
        image: "sukhsagar pizz hub/menu/veg cheese burger.jpeg",
        category: "Burgers",
        rating: 4.4,
        isVeg: true,
        isBestseller: true
      },
      {
        id: "sukhsagar_aloo_tikki_burger",
        name: "Aloo Tikki Burger",
        description: "Spiced potato patty burger layered with sliced onions, sweet tomatoes, and spicy sauce.",
        price: 90,
        image: "sukhsagar pizz hub/menu/aloo tikki burger.avif",
        category: "Burgers",
        rating: 4.3,
        isVeg: true,
        isBestseller: true
      },
      {
        id: "sukhsagar_veg_grilled_sandwich",
        name: "Veg Grilled Sandwich",
        description: "Grilled jumbo bread sandwich filled with capsicum, onions, cucumbers, and special green chutney.",
        price: 120,
        image: "sukhsagar pizz hub/menu/veg grilled sandwich.avif",
        category: "Sandwiches",
        rating: 4.2,
        isVeg: true,
        isBestseller: false
      },
      {
        id: "sukhsagar_paneer_grilled_sandwich",
        name: "Paneer Grilled Sandwich",
        description: "Crispy grilled sandwich loaded with spiced cottage cheese cubes, sweet corn, and onions.",
        price: 140,
        image: "sukhsagar pizz hub/menu/paneer grilled sandwich.jpeg",
        category: "Sandwiches",
        rating: 4.6,
        isVeg: true,
        isBestseller: true
      },
      {
        id: "sukhsagar_salted_fries",
        name: "Salted Fries",
        description: "Crispy skin-on french fries seasoned with table salt.",
        price: 80,
        image: "sukhsagar pizz hub/menu/salted fries.jpeg",
        category: "Fries",
        rating: 4.0,
        isVeg: true,
        isBestseller: false
      },
      {
        id: "sukhsagar_masala_fries",
        name: "Masala Fries",
        description: "Spiced french fries dusted with a custom spicy peri-masala seasoning.",
        price: 90,
        image: "sukhsagar pizz hub/menu/masala fries.jpeg",
        category: "Fries",
        rating: 4.2,
        isVeg: true,
        isBestseller: false
      },
      {
        id: "sukhsagar_veg_fried_momos",
        name: "Veg Fried Momos",
        description: "Crispy fried vegetable dumplings served with spicy garlic sauce.",
        price: 120,
        image: "sukhsagar pizz hub/menu/veg fried momos.jpeg",
        category: "Momos",
        rating: 4.3,
        isVeg: true,
        isBestseller: true
      },
      {
        id: "sukhsagar_paneer_fried_momos",
        name: "Paneer Fried Momos",
        description: "Crispy fried dumplings stuffed with soft paneer, onions, and select herbs.",
        price: 140,
        image: "sukhsagar pizz hub/menu/paneer fried momos.avif",
        category: "Momos",
        rating: 4.5,
        isVeg: true,
        isBestseller: true
      }
    ]
  },
  {
    id: "hotel_silver_palace",
    name: "Hotel Silver Palace",
    description: "Experience royal dining with our exquisite North Indian and Mughlai cuisine. Known for our rich curries, tandoori specialties, and warm hospitality.",
    logo: "hotel silver palace/logo.avif",
    rating: 4.6,
    deliveryTime: 40,
    distance: 4.2,
    priceRange: "₹₹₹",
    priceValue: 3,
    hours: "12:00 PM - 11:30 PM",
    cuisines: ["North Indian", "Mughlai", "Tandoor", "Breads"],
    categories: ["Main Course", "Starters", "Breads"],
    menu: [
      {
        id: "silver_palak_paneer",
        name: "Palak Paneer",
        description: "Fresh cottage cheese cubes cooked in a delicious, spiced, creamy spinach gravy.",
        price: 220,
        image: "Hotel Silver Palace/menu/Palak Paneer.avif",
        category: "Main Course",
        rating: 4.5,
        isVeg: true,
        isBestseller: false
      },
      {
        id: "silver_paneer_tikka_masala",
        name: "Paneer Tikka Masala",
        description: "Charcoal-grilled cottage cheese cubes cooked in a rich, creamy, and spicy onion tomato gravy.",
        price: 250,
        image: "Hotel Silver Palace/menu/Paneer Tikka Masala.avif",
        category: "Main Course",
        rating: 4.7,
        isVeg: true,
        isBestseller: true
      },
      {
        id: "silver_veg_kadai",
        name: "Veg Kadai",
        description: "Mixed seasonal vegetables cooked with fresh capsicum and onions in a spicy, aromatic kadai gravy.",
        price: 200,
        image: "Hotel Silver Palace/menu/Veg Kadai.avif",
        category: "Main Course",
        rating: 4.3,
        isVeg: true,
        isBestseller: false
      },
      {
        id: "silver_paneer_pakoda",
        name: "Paneer Pakoda",
        description: "Soft cottage cheese slices stuffed with mint chutney, batter fried to golden perfection.",
        price: 180,
        image: "Hotel Silver Palace/menu/Paneer pakoda.avif",
        category: "Starters",
        rating: 4.4,
        isVeg: true,
        isBestseller: true
      },
      {
        id: "silver_crispy_corn",
        name: "Crispy American Corn",
        description: "Batter-fried sweet corn kernels tossed in red onions, green chillies, and chat masala.",
        price: 160,
        image: "Hotel Silver Palace/menu/Crispy American Corn.avif",
        category: "Starters",
        rating: 4.2,
        isVeg: true,
        isBestseller: false
      },
      {
        id: "silver_shanghai_roll",
        name: "Veg Shanghai Roll",
        description: "Deep-fried rolls stuffed with minced mixed vegetables and glass noodles, seasoned with soy sauce.",
        price: 150,
        image: "Hotel Silver Palace/menu/Veg Shanghai Roll.avif",
        category: "Starters",
        rating: 4.5,
        isVeg: true,
        isBestseller: true
      }
    ]
  }
];

const initialCoupons = [
  { code: "BITE50", discountType: "percentage", value: 50, maxDiscount: 150, minOrder: 200, desc: "50% off on orders above ₹200 (upto ₹150)" },
  { code: "DELIVERYFREE", discountType: "free_delivery", value: 20, maxDiscount: 20, minOrder: 150, desc: "Free Delivery on orders above ₹150" },
  { code: "WELCOME100", discountType: "flat", value: 100, maxDiscount: 100, minOrder: 400, desc: "Flat ₹100 off on orders above ₹400" }
];

const initialReviews = [
  { id: 1, user: "Aarav Sharma", rating: 5, comment: "BiteXpress is incredibly fast! Dominos pizza arrived in 15 mins hot and fresh. Design is top notch.", date: "2026-06-18" },
  { id: 2, user: "Riya Patel", rating: 4, comment: "I love Dear Momo's Tandoori cheese momos. The ordering experience is very smooth and intuitive.", date: "2026-06-19" },
  { id: 3, user: "Karan Johar", rating: 5, comment: "The checkout flow is great. Saved addresses make it a single-click experience. Highly recommended!", date: "2026-06-20" }
];

// Helper to seed localStorage
function seedDatabase() {
  if (!localStorage.getItem("bx_restaurants")) {
    localStorage.setItem("bx_restaurants", JSON.stringify(initialRestaurants));
  }
  if (!localStorage.getItem("bx_coupons")) {
    localStorage.setItem("bx_coupons", JSON.stringify(initialCoupons));
  }
  if (!localStorage.getItem("bx_reviews")) {
    localStorage.setItem("bx_reviews", JSON.stringify(initialReviews));
  }
  if (!localStorage.getItem("bx_orders")) {
    localStorage.setItem("bx_orders", JSON.stringify([
      {
        orderId: "ORD658932",
        name: "Aditya Kumar",
        phone: "9876543210",
        address: "404 coding street, Tech Park, City",
        pincode: "400013",
        paymentMethod: "upi",
        date: "2026-06-20T11:45:00.000Z",
        items: [
          { name: "Farmhouse Pizza", price: 459, quantity: 1, restaurant: "Dominos", image: "dominos/menu/Farmhouse Pizza.jpg" },
          { name: "Peri Peri Fries", price: 119, quantity: 2, restaurant: "Dear Momo", image: "Dear Momo/menu/Peri Peri Fries.jpeg" }
        ],
        subtotal: 697,
        gst: 34.85,
        deliveryCharges: 20,
        discount: 150,
        total: 601.85,
        status: "Delivered"
      },
      {
        orderId: "ORD213876",
        name: "Sarah Fernandes",
        phone: "9911223344",
        address: "71 Bakers street, Residency Town",
        pincode: "400021",
        paymentMethod: "cash",
        date: "2026-06-20T12:30:00.000Z",
        items: [
          { name: "Paneer Kolhapuri", price: 350, quantity: 1, restaurant: "Hotel Ronak", image: "hotel ronak/menu/paneer kolhapuri.jpg" }
        ],
        subtotal: 350,
        gst: 17.5,
        deliveryCharges: 20,
        discount: 0,
        total: 387.5,
        status: "Preparing"
      }
    ]));
  }
}

// Global data objects loaded from localStorage
window.BiteXpress = {
  getRestaurants: () => JSON.parse(localStorage.getItem("bx_restaurants")) || initialRestaurants,
  setRestaurants: (data) => localStorage.setItem("bx_restaurants", JSON.stringify(data)),
  getCoupons: () => JSON.parse(localStorage.getItem("bx_coupons")) || initialCoupons,
  setCoupons: (data) => localStorage.setItem("bx_coupons", JSON.stringify(data)),
  getReviews: () => JSON.parse(localStorage.getItem("bx_reviews")) || initialReviews,
  setReviews: (data) => localStorage.setItem("bx_reviews", JSON.stringify(data)),
  getOrders: () => JSON.parse(localStorage.getItem("bx_orders")) || [],
  setOrders: (data) => localStorage.setItem("bx_orders", JSON.stringify(data)),
  
  // Single helper to retrieve active user session
  getActiveUser: () => JSON.parse(localStorage.getItem("bx_active_user")) || null,
  setActiveUser: (user) => localStorage.setItem("bx_active_user", JSON.stringify(user)),
  logout: () => localStorage.removeItem("bx_active_user"),

  // Wishlist logic
  getFavorites: () => JSON.parse(localStorage.getItem("bx_favorites")) || { restaurants: [], dishes: [] },
  toggleFavoriteRestaurant: (id) => {
    let favs = JSON.parse(localStorage.getItem("bx_favorites")) || { restaurants: [], dishes: [] };
    const index = favs.restaurants.indexOf(id);
    if (index > -1) favs.restaurants.splice(index, 1);
    else favs.restaurants.push(id);
    localStorage.setItem("bx_favorites", JSON.stringify(favs));
    return favs.restaurants.includes(id);
  },
  toggleFavoriteDish: (id) => {
    let favs = JSON.parse(localStorage.getItem("bx_favorites")) || { restaurants: [], dishes: [] };
    const index = favs.dishes.indexOf(id);
    if (index > -1) favs.dishes.splice(index, 1);
    else favs.dishes.push(id);
    localStorage.setItem("bx_favorites", JSON.stringify(favs));
    return favs.dishes.includes(id);
  }
};

// Auto seed on import
seedDatabase();
console.log("BiteXpress Database initialized successfully!");
