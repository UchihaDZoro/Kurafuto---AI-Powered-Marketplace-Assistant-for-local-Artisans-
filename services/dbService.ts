

import {
    MOCK_ARTISANS,
    MOCK_CRAFT_CLUSTERS,
    MOCK_STORIES,
    MOCK_ORDERS,
    MOCK_COMMUNITY_POSTS,
    ANALYTICS_DATA,
    MOCK_CONVERSATIONS,
    MOCK_AUCTIONS,
    MOCK_PAST_AUCTIONS,
    MOCK_PRODUCTS_IN_AUCTION,
} from '../constants';
import {
    type Artisan,
    type CraftCluster,
    type Story,
    type Order,
    type CommunityPost,
    type Conversation,
    type Product,
    type AnalyticsDataPoint,
    type TopProduct,
    type TrafficSource,
    type Auction,
    type Message,
    type ProductInAuction,
} from '../types';

interface AnalyticsData {
    revenue: AnalyticsDataPoint[];
    trafficSources: TrafficSource[];
    topProducts: TopProduct[];
    productSales: { [productId: string]: AnalyticsDataPoint[] };
}

const DB_KEYS = {
    ARTISANS: 'kurafuto_artisans',
    CRAFT_CLUSTERS: 'kurafuto_craft_clusters',
    STORIES: 'kurafuto_stories',
    ORDERS: 'kurafuto_orders',
    COMMUNITY_POSTS: 'kurafuto_community_posts',
    ANALYTICS: 'kurafuto_analytics',
    CONVERSATIONS: 'kurafuto_conversations',
    AUCTIONS: 'kurafuto_auctions',
    PAST_AUCTIONS: 'kurafuto_past_auctions',
    PRODUCTS_IN_AUCTION: 'kurafuto_products_in_auction',
};

// Helper to get item from localStorage
const getItem = <T>(key: string): T | null => {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        }
        return null;
    } catch (error) {
        console.error(`Error getting item ${key} from localStorage`, error);
        return null;
    }
};

// Helper to set item in localStorage
const setItem = <T>(key: string, value: T): void => {
    try {
         if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem(key, JSON.stringify(value));
         }
    } catch (error) {
        console.error(`Error setting item ${key} in localStorage`, error);
    }
};

// Initialize DB with mock data if it doesn't exist
export const initDB = () => {
    if (!getItem(DB_KEYS.ARTISANS)) {
        setItem(DB_KEYS.ARTISANS, MOCK_ARTISANS);
    }
    if (!getItem(DB_KEYS.CRAFT_CLUSTERS)) {
        setItem(DB_KEYS.CRAFT_CLUSTERS, MOCK_CRAFT_CLUSTERS);
    }
    if (!getItem(DB_KEYS.STORIES)) {
        setItem(DB_KEYS.STORIES, MOCK_STORIES);
    }
    if (!getItem(DB_KEYS.ORDERS)) {
        setItem(DB_KEYS.ORDERS, MOCK_ORDERS);
    }
    if (!getItem(DB_KEYS.COMMUNITY_POSTS)) {
        setItem(DB_KEYS.COMMUNITY_POSTS, MOCK_COMMUNITY_POSTS);
    }
    if (!getItem(DB_KEYS.ANALYTICS)) {
        setItem(DB_KEYS.ANALYTICS, ANALYTICS_DATA);
    }
    if (!getItem(DB_KEYS.CONVERSATIONS)) {
        setItem(DB_KEYS.CONVERSATIONS, MOCK_CONVERSATIONS);
    }
    if (!getItem(DB_KEYS.AUCTIONS)) {
        setItem(DB_KEYS.AUCTIONS, MOCK_AUCTIONS);
    }
    if (!getItem(DB_KEYS.PAST_AUCTIONS)) {
        setItem(DB_KEYS.PAST_AUCTIONS, MOCK_PAST_AUCTIONS);
    }
     if (!getItem(DB_KEYS.PRODUCTS_IN_AUCTION)) {
        setItem(DB_KEYS.PRODUCTS_IN_AUCTION, MOCK_PRODUCTS_IN_AUCTION);
    }
};

// --- Data Accessors ---

export const getArtisans = (): Artisan[] => {
    return getItem<Artisan[]>(DB_KEYS.ARTISANS) || [];
};

export const getArtisanById = (id: string): Artisan | undefined => {
    return getArtisans().find(a => a.id === id);
}

export const getCraftClusters = (): CraftCluster[] => {
    return getItem<CraftCluster[]>(DB_KEYS.CRAFT_CLUSTERS) || [];
};

export const getStories = (): Story[] => {
    return getItem<Story[]>(DB_KEYS.STORIES) || [];
};

export const getOrders = (): Order[] => {
    return getItem<Order[]>(DB_KEYS.ORDERS) || [];
};

export const getCommunityPosts = (): CommunityPost[] => {
    return getItem<CommunityPost[]>(DB_KEYS.COMMUNITY_POSTS) || [];
};

