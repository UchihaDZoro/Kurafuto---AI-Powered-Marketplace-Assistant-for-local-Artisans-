

import { type Artisan, type AnalyticsDataPoint, type Conversation, type Product, type Story, type Order, type CommunityPost, type TrafficSource, type TopProduct, type CraftCluster, Review, Auction, ProductInAuction } from './types';

const MOCK_REVIEWS: Review[] = [
    { id: 'r1', customerName: 'Priya S.', rating: 5, comment: "Absolutely stunning vase! The craftsmanship is incredible. It's the centerpiece of my living room now.", date: '2 weeks ago' },
    { id: 'r2', customerName: 'Amit K.', rating: 4, comment: "Beautiful mugs, but one was slightly smaller than the other. Still love them though!", date: '1 month ago' },
    { id: 'r3', customerName: 'Sneha M.', rating: 5, comment: "This teapot is a work of art. It feels so special to use it every morning. Highly recommend.", date: '3 days ago' },
    { id: 'r4', customerName: 'Rajiv B.', rating: 5, comment: "I bought this as a gift and my wife was thrilled. The story behind it makes it even more special.", date: '1 week ago' },
    { id: 'r5', customerName: 'Emily R.', rating: 5, comment: "This wall hoop is so vibrant and beautiful. It adds such a wonderful pop of color to my room. The embroidery is exquisite!", date: '10 days ago' },
    { id: 'r6', customerName: 'David L.', rating: 5, comment: "The detail in this thread painting is breathtaking. It's a true masterpiece. Pictures don't do it justice.", date: '1 month ago' },
    { id: 'r7', customerName: 'Chloe T.', rating: 4, comment: "The jacket is amazing and I get so many compliments! The denim is a bit stiffer than I expected, but it's softening up.", date: '3 weeks ago' },
    { id: 'r8', customerName: 'Michael P.', rating: 5, comment: "A truly magnificent instrument. The sound is rich and warm, and you can feel the soul that went into making it. An heirloom piece.", date: '5 days ago' },
    { id: 'r9', customerName: 'Sophia W.', rating: 5, comment: "This dinner set is rustic perfection. Each piece feels unique and tells a story. We use it for special occasions.", date: '1 month ago' },
    { id: 'r10', customerName: 'Liam G.', rating: 4, comment: "The cushion covers are beautiful and well-made. The colors are even brighter in person. Took a while to arrive, but worth it.", date: '3 weeks ago' },
    { id: 'r11', customerName: 'Ava C.', rating: 5, comment: "I love my new Kutchi handbag! The mirror work is fantastic and it's surprisingly spacious. I get so many compliments.", date: '6 days ago' },
    { id: 'r12', customerName: 'Noah B.', rating: 5, comment: "The viola has such a deep, resonant sound. You can tell it was made with passion. A beautiful instrument to play and to look at.", date: '2 months ago' },
    { id: 'r13', customerName: 'Jessica H.', rating: 5, comment: "So adorable! The little bee is so detailed, it looks amazing on my gallery wall. The shipping was fast too.", date: '4 days ago' },
    { id: 'r14', customerName: 'Ben Carter', rating: 5, comment: "Bought this for my partner and she loved it! The kit has everything you need to get started and the instructions are super clear. Great for beginners.", date: '1 week ago' },
    { id: 'r15', customerName: 'Orchestra Pro', rating: 4, comment: "An interesting piece. The sound is surprisingly bright and clear. Not a traditional tone, but very unique and cuts through the mix. Build quality is solid.", date: '2 weeks ago' },
    { id: 'r16', customerName: 'Aisha P.', rating: 5, comment: "These pots are gorgeous! The blue is so vibrant and the Warli art is beautifully done. They look perfect on my windowsill.", date: '1 month ago' },
    { id: 'r17', customerName: 'Nikhil R.', rating: 5, comment: "The tablecloth is stunning. The block print is so precise and the colors are beautiful. It has completely transformed my dining room.", date: '3 weeks ago' },
    { id: 'r18', customerName: 'Sarah J.', rating: 5, comment: "I bought these napkins as a gift and they were a huge hit. They are almost too beautiful to use! The quality is exceptional.", date: '1 month ago' },
    { id: 'r19', customerName: 'Daniel K.', rating: 5, comment: "The detail on this elephant is incredible. You can see every little mark from the carving tools. It's a true work of art.", date: '1 week ago' },
    { id: 'r20', customerName: 'Olivia M.', rating: 4, comment: "Beautiful panel, looks great above my doorway. It's slightly lighter in color than the picture, but still a wonderful piece.", date: '2 weeks ago' },
];

