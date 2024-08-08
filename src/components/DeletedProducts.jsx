/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import appFirebase from '../Credenciales';
import ChatButton from './ChatButton';
import ProductCard from './ProductCard';
import useUser from '../hooks/useUser';
import Banner from './Banner';
import SidebarAdmin from './SidebarAdmin';
import DeletedProductCard from './DeletedProductCard';
import { IconMenu2 } from '@tabler/icons-react';
const BASE_URL = import.meta.env.VITE_BACK_URL


const auth = getAuth(appFirebase);

const DeletedProducts = ({ correoUsuario }) => {
    const { nombre, loading } = useUser();
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [loadingTags, setLoadingTags] = useState(true);
    const [tags, setTags] = useState([]);
    const [filterTag, setFilterTag] = useState('');
    const [filterGender, setFilterGender] = useState('');
    const [filterSize, setFilterSize] = useState('');
    const [showSidebar, setShowSidebar] = useState(false);
    const [token, setToken] = useState('');
    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token || "")
    }, [token])

    useEffect(() => {
        // Fetch products from backend
        const fetchProducts = async () => {
            setLoadingProducts(true);
            try {
                const response = await fetch(BASE_URL+'/clothes/deleted', {
                    method: 'GET'
                });
                const data = await response.json();
                setProducts(data || []);
                setLoadingProducts(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoadingProducts(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchTags = async () => {
            setLoadingTags(true);
            try {
                const response = await fetch(BASE_URL+'/clothes/tags', {
                    method: 'GET'
                });
                const data = await response.json();
                setTags(data.tags || []);
                setLoadingTags(false);
            } catch (error) {
                console.error('Error fetching tags:', error);
                setLoadingTags(false);
            }
        };
        fetchTags();
    }, []);

    const getFilteredProducts = () => {
        return products.filter(product => {
            return (
                (filterTag ? product.tags.includes(filterTag) : true) &&
                (filterGender ? product.gender === filterGender : true) &&
                (filterSize ? product.sizes.includes(filterSize) : true)
            );
        });
    };

    const handleTagClick = (tag) => {
        setFilterTag(filterTag === tag ? '' : tag);
    };

    const handleGenderClick = (gender) => {
        setFilterGender(filterGender === gender ? '' : gender);
    };

    const handleSizeClick = (size) => {
        setFilterSize(filterSize === size ? '' : size);
    };

    const handleSignOut = () => {
        signOut(auth);
    };

    const handleRetrieve = async (id) => {
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        try {
            await fetch(BASE_URL+'/products/' + id + '/restore', {
                method: 'PATCH',
                headers
            });
            setProducts(prevProds => prevProds.filter(prod => prod.id !== id))
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    const handleShowSidebar = () => {
        setShowSidebar(showSidebar => !showSidebar);
    };

    return (
        <div className='flex flex-col items-center min-h-screen w-full'>
            <Banner userName={loading ? 'Cargando...' : nombre} />

            <div id="main" className='flex flex-row h-full w-full'>
                <div className={` ${showSidebar ? 'bg-cyan-700 w-3/4 sm:w-1/2 lg:w-1/4 rounded-lg fixed ml-5' : ''}`}>
                    <button
                        onClick={handleShowSidebar}
                        className='text-white p-2 rounded-lg bg-cyan-950  ml-5 mt-5 fixed left-0 top-0'>
                        <IconMenu2 className='h-8 w-8' />
                    </button>
                    {showSidebar && (
                        <SidebarAdmin />
                    )}
                </div>
                <div className='w-full flex flex-col items-center min-h-screen'>
                    <h2 className='text-white text-2xl md:text-4xl my-4'>Elementos Eliminados</h2>
                    <div className="flex flex-row flex-wrap items-center w-full text-white">
                        {loadingTags ? (
                            <p>Cargando tags...</p>
                        ) : (
                            <div className='flex flex-col items-center w-full'>
                                <div className='grid grid-cols-3 md:grid-cols-5 items-center ppercase'>
                                    {tags.map(tag => (
                                        <button
                                            key={tag}
                                            onClick={() => handleTagClick(tag)}
                                            className={`text-xs md:text-base p-2 rounded-lg m-2 border-2 border-white ${filterTag === tag ? 'bg-cyan-700' : ''}`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                                <div className='grid grid-cols-2 items-center uppercase'>
                                    <button
                                        onClick={() => handleGenderClick('men')}
                                        className={`text-xs md:text-base p-2 rounded-lg m-2 border-2 border-white ${filterGender === "men" ? 'bg-blue-700' : ''}`}
                                    >
                                        Men
                                    </button>
                                    <button
                                        onClick={() => handleGenderClick('women')}
                                        className={`text-xs md:text-base p-2 rounded-lg m-2 border-2 border-white ${filterGender === "women" ? 'bg-rose-700' : ''}`}
                                    >
                                        Women
                                    </button>
                                </div>
                                <div className='grid grid-cols-3 md:grid-cols-6 items-center uppercase'>
                                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                        <button
                                            key={size}
                                            onClick={() => handleSizeClick(size)}
                                            className={`text-xs md:text-base bg-green-700 p-2 rounded-lg m-2 ${filterSize === size ? 'bg-yellow-500' : ''}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    {loadingProducts ? (
                        <p>Cargando productos...</p>
                    ) : (
                        <div className="flex flex-col items-center w-full h-full">
                            {
                                getFilteredProducts().length === 0
                                    ?
                                    <div className='flex flex-col items-center text-white text-xl md:text-2xl mt-4'>No existen elementos</div>
                                    :

                                    <div className='flex flex-col items-center'>
                                        {getFilteredProducts().map(product => (
                                            <DeletedProductCard key={product.id} product={product} handleRetrieve={handleRetrieve} />
                                        ))}
                                    </div>

                            }

                        </div>
                    )}
                </div>
            </div>

            <ChatButton userName={nombre} />
        </div>
    );
};

export default DeletedProducts;
