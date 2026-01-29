// QUESTIONS
const examPapers = {
  jan29: [
    {
    question: "Statements: All pens are books. Some books are copies. Conclusions: I. Some pens are copies. II. Some books are pens.",
    options: [
      "Only I follows",
      "Only II follows",
      "Both I and II follow",
      "Neither I nor II follows"
    ],
    answer: "Only II follows"
  },
  {
    question: "Statements: All cats are animals. All animals are living beings. Conclusions: I. All cats are living beings. II. Some animals are cats.",
    options: [
      "Only I",
      "Only II",
      "Both I and II",
      "Neither I nor II"
    ],
    answer: "Both I and II"
  },
  {
    question: "Statements: Some mobiles are laptops. All laptops are expensive. Conclusions: I. Some mobiles are expensive. II. All mobiles are expensive.",
    options: [
      "Only I",
      "Only II",
      "Both I and II",
      "Neither I nor II"
    ],
    answer: "Only I"
  },
  {
    question: "Statements: No dog is a cat. All cats are animals. Conclusions: I. No dog is an animal. II. Some animals are cats.",
    options: [
      "Only I",
      "Only II",
      "Both I and II",
      "Neither I nor II"
    ],
    answer: "Only II"
  },
  {
    question: "Statements: Some fruits are apples. All apples are sweet. Conclusions: I. Some fruits are sweet. II. All fruits are sweet.",
    options: [
      "Only I",
      "Only II",
      "Both I and II",
      "Neither I nor II"
    ],
    answer: "Only I"
  },

  // Tough
  {
    question: "Statements: All teachers are graduates. Some graduates are females. Conclusions: I. Some teachers are females. II. Some females are graduates.",
    options: [
      "Only I",
      "Only II",
      "Both I and II",
      "Neither I nor II"
    ],
    answer: "Only II"
  },
  {
    question: "Statements: No pen is paper. Some papers are notebooks. Conclusions: I. No pen is a notebook. II. Some notebooks are not pens.",
    options: [
      "Only I",
      "Only II",
      "Both I and II",
      "Neither I nor II"
    ],
    answer: "Only II"
  },
  {
    question: "Statements: All cars are vehicles. Some vehicles are bikes. Conclusions: I. Some cars are bikes. II. Some bikes are vehicles.",
    options: [
      "Only I",
      "Only II",
      "Both I and II",
      "Neither I nor II"
    ],
    answer: "Only II"
  },
  {
    question: "Statements: Some boys are players. No player is lazy. Conclusions: I. Some boys are not lazy. II. No boy is lazy.",
    options: [
      "Only I",
      "Only II",
      "Both I and II",
      "Neither I nor II"
    ],
    answer: "Only I"
  },
  {
    question: "Statements: All flowers are beautiful. Some beautiful things are artificial. Conclusions: I. Some flowers are artificial. II. Some artificial things are beautiful.",
    options: [
      "Only I",
      "Only II",
      "Both I and II",
      "Neither I nor II"
    ],
    answer: "Only II"
  },

  // Very Tough
  {
    question: "Statements: Some A are B. No B is C. Conclusions: I. Some A are not C. II. No A is C.",
    options: [
      "Only I",
      "Only II",
      "Both I and II",
      "Neither I nor II"
    ],
    answer: "Only I"
  },
  {
    question: "Statements: All X are Y. No Y is Z. Conclusions: I. No X is Z. II. Some Z are not X.",
    options: [
      "Only I",
      "Only II",
      "Both I and II",
      "Neither I nor II"
    ],
    answer: "Only I"
  },
  {
    question: "Statements: Some M are N. Some N are O. Conclusions: I. Some M are O. II. Some O are M.",
    options: [
      "Only I",
      "Only II",
      "Both I and II",
      "Neither I nor II"
    ],
    answer: "Neither I nor II"
  },
  {
    question: "Statements: All roses are flowers. No flower is plastic. Conclusions: I. No rose is plastic. II. Some plastic are not roses.",
    options: [
      "Only I",
      "Only II",
      "Both I and II",
      "Neither I nor II"
    ],
    answer: "Only I"
  },
  {
    question: "Statements: Some laptops are tablets. All tablets are gadgets. Conclusions: I. Some laptops are gadgets. II. All gadgets are tablets.",
    options: [
      "Only I",
      "Only II",
      "Both I and II",
      "Neither I nor II"
    ],
    answer: "Only I"
  },
  {
    question: "Statements: No A is B. Some C are B. Conclusions: I. Some C are not A. II. No C is A.",
    options: [
      "Only I",
      "Only II",
      "Both I and II",
      "Neither I nor II"
    ],
    answer: "Only I"
  },
  {
    question: "Statements: All P are Q. Some Q are R. Conclusions: I. Some P are R. II. Some R are Q.",
    options: [
      "Only I",
      "Only II",
      "Both I and II",
      "Neither I nor II"
    ],
    answer: "Only II"
  },
  {
    question: "Statements: Some doctors are engineers. No engineer is unemployed. Conclusions: I. Some doctors are not unemployed. II. All doctors are employed.",
    options: [
      "Only I",
      "Only II",
      "Both I and II",
      "Neither I nor II"
    ],
    answer: "Only I"
  },
  {
    question: "Statements: All chairs are furniture. Some furniture are tables. Conclusions: I. Some chairs are tables. II. Some tables are furniture.",
    options: [
      "Only I",
      "Only II",
      "Both I and II",
      "Neither I nor II"
    ],
    answer: "Only II"
  },
  {
    question: "Statements: No pen is pencil. Some pencils are erasers. Conclusions: I. Some erasers are not pens. II. No eraser is pen.",
    options: [
      "Only I",
      "Only II",
      "Both I and II",
      "Neither I nor II"
    ],
    answer: "Only I"
  },

  // PYQs
  {
    question: "Statements: All trains are vehicles. All vehicles are machines. Conclusions: I. All trains are machines. II. Some machines are trains.",
    options: [
      "Only I",
      "Only II",
      "Both I and II",
      "Neither I nor II"
    ],
    answer: "Both I and II"
  },
  {
    question: "Statements: Some books are pens. No pen is pencil. Conclusions: I. Some books are not pencils. II. No book is pencil.",
    options: [
      "Only I",
      "Only II",
      "Both I and II",
      "Neither I nor II"
    ],
    answer: "Only I"
  },
  {
    question: "Statements: All fruits are healthy. Some healthy are sweet. Conclusions: I. Some fruits are sweet. II. Some sweet are healthy.",
    options: [
      "Only I",
      "Only II",
      "Both I and II",
      "Neither I nor II"
    ],
    answer: "Only II"
  },
  {
    question: "Statements: No glass is metal. All metals are strong. Conclusions: I. No glass is strong. II. Some strong are metals.",
    options: [
      "Only I",
      "Only II",
      "Both I and II",
      "Neither I nor II"
    ],
    answer: "Only II"
  },
  {
    question: "Statements: Some boys are students. All students are intelligent. Conclusions: I. Some boys are intelligent. II. All boys are intelligent.",
    options: [
      "Only I",
      "Only II",
      "Both I and II",
      "Neither I nor II"
    ],
    answer: "Only I"
  },
  {
    question: "Statements: All birds are animals. Some animals are pets. Conclusions: I. Some birds are pets. II. Some pets are animals.",
    options: [
      "Only I",
      "Only II",
      "Both I and II",
      "Neither I nor II"
    ],
    answer: "Only II"
  },
  {
    question: "Statements: No teacher is student. Some students are girls. Conclusions: I. Some girls are not teachers. II. No girl is teacher.",
    options: [
      "Only I",
      "Only II",
      "Both I and II",
      "Neither I nor II"
    ],
    answer: "Only I"
  },
  {
    question: "Statements: All laptops are computers. No computer is cheap. Conclusions: I. No laptop is cheap. II. Some computers are laptops.",
    options: [
      "Only I",
      "Only II",
      "Both I and II",
      "Neither I nor II"
    ],
    answer: "Both I and II"
  },
  {
    question: "Statements: Some A are B. All B are C. Conclusions: I. Some A are C. II. All A are C.",
    options: [
      "Only I",
      "Only II",
      "Both I and II",
      "Neither I nor II"
    ],
    answer: "Only I"
  },
  {
    question: "Statements: No apple is orange. All oranges are fruits. Conclusions: I. No apple is fruit. II. Some fruits are oranges.",
    options: [
      "Only I",
      "Only II",
      "Both I and II",
      "Neither I nor II"
      ],
    answer: "Only II"
  },
  {
    question: "Which Venn diagram represents: All dogs are animals?",
    options: [
      "Two separate circles",
      "One circle inside another",
      "Two intersecting circles",
      "Three separate circles"
    ],
    answer: "One circle inside another"
  },
  {
    question: "Which diagram represents: Some boys are students?",
    options: [
      "Separate circles",
      "One circle inside another",
      "Intersecting circles",
      "Touching circles"
    ],
    answer: "Intersecting circles"
  },
  {
    question: "Which diagram represents: No pen is pencil?",
    options: [
      "Intersecting circles",
      "One circle inside another",
      "Separate circles",
      "One circle overlapping"
    ],
    answer: "Separate circles"
  },
  {
    question: "Which diagram represents: All apples are fruits?",
    options: [
      "Apples inside fruits",
      "Fruits inside apples",
      "Separate circles",
      "Intersecting circles"
    ],
    answer: "Apples inside fruits"
  },
  {
    question: "Which diagram represents: Some girls are dancers?",
    options: [
      "Separate circles",
      "One circle inside another",
      "Intersecting circles",
      "Three circles"
    ],
    answer: "Intersecting circles"
  },
  {
    question: "Which diagram represents: All chairs are furniture?",
    options: [
      "Chairs inside furniture",
      "Furniture inside chairs",
      "Separate circles",
      "Intersecting circles"
    ],
    answer: "Chairs inside furniture"
  },
  {
    question: "Which diagram represents: Some fruits are sweet?",
    options: [
      "Separate circles",
      "Intersecting circles",
      "One circle inside another",
      "Touching circles"
    ],
    answer: "Intersecting circles"
  },
  {
    question: "Which diagram represents: No cat is a dog?",
    options: [
      "Intersecting circles",
      "One inside another",
      "Separate circles",
      "All overlapping"
    ],
    answer: "Separate circles"
  },
  {
    question: "Which diagram represents: All teachers are educated?",
    options: [
      "Teachers inside educated",
      "Educated inside teachers",
      "Separate circles",
      "Intersecting circles"
    ],
    answer: "Teachers inside educated"
  },
  {
    question: "Which diagram represents: Some students are intelligent?",
    options: [
      "Separate circles",
      "One inside another",
      "Intersecting circles",
      "Three circles"
    ],
    answer: "Intersecting circles"
  },

  // Tough level
  {
    question: "Which diagram represents: All doctors are educated and some educated are engineers?",
    options: [
      "All separate",
      "Doctors inside educated; engineers intersect educated",
      "Educated inside doctors",
      "All intersect completely"
    ],
    answer: "Doctors inside educated; engineers intersect educated"
  },
  {
    question: "Which diagram represents: No bird is mammal and all mammals are animals?",
    options: [
      "Bird separate; mammal inside animal",
      "All intersect",
      "Mammal inside bird",
      "Bird inside animal"
    ],
    answer: "Bird separate; mammal inside animal"
  },
  {
    question: "Which diagram represents: Some boys are players and all players are athletes?",
    options: [
      "Players inside athletes; boys intersect players",
      "All separate",
      "Boys inside players",
      "Athletes inside players"
    ],
    answer: "Players inside athletes; boys intersect players"
  },
  {
    question: "Which diagram represents: All pens are tools and no tool is toy?",
    options: [
      "Pens inside tools; tools separate from toys",
      "Pens intersect toys",
      "All intersect",
      "Tools inside pens"
    ],
    answer: "Pens inside tools; tools separate from toys"
  },
  {
    question: "Which diagram represents: Some teachers are females and some females are doctors?",
    options: [
      "All intersect",
      "Teachers intersect females; females intersect doctors",
      "Teachers inside females",
      "All separate"
    ],
    answer: "Teachers intersect females; females intersect doctors"
  },
  {
    question: "Which diagram represents: All cars are vehicles and some vehicles are bikes?",
    options: [
      "Cars inside vehicles; bikes intersect vehicles",
      "All separate",
      "Vehicles inside cars",
      "Bikes inside cars"
    ],
    answer: "Cars inside vehicles; bikes intersect vehicles"
  },
  {
    question: "Which diagram represents: No student is lazy and some lazy are workers?",
    options: [
      "Students separate from lazy; lazy intersects workers",
      "Students intersect lazy",
      "Lazy inside students",
      "All separate"
    ],
    answer: "Students separate from lazy; lazy intersects workers"
  },
  {
    question: "Which diagram represents: All flowers are plants and some plants are trees?",
    options: [
      "Flowers inside plants; trees intersect plants",
      "All intersect",
      "Plants inside flowers",
      "Trees inside flowers"
    ],
    answer: "Flowers inside plants; trees intersect plants"
  },
  {
    question: "Which diagram represents: Some books are pens and no pen is pencil?",
    options: [
      "Books intersect pens; pens separate from pencils",
      "All intersect",
      "Pens inside books",
      "All separate"
    ],
    answer: "Books intersect pens; pens separate from pencils"
  },
  {
    question: "Which diagram represents: All engineers are graduates and all graduates are educated?",
    options: [
      "Engineers inside graduates inside educated",
      "Graduates inside engineers",
      "All intersect",
      "Separate circles"
    ],
    answer: "Engineers inside graduates inside educated"
  },

  // Very tough level
  {
    question: "Which diagram represents: All A are B, some B are C, and no A is C?",
    options: [
      "A inside B; B intersects C outside A",
      "All intersect",
      "A intersects C",
      "A and C inside B"
    ],
    answer: "A inside B; B intersects C outside A"
  },
  {
    question: "Which diagram represents: Some A are B, some B are C, but no A is C?",
    options: [
      "A intersects B; B intersects C; A separate from C",
      "All intersect",
      "A inside B",
      "C inside B"
    ],
    answer: "A intersects B; B intersects C; A separate from C"
  },
  {
    question: "Which diagram represents: All laptops are computers, some computers are cheap, and no laptop is cheap?",
    options: [
      "Laptop inside computer; cheap intersects computer outside laptop",
      "All intersect",
      "Laptop intersects cheap",
      "Cheap inside laptop"
    ],
    answer: "Laptop inside computer; cheap intersects computer outside laptop"
  },
  {
    question: "Which diagram represents: No fruit is vegetable and some vegetables are healthy?",
    options: [
      "Fruit separate; vegetable intersects healthy",
      "All intersect",
      "Healthy inside vegetables",
      "Fruit intersects vegetables"
    ],
    answer: "Fruit separate; vegetable intersects healthy"
  },
  {
    question: "Which diagram represents: All managers are leaders and some leaders are employees?",
    options: [
      "Managers inside leaders; employees intersect leaders",
      "All separate",
      "Leaders inside managers",
      "Employees inside managers"
    ],
    answer: "Managers inside leaders; employees intersect leaders"
  },
  {
    question: "Which diagram represents: Some doctors are engineers and no engineer is unemployed?",
    options: [
      "Doctors intersect engineers; engineers separate from unemployed",
      "All intersect",
      "Engineers inside doctors",
      "Doctors inside engineers"
    ],
    answer: "Doctors intersect engineers; engineers separate from unemployed"
  },
  {
    question: "Which diagram represents: No apple is orange and all oranges are fruits?",
    options: [
      "Apple separate; orange inside fruit",
      "All intersect",
      "Fruit inside orange",
      "Apple inside fruit"
    ],
    answer: "Apple separate; orange inside fruit"
  },
  {
    question: "Which diagram represents: Some students are boys, all boys are intelligent?",
    options: [
      "Boys inside intelligent; students intersect boys",
      "All intersect",
      "Students inside boys",
      "Intelligent inside boys"
    ],
    answer: "Boys inside intelligent; students intersect boys"
  },
  {
    question: "Which diagram represents: All poets are thinkers, no thinker is foolish?",
    options: [
      "Poets inside thinkers; thinkers separate from foolish",
      "All intersect",
      "Thinkers inside poets",
      "Poets intersect foolish"
    ],
    answer: "Poets inside thinkers; thinkers separate from foolish"
  },
  {
    question: "Which diagram represents: Some workers are leaders and some leaders are managers?",
    options: [
      "Workers intersect leaders; leaders intersect managers",
      "All intersect",
      "Workers inside leaders",
      "Managers inside leaders"
    ],
    answer: "Workers intersect leaders; leaders intersect managers"
  }
  ],

  science: [
   {
    question: "Who discovered the cell?",
    options: ["Robert Brown", "Robert Hooke", "Schleiden", "Schwann"],
    answer: "Robert Hooke"
  },
  {
    question: "The basic structural and functional unit of life is:",
    options: ["Tissue", "Organ", "Cell", "Organ system"],
    answer: "Cell"
  },
  {
    question: "Which cell organelle is known as the powerhouse of the cell?",
    options: ["Ribosome", "Mitochondria", "Nucleus", "Lysosome"],
    answer: "Mitochondria"
  },
  {
    question: "Which structure controls all activities of the cell?",
    options: ["Cytoplasm", "Ribosome", "Nucleus", "Vacuole"],
    answer: "Nucleus"
  },
  {
    question: "Plant cells differ from animal cells because they have:",
    options: ["Mitochondria", "Ribosomes", "Cell wall", "Cytoplasm"],
    answer: "Cell wall"
  },
  {
    question: "Which organelle is involved in protein synthesis?",
    options: ["Ribosome", "Golgi body", "Lysosome", "Vacuole"],
    answer: "Ribosome"
  },
  {
    question: "The jelly-like substance inside the cell is called:",
    options: ["Plasma membrane", "Cytoplasm", "Nucleus", "Cell wall"],
    answer: "Cytoplasm"
  },
  {
    question: "Which cell organelle helps in photosynthesis?",
    options: ["Mitochondria", "Chloroplast", "Ribosome", "Golgi apparatus"],
    answer: "Chloroplast"
  },
  {
    question: "Which organelle is known as the suicide bag of the cell?",
    options: ["Lysosome", "Ribosome", "Vacuole", "Golgi body"],
    answer: "Lysosome"
  },
  {
    question: "The outermost boundary of an animal cell is:",
    options: ["Cell wall", "Nuclear membrane", "Plasma membrane", "Cytoplasm"],
    answer: "Plasma membrane"
  },

  // Tough level
  {
    question: "Which cell organelle modifies and packages proteins?",
    options: ["Ribosome", "Golgi apparatus", "Endoplasmic reticulum", "Lysosome"],
    answer: "Golgi apparatus"
  },
  {
    question: "Ribosomes are made up of:",
    options: ["DNA and protein", "RNA and protein", "Lipid and protein", "Carbohydrate and protein"],
    answer: "RNA and protein"
  },
  {
    question: "Which organelle is absent in prokaryotic cells?",
    options: ["Ribosome", "Plasma membrane", "Nucleus", "Cytoplasm"],
    answer: "Nucleus"
  },
  {
    question: "The membrane surrounding the vacuole is called:",
    options: ["Tonoplast", "Plasmalemma", "Mesosome", "Cristae"],
    answer: "Tonoplast"
  },
  {
    question: "Which cell organelle is involved in lipid synthesis?",
    options: ["Rough ER", "Smooth ER", "Golgi body", "Ribosome"],
    answer: "Smooth ER"
  },
  {
    question: "Which organelle contains digestive enzymes?",
    options: ["Mitochondria", "Lysosome", "Golgi body", "Nucleus"],
    answer: "Lysosome"
  },
  {
    question: "The fluid-filled space between the cell membrane and nucleus is called:",
    options: ["Vacuole", "Cytoplasm", "Protoplasm", "Nucleoplasm"],
    answer: "Cytoplasm"
  },
  {
    question: "Which cell organelle is double-membraned?",
    options: ["Ribosome", "Lysosome", "Mitochondria", "Golgi apparatus"],
    answer: "Mitochondria"
  },
  {
    question: "Which structure is responsible for cell division?",
    options: ["Centrosome", "Ribosome", "Vacuole", "Golgi body"],
    answer: "Centrosome"
  },
  {
    question: "Which organelle helps in intracellular transport?",
    options: ["Ribosome", "Endoplasmic reticulum", "Lysosome", "Nucleus"],
    answer: "Endoplasmic reticulum"
  },

  // Very tough level
  {
    question: "Which part of mitochondria contains enzymes for respiration?",
    options: ["Outer membrane", "Inner membrane", "Cristae", "Matrix"],
    answer: "Matrix"
  },
  {
    question: "Which plastid is responsible for storage of food?",
    options: ["Chloroplast", "Chromoplast", "Leucoplast", "Amyloplast"],
    answer: "Leucoplast"
  },
  {
    question: "Cell wall of plants is mainly composed of:",
    options: ["Protein", "Lipid", "Cellulose", "Chitin"],
    answer: "Cellulose"
  },
  {
    question: "Which cell organelle lacks a membrane?",
    options: ["Lysosome", "Ribosome", "Nucleus", "Mitochondria"],
    answer: "Ribosome"
  },
  {
    question: "Which organelle forms spindle fibres during cell division?",
    options: ["Centriole", "Ribosome", "Golgi body", "Vacuole"],
    answer: "Centriole"
  },
  {
    question: "Prokaryotic cells are found in:",
    options: ["Plants", "Animals", "Fungi", "Bacteria"],
    answer: "Bacteria"
  },
  {
    question: "Which organelle is called the post office of the cell?",
    options: ["Ribosome", "Golgi apparatus", "Lysosome", "Endoplasmic reticulum"],
    answer: "Golgi apparatus"
  },
  {
    question: "Which part of the nucleus contains genetic material?",
    options: ["Nuclear membrane", "Nucleolus", "Chromatin", "Cytoplasm"],
    answer: "Chromatin"
  },
  {
    question: "Which cell organelle is responsible for detoxification of drugs?",
    options: ["Rough ER", "Smooth ER", "Ribosome", "Lysosome"],
    answer: "Smooth ER"
  },
  {
    question: "Which type of cells lack mitochondria?",
    options: ["Plant cells", "Animal cells", "Mature RBCs", "Nerve cells"],
    answer: "Mature RBCs"
  },
  {
    question: "A group of similar cells performing a specific function is called:",
    options: ["Organ", "Tissue", "System", "Cell"],
    answer: "Tissue"
  },
  {
    question: "Which tissue is responsible for movement in the body?",
    options: ["Nervous tissue", "Epithelial tissue", "Muscular tissue", "Connective tissue"],
    answer: "Muscular tissue"
  },
  {
    question: "Which tissue covers the outer surface of the body?",
    options: ["Connective tissue", "Muscular tissue", "Nervous tissue", "Epithelial tissue"],
    answer: "Epithelial tissue"
  },
  {
    question: "Blood is an example of:",
    options: ["Epithelial tissue", "Muscular tissue", "Nervous tissue", "Connective tissue"],
    answer: "Connective tissue"
  },
  {
    question: "Which tissue helps in protection of internal organs?",
    options: ["Nervous tissue", "Muscular tissue", "Epithelial tissue", "Connective tissue"],
    answer: "Epithelial tissue"
  },
  {
    question: "Which tissue transports water and minerals in plants?",
    options: ["Phloem", "Xylem", "Cambium", "Cortex"],
    answer: "Xylem"
  },
  {
    question: "Which tissue transports food in plants?",
    options: ["Xylem", "Phloem", "Parenchyma", "Collenchyma"],
    answer: "Phloem"
  },
  {
    question: "Which tissue provides mechanical support to plants?",
    options: ["Parenchyma", "Collenchyma", "Xylem", "Meristem"],
    answer: "Collenchyma"
  },
  {
    question: "The basic unit of nervous tissue is:",
    options: ["Neuron", "Axon", "Dendrite", "Brain"],
    answer: "Neuron"
  },
  {
    question: "Which tissue has cells with long processes?",
    options: ["Muscular tissue", "Epithelial tissue", "Nervous tissue", "Connective tissue"],
    answer: "Nervous tissue"
  },

  // Tough level
  {
    question: "Which type of muscle is involuntary and non-striated?",
    options: ["Skeletal muscle", "Cardiac muscle", "Smooth muscle", "Voluntary muscle"],
    answer: "Smooth muscle"
  },
  {
    question: "Which muscle tissue is found in the heart?",
    options: ["Smooth muscle", "Skeletal muscle", "Cardiac muscle", "Voluntary muscle"],
    answer: "Cardiac muscle"
  },
  {
    question: "Which connective tissue connects muscles to bones?",
    options: ["Ligament", "Tendon", "Cartilage", "Areolar tissue"],
    answer: "Tendon"
  },
  {
    question: "Ligaments connect:",
    options: ["Muscle to bone", "Bone to bone", "Bone to cartilage", "Muscle to muscle"],
    answer: "Bone to bone"
  },
  {
    question: "Which tissue helps in repair of body tissues?",
    options: ["Blood", "Areolar tissue", "Cartilage", "Bone"],
    answer: "Areolar tissue"
  },
  {
    question: "Which plant tissue is responsible for growth?",
    options: ["Permanent tissue", "Parenchyma", "Meristematic tissue", "Collenchyma"],
    answer: "Meristematic tissue"
  },
  {
    question: "Apical meristem is found at:",
    options: ["Stem nodes", "Root and shoot tips", "Leaf base", "Bark"],
    answer: "Root and shoot tips"
  },
  {
    question: "Which tissue provides flexibility to plant parts?",
    options: ["Parenchyma", "Collenchyma", "Sclerenchyma", "Xylem"],
    answer: "Collenchyma"
  },
  {
    question: "Which tissue has thick lignified cell walls?",
    options: ["Parenchyma", "Collenchyma", "Sclerenchyma", "Phloem"],
    answer: "Sclerenchyma"
  },
  {
    question: "Which tissue lacks blood supply?",
    options: ["Bone", "Blood", "Cartilage", "Muscle"],
    answer: "Cartilage"
  },

  // Very tough level
  {
    question: "Which tissue is also called packing tissue in plants?",
    options: ["Collenchyma", "Parenchyma", "Sclerenchyma", "Xylem"],
    answer: "Parenchyma"
  },
  {
    question: "Which plant tissue consists of dead cells?",
    options: ["Parenchyma", "Collenchyma", "Sclerenchyma", "Meristem"],
    answer: "Sclerenchyma"
  },
  {
    question: "Which component of blood helps in clotting?",
    options: ["RBC", "WBC", "Platelets", "Plasma"],
    answer: "Platelets"
  },
  {
    question: "Which epithelial tissue is found in the lining of the intestine?",
    options: ["Squamous epithelium", "Cuboidal epithelium", "Columnar epithelium", "Ciliated epithelium"],
    answer: "Columnar epithelium"
  },
  {
    question: "Which tissue enables rapid transmission of impulses?",
    options: ["Muscular tissue", "Nervous tissue", "Connective tissue", "Epithelial tissue"],
    answer: "Nervous tissue"
  },
  {
    question: "Which connective tissue stores fat?",
    options: ["Areolar tissue", "Adipose tissue", "Cartilage", "Tendon"],
    answer: "Adipose tissue"
  },
  {
    question: "Which tissue forms the outer bark of trees?",
    options: ["Parenchyma", "Collenchyma", "Cork", "Phloem"],
    answer: "Cork"
  },
  {
    question: "Which tissue protects the body from drying and injury?",
    options: ["Nervous tissue", "Muscular tissue", "Epithelial tissue", "Connective tissue"],
    answer: "Epithelial tissue"
  },
  {
    question: "Which plant tissue conducts water upward?",
    options: ["Phloem", "Cambium", "Xylem", "Cortex"],
    answer: "Xylem"
  },
  {
    question: "Which tissue helps in voluntary movements?",
    options: ["Smooth muscle", "Cardiac muscle", "Skeletal muscle", "Nervous tissue"],
    answer: "Skeletal muscle"
  },
  {
    question: "Respiration is the process of:",
    options: ["Taking in oxygen", "Releasing energy from food", "Breathing", "Excretion"],
    answer: "Releasing energy from food"
  },
  {
    question: "Which gas is essential for aerobic respiration?",
    options: ["Carbon dioxide", "Nitrogen", "Oxygen", "Hydrogen"],
    answer: "Oxygen"
  },
  {
    question: "The end products of aerobic respiration are:",
    options: ["Alcohol and CO₂", "Lactic acid", "CO₂ and water", "Oxygen and glucose"],
    answer: "CO₂ and water"
  },
  {
    question: "Which organ is mainly responsible for respiration in humans?",
    options: ["Heart", "Lungs", "Liver", "Kidney"],
    answer: "Lungs"
  },
  {
    question: "Breathing in is called:",
    options: ["Respiration", "Inspiration", "Expiration", "Diffusion"],
    answer: "Inspiration"
  },
  {
    question: "Which structure prevents food from entering the windpipe?",
    options: ["Trachea", "Epiglottis", "Larynx", "Bronchus"],
    answer: "Epiglottis"
  },
  {
    question: "The tiny air sacs in lungs are called:",
    options: ["Bronchi", "Bronchioles", "Alveoli", "Trachea"],
    answer: "Alveoli"
  },
  {
    question: "Which gas is released during respiration?",
    options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    answer: "Carbon dioxide"
  },
  {
    question: "Which type of respiration occurs in the absence of oxygen?",
    options: ["Aerobic respiration", "Anaerobic respiration", "Cellular respiration", "External respiration"],
    answer: "Anaerobic respiration"
  },
  {
    question: "Which organ helps in breathing movements?",
    options: ["Diaphragm", "Kidney", "Liver", "Pancreas"],
    answer: "Diaphragm"
  },

  // Tough level
  {
    question: "Where does cellular respiration take place?",
    options: ["Nucleus", "Ribosome", "Mitochondria", "Cytoplasm"],
    answer: "Mitochondria"
  },
  {
    question: "The breakdown of glucose to release energy is called:",
    options: ["Digestion", "Respiration", "Transpiration", "Photosynthesis"],
    answer: "Respiration"
  },
  {
    question: "Which blood cells carry oxygen in humans?",
    options: ["WBC", "Platelets", "RBC", "Plasma"],
    answer: "RBC"
  },
  {
    question: "Haemoglobin is present in:",
    options: ["Plasma", "Platelets", "White blood cells", "Red blood cells"],
    answer: "Red blood cells"
  },
  {
    question: "Which gas is produced during anaerobic respiration in yeast?",
    options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    answer: "Carbon dioxide"
  },
  {
    question: "Which substance is formed during anaerobic respiration in muscles?",
    options: ["Alcohol", "Carbon dioxide", "Lactic acid", "Water"],
    answer: "Lactic acid"
  },
  {
    question: "Which part of the respiratory system connects the throat to the lungs?",
    options: ["Bronchus", "Alveoli", "Trachea", "Larynx"],
    answer: "Trachea"
  },
  {
    question: "Which process involves exchange of gases in lungs?",
    options: ["Diffusion", "Respiration", "Digestion", "Circulation"],
    answer: "Diffusion"
  },
  {
    question: "Which structure increases the surface area for gas exchange?",
    options: ["Bronchi", "Trachea", "Alveoli", "Diaphragm"],
    answer: "Alveoli"
  },
  {
    question: "During inhalation, the diaphragm:",
    options: ["Moves upward", "Moves downward", "Remains still", "Stops working"],
    answer: "Moves downward"
  },

  // Very tough level
  {
    question: "Which gas is taken in by plants during respiration?",
    options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
    answer: "Oxygen"
  },
  {
    question: "Respiration occurs in:",
    options: ["Plants only", "Animals only", "Humans only", "All living organisms"],
    answer: "All living organisms"
  },
  {
    question: "Which respiration releases less energy?",
    options: ["Aerobic", "Anaerobic", "Cellular", "External"],
    answer: "Anaerobic"
  },
  {
    question: "What is the main function of alveoli?",
    options: ["Pump blood", "Exchange gases", "Filter air", "Control breathing"],
    answer: "Exchange gases"
  },
  {
    question: "Which gas is more concentrated in exhaled air?",
    options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    answer: "Carbon dioxide"
  },
  {
    question: "Which organelle is called the powerhouse due to respiration?",
    options: ["Nucleus", "Ribosome", "Mitochondria", "Lysosome"],
    answer: "Mitochondria"
  },
  {
    question: "The breathing rate increases during exercise because:",
    options: ["Body needs more oxygen", "Body needs less oxygen", "Heart rate decreases", "Temperature decreases"],
    answer: "Body needs more oxygen"
  },
  {
    question: "Which structure prevents collapse of trachea?",
    options: ["Muscles", "Cartilage rings", "Alveoli", "Bronchioles"],
    answer: "Cartilage rings"
  },
  {
    question: "In humans, gas exchange occurs between:",
    options: ["Trachea and blood", "Bronchi and blood", "Alveoli and blood", "Lungs and heart"],
    answer: "Alveoli and blood"
  },
  {
    question: "Which process removes carbon dioxide from the body?",
    options: ["Inspiration", "Respiration", "Expiration", "Digestion"],
    answer: "Expiration"
  }
  ]
};