export const MOCK_ARTISANS: Artisan[] = [
  {
    id: "harry-potter-pottery",
    name: "Harry Potter",
    craft: "Terracotta Pottery",
    location: "Varanasi, Uttar Pradesh",
    bio: "I learned pottery from my father, continuing a tradition that has been in our family for generations. Each piece is shaped by hand on the banks of the Ganga, using locally sourced clay. My work is a tribute to the earth and the sacred river.",
    profileImageUrl: "https://wallpapers.com/images/hd/harry-potter-profile-pictures-e3rcxj51i15clhes.jpg",
    bannerImageUrl: "https://contentful.harrypotter.com/usf1vwtuqyxm/4vY6JKUQXnrdiFbov2nQYU/da0c21e658fdb2a97bfafc50f57fbbe6/WB-HP-F3-harry-and-ron-in-divination-class-web-landscape.jpg?q=75&fm=jpg&w=2560",
    products: [
      {
        id: "p1",
        name: "Longpi Black Teapot",
        imageUrl: "https://brownliving.in/cdn/shop/files/longpi-black-pottery-chakra-teapot-terracotta-by-sachii-sustainable-beverage-accessories-brown-living-sachii011-635242.jpg?v=1751610511&width=1024",
        description: "A striking black terracotta teapot, handcrafted using ancient Longpi techniques from Manipur.",
        story: "This teapot brews stories from the hills, a blend of earth, fire, and tradition.",
        hashtags: ["#LongpiPottery", "#BlackPottery", "#HandmadeTea"],
        price: 45,
        stats: { views: 1250, sales: 45, conversionRate: 3.6 },
        reviews: [MOCK_REVIEWS[2]],
      },
      {
        id: "p2",
        name: "Hohokam Inspired Vase",
        imageUrl: "https://cdn.britannica.com/88/132288-050-74505F78/Pottery-people-clay-Hohokam-designs.jpg",
        description: "A decorative vase featuring intricate designs inspired by the ancient Hohokam people.",
        story: "Echoes of the past, painted by hand to bring ancient art into your home.",
        hashtags: ["#Terracotta", "#AncientArt", "#HomeDecor"],
        price: 75,
        stats: { views: 2300, sales: 25, conversionRate: 1.1 },
        reviews: [MOCK_REVIEWS[0], MOCK_REVIEWS[3]],
      },
      {
        id: "p5",
        name: "Art Nouveau Mugs",
        imageUrl: "https://subcultours.com/cdn/shop/files/Art-Nouveau-inspired-Pottery-Workshop-and-Spanish-Aperitivo-with-Yvonne-in-Barcelona-Spain-by-subcultours_2.jpg?v=1728672997&width=1946",
        description: "A set of two elegant mugs with flowing, nature-inspired Art Nouveau patterns.",
        story: "Sip your morning coffee from a piece of art.",
        hashtags: ["#CeramicMugs", "#ArtNouveau", "#Handmade"],
        price: 55,
        stats: { views: 1800, sales: 18, conversionRate: 1.0 },
        reviews: [MOCK_REVIEWS[1]],
      },
      {
        id: "p21",
        name: "Blue Warli Painted Pots (Set of 3)",
        imageUrl: "https://tamrapatra.online/cdn/shop/files/Warli_Pots_In_Blue_Various_Size_By_Tamrapatra.png?v=1740229879",
        description: "A set of three terracotta pots in varying sizes, hand-painted with traditional Warli art in a striking blue.",
        story: "Stories of the Warli tribe, painted on vessels of the earth.",
        hashtags: ["#WarliArt", "#HandpaintedPottery", "#Terracotta"],
        price: 85,
        stats: { views: 2200, sales: 42, conversionRate: 1.9 },
        reviews: [MOCK_REVIEWS[15]],
      }
    ]
  },
  {
    id: "nancy-embroidery",
    name: "Nancy Devi",
    craft: "Kutch Embroidery",
    location: "Kutch, Gujarat",
    bio: "My needles dance on fabric, weaving threads of tradition and color. Kutchi embroidery is a language of patterns and mirrors, telling stories of our desert home. Each piece I create is a part of my heritage.",
    profileImageUrl: "https://i.pinimg.com/736x/28/24/36/282436c64f95a931d65993e54ffdc538.jpg",
    bannerImageUrl: "https://editorial.rottentomatoes.com/wp-content/uploads/2025/08/Wednesday_S2_Reviews1.jpg?w=700",
    products: [
       {
        id: "p15",
        name: "Bumblebee Embroidery Hoop Art",
        imageUrl: "https://i.pinimg.com/736x/a2/d6/96/a2d696ebc6671020c6f5e447c25f68c4.jpg",
        description: "A charming, hand-stitched bumblebee on a floral branch, framed in a wooden hoop.",
        story: "Capture the buzz of a summer garden with this delightful piece.",
        hashtags: ["#EmbroideryArt", "#BeeDecor", "#HandmadeWallArt"],
        price: 45,
        stats: { views: 2100, sales: 75, conversionRate: 3.6 },
        reviews: [MOCK_REVIEWS[12]],
      },
      {
        id: "p16",
        name: "DIY Beginner Embroidery Kit",
        imageUrl: "https://www.knotyourtype.in/cdn/shop/files/Beginner_Friendly_Diy_Embroidery_Kit.jpg?v=1734433770",
        description: "Start your embroidery journey! This kit includes everything you need: a hoop, threads, needle, and a pre-printed fabric pattern.",
        story: "Unleash your creativity and stitch your own masterpiece.",
        hashtags: ["#DIYKit", "#EmbroideryBeginner", "#CraftKit"],
        price: 35,
        stats: { views: 4500, sales: 160, conversionRate: 3.5 },
        reviews: [MOCK_REVIEWS[13]],
      },
      {
        id: "p17",
        name: "Sunset Floral Thread Painting",
        imageUrl: "https://i.pinimg.com/736x/30/6a/f2/306af2679859c2cdab0efe49f6d38a36.jpg",
        description: "An intricate floral design capturing the warm hues of a sunset. A true painting made of thread.",
        story: "A garden that glows forever, captured in silk and cotton.",
        hashtags: ["#ThreadPainting", "#HandEmbroidered", "#FloralArt"],
        price: 160,
        stats: { views: 2200, sales: 41, conversionRate: 1.9 },
        reviews: [MOCK_REVIEWS[5]],
      },
      {
        id: "p18",
        name: "Abstract Art Embroidery",
        imageUrl: "https://embroiderylegacy.com/wp-content/uploads/2025/07/EL_AA_Collection-10_L.jpg",
        description: "A modern, abstract piece that plays with color and texture. Perfect for contemporary home decor.",
        story: "A conversation of threads, speaking in shapes and colors.",
        hashtags: ["#AbstractEmbroidery", "#ModernDecor", "#TextileArt"],
        price: 110,
        stats: { views: 1800, sales: 21, conversionRate: 1.2 },
      }
    ]
  },
  {
    id: "pathan-violin",
    name: "Gulamgaush Pathan",
    craft: "Wooden Violin Making",
    location: "Srinagar, Jammu & Kashmir",
    bio: "From the fragrant walnut wood of Kashmir, I carve instruments that sing. The craft of making violins was taught to me by my grandfather. It's a slow, patient process, where wood and music become one.",
    profileImageUrl: "https://www.purina.in/sites/default/files/2020-12/Understanding%20Your%20Cat%27s%20Body%20LanguageHERO.jpg",
    bannerImageUrl: "https://i1.pickpik.com/photos/614/299/643/autumn-violin-musical-instrument-mood-preview.jpg",
    products: [
      {
        id: "p4",
        name: "Kashmiri Walnut Violin",
        imageUrl: "https://media.istockphoto.com/id/825566228/photo/traditional-violin-maker-studio.jpg?s=612x612&w=0&k=20&c=pb_B_QckrGl_XQppxV1pqj0e8euJOh15MC8e0JWMkAg=",
        description: "A full-sized, handcrafted violin from seasoned Kashmiri walnut wood, known for its warm tone.",
        story: "This violin holds the echo of the valley, a melody of mountains and lakes.",
        hashtags: ["#HandmadeViolin", "#KashmirCraft", "#MusicalInstrument"],
        price: 850,
        stats: { views: 5000, sales: 15, conversionRate: 0.3 },
        reviews: [MOCK_REVIEWS[7]],
      },
      {
        id: "p19",
        name: "The 'Alumitone' Violin",
        imageUrl: "https://www.benningviolins.com/images/ARTICLE_ART/2021/Aluminum-Violins-Violas-Cellos.jpeg",
        description: "An experimental violin crafted from polished aluminum. It produces a uniquely bright and resonant sound.",
        story: "Where modern metallurgy meets classic musicality.",
        hashtags: ["#AluminumViolin", "#ModernInstrument", "#UniqueSound"],
        price: 1500,
        stats: { views: 4100, sales: 7, conversionRate: 0.17 },
        reviews: [MOCK_REVIEWS[14]],
      },
      {
        id: "p20",
        name: "Stealth Electric Violin",
        imageUrl: "https://blenderartists.org/uploads/default/original/4X/6/b/3/6b389dc2c2e543fb0bdc62ce6144cf345c08926d.jpeg",
        description: "A futuristic 5-string electric violin with a sleek, minimalist design. Perfect for stage performance.",
        story: "The sound of tomorrow, available today.",
        hashtags: ["#ElectricViolin", "#5String", "#ModernDesign"],
        price: 2800,
        stats: { views: 6200, sales: 15, conversionRate: 0.24 },
      }
    ]
  },
  {
    id: "anjali-block-printing",
    name: "Anjali Verma",
    craft: "Block Printing",
    location: "Jaipur, Rajasthan",
    bio: "The rhythmic tap of the wooden block on fabric is the sound of my heritage. I use traditional techniques passed down through my family to create intricate patterns with natural dyes, each telling a story of Rajasthan's vibrant culture.",
    profileImageUrl: "https://www.yourtango.com/sites/default/files/image_blog/2024-09/traits-truly-good-woman.png",
    bannerImageUrl: "https://www.cottonmonk.com/wp-content/uploads/2024/09/Block-Printing.jpg",
    products: [
      {
        id: "p22",
        name: "Indigo Paisley Tablecloth",
        imageUrl: "https://s3.amazonaws.com/cdn.marketplaceindia.com/images/uploads/34828_11169_large.jpg",
        description: "A beautiful cotton tablecloth featuring a classic paisley design, hand-printed with natural indigo dye.",
        story: "Bring the royal elegance of Jaipur to your dining table.",
        hashtags: ["#BlockPrint", "#Indigo", "#HomeTextiles"],
        price: 90,
        stats: { views: 3100, sales: 55, conversionRate: 1.8 },
        reviews: [MOCK_REVIEWS[16]],
      },
      {
        id: "p23",
        name: "Marigold Block Print Napkins (Set of 4)",
        imageUrl: "https://s3.amazonaws.com/cdn.marketplaceindia.com/images/uploads/34828_11169_large.jpg",
        description: "A set of four soft cotton napkins with a cheerful marigold motif.",
        story: "A touch of sunshine for every meal.",
        hashtags: ["#DiningDecor", "#Handprinted", "#KitchenLinens"],
        price: 40,
        stats: { views: 2500, sales: 90, conversionRate: 3.6 },
        reviews: [MOCK_REVIEWS[17]],
      },
    ]
  },
  {
    id: "rohan-wood-carving",
    name: "Rohan Sharma",
    craft: "Sandalwood Carving",
    location: "Mysore, Karnataka",
    bio: "I coax stories from sandalwood, a craft that requires patience and a deep respect for the wood. Each piece I carve is a meditation, capturing the intricate details of nature and mythology in this fragrant medium.",
    profileImageUrl: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bannerImageUrl: "https://c9admin.cottage9.com/uploads/2135/The-Art-Of-Wood-Carving-Famous-Techniques-And-Tools.jpg",
    products: [
      {
        id: "p24",
        name: "Hand-Carved Sandalwood Elephant",
        imageUrl: "https://m.media-amazon.com/images/I/61NEmftqOmL._UF350,350_QL80_.jpg",
        description: "A small, intricately carved elephant statue, crafted from authentic Mysore sandalwood.",
        story: "A symbol of wisdom and strength, fragrant with the scent of the forest.",
        hashtags: ["#Sandalwood", "#WoodCarving", "#HandmadeStatue"],
        price: 150,
        stats: { views: 4200, sales: 30, conversionRate: 0.7 },
        reviews: [MOCK_REVIEWS[18]],
      },
      {
        id: "p25",
        name: "Decorative Rosewood Wall Panel",
        imageUrl: "https://www.thisiscolossal.com/wp-content/uploads/2015/10/pagoda-1.jpg",
        description: "A stunning wall panel carved from rosewood with a traditional floral lattice design.",
        story: "An architectural whisper of ancient palaces.",
        hashtags: ["#Woodwork", "#WallDecor", "#Handcarved"],
        price: 320,
        stats: { views: 2800, sales: 18, conversionRate: 0.6 },
        reviews: [MOCK_REVIEWS[19]],
      },
    ]
  }
];

