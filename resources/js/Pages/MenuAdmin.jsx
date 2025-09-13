import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm, usePage } from '@inertiajs/react';

const MenuAdmin = ({ auth }) => {
    const [menus, setMenus] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { data, setData, reset, post, patch, processing, errors } = useForm({
        name: '',
        description: '',
        parent_id: '',
        order: 0,
        icon: null,
        url: '',
        is_active: true,
        created_by: usePage().auth.user.id,
        updated_by: usePage().auth.user.id,
    });

    // Fetch menu data
    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await axios.get('/api/menus');
                setMenus(response.data.menus);
                setLoading(false);
            } catch (err) {
                setError('Failed to load menus');
                setLoading(false);
            }
        };

        fetchMenus();
    }, []);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('parent_id', data.parent_id);
        formData.append('order', data.order);
        formData.append('url', data.url);
        formData.append('is_active', data.is_active);
        formData.append('created_by', data.created_by);
        formData.append('updated_by', data.updated_by);
        if (data.icon) {
            formData.append('icon', data.icon);
        }

        if (selectedMenu) {
            // Update existing menu
            patch(`/api/menus/${selectedMenu.id}`, formData)
                {
                    reset();
                    setSelectedMenu(null);
                    refreshMenus();
                }
        } else {
            // Create new menu
            post('/api/menus', formData)
                {
                    reset();
                    refreshMenus();
                }
        }
    };

    // Refresh menu list
    const refreshMenus = async () => {
        const response = await axios.get('/api/menus');
        setMenus(response.data.menus);
    };

    // Set form data for editing
    const handleEdit = (menu) => {
        setSelectedMenu(menu);
        setData({
            name: menu.name,
            description: menu.description,
            parent_id: menu.parent_id,
            order: menu.order,
            url: menu.url,
            is_active: menu.is_active,
            icon: null, // Don't set existing icon to prevent overwrite
        });
    };

    // Handle menu deletion
    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this menu item?')) {
            await axios.delete(`/api/menus/${id}`);
            refreshMenus();
        }
    };

    // Render menu items with hierarchy
    const renderMenuTree = (items, level = 0) => {
        return items.map((item) => (
            <div key={item.id} className={`ml-${level * 4}`}>
                <div className="flex items-center justify-between p-2 hover:bg-gray-50">
                    <div>
                        {'- '.repeat(level)} {item.name} ({item.url})
                    </div>
                    <div className="space-x-2">
                        <button
                            onClick={() => handleEdit(item)}
                            className="px-2 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(item.id)}
                            className="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </div>
                {item.children && item.children.length > 0 && (
                    <div className="ml-4">
                        {renderMenuTree(item.children, level + 1)}
                    </div>
                )}
            </div>
        ));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Menu Management</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Menu Items</h3>
                    <div className="border rounded p-4 max-h-[400px] overflow-auto">
                        {menus.length > 0 ? (
                            renderMenuTree(menus)
                        ) : (
                            <p>No menu items found. Create one below.</p>
                        )}
                    </div>
                </div>
                
                <div>
                    <h3 className="text-lg font-semibold mb-2">
                        {selectedMenu ? 'Edit Menu Item' : 'Create New Menu Item'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={data.name === null ? '' : data.name} 
                                onChange={(e) => setData('name', e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>
                        
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={data.description === null ? '' : data.description} 
                                onChange={(e) => setData('description', e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                        </div>
                        
                        <div>
                            <label htmlFor="parent_id" className="block text-sm font-medium text-gray-700">
                                Parent Menu
                            </label>
                            <select
                                id="parent_id"
                                name="parent_id"
                                value={data.parent_id === null ? '' : data.parent_id} 
                                onChange={(e) => setData('parent_id', e.target.value ? parseInt(e.target.value) : null)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">No Parent</option>
                                {menus.map((menu) => (
                                    <option key={menu.id} value={menu.id}>
                                        {menu.name}
                                    </option>
                                ))}
                            </select>
                            {errors.parent_id && <p className="mt-1 text-sm text-red-600">{errors.parent_id}</p>}
                        </div>
                        
                        <div>
                            <label htmlFor="order" className="block text-sm font-medium text-gray-700">
                                Order
                            </label>
                            <input
                                id="order"
                                name="order"
                                type="number"
                                min="0"
                                value={data.order === null ? '' : data.order} 
                                onChange={(e) => setData('order', parseInt(e.target.value))}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {errors.order && <p className="mt-1 text-sm text-red-600">{errors.order}</p>}
                        </div>
                        
                        <div>
                            <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                                URL
                            </label>
                            <input
                                id="url"
                                name="url"
                                type="text"
                                value={data.url === null ? '' : data.url} 
                                onChange={(e) => setData('url', e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {errors.url && <p className="mt-1 text-sm text-red-600">{errors.url}</p>}
                        </div>
                        
                        <div>
                            <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
                                Icon (Optional)
                            </label>
                            <input
                                id="icon"
                                name="icon"
                                type="file"
                                onChange={(e) => setData('icon', e.target.files[0])}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                accept="image/*"
                            />
                            {errors.icon && <p className="mt-1 text-sm text-red-600">{errors.icon}</p>}
                        </div>
                        
                        <div className="flex items-center">
                            <input
                                id="is_active"
                                name="is_active"
                                type="checkbox"
                                checked={data.is_active === null ? '' : data.is_active} 
                                onChange={(e) => setData('is_active', e.target.checked)}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
                                Active
                            </label>
                        </div>
                        
                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {processing ? (selectedMenu ? 'Updating...' : 'Creating...') : (selectedMenu ? 'Update' : 'Create')}
                            </button>
                            {selectedMenu && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedMenu(null);
                                        reset();
                                    }}
                                    className="ml-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MenuAdmin;