let questions = [];
let examId = "";




// START EXAM
function startExam() {
  const name = document.getElementById("studentName").value.trim();
  const roll = document.getElementById("rollNumber").value.trim();
  const selectedExam = document.getElementById("examSelect").value;

  if (!name || !roll || !selectedExam) {
    alert("Please enter Name, Roll Number and select Exam");
    return;
  }

  examId = selectedExam;                 // 👈 save exam id
  questions = examPapers[selectedExam];  // 👈 load exam questions

  // save student for sheet
  const student = { name, roll };
  localStorage.setItem("currentStudent", JSON.stringify(student));

  document.getElementById("studentSection").style.display = "none";
  loadQuestions();
  document.getElementById("submitBtn").style.display = "inline-block";
}





// LOAD QUESTIONS
function loadQuestions() {
  const quizDiv = document.getElementById("quiz");
  quizDiv.innerHTML = "";

  questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.id = `question-${index}`;
    div.style.padding = "10px";
    div.style.marginBottom = "10px";

    div.innerHTML = `
      <p><b>${index + 1}. ${q.question}</b></p>
      ${q.options.map(opt => `
        <label>
          <input type="radio" name="q${index}" value="${opt}">
          ${opt}
        </label><br>
      `).join("")}
      <div id="answer-${index}" style="display:none;"></div>
    `;

    quizDiv.appendChild(div);
  });
}