// FIX: Added MOCK_CRAFT_CLUSTERS to provide data for the CraftMap component.
export const MOCK_CRAFT_CLUSTERS: CraftCluster[] = [
  {
    id: 'kutch-gujarat',
    name: 'Kutch Cluster',
    region: 'Gujarat',
    crafts: ['Kutch Embroidery', 'Ajrakh Block Printing', 'Leather Work'],
    artisans: MOCK_ARTISANS.filter(a => a.id === 'nancy-embroidery'),
    position: { top: '60%', left: '20%' },
  },
  {
    id: 'varanasi-up',
    name: 'Varanasi Cluster',
    region: 'Uttar Pradesh',
    crafts: ['Terracotta Pottery', 'Banarasi Silk Weaving', 'Wooden Toys'],
    artisans: MOCK_ARTISANS.filter(a => a.id === 'harry-potter-pottery'),
    position: { top: '55%', left: '70%' },
  },
  {
    id: 'srinagar-jk',
    name: 'Srinagar Cluster',
    region: 'Jammu & Kashmir',
    crafts: ['Wooden Violin Making', 'Pashmina Weaving', 'Papier-mâché'],
    artisans: MOCK_ARTISANS.filter(a => a.id === 'pathan-violin'),
    position: { top: '20%', left: '45%' },
  },
];


