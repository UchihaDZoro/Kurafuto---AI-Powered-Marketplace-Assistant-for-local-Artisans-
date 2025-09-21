

export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  story: string;
  hashtags: string[];
  price?: number;
  artisanId: string;
  artisanName: string;
  reviews?: Review[];
  stats?: {
    views: number;
    sales: number;
    conversionRate: number;
  };
}

export interface Artisan {
  id: string;
  name: string;
  craft: string;
  location: string;
  bio: string;
  products: Omit<Product, 'artisanId' | 'artisanName'>[];
  profileImageUrl: string;
  bannerImageUrl: string;
}

// FIX: Added missing CraftCluster interface.
export interface CraftCluster {
  id: string;
  name: string;
  region: string;
  crafts: string[];
  artisans: Artisan[];
  position: {
    top: string;
    left: string;
  };
}

export interface Story {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    imageUrl: string;
    artisanId: string;
    artisanName: string;
    artisanProfileImageUrl: string;
    artisanBannerImageUrl: string;
}

export interface AnalyticsDataPoint {
    label: string;
    value: number;
}

export interface TrafficSource extends AnalyticsDataPoint {}

export interface TopProduct {
    name: string;
    unitsSold: number;
}

export interface Order {
    id: string;
    customerName: string;
    items: { name: string, quantity: number }[];
    total: number;
    status: 'Pending' | 'Shipped' | 'Delivered';
    date: string;
}

export interface CommunityPost {
    id: string;
    author: {
        name: string;
        avatarUrl: string;
        craft: string;
    };
    authorId: string;
    timestamp: string;
    content: string;
    likes: number;
    comments: number;
}


export interface Message {
    id: string;
    text: string;
    senderId: string; // Changed from 'sender'
    timestamp: string;
}

export interface Conversation {
    id: string;
    participantIds: string[]; // e.g., ['harry-potter-pottery', 'nancy-embroidery']
    participants: { [id: string]: { name: string; avatarUrl: string } };
    messages: Message[];
    lastMessagePreview: string;
    timestamp: string;
    unreadBy: string[]; // Array of artisan IDs who haven't read the latest message
}

export interface PriceSuggestion {
    price: number;
    justification: string;
}

export interface Auction {
    name: string;
    date: string;
    description: string;
    url: string;
    imageUrl?: string;
}

export interface Review {
    id: string;
    customerName: string;
    rating: number; // 1-5 stars
    comment: string;
    date: string;
}

export interface ProductInAuction {
  id: string;
  name: string;
  imageUrl: string;
  currentBid: number;
  endTime: string; // ISO string for countdown
}

// FIX: Updated GroundingChunk to have optional properties to match the type from @google/genai.
export interface GroundingChunk {
    web?: {
        uri?: string;
        title?: string;
    }
}