// SUBMIT QUIZ
function submitQuiz() {
  let score = 0;

  questions.forEach((q, index) => {
    const selected = document.querySelector(
      `input[name="q${index}"]:checked`
    );

    const qDiv = document.getElementById(`question-${index}`);
    const ansDiv = document.getElementById(`answer-${index}`);

    if (selected && selected.value === q.answer) {
      score++;
      qDiv.style.border = "2px solid green";
      ansDiv.innerHTML = "✅ Correct";
    } 
    else if (selected) {
      qDiv.style.border = "2px solid red";
      ansDiv.innerHTML = `❌ Wrong | Correct: <b>${q.answer}</b>`;
    } 
    else {
      qDiv.style.border = "2px solid orange";
      ansDiv.innerHTML = `⚠ Not Attempted | Correct: <b>${q.answer}</b>`;
    }

    ansDiv.style.display = "block";
  });

  document.getElementById("result").innerText =
    `Score: ${score} / ${questions.length}`;

  const student = JSON.parse(localStorage.getItem("currentStudent"));
sendResultToGoogleSheet(student, score);
}



function sendResultToGoogleSheet(student, score) {
  fetch("https://script.google.com/macros/s/AKfycbzs_Gvns96H1feVgyUvt2sXyQYXDGnlQst12OzQajf2jjork7ofEraKGd3jAVY4QcsxfQ/exec", {
    method: "POST",
    body: JSON.stringify({
      name: student.name,
      roll: student.roll,
      score: score,
      total: questions.length,
      exam: examId
    })
  })
  .then(res => res.text())
  .then(txt => console.log("Sheet response:", txt))
  .catch(err => console.error("Fetch error:", err));
}

























