export const ALL_PRODUCTS: Product[] = MOCK_ARTISANS.flatMap(artisan => 
    artisan.products.map(product => ({
        ...product,
        artisanId: artisan.id,
        artisanName: artisan.name,
    }))
);


export const MOCK_STORIES: Story[] = [
    {
        id: 'story1',
        title: 'The Clay and the River: A Potter\'s Tale',
        excerpt: 'For generations, my family has sourced clay from the sacred banks of the Ganga. It\'s more than just earth; it\'s a connection to our ancestors and the spiritual heart of Varanasi...',
        content: 'For generations, my family has sourced clay from the sacred banks of the Ganga. It\'s more than just earth; it\'s a connection to our ancestors and the spiritual heart of Varanasi. Each morning, as the sun rises, I walk to the river\'s edge. The clay there is special. It has a fine, silken texture that feels alive in my hands. \n\nI learned the art of pottery not in a classroom, but by watching my father. His hands, calloused yet gentle, could coax the most beautiful shapes from a lump of clay. He taught me to listen to the wheel, to feel its rhythm, and to understand that each pot has its own spirit. "You are not just making a vessel," he would say, "you are giving a piece of the river a new life." \n\nToday, I use the same techniques he taught me. The clay is still mixed by foot, the wheel is still turned by hand, and the firing process uses a traditional kiln fueled by natural materials. It\'s a slow process, one that respects the materials and the history they carry. When you hold one of my pieces, you are holding a story—a story of the river, of my family, and of a tradition that flows as ceaselessly as the Ganga itself.',
        imageUrl: 'https://images.unsplash.com/photo-1578848316858-15a3a71cb15a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        artisanId: 'harry-potter-pottery',
        artisanName: 'Harry Potter',
        artisanProfileImageUrl: MOCK_ARTISANS[0].profileImageUrl,
        artisanBannerImageUrl: MOCK_ARTISANS[0].bannerImageUrl,
    },
    {
        id: 'story2',
        title: 'Weaving Dreams in the Desert',
        excerpt: 'Kutch embroidery is our language. The vibrant threads, the shimmering mirrors—they all tell tales of our lives, our joys, and the harsh beauty of our desert home...',
        content: 'Kutch embroidery is our language. The vibrant threads, the shimmering mirrors—they all tell tales of our lives, our joys, and the harsh beauty of our desert home. I remember sitting with my grandmother as a child, her fingers a blur as she stitched intricate patterns onto fabric. She taught me that each motif has a meaning. The peacock represents beauty and grace, the elephant symbolizes strength, and the flowers speak of the brief but brilliant bloom of life in the desert. \n\nThe mirrors, or \'abhla bharat\', are our signature. They were originally used to ward off the evil eye, their reflective surfaces believed to blind malevolent spirits. Today, they capture the brilliant desert sun, scattering light and life across the fabric. Each piece I create is a tapestry of these stories and symbols. It takes weeks, sometimes months, to complete a single garment. It\'s a meditative process, a slow and deliberate act of creation that connects me to the generations of women who came before me. When you wear one of my creations, you are not just wearing a piece of clothing; you are wearing a piece of our history, a piece of the Kutch.',
        imageUrl: 'https://images.unsplash.com/photo-1621289133649-53aad5d1b54a?q=80&w=2962&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        artisanId: 'nancy-embroidery',
        artisanName: 'Nancy Devi',
        artisanProfileImageUrl: MOCK_ARTISANS[1].profileImageUrl,
        artisanBannerImageUrl: MOCK_ARTISANS[1].bannerImageUrl,
    },
    {
        id: 'story3',
        title: 'The Soul of the Walnut Tree',
        excerpt: 'A violin is not just assembled; it is born. It starts as a whisper in a Kashmir walnut grove and finds its voice under the patient hand of a luthier...',
        content: 'A violin is not just assembled; it is born. It starts as a whisper in a Kashmir walnut grove and finds its voice under the patient hand of a luthier. My grandfather always said that to make a great violin, you must first learn to listen to the wood. He would take me into the forests, and we would spend hours just being with the trees, feeling their grain, understanding their strength and their secrets. \n\nThe walnut wood from Kashmir is special. It has a deep, resonant quality that gives our instruments a uniquely warm and soulful tone. The process of creating a violin is one of reverence. From selecting the perfect, seasoned log to carving the delicate scroll, every step is done by hand. It can take over two hundred hours to craft a single instrument. \n\nThere is a moment, after the final coat of varnish has dried and the strings are tightened for the first time, when the violin draws its first breath. When the bow touches the strings and that first note rings out, it’s a magical feeling. It’s the moment the soul of the tree begins to sing. My purpose is not just to make instruments, but to create voices that will carry the music of Kashmir out into the world.',
        imageUrl: 'https://images.unsplash.com/photo-1612225330847-70b555037242?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        artisanId: 'pathan-violin',
        artisanName: 'Gulamgaush Pathan',
        artisanProfileImageUrl: MOCK_ARTISANS[2].profileImageUrl,
        artisanBannerImageUrl: MOCK_ARTISANS[2].bannerImageUrl,
    },
];