export const getAnalyticsData = (): AnalyticsData => {
    return getItem<AnalyticsData>(DB_KEYS.ANALYTICS) || ANALYTICS_DATA;
};

export const getConversations = (): Conversation[] => {
    return getItem<Conversation[]>(DB_KEYS.CONVERSATIONS) || [];
};

export const getConversationsForArtisan = (artisanId: string): Conversation[] => {
    return getConversations().filter(c => c.participantIds.includes(artisanId));
};

export const getUnreadMessageCountForArtisan = (artisanId: string): number => {
    return getConversationsForArtisan(artisanId).filter(c => c.unreadBy.includes(artisanId)).length;
}

export const getSampleAuctions = (): Auction[] => {
    return getItem<Auction[]>(DB_KEYS.AUCTIONS) || [];
};

export const getPastAuctions = (): Auction[] => {
    return getItem<Auction[]>(DB_KEYS.PAST_AUCTIONS) || [];
};

export const getProductsInAuction = (): ProductInAuction[] => {
    // We need to manage the bid price in the component state, not here.
    // This function just returns the initial static data.
    return getItem<ProductInAuction[]>(DB_KEYS.PRODUCTS_IN_AUCTION) || [];
};


export const getProducts = (): Product[] => {
    const artisans = getArtisans();
    return artisans.flatMap(artisan =>
        artisan.products.map(product => ({
            ...product,
            artisanId: artisan.id,
            artisanName: artisan.name,
        }))
    );
};

// --- Data Mutators ---

export const addProduct = (newProduct: Product): void => {
    const artisans = getArtisans();
    const artisanIndex = artisans.findIndex(a => a.id === newProduct.artisanId);
    if (artisanIndex > -1) {
        // Omitting artisanId and artisanName as they are not part of the nested product structure
        const { artisanId, artisanName, ...productToAdd } = newProduct;
        artisans[artisanIndex].products.unshift(productToAdd);
        setItem(DB_KEYS.ARTISANS, artisans);
    }
};

export const updateProduct = (updatedProduct: Product): void => {
    const artisans = getArtisans();
    const artisanIndex = artisans.findIndex(a => a.id === updatedProduct.artisanId);
    if (artisanIndex > -1) {
        const productIndex = artisans[artisanIndex].products.findIndex(p => p.id === updatedProduct.id);
        if (productIndex > -1) {
            const { artisanId, artisanName, ...productToUpdate } = updatedProduct;
            artisans[artisanIndex].products[productIndex] = productToUpdate;
            setItem(DB_KEYS.ARTISANS, artisans);
        }
    }
};


export const updateArtisan = (updatedArtisan: Artisan): void => {
    const artisans = getArtisans();
    const artisanIndex = artisans.findIndex(a => a.id === updatedArtisan.id);
    if (artisanIndex > -1) {
        artisans[artisanIndex] = updatedArtisan;
        setItem(DB_KEYS.ARTISANS, artisans);
    }
};

export const addCommunityPost = (post: CommunityPost): void => {
    const posts = getCommunityPosts();
    posts.unshift(post);
    setItem(DB_KEYS.COMMUNITY_POSTS, posts);
};

export const sendMessage = (fromId: string, toId: string, text: string): Conversation => {
    const conversations = getConversations();
    let convo = conversations.find(c => c.participantIds.includes(fromId) && c.participantIds.includes(toId));
    
    const fromArtisan = getArtisanById(fromId);
    const toArtisan = getArtisanById(toId);
    if (!fromArtisan || !toArtisan) throw new Error("Invalid artisan ID");

    const newMessage: Message = {
        id: `msg${Date.now()}`,
        senderId: fromId,
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    if (convo) {
        convo.messages.push(newMessage);
        convo.lastMessagePreview = text;
        convo.timestamp = newMessage.timestamp;
        convo.unreadBy = [toId]; // The recipient is the only one who hasn't read it.
    } else {
        convo = {
            id: `convo${Date.now()}`,
            participantIds: [fromId, toId],
            participants: {
                [fromId]: { name: fromArtisan.name, avatarUrl: fromArtisan.profileImageUrl },
                [toId]: { name: toArtisan.name, avatarUrl: toArtisan.profileImageUrl },
            },
            messages: [newMessage],
            lastMessagePreview: text,
            timestamp: newMessage.timestamp,
            unreadBy: [toId],
        };
        conversations.unshift(convo);
    }
    
    setItem(DB_KEYS.CONVERSATIONS, conversations);
    return convo;
};

export const markConversationAsRead = (conversationId: string, artisanId: string): void => {
    const conversations = getConversations();
    const convoIndex = conversations.findIndex(c => c.id === conversationId);
    if (convoIndex > -1) {
        conversations[convoIndex].unreadBy = conversations[convoIndex].unreadBy.filter(id => id !== artisanId);
        setItem(DB_KEYS.CONVERSATIONS, conversations);
    }
};