

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { type Artisan, type Conversation, type AnalyticsDataPoint, type Product, type PriceSuggestion, type Auction, type GroundingChunk, type Order, type CommunityPost, Review, Message, ProductInAuction } from '../types';
import * as geminiService from '../services/geminiService';
import * as dbService from '../services/dbService';
import ProductCard from './ProductCard';
import Modal from './Modal';
import Spinner from './Spinner';
import { ChartBarIcon, HomeIcon, ChatBubbleLeftRightIcon, Squares2X2Icon, UploadIcon, SparklesIcon, ScaleIcon, UserGroupIcon, ShoppingCartIcon, ThumbUpIcon, ChatBubbleOvalLeftIcon, StarIcon, CloseIcon, CurrencyDollarIcon, ArrowLeftIcon, ArrowRightIcon, UserPlusIcon, TrendingUpIcon, CheckCircleIcon } from './Icon';

type DashboardTab = 'overview' | 'analytics' | 'messages' | 'products' | 'community' | 'auctions';

interface ArtisanProfileProps {
  artisan: Artisan;
  onBack?: () => void;
  isDashboard?: boolean;
  loggedInArtisan?: Artisan | null;
  onStartConversation?: (targetArtisanId: string) => void;
  initialMessageTarget?: string | null;
  onInitialMessageTargetClear?: () => void;
}

const KpiCard: React.FC<{ title: string; value: string; icon: React.ReactNode; color: string; }> = ({ title, value, icon, color }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg dark:shadow-none flex items-center justify-between">
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
            <p className="text-3xl font-bold font-sans text-gray-800 dark:text-gray-100">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
            {icon}
        </div>
    </div>
);