export const MOCK_ORDERS: Order[] = [
    { id: 'ORD-001', customerName: 'Priya Sharma', items: [{ name: 'Hohokam Inspired Vase', quantity: 1 }], total: 75, status: 'Shipped', date: '2 days ago' },
    { id: 'ORD-002', customerName: 'Raj Patel', items: [{ name: 'Art Nouveau Mugs', quantity: 2 }], total: 110, status: 'Pending', date: '5 hours ago' },
    { id: 'ORD-003', customerName: 'Anjali Singh', items: [{ name: 'Longpi Black Teapot', quantity: 1 }], total: 45, status: 'Delivered', date: '1 week ago' },
    { id: 'ORD-004', customerName: 'Vikram Reddy', items: [{ name: 'DIY Beginner Embroidery Kit', quantity: 1 }], total: 35, status: 'Delivered', date: '3 days ago' },
    { id: 'ORD-005', customerName: 'Meera Desai', items: [{ name: 'Kashmiri Walnut Violin', quantity: 1 }], total: 850, status: 'Shipped', date: '1 day ago' },
    { id: 'ORD-006', customerName: 'Sunita Joshi', items: [{ name: 'Indigo Paisley Tablecloth', quantity: 1 }], total: 90, status: 'Pending', date: '2 hours ago' },
    { id: 'ORD-007', customerName: 'Arjun Mehta', items: [{ name: 'Hand-Carved Sandalwood Elephant', quantity: 1 }], total: 150, status: 'Delivered', date: '5 days ago' },
    { id: 'ORD-008', customerName: 'Neha Gupta', items: [{ name: 'Blue Warli Painted Pots (Set of 3)', quantity: 1 }], total: 85, status: 'Shipped', date: '4 days ago' },
];

