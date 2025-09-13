import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from '@inertiajs/react';

const MenuComponent = ({ currentRoute }) => {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedItems, setExpandedItems] = useState({});

    // Fetch menu data from API
    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await axios.get('/api/menus');
                setMenus(response.data.menus);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching menus:', error);
                setLoading(false);
            }
        };

        fetchMenus();
    }, []);

    // Toggle menu item expansion
    const toggleExpand = (id) => {
        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // Render menu items recursively
    const renderMenuItems = (items) => {
        return items.map((item) => (
            <li key={item.id} className="relative group">
                <div className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 ${currentRoute === item.url ? 'bg-gray-100 font-medium' : ''}`}>
                    {item.icon && (
                        <img
                            src={item.icon}
                            alt={`Icon for ${item.name} menu item`}
                            className="w-5 h-5 mr-3"
                            onError={(e) => {
                                e.target.src = 'https://placehold.co/20x20';
                                e.target.alt = `Placeholder icon for ${item.name}`;
                            }}
                        />
                    )}

                    <Link href={item.url || '#'} className="flex-1" onClick={() => {
                        if (item.children && item.children.length > 0) {
                            toggleExpand(item.id);
                        }
                    }}>
                        {item.name}
                    </Link>

                    {item.children && item.children.length > 0 && (
                        <button
                            onClick={() => toggleExpand(item.id)}
                            className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            <svg
                                className={`w-5 h-5 transform transition-transform ${expandedItems[item.id] ? 'rotate-90' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Show children when expanded */}
                {item.children && item.children.length > 0 && expandedItems[item.id] && (
                    <ul className="ml-6 pl-2 border-l-2 border-gray-200">
                        {renderMenuItems(item.children)}
                    </ul>
                )}
            </li>
        ));
    };

    if (loading) {
        return (
            <div className="p-4">
                <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <nav className="space-y-1">
            <ul>{renderMenuItems(menus)}</ul>
        </nav>
    );
};

export default MenuComponent;