const PieChart: React.FC<{ data: AnalyticsDataPoint[]; title: string }> = ({ data, title }) => {
    const colors = ['#4285F4', '#0F9D58', '#F4B400', '#DB4437'];
    if (data.length === 0) return <div className="flex items-center justify-center h-full text-gray-500">No data available</div>;
    const total = data.reduce((acc, d) => acc + d.value, 0);

    return (
         <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg dark:shadow-none h-full">
            <h3 className="text-lg font-bold font-sans mb-4 dark:text-white">{title}</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <div className="relative w-32 h-32">
                     <svg width="128" height="128" viewBox="0 0 100 100" className="transform -rotate-90">
                         {(() => {
                            let accumulatedPercentage = 0;
                            return data.map((d, i) => {
                                const percentage = d.value / total;
                                const strokeDasharray = `${percentage * 100} 100`;
                                const offset = accumulatedPercentage;
                                accumulatedPercentage += percentage;
                                return (
                                    <circle
                                        key={i}
                                        cx="50" cy="50" r="45"
                                        fill="none"
                                        stroke={colors[i % colors.length]}
                                        strokeWidth="10"
                                        pathLength="100"
                                        strokeDasharray={strokeDasharray}
                                        strokeDashoffset={-offset * 100}
                                        className="transition-all duration-500"
                                    />
                                );
                            });
                        })()}
                    </svg>
                </div>
                <div className="space-y-2">
                    {data.map((d, i) => (
                        <div key={i} className="flex items-center text-sm">
                            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colors[i % colors.length] }}></span>
                            <span className="font-semibold dark:text-gray-200">{d.label}:</span>
                            <span className="ml-1 text-gray-600 dark:text-gray-400">{d.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const StackedBarChart: React.FC<{ data: { label: string; values: { [productName: string]: number } }[]; productColors: { [productName: string]: string } }> = ({ data, productColors }) => {
    const [tooltip, setTooltip] = useState<{ content: string; x: number; y: number } | null>(null);
    const chartRef = useRef<SVGSVGElement>(null);
    const width = 600;
    const height = 300;
    const padding = { top: 20, right: 20, bottom: 30, left: 40 };

    const maxY = useMemo(() => {
        const totals = data.map(d => Object.values(d.values).reduce((sum, val) => sum + val, 0));
        return Math.max(...totals) * 1.1;
    }, [data]);

    const handleMouseOver = (e: React.MouseEvent, monthData: { label: string; values: { [productName: string]: number } }, barIndex: number) => {
        if (!chartRef.current) return;
        const rect = chartRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const content = `<strong>${monthData.label}</strong><br/>` + Object.entries(monthData.values).map(([name, val]) => `${name}: $${val.toFixed(2)}`).join('<br/>');
        setTooltip({ content, x, y });
    };

    return (
        <div className="relative">
            <svg ref={chartRef} viewBox={`0 0 ${width} ${height}`} className="w-full h-auto font-sans" onMouseOut={() => setTooltip(null)}>
                {/* Y-axis */}
                {[...Array(5)].map((_, i) => {
                    const y = height - padding.bottom - (i / 4) * (height - padding.top - padding.bottom);
                    const value = (i / 4) * (maxY / 1.1);
                    return (
                        <g key={i}>
                            <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#e5e7eb" className="dark:stroke-gray-700" strokeDasharray="2" />
                            <text x={padding.left - 5} y={y + 3} textAnchor="end" fontSize="10" className="fill-gray-500 dark:fill-gray-400">${value.toFixed(0)}</text>
                        </g>
                    );
                })}

                {/* Bars */}
                {data.map((monthData, i) => {
                    const barWidth = (width - padding.left - padding.right) / data.length * 0.7;
                    const x = padding.left + i * ((width - padding.left - padding.right) / data.length) + ((width - padding.left - padding.right) / data.length * 0.15);
                    let currentY = height - padding.bottom;
                    
                    return (
                        <g key={monthData.label} onMouseOver={(e) => handleMouseOver(e, monthData, i)}>
                            {Object.entries(monthData.values).map(([productName, value]) => {
                                const barHeight = (value / maxY) * (height - padding.top - padding.bottom);
                                const rectY = currentY - barHeight;
                                currentY = rectY;
                                return (
                                    <rect
                                        key={productName}
                                        x={x}
                                        y={rectY}
                                        width={barWidth}
                                        height={barHeight}
                                        fill={productColors[productName] || '#ccc'}
                                        rx="2"
                                    />
                                );
                            })}
                        </g>
                    );
                })}

                {/* X-axis */}
                {data.map((d, i) => {
                    const x = padding.left + (i + 0.5) * ((width - padding.left - padding.right) / data.length);
                    return <text key={i} x={x} y={height - padding.bottom + 15} textAnchor="middle" fontSize="10" className="fill-gray-500 dark:fill-gray-400">{d.label}</text>
                })}
            </svg>
            {tooltip && (
                <div
                    className="absolute p-2 text-xs bg-gray-800 text-white rounded-md shadow-lg pointer-events-none"
                    style={{ left: tooltip.x + 10, top: tooltip.y + 10 }}
                    dangerouslySetInnerHTML={{ __html: tooltip.content }}
                />
            )}
        </div>
    );
};


const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}


const AIProductUploader: React.FC<{ artisan: Artisan; onClose: () => void; onProductAdd: (product: Product) => void; }> = ({ artisan, onClose, onProductAdd }) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [productDetails, setProductDetails] = useState<Partial<Product>>({});
    const [priceSuggestion, setPriceSuggestion] = useState<PriceSuggestion | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            setProductDetails({});
            setPriceSuggestion(null);
            setError('');
        }
    };

    const handleEnhanceImage = async () => {
        if (!imageFile) return;
        setLoadingMessage('Enhancing image with AI...');
        setIsLoading(true);
        setError('');
        try {
            const { inlineData } = await fileToGenerativePart(imageFile);
            const enhancedData = await geminiService.enhanceImage(inlineData.data, inlineData.mimeType);
            if (enhancedData) {
                const newMimeType = imageFile.type;
                setImagePreview(`data:${newMimeType};base64,${enhancedData}`);
                
                const byteString = atob(enhancedData);
                const ab = new ArrayBuffer(byteString.length);
                const ia = new Uint8Array(ab);
                for (let i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                const blob = new Blob([ab], { type: newMimeType });
                const newFile = new File([blob], imageFile.name, { type: newMimeType });
                setImageFile(newFile);
            } else {
                setError('Could not enhance image.');
            }
        } catch (err) {
            setError('An error occurred while enhancing the image.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateDetails = async () => {
        if (!imageFile) return;
        setLoadingMessage('Generating details with AI...');
        setIsLoading(true);
        setError('');
        try {
            const { inlineData } = await fileToGenerativePart(imageFile);
            const details = await geminiService.generateProductDetailsFromImage(inlineData.data, inlineData.mimeType, artisan.craft);
            if (details) {
                setProductDetails({ ...productDetails, ...details });
                setLoadingMessage('Suggesting price...');
                const suggestion = await geminiService.suggestPrice(details.description);
                if (suggestion) {
                    setPriceSuggestion(suggestion);
                    setProductDetails(prev => ({ ...prev, price: suggestion.price }));
                }
            } else {
                 setError('Could not generate product details.');
            }
        } catch (err) {
            setError('An error occurred during AI generation.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleSaveProduct = () => {
        const newProduct: Product = {
            id: `p${Date.now()}`,
            name: productDetails.name || 'Unnamed Product',
            imageUrl: imagePreview || '',
            description: productDetails.description || '',
            story: productDetails.story || '',
            hashtags: productDetails.hashtags || [],
            price: productDetails.price || 0,
            artisanId: artisan.id,
            artisanName: artisan.name,
            stats: { views: 0, sales: 0, conversionRate: 0 },
            reviews: [],
        };
        onProductAdd(newProduct);
        onClose();
    };

    return (
        <div className="space-y-4">
            {error && <p className="text-red-500 bg-red-100 dark:bg-red-900/30 p-2 rounded-md">{error}</p>}

            {!imagePreview ? (
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                    <label htmlFor="product-image-upload" className="cursor-pointer text-google-blue font-semibold">
                        Upload a photo
                    </label>
                    <input id="product-image-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">or capture from camera</p>
                </div>
            ) : (
                <div className="relative group">
                    <img src={imagePreview} alt="Product preview" className="w-full rounded-lg max-h-64 object-contain bg-gray-100 dark:bg-gray-700" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <label htmlFor="product-image-upload" className="cursor-pointer text-white font-semibold bg-black/70 p-2 rounded-md">
                            Change Image
                        </label>
                        <input id="product-image-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </div>
                </div>
            )}

            {imagePreview && (
                <div className="flex flex-col sm:flex-row gap-2">
                    <button onClick={handleEnhanceImage} disabled={isLoading} className="flex-1 w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        <SparklesIcon className="w-5 h-5" /> Enhance with AI
                    </button>
                    <button onClick={handleGenerateDetails} disabled={isLoading} className="flex-1 w-full flex items-center justify-center gap-2 px-4 py-2 bg-google-green text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        <SparklesIcon className="w-5 h-5" /> Generate Details
                    </button>
                </div>
            )}
            
            {isLoading && <div className="flex flex-col items-center justify-center p-4"><Spinner /><p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{loadingMessage}</p></div>}
            
            {productDetails.name && !isLoading && (
                <div className="space-y-3 animate-fade-in">
                    <input type="text" placeholder="Product Name" value={productDetails.name || ''} onChange={e => setProductDetails(p => ({...p, name: e.target.value}))} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                    <textarea placeholder="Description" value={productDetails.description || ''} onChange={e => setProductDetails(p => ({...p, description: e.target.value}))} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" rows={3}></textarea>
                    <input type="text" placeholder="Story" value={productDetails.story || ''} onChange={e => setProductDetails(p => ({...p, story: e.target.value}))} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                    <input type="text" placeholder="Hashtags (comma separated)" value={productDetails.hashtags?.join(', ') || ''} onChange={e => setProductDetails(p => ({...p, hashtags: e.target.value.split(',').map(s => s.trim())}))} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                    <div>
                        <input type="number" placeholder="Price (USD)" value={productDetails.price || ''} onChange={e => setProductDetails(p => ({...p, price: parseFloat(e.target.value)}))} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                        {priceSuggestion && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 p-2 bg-gray-100 dark:bg-gray-700/50 rounded-md">
                            <SparklesIcon className="w-3 h-3 inline mr-1 text-google-yellow"/> 
                            <span className="font-bold">AI Suggestion:</span> {priceSuggestion.justification}
                        </p>}
                    </div>
                    <button onClick={handleSaveProduct} className="w-full px-4 py-2 bg-google-blue text-white rounded-lg hover:bg-blue-700 transition-colors">Add Product to Storefront</button>
                </div>
            )}
        </div>
    );
};

const CountdownTimer: React.FC<{ endTime: string }> = ({ endTime }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(endTime) - +new Date();
        let timeLeft: { [key: string]: number } = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const timerComponents = Object.entries(timeLeft).map(([interval, value]) => {
         if (value <= 0 && interval !== 'seconds' && timeLeft.days === 0 && (interval !== 'hours' || timeLeft.minutes === 0)) return null;
        if(timeLeft.days === 0 && interval === 'days') return null;

        return (
            <span key={interval} className="text-xs">
                {String(value).padStart(2, '0')}{interval.charAt(0)}
            </span>
        );
    });

    return (
        <div className="flex gap-1 font-mono text-center">
            {timerComponents.length ? timerComponents : <span className="text-xs text-red-500">Auction Ended</span>}
        </div>
    );
};


const ArtisanDashboard: React.FC<{ artisan: Artisan; initialMessageTarget?: string | null, onInitialMessageTargetClear?: () => void; }> = ({ artisan, initialMessageTarget, onInitialMessageTargetClear }) => {
    const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
    const [currentArtisan, setCurrentArtisan] = useState<Artisan>(artisan);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [isUploaderOpen, setIsUploaderOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [auctions, setAuctions] = useState<Auction[]>([]);
    const [sampleAuctions, setSampleAuctions] = useState<Auction[]>([]);
    const [pastAuctions, setPastAuctions] = useState<Auction[]>([]);
    const [productsInAuction, setProductsInAuction] = useState<ProductInAuction[]>([]);
    const [groundingChunks, setGroundingChunks] = useState<GroundingChunk[]>([]);
    const [isFindingAuctions, setIsFindingAuctions] = useState(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);
    const [analyticsData, setAnalyticsData] = useState(dbService.getAnalyticsData());
    const [currentReview, setCurrentReview] = useState(0);
    const [newMessage, setNewMessage] = useState('');
    const [unreadMessageCount, setUnreadMessageCount] = useState(0);
    
    // Modals state
    const [manageProduct, setManageProduct] = useState<Product | null>(null);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [viewReviewsFor, setViewReviewsFor] = useState<Product | null>(null);
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
    const [newPostContent, setNewPostContent] = useState('');
    const [aiSummary, setAiSummary] = useState('');
    const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);


    const allReviews = useMemo(() => products.flatMap(p => p.reviews || []).filter(Boolean), [products]);

    const refreshConversations = () => {
        const convos = dbService.getConversationsForArtisan(artisan.id)
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()); // This might not work if timestamp is not a valid date string
        setConversations(convos);
        setUnreadMessageCount(dbService.getUnreadMessageCountForArtisan(artisan.id));
    };

     useEffect(() => {
        const artisanData = dbService.getArtisanById(artisan.id);
        if (artisanData) {
            setCurrentArtisan(artisanData);
            setProducts(artisanData.products.map(p => ({...p, artisanId: artisan.id, artisanName: artisan.name})));
        }
        
        refreshConversations();
        setOrders(dbService.getOrders());
        setCommunityPosts(dbService.getCommunityPosts().sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
        setSampleAuctions(dbService.getSampleAuctions());
        setPastAuctions(dbService.getPastAuctions());
        setProductsInAuction(dbService.getProductsInAuction());
        
    }, [artisan.id]);
    
    useEffect(() => {
        if (initialMessageTarget) {
            handleStartOrGoToConversation(initialMessageTarget, false);
            onInitialMessageTargetClear?.();
        }
    }, [initialMessageTarget]);

     useEffect(() => {
        const bidInterval = setInterval(() => {
            setProductsInAuction(prevProducts =>
                prevProducts.map(p => {
                    if (new Date(p.endTime) > new Date()) {
                        const increment = Math.random() * 5; // Random increment up to $5
                        return { ...p, currentBid: p.currentBid + increment };
                    }
                    return p;
                })
            );
        }, 3500); // Update every 3.5 seconds

        return () => clearInterval(bidInterval);
    }, []);

    const handleAddProduct = (product: Product) => {
        dbService.addProduct(product);
        setProducts(prev => [product, ...prev]);
    };

    const handleUpdateProduct = () => {
        if(editingProduct){
            dbService.updateProduct(editingProduct);
            setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
            setManageProduct(null);
            setEditingProduct(null);
        }
    };

    const handleGenerateAISummary = async (product: Product) => {
        if (!product.stats) return;
        setIsGeneratingSummary(true);
        setAiSummary('');
        const summary = await geminiService.summarizeProductPerformance({
            name: product.name,
            ...product.stats
        });
        setAiSummary(summary || "Could not generate summary.");
        setIsGeneratingSummary(false);
    }
    
    const handleFindAuctions = async () => {
        setIsFindingAuctions(true);
        setAuctions([]);
        const results = await geminiService.findAuctions(artisan.craft);
        setAuctions(results.auctions);
        setGroundingChunks(results.groundingChunks);
        setIsFindingAuctions(false);
    };

    const handleCreatePost = () => {
        const newPost: CommunityPost = {
            id: `post${Date.now()}`,
            author: { name: currentArtisan.name, avatarUrl: currentArtisan.profileImageUrl, craft: currentArtisan.craft },
            authorId: currentArtisan.id,
            timestamp: new Date().toISOString(),
            content: newPostContent,
            likes: 0,
            comments: 0,
        };
        dbService.addCommunityPost(newPost);
        setCommunityPosts([newPost, ...communityPosts]);
        setNewPostContent('');
        setIsCreatePostOpen(false);
    };

     const handleStartOrGoToConversation = (targetArtisanId: string, shouldSwitchTab = true) => {
        const existingConvo = conversations.find(c => c.participantIds.includes(targetArtisanId));
        if (existingConvo) {
            setSelectedConversation(existingConvo);
        } else {
            const newConvo = dbService.sendMessage(artisan.id, targetArtisanId, `Hi! I saw your work and wanted to connect.`);
            refreshConversations();
            setSelectedConversation(newConvo);
        }
        if (shouldSwitchTab) {
            setActiveTab('messages');
        }
    };

    const handleSendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && newMessage.trim() && selectedConversation) {
            const recipientId = selectedConversation.participantIds.find(id => id !== artisan.id);
            if(recipientId) {
                const updatedConvo = dbService.sendMessage(artisan.id, recipientId, newMessage.trim());
                setSelectedConversation(updatedConvo);
                refreshConversations();
                setNewMessage('');
            }
        }
    };
    
    useEffect(() => {
        if(selectedConversation && selectedConversation.unreadBy.includes(artisan.id)) {
            dbService.markConversationAsRead(selectedConversation.id, artisan.id);
            refreshConversations();
        }
    }, [selectedConversation, artisan.id]);

    const analyticsSummary = useMemo(() => {
        const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
        const totalOrders = orders.length;
        const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
        const orderStatusCounts = orders.reduce((acc, order) => {
            acc[order.status] = (acc[order.status] || 0) + 1;
            return acc;
        }, {} as { [key: string]: number });

        const orderStatusData = Object.entries(orderStatusCounts).map(([label, value]) => ({ label, value }));

        return {
            totalRevenue,
            totalOrders,
            avgOrderValue,
            orderStatusData,
        };
    }, [orders]);

     const monthlySalesBreakdown = useMemo(() => {
        const breakdown: { [month: string]: { label: string; values: { [productName: string]: number } } } = {};
        const productColors: { [productName: string]: string } = {};
        const colors = ['#4285F4', '#0F9D58', '#F4B400', '#DB4437', '#9c27b0', '#ff5722', '#607d8b'];
        let colorIndex = 0;

        products.forEach(product => {
            const salesData = (analyticsData.productSales as any)[product.id];
            if (salesData) {
                if (!productColors[product.name]) {
                    productColors[product.name] = colors[colorIndex % colors.length];
                    colorIndex++;
                }
                salesData.forEach((d: AnalyticsDataPoint) => {
                    if (!breakdown[d.label]) {
                        breakdown[d.label] = { label: d.label, values: {} };
                    }
                    breakdown[d.label].values[product.name] = (breakdown[d.label].values[product.name] || 0) + d.value * (product.price || 0);
                });
            }
        });

        const sortedBreakdown = Object.values(breakdown).sort((a,b)=> analyticsData.revenue.findIndex(rev => rev.label === a.label) - analyticsData.revenue.findIndex(rev => rev.label === b.label));

        return { data: sortedBreakdown, productColors };
    }, [products, analyticsData]);


    const NavItem: React.FC<{ tab: DashboardTab; icon: React.ReactElement<{ className?: string }>; label: string }> = ({ tab, icon, label }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`relative flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors group ${
                activeTab === tab
                    ? 'bg-google-blue text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
        >
            {React.cloneElement(icon, { className: `w-5 h-5 mr-3 transition-transform group-hover:scale-110 ${activeTab === tab ? 'text-white' : 'text-gray-400 dark:text-gray-500'}` })}
            <span className="md:block">{label}</span>
            {label === 'Messages' && unreadMessageCount > 0 && (
                 <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                    {unreadMessageCount}
                </span>
            )}
        </button>
    );
    
    const renderContent = () => {
        switch (activeTab) {
            case 'auctions':
                return (
                     <div>
                        <style>{`
                            @keyframes scroll {
                                0% { transform: translateX(0); }
                                100% { transform: translateX(-50%); }
                            }
                            .animate-scroll {
                                animation: scroll 40s linear infinite;
                            }
                        `}</style>
                        <h2 className="text-3xl font-bold font-sans text-gray-800 dark:text-gray-100 mb-6">Auction Opportunities</h2>

                        <div className="w-full overflow-hidden relative group rounded-2xl shadow-lg mb-8" style={{maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'}}>
                            <div className="flex w-max animate-scroll group-hover:[animation-play-state:paused]">
                                {[...sampleAuctions, ...sampleAuctions].map((auction, i) => (
                                    <a key={i} href={auction.url} target="_blank" rel="noopener noreferrer" className="relative w-80 h-48 flex-shrink-0 mr-6 rounded-xl overflow-hidden group/card">
                                        <img src={auction.imageUrl} alt={auction.name} className="absolute w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                        <div className="relative h-full flex flex-col justify-end p-4 text-white">
                                            <h3 className="font-bold text-lg">{auction.name}</h3>
                                            <p className="text-xs">{auction.date}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Your Products in Auction */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                                <h3 className="text-2xl font-bold font-sans dark:text-white mb-4">Your Products in Auction</h3>
                                <div className="space-y-4">
                                    {productsInAuction.map(product => (
                                        <div key={product.id} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                            <img src={product.imageUrl} alt={product.name} className="w-16 h-16 rounded-md object-cover" />
                                            <div className="flex-grow">
                                                <p className="font-semibold dark:text-gray-200">{product.name}</p>
                                                <div className="flex items-baseline gap-2">
                                                    <p className="text-lg font-bold text-google-green">${product.currentBid.toFixed(2)}</p>
                                                    <TrendingUpIcon className="w-4 h-4 text-green-500"/>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Time Left:</p>
                                                <CountdownTimer endTime={product.endTime} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Past Auction Results */}
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                                 <h3 className="text-2xl font-bold font-sans dark:text-white mb-4">Past Auction Results</h3>
                                  <div className="space-y-4">
                                    {pastAuctions.map((auction, i) => (
                                        <div key={i} className="flex items-start gap-4">
                                            <CheckCircleIcon className="w-6 h-6 text-google-blue mt-1 flex-shrink-0" />
                                            <div>
                                                 <a href={auction.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-800 dark:text-gray-200 hover:underline">{auction.name}</a>
                                                 <p className="text-sm text-gray-500 dark:text-gray-400">{auction.date}</p>
                                                  <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">{auction.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );
             case 'community':
                return (
                     <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold font-sans text-gray-800 dark:text-gray-100">Artisan Community Forum</h2>
                             <button onClick={() => setIsCreatePostOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-google-blue text-white font-bold rounded-lg hover:bg-blue-600 transition-colors transform hover:scale-105">
                                Create Post
                            </button>
                        </div>
                        <div className="space-y-6">
                            {communityPosts.map(post => (
                                <div key={post.id} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md">
                                    <div className="flex items-start gap-4">
                                        <img src={post.author.avatarUrl} alt={post.author.name} className="w-12 h-12 rounded-full object-cover" />
                                        <div className="flex-1">
                                            <div className="flex items-baseline gap-2">
                                                <p className="font-bold dark:text-white">{post.author.name}</p>
                                                <p className="text-xs text-gray-400">&middot; {post.author.craft}</p>
                                                <p className="text-xs text-gray-400 ml-auto">{new Date(post.timestamp).toLocaleString()}</p>
                                            </div>
                                            <p className="mt-2 text-gray-700 dark:text-gray-300 whitespace-pre-line">{post.content}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center gap-4 pl-16">
                                        <button className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-google-blue dark:hover:text-google-blue transition-colors">
                                            <ThumbUpIcon className="w-5 h-5" /> {post.likes}
                                        </button>
                                        <button className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-google-green dark:hover:text-google-green transition-colors">
                                            <ChatBubbleOvalLeftIcon className="w-5 h-5" /> {post.comments}
                                        </button>
                                        {post.authorId !== currentArtisan.id && (
                                            <div className="ml-auto flex items-center gap-2">
                                                 <button onClick={() => handleStartOrGoToConversation(post.authorId)} className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-200 dark:hover:bg-blue-900">Message</button>
                                                 <button onClick={() => alert("Collaboration request sent!")} className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-200 dark:hover:bg-green-900">Collaborate</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Modal isOpen={isCreatePostOpen} onClose={() => setIsCreatePostOpen(false)} title="Create a New Post">
                            <div className="space-y-4">
                                <textarea 
                                    value={newPostContent}
                                    onChange={(e) => setNewPostContent(e.target.value)}
                                    placeholder="Share an update, ask a question, or start a discussion..."
                                    className="w-full h-32 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-google-blue outline-none"
                                />
                                <button onClick={handleCreatePost} className="w-full py-2 px-4 bg-google-blue text-white rounded-lg font-semibold hover:bg-blue-700">Post</button>
                            </div>
                        </Modal>
                    </div>
                );
            case 'analytics':
                return (
                     <div>
                        <h2 className="text-3xl font-bold font-sans text-gray-800 dark:text-gray-100 mb-6">Store Analytics</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                            <KpiCard title="Total Revenue" value={`$${analyticsSummary.totalRevenue.toFixed(2)}`} icon={<CurrencyDollarIcon className="w-6 h-6 text-white"/>} color="bg-google-green" />
                            <KpiCard title="Total Orders" value={analyticsSummary.totalOrders.toString()} icon={<ShoppingCartIcon className="w-6 h-6 text-white" strokeWidth={2} />} color="bg-google-blue" />
                            <KpiCard title="Avg. Order Value" value={`$${analyticsSummary.avgOrderValue.toFixed(2)}`} icon={<SparklesIcon className="w-6 h-6 text-white"/>} color="bg-google-yellow" />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                            <div className="lg:col-span-3 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg dark:shadow-none">
                                <h3 className="text-lg font-bold font-sans mb-4 dark:text-white">Monthly Sales Breakdown</h3>
                                <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs mb-4">
                                    {Object.entries(monthlySalesBreakdown.productColors).map(([name, color]) => (
                                        <div key={name} className="flex items-center">
                                            <span className="w-3 h-3 rounded-full mr-1.5" style={{ backgroundColor: color }}></span>
                                            <span>{name}</span>
                                        </div>
                                    ))}
                                </div>
                                <StackedBarChart data={monthlySalesBreakdown.data} productColors={monthlySalesBreakdown.productColors} />
                            </div>
                             <div className="lg:col-span-2 grid grid-rows-2 gap-6">
                                <PieChart data={analyticsSummary.orderStatusData} title="Order Status"/>
                                <PieChart data={analyticsData.trafficSources} title="Traffic Sources"/>
                            </div>
                        </div>
                    </div>
                );
            case 'messages':
                return (
                    <div>
                      <h2 className="text-3xl font-bold font-sans text-gray-800 dark:text-gray-100 mb-6">Messages</h2>
                      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-none h-[75vh] flex">
                        <div className={`w-full md:w-1/3 border-r border-gray-200 dark:border-gray-700 overflow-y-auto ${selectedConversation ? 'hidden md:block' : 'block'}`}>
                            {conversations.length > 0 ? conversations.map(convo => {
                                const otherParticipantId = convo.participantIds.find(id => id !== artisan.id)!;
                                const otherParticipant = convo.participants[otherParticipantId];
                                const isUnread = convo.unreadBy.includes(artisan.id);

                                return (
                                <button key={convo.id} onClick={() => setSelectedConversation(convo)} className={`w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-700 ${selectedConversation?.id === convo.id ? 'bg-blue-50 dark:bg-blue-900/30' : ''}`}>
                                    <div className="flex items-center gap-3">
                                        <img src={otherParticipant.avatarUrl} alt={otherParticipant.name} className="w-12 h-12 rounded-full" />
                                        <div className="flex-grow overflow-hidden">
                                            <div className="flex justify-between items-center">
                                                <p className={`font-bold text-gray-800 dark:text-gray-100 truncate ${isUnread ? 'text-google-blue' : ''}`}>{otherParticipant.name}</p>
                                                <p className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0">{convo.timestamp}</p>
                                            </div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{convo.lastMessagePreview}</p>
                                        </div>
                                         {isUnread && <div className="w-3 h-3 bg-google-blue rounded-full ml-2 flex-shrink-0"></div>}
                                    </div>
                                </button>
                            )}) : (
                                <p className="p-4 text-center text-gray-500">No messages yet.</p>
                            )}
                        </div>
                        <div className={`w-full md:w-2/3 flex flex-col ${selectedConversation ? 'flex' : 'hidden md:flex'}`}>
                          {selectedConversation ? (
                            <>
                                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
                                   <button className="md:hidden dark:text-white" onClick={() => setSelectedConversation(null)}><ArrowLeftIcon className="w-6 h-6" /></button>
                                   <img src={selectedConversation.participants[selectedConversation.participantIds.find(id => id !== artisan.id)!].avatarUrl} alt="avatar" className="w-10 h-10 rounded-full" />
                                   <h3 className="font-bold dark:text-white">{selectedConversation.participants[selectedConversation.participantIds.find(id => id !== artisan.id)!].name}</h3>
                                </div>
                                <div className="flex-grow p-4 overflow-y-auto bg-gray-50 dark:bg-gray-800/50 space-y-4">
                                  {selectedConversation.messages.map(msg => (
                                      <div key={msg.id} className={`flex items-end gap-2 ${msg.senderId === artisan.id ? 'justify-end' : 'justify-start'}`}>
                                          {msg.senderId !== artisan.id && <img src={selectedConversation.participants[msg.senderId]?.avatarUrl} className="w-6 h-6 rounded-full" />}
                                          <div className={`px-4 py-2 rounded-2xl max-w-xs lg:max-w-md ${msg.senderId === artisan.id ? 'bg-google-blue text-white rounded-br-none' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100 rounded-bl-none'}`}>
                                              {msg.text}
                                          </div>
                                      </div>
                                  ))}
                                </div>
                                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                                  <input type="text" placeholder="Type a message..." className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-google-blue dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400" value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyDown={handleSendMessage}/>
                                </div>
                            </>
                          ) : (
                            <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">Select a conversation to start chatting.</div>
                          )}
                        </div>
                      </div>
                    </div>
                );
            case 'products':
                 return (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold font-sans text-gray-800 dark:text-gray-100">My Products</h2>
                             <button onClick={() => setIsUploaderOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-google-blue text-white font-bold rounded-lg hover:bg-blue-600 transition-colors transform hover:scale-105">
                                <UploadIcon className="w-5 h-5" /> Add New Product
                            </button>
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <div key={product.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md flex flex-col">
                                    <img className="w-full h-48 object-cover" src={product.imageUrl} alt={product.name} />
                                    <div className="p-4 flex flex-col flex-grow">
                                        <h3 className="text-lg font-bold font-sans text-gray-800 dark:text-gray-100">{product.name}</h3>
                                        <p className="text-sm font-body text-gray-600 dark:text-gray-400 mt-2 flex-grow">{product.description}</p>
                                        <div className="mt-4 flex justify-between items-center">
                                             <p className="text-xl font-bold font-sans text-google-green">${product.price?.toFixed(2)}</p>
                                             <div className="flex gap-2">
                                                 <button onClick={() => setViewReviewsFor(product)} className="px-3 py-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600">Reviews</button>
                                                <button onClick={() => { setManageProduct(product); setEditingProduct(product); setAiSummary(''); }} className="px-3 py-1.5 text-xs font-semibold text-white bg-google-blue rounded-md hover:bg-blue-700">Manage</button>
                                             </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Modal isOpen={isUploaderOpen} onClose={() => setIsUploaderOpen(false)} title="Add a New Product with AI">
                           <AIProductUploader artisan={artisan} onClose={() => setIsUploaderOpen(false)} onProductAdd={handleAddProduct} />
                        </Modal>
                        <Modal isOpen={!!manageProduct} onClose={() => setManageProduct(null)} title={`Manage: ${manageProduct?.name}`}>
                           {editingProduct && (
                               <div className="space-y-4">
                                   <div>
                                       <label className="text-sm font-medium">Name</label>
                                       <input type="text" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} className="w-full p-2 mt-1 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                                   </div>
                                    <div>
                                       <label className="text-sm font-medium">Description</label>
                                       <textarea value={editingProduct.description} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} className="w-full p-2 mt-1 border rounded-md dark:bg-gray-700 dark:border-gray-600" rows={3}/>
                                   </div>
                                    <div>
                                       <label className="text-sm font-medium">Price (USD)</label>
                                       <input type="number" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: parseFloat(e.target.value) || 0})} className="w-full p-2 mt-1 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                                   </div>
                                   <button onClick={handleUpdateProduct} className="w-full py-2 bg-google-green text-white rounded-md font-semibold">Save Changes</button>
                                   <hr className="dark:border-gray-600" />
                                   <div>
                                        <h4 className="font-bold text-lg dark:text-white">Product Performance</h4>
                                        <div className="text-sm mt-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg space-y-1">
                                            <p><strong>Views:</strong> {editingProduct.stats?.views}</p>
                                            <p><strong>Sales:</strong> {editingProduct.stats?.sales}</p>
                                            <p><strong>Conversion:</strong> {editingProduct.stats?.conversionRate}%</p>
                                        </div>
                                        <button onClick={() => handleGenerateAISummary(editingProduct)} disabled={isGeneratingSummary} className="w-full mt-2 py-2 flex items-center justify-center gap-2 bg-purple-600 text-white rounded-md font-semibold disabled:opacity-50">
                                            <SparklesIcon className="w-5 h-5"/> {isGeneratingSummary ? 'Analyzing...' : 'Get AI Summary'}
                                        </button>
                                        {isGeneratingSummary && <Spinner />}
                                        {aiSummary && <p className="mt-2 p-3 text-sm bg-purple-50 dark:bg-purple-900/30 rounded-md border border-purple-200 dark:border-purple-800">{aiSummary}</p>}
                                   </div>
                               </div>
                           )}
                        </Modal>
                        <Modal isOpen={!!viewReviewsFor} onClose={() => setViewReviewsFor(null)} title={`Reviews for ${viewReviewsFor?.name}`}>
                           <div className="space-y-4">
                                {viewReviewsFor?.reviews && viewReviewsFor.reviews.length > 0 ? (
                                    viewReviewsFor.reviews.map(review => (
                                        <div key={review.id} className="border-b dark:border-gray-700 pb-3">
                                            <div className="flex items-center justify-between">
                                                <p className="font-semibold">{review.customerName}</p>
                                                <div className="flex items-center">{[...Array(5)].map((_, i) => <StarIcon key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />)}</div>
                                            </div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{review.date}</p>
                                            <p className="mt-1">{review.comment}</p>
                                        </div>
                                    ))
                                ) : <p>No reviews yet for this product.</p>}
                           </div>
                        </Modal>
                    </div>
                );
            case 'overview':
            default:
                return (
                    <div>
                        <div className="w-full h-48 md:h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg">
                           <img src={artisan.bannerImageUrl} alt={`${artisan.name}'s banner`} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col md:flex-row items-center md:items-end -mt-12 md:-mt-16 px-4 md:px-8 z-10 relative">
                            <img src={artisan.profileImageUrl} alt={artisan.name} className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-gray-50 dark:border-gray-900 shadow-xl" />
                            <div className="md:ml-6 mt-2 md:mb-2 text-center md:text-left">
                                <h1 className="text-3xl md:text-4xl font-bold font-sans text-gray-800 dark:text-gray-100">{artisan.name}</h1>
                                <p className="text-gray-600 dark:text-gray-400">{artisan.craft} &middot; {artisan.location}</p>
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-1 space-y-6">
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                                    <h2 className="text-xl font-bold font-sans mb-2 dark:text-white">My Story</h2>
                                    <p className="text-gray-600 dark:text-gray-300">{artisan.bio}</p>
                                </div>
                                 <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                                    <h2 className="text-xl font-bold font-sans mb-4 dark:text-white">Customer Reviews</h2>
                                    {allReviews.length > 0 ? (
                                        <div className="relative">
                                            <div className="overflow-hidden h-40">
                                                {allReviews.map((review, index) => (
                                                     <div key={review.id} className={`absolute w-full transition-opacity duration-700 ease-in-out ${index === currentReview ? 'opacity-100' : 'opacity-0'}`}>
                                                        <div className="flex items-center">{[...Array(5)].map((_, i) => <StarIcon key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />)}</div>
                                                        <p className="mt-2 text-gray-700 dark:text-gray-300 italic h-20 overflow-hidden">"{review.comment}"</p>
                                                        <p className="mt-2 text-sm font-semibold text-right dark:text-white">- {review.customerName}</p>
                                                     </div>
                                                ))}
                                            </div>
                                            <button onClick={() => setCurrentReview(c => (c - 1 + allReviews.length) % allReviews.length)} className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/50 dark:bg-gray-700/50 rounded-full p-1 hover:bg-white dark:hover:bg-gray-600"><ArrowLeftIcon className="w-5 h-5" /></button>
                                            <button onClick={() => setCurrentReview(c => (c + 1) % allReviews.length)} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/50 dark:bg-gray-700/50 rounded-full p-1 hover:bg-white dark:hover:bg-gray-600"><ArrowRightIcon className="w-5 h-5" /></button>
                                        </div>
                                    ) : <p className="text-gray-500">No reviews yet.</p>}
                                </div>
                            </div>
                            <div className="lg:col-span-2">
                                 <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                                    <h2 className="text-xl font-bold font-sans mb-4 dark:text-white">My Products</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {products.slice(0, 4).map(p => <ProductCard key={p.id} product={p}/>)}
                                    </div>
                                    <button onClick={() => setActiveTab('products')} className="mt-4 w-full text-center py-2 font-semibold text-google-blue hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg">View All Products</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
             <style>{`:root { --color-google-blue: #4285F4; --color-google-green: #0F9D58; --color-google-red: #DB4437; --color-google-yellow: #F4B400; }`}</style>
            <div className="md:flex">
                <aside className="hidden md:block w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 space-y-2 flex-shrink-0 fixed h-full">
                    <NavItem tab="overview" icon={<HomeIcon />} label="Dashboard" />
                    <NavItem tab="products" icon={<Squares2X2Icon />} label="Products" />
                    <NavItem tab="messages" icon={<ChatBubbleLeftRightIcon />} label="Messages" />
                    <NavItem tab="analytics" icon={<ChartBarIcon />} label="Analytics" />
                    <NavItem tab="auctions" icon={<ScaleIcon />} label="Auctions" />
                    <NavItem tab="community" icon={<UserGroupIcon />} label="Community" />
                </aside>

                <main className="flex-grow p-4 sm:p-6 lg:p-8 md:ml-64 pb-20 md:pb-8">
                    {renderContent()}
                </main>
            </div>
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-around p-1 z-50">
                 <button onClick={() => setActiveTab('overview')} className={`flex flex-col items-center p-1 rounded-lg w-1/5 ${activeTab === 'overview' ? 'text-google-blue' : 'text-gray-500 dark:text-gray-400'}`}>
                    <HomeIcon className="w-6 h-6" /><span className="text-xs">Dashboard</span>
                </button>
                <button onClick={() => setActiveTab('products')} className={`flex flex-col items-center p-1 rounded-lg w-1/5 ${activeTab === 'products' ? 'text-google-blue' : 'text-gray-500 dark:text-gray-400'}`}>
                    <Squares2X2Icon className="w-6 h-6" /><span className="text-xs">Products</span>
                </button>
                 <button onClick={() => setActiveTab('messages')} className={`relative flex flex-col items-center p-1 rounded-lg w-1/5 ${activeTab === 'messages' ? 'text-google-blue' : 'text-gray-500 dark:text-gray-400'}`}>
                    {unreadMessageCount > 0 && <span className="absolute top-0 right-2 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center">{unreadMessageCount}</span>}
                    <ChatBubbleLeftRightIcon className="w-6 h-6" /><span className="text-xs">Messages</span>
                </button>
                <button onClick={() => setActiveTab('analytics')} className={`flex flex-col items-center p-1 rounded-lg w-1/5 ${activeTab === 'analytics' ? 'text-google-blue' : 'text-gray-500 dark:text-gray-400'}`}>
                    <ChartBarIcon className="w-6 h-6" /><span className="text-xs">Analytics</span>
                </button>
                 <button onClick={() => setActiveTab('community')} className={`flex flex-col items-center p-1 rounded-lg w-1/5 ${activeTab === 'community' ? 'text-google-blue' : 'text-gray-500 dark:text-gray-400'}`}>
                    <UserGroupIcon className="w-6 h-6" /><span className="text-xs">Community</span>
                </button>
            </nav>
        </div>
    )
}