export const ANALYTICS_DATA = {
  revenue: [
    { label: 'Jan', value: 320 }, { label: 'Feb', value: 450 }, { label: 'Mar', value: 680 },
    { label: 'Apr', value: 550 }, { label: 'May', value: 810 }, { label: 'Jun', value: 720 },
  ],
  trafficSources: [
    { label: 'Kurafuto Search', value: 450 },
    { label: 'Social Media', value: 220 },
    { label: 'Direct', value: 180 },
    { label: 'External Blogs', value: 150 },
  ],
  topProducts: [
      { name: 'DIY Embroidery Kit', unitsSold: 160 },
      { name: 'Bumblebee Hoop', unitsSold: 75 },
      { name: 'Indigo Tablecloth', unitsSold: 55 },
  ],
  productSales: {
    'p1': [ { label: 'Jan', value: 5 }, { label: 'Feb', value: 7 }, { label: 'Mar', value: 8 }, { label: 'Apr', value: 6 }, { label: 'May', value: 10 }, { label: 'Jun', value: 9 }, ],
    'p2': [ { label: 'Jan', value: 3 }, { label: 'Feb', value: 2 }, { label: 'Mar', value: 5 }, { label: 'Apr', value: 4 }, { label: 'May', value: 6 }, { label: 'Jun', value: 5 }, ],
    'p4': [ { label: 'Jan', value: 1 }, { label: 'Feb', value: 2 }, { label: 'Mar', value: 1 }, { label: 'Apr', value: 3 }, { label: 'May', value: 4 }, { label: 'Jun', value: 4 }, ],
    'p5': [ { label: 'Jan', value: 1 }, { label: 'Feb', value: 3 }, { label: 'Mar', value: 2 }, { label: 'Apr', value: 4 }, { label: 'May', value: 5 }, { label: 'Jun', value: 3 }, ],
    'p15': [ { label: 'Jan', value: 9 }, { label: 'Feb', value: 11 }, { label: 'Mar', value: 14 }, { label: 'Apr', value: 10 }, { label: 'May', value: 17 }, { label: 'Jun', value: 15 }, ],
    'p16': [ { label: 'Jan', value: 20 }, { label: 'Feb', value: 25 }, { label: 'Mar', value: 30 }, { label: 'Apr', value: 22 }, { label: 'May', value: 35 }, { label: 'Jun', value: 28 }, ],
    'p17': [ { label: 'Jan', value: 4 }, { label: 'Feb', value: 5 }, { label: 'Mar', value: 7 }, { label: 'Apr', value: 5 }, { label: 'May', value: 8 }, { label: 'Jun', value: 6 }, ],
    'p18': [ { label: 'Jan', value: 2 }, { label: 'Feb', value: 3 }, { label: 'Mar', value: 2 }, { label: 'Apr', value: 4 }, { label: 'May', value: 5 }, { label: 'Jun', value: 3 }, ],
    'p19': [ { label: 'Jan', value: 1 }, { label: 'Feb', value: 0 }, { label: 'Mar', value: 1 }, { label: 'Apr', value: 2 }, { label: 'May', value: 1 }, { label: 'Jun', value: 2 }, ],
    'p20': [ { label: 'Jan', value: 2 }, { label: 'Feb', value: 1 }, { label: 'Mar', value: 3 }, { label: 'Apr', value: 2 }, { label: 'May', value: 4 }, { label: 'Jun', value: 3 }, ],
    'p21': [ { label: 'Jan', value: 4 }, { label: 'Feb', value: 6 }, { label: 'Mar', value: 5 }, { label: 'Apr', value: 8 }, { label: 'May', value: 10 }, { label: 'Jun', value: 9 }, ],
    'p22': [ { label: 'Jan', value: 6 }, { label: 'Feb', value: 8 }, { label: 'Mar', value: 10 }, { label: 'Apr', value: 7 }, { label: 'May', value: 12 }, { label: 'Jun', value: 12 }, ],
    'p23': [ { label: 'Jan', value: 12 }, { label: 'Feb', value: 15 }, { label: 'Mar', value: 18 }, { label: 'Apr', value: 13 }, { label: 'May', 'value': 20 }, { label: 'Jun', value: 12 }, ],
    'p24': [ { label: 'Jan', value: 3 }, { label: 'Feb', value: 4 }, { label: 'Mar', value: 5 }, { label: 'Apr', value: 4 }, { label: 'May', value: 7 }, { label: 'Jun', value: 7 }, ],
    'p25': [ { label: 'Jan', value: 2 }, { label: 'Feb', value: 2 }, { label: 'Mar', value: 3 }, { label: 'Apr', value: 3 }, { label: 'May', value: 4 }, { label: 'Jun', value: 4 }, ],
  }
};

const getParticipantData = (id: string) => {
    const artisan = MOCK_ARTISANS.find(a => a.id === id);
    return { name: artisan?.name || 'Unknown', avatarUrl: artisan?.profileImageUrl || '' };
}

export const MOCK_CONVERSATIONS: Conversation[] = [
    {
        id: 'convo1',
        participantIds: ['pathan-violin', 'nancy-embroidery'],
        participants: {
            'pathan-violin': getParticipantData('pathan-violin'),
            'nancy-embroidery': getParticipantData('nancy-embroidery'),
        },
        lastMessagePreview: 'That sounds like a wonderful idea. Let\'s discuss it.',
        timestamp: '10:45 AM',
        unreadBy: ['pathan-violin'],
        messages: [
            { id: 'm1', text: 'Hi Nancy, I was admiring your thread painting. The detail is incredible!', senderId: 'pathan-violin', timestamp: '10:42 AM' },
            { id: 'm2', text: 'Thank you, Gulamgaush! I saw your new electric violin, it looks like a piece of science fiction. Amazing work.', senderId: 'nancy-embroidery', timestamp: '10:43 AM' },
            { id: 'm3', text: 'I was thinking, a collaboration could be interesting. A custom embroidered violin case?', senderId: 'pathan-violin', timestamp: '10:44 AM' },
            { id: 'm4', text: 'That sounds like a wonderful idea. Let\'s discuss it.', senderId: 'nancy-embroidery', timestamp: '10:45 AM' },
        ],
    },
    {
        id: 'convo2',
        participantIds: ['harry-potter-pottery', 'anjali-block-printing'],
        participants: {
             'harry-potter-pottery': getParticipantData('harry-potter-pottery'),
            'anjali-block-printing': getParticipantData('anjali-block-printing'),
        },
        lastMessagePreview: 'Of course, I can send you some samples.',
        timestamp: 'Yesterday',
        unreadBy: [],
        messages: [
             { id: 'm5', text: 'Hello Anjali, your block prints are beautiful. I was wondering what kind of natural dyes you use for your fabrics?', senderId: 'harry-potter-pottery', timestamp: 'Yesterday' },
             { id: 'm6', text: 'Thank you, Harry! I primarily use indigo, pomegranate peel, and turmeric. The colors of Rajasthan!', senderId: 'anjali-block-printing', timestamp: 'Yesterday' },
             { id: 'm7', text: 'Fascinating. I am experimenting with natural glazes for my pottery. Would you be open to sharing your supplier for turmeric?', senderId: 'harry-potter-pottery', timestamp: 'Yesterday' },
             { id: 'm8', text: 'Of course, I can send you some samples.', senderId: 'anjali-block-printing', timestamp: 'Yesterday' },
        ],
    },
    {
        id: 'convo3',
        participantIds: ['nancy-embroidery', 'rohan-wood-carving'],
        participants: {
            'nancy-embroidery': getParticipantData('nancy-embroidery'),
            'rohan-wood-carving': getParticipantData('rohan-wood-carving'),
        },
        lastMessagePreview: 'Thank you! I appreciate the advice.',
        timestamp: '3 days ago',
        unreadBy: ['nancy-embroidery'],
        messages: [
             { id: 'm9', text: 'Rohan, your sandalwood carvings are breathtaking. How do you get such fine detail?', senderId: 'nancy-embroidery', timestamp: '3 days ago' },
             { id: 'm10', text: 'Patience and very sharp tools, Nancy! Your embroidery has a similar need for precision, I imagine.', senderId: 'rohan-wood-carving', timestamp: '3 days ago' },
             { id: 'm11', text: 'Thank you! I appreciate the advice.', senderId: 'nancy-embroidery', timestamp: '3 days ago' },
        ],
    },
];