const PublicArtisanProfile: React.FC<{ artisan: Artisan; onBack: () => void; loggedInArtisan?: Artisan | null; onStartConversation?: (targetArtisanId: string) => void; }> = ({ artisan, onBack, loggedInArtisan, onStartConversation }) => {
     return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
            <style>{`.animate-fade-in { animation: fadeIn 0.5s ease-in-out forwards; } @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }`}</style>
            <button onClick={onBack} className="mb-6 text-google-blue font-semibold hover:underline">
                &larr; Back to Explore
            </button>
            <div className="flex flex-col sm:flex-row items-center gap-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg dark:shadow-none transition-shadow duration-300 hover:shadow-xl">
                <img
                    src={artisan.profileImageUrl}
                    alt={artisan.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-md"
                />
                <div className="text-center sm:text-left">
                    <h1 className="text-4xl font-bold font-sans text-gray-800 dark:text-gray-100">{artisan.name}</h1>
                    <p className="text-lg text-google-blue font-semibold">{artisan.craft}</p>
                    <p className="text-md text-gray-500 dark:text-gray-400">{artisan.location}</p>
                </div>
                 <div className="sm:ml-auto flex-shrink-0 flex flex-col sm:flex-row gap-2">
                    <button onClick={() => alert(`You are now following ${artisan.name}!`)} className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        <UserPlusIcon className="w-5 h-5" /> Follow
                    </button>
                    {loggedInArtisan?.id !== artisan.id && (
                        <button 
                            onClick={() => onStartConversation && onStartConversation(artisan.id)} 
                            className="px-6 py-2 bg-google-green text-white font-bold rounded-lg hover:bg-green-600 transition-colors"
                        >
                            Message
                        </button>
                    )}
                 </div>
            </div>
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg dark:shadow-none">
                        <h2 className="text-2xl font-bold font-sans text-gray-800 dark:text-gray-100 mb-3">My Story</h2>
                        <p className="font-body text-gray-600 dark:text-gray-300 leading-relaxed">{artisan.bio}</p>
                    </div>
                </div>
                <div className="lg:col-span-2">
                    <h2 className="text-3xl font-bold font-sans text-gray-800 dark:text-gray-100 mb-4">My Creations</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {artisan.products.map((product) => (
                            <ProductCard key={product.id} product={{...product, artisanId: artisan.id, artisanName: artisan.name}} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


const ArtisanProfile: React.FC<ArtisanProfileProps> = ({ artisan, onBack, isDashboard, loggedInArtisan, onStartConversation, initialMessageTarget, onInitialMessageTargetClear }) => {
    if (isDashboard) {
        return <ArtisanDashboard artisan={artisan} initialMessageTarget={initialMessageTarget} onInitialMessageTargetClear={onInitialMessageTargetClear} />;
    }
    return <PublicArtisanProfile artisan={artisan} onBack={onBack!} loggedInArtisan={loggedInArtisan} onStartConversation={onStartConversation} />;
};

export default ArtisanProfile;