export const MOCK_COMMUNITY_POSTS: CommunityPost[] = [
    {
        id: 'post1',
        author: { name: 'Nancy Devi', avatarUrl: MOCK_ARTISANS[1].profileImageUrl, craft: 'Kutch Embroidery' },
        authorId: 'nancy-embroidery',
        timestamp: '2024-05-21T10:30:00Z',
        content: 'Just finished this large peacock wall hanging! The mirror work took forever but I\'m so happy with how it turned out. What do you all think? Any tips for photographing pieces with lots of mirrors?',
        likes: 42,
        comments: 8,
    },
    {
        id: 'post2',
        author: { name: 'Gulamgaush Pathan', avatarUrl: MOCK_ARTISANS[2].profileImageUrl, craft: 'Wooden Violin Making' },
        authorId: 'pathan-violin',
        timestamp: '2024-05-20T18:00:00Z',
        content: 'Question for fellow woodworkers: What\'s your preferred finish for musical instruments that allows the wood to breathe?',
        likes: 28,
        comments: 12,
    },
    {
        id: 'post3',
        author: { name: 'Anjali Verma', avatarUrl: MOCK_ARTISANS[3].profileImageUrl, craft: 'Block Printing' },
        authorId: 'anjali-block-printing',
        timestamp: '2024-05-21T11:00:00Z',
        content: 'Experimenting with a new pomegranate peel dye today. The color is coming out beautifully! So excited to use this on my next batch of tablecloths.',
        likes: 58,
        comments: 15,
    },
    {
        id: 'post4',
        author: { name: 'Harry Potter', avatarUrl: MOCK_ARTISANS[0].profileImageUrl, craft: 'Terracotta Pottery' },
        authorId: 'harry-potter-pottery',
        timestamp: '2024-05-19T14:20:00Z',
        content: 'A fresh batch of pots, straight from the kiln. There is nothing quite like the moment of truth when you open it up!',
        likes: 72,
        comments: 10,
    }
];

export const MOCK_AUCTIONS: Auction[] = [
  {
    name: "Sotheby's Contemporary Craft",
    date: "Upcoming: June 15, 2024",
    description: "A premier online auction featuring exceptional works from leading contemporary craft artists worldwide.",
    url: "https://www.sothebys.com/en/digital-catalogues/contemporary-art-day-auction-1",
    imageUrl: "https://sothebys-com.brightspotcdn.com/dims4/default/c22883c/2147483647/strip/true/crop/3000x2054+0+0/resize/2000x1369!/format/webp/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fdotcom%2F6d%2F19%2Fa9339c894d5582c41c306bc6d29a%2F018l20024-bk73q-bourgeois-banner.jpg"
  },
  {
    name: "Christie's Art of India",
    date: "Upcoming: October 26, 2024",
    description: "This renowned auction includes a wide range of decorative arts and crafts from across India.",
    url: "https://www.christies.com/en/auction/art-of-the-islamic-and-indian-worlds-including-oriental-rugs-and-carpets-29835",
    imageUrl: "https://assets.thehansindia.com/h-upload/2021/11/22/1122988-art.webp"
  },
  {
    name: "Bonhams Native American Art",
    date: "Upcoming: September 9, 2024",
    description: "Features exquisite crafts like pottery, weaving, and carving that may appeal to collectors of global artisanal work.",
    url: "https://www.bonhams.com/auction/29165/native-american-art/",
    imageUrl: "https://miradorlife.com/wp-content/uploads/2021/08/header-6.png"
  }
];

export const MOCK_PAST_AUCTIONS: Auction[] = [
  { name: "Artisanal Future Fair 2024", date: "Concluded: May 1, 2024", description: "Featured contemporary pottery and glasswork from emerging artists.", url: "#" },
  { name: "Heritage Weaves Gala", date: "Concluded: April 15, 2024", description: "An exclusive auction for rare and traditional textiles, with record-breaking sales.", url: "#" },
  { name: "Masters of Wood", date: "Concluded: March 22, 2024", description: "Showcased intricate wood carvings and bespoke furniture pieces.", url: "#" }
];

export const MOCK_PRODUCTS_IN_AUCTION: ProductInAuction[] = [
  {
    id: "p1",
    name: "Longpi Black Teapot",
    imageUrl: "https://brownliving.in/cdn/shop/files/longpi-black-pottery-chakra-teapot-terracotta-by-sachii-sustainable-beverage-accessories-brown-living-sachii011-635242.jpg?v=1751610511&width=1024",
    currentBid: 65,
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // Ends in 2 hours
  },
  {
    id: "p17",
    name: "Sunset Floral Thread Painting",
    imageUrl: "https://i.pinimg.com/736x/30/6a/f2/306af2679859c2cdab0efe49f6d38a36.jpg",
    currentBid: 210,
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(), // Ends in 1 day and 3 hours
  },
  {
    id: "p24",
    name: "Hand-Carved Sandalwood Elephant",
    imageUrl: "https://m.media-amazon.com/images/I/61NEmftqOmL._UF350,350_QL80_.jpg",
    currentBid: 180,
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // Ends in 2 days
  }
];