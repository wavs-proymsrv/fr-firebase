/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { IconMenu2, IconPlus } from '@tabler/icons-react';
import appFirebase from '../Credenciales';
import ChatButton from './ChatButton';
import ProductCard from './ProductCard';
import useUser from '../hooks/useUser';
import Banner from './Banner';
import SidebarAdmin from './SidebarAdmin';
import NewProductComponent from './NewProductComponent';
import TechProductsComponent from './TechProductsComponent';

const BASE_URL = import.meta.env.VITE_BACK_URL
const auth = getAuth(appFirebase);

const Home = ({ correoUsuario }) => {
    const { nombre, loading } = useUser();
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [loadingTech, setLoadingTech] = useState(true);

    const [loadingTags, setLoadingTags] = useState(true);
    const [tags, setTags] = useState([]);
    const [techProducts, settechProducts] = useState([])
    const [filterTag, setFilterTag] = useState('');
    const [filterGender, setFilterGender] = useState('');
    const [filterSize, setFilterSize] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
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
                const response = await fetch(BASE_URL + '/clothes', {
                    method: 'GET'
                });
                const data = await response.json();
                setProducts(Array.isArray(data) ? data : []);
                setLoadingProducts(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts([]);
                setLoadingProducts(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchTags = async () => {
            setLoadingTags(true);
            try {
                const response = await fetch(BASE_URL + '/clothes/tags', {
                    method: 'GET'
                });
                const data = await response.json();
                setTags(data.tags || []);
                setLoadingTags(false);
            } catch (error) {
                console.error('Error fetching tags:', error);
                setTags([]);
                setLoadingTags(false);
            }
        };
        fetchTags();
    }, []);

    useEffect(() => {
        const fetchTechProducts = async () => {
            setLoadingTech(true);
            try {
                const response = await fetch(BASE_URL + '/techproducts?limit=100', {
                    method: 'GET'
                });
                const data = await response.json();
                settechProducts(data.data || []);
                setLoadingTech(false);
            } catch (error) {
                console.error('Error fetching Tech Products:', error);
                settechProducts([]);
                setLoadingTech(false);
            }
        };
        fetchTechProducts();
    }, [])
    
    const getFilteredProducts = () => {
        if (!Array.isArray(products)) return [];
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


    const handleDelete = async (id) => {
        try {
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };
            await fetch(BASE_URL + '/clothes/' + id, {
                method: 'DELETE',
                headers
            });
            setProducts(prevProds => prevProds.filter(prod => prod.id !== id))
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }


    const handleCreateClick = () => {
        setShowCreateModal(true);
    };

    const handleSaveCreate = async (newProduct) => {
        try {
            const { imageUrl, ...productDetail } = newProduct;

            productDetail.images = imageUrl === undefined ? [...productDetail.images] : [imageUrl]
            productDetail.price = Number(productDetail.price)
            productDetail.stock = Number(productDetail.stock)
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };
            const response = await fetch(BASE_URL + `/products`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(productDetail),
            });
            const productCreated = await response.json();
            console.log('Product created:', productCreated);
            setProducts(prevProducts => [...prevProducts, productCreated]);
        } catch (error) {
            console.error('Error creating product:', error);
        }
        setShowCreateModal(false);
    };

    const handleCancelCreate = () => {
        setShowCreateModal(false);
    };

    const handleUpdate = async (editedProduct) => {

        try {
            const { id, imageUrl, ...updatedProduct } = editedProduct;
            console.log(imageUrl)

            updatedProduct.images = imageUrl === undefined ? [...updatedProduct.images] : [imageUrl]
            updatedProduct.price = Number(updatedProduct.price)
            updatedProduct.stock = Number(updatedProduct.stock)
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };
            const response = await fetch(BASE_URL + `/clothes/${id}`, {
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify(updatedProduct),
            });
            const updatedProductFromServer = await response.json();
            console.log('Product updated:', updatedProductFromServer);
            setProducts(prevProducts => prevProducts.map(prod =>
                prod.id === updatedProductFromServer.id ? updatedProductFromServer : prod
            ));
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

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
                        className='text-white p-2 rounded-lg bg-cyan-950 ml-5 mt-5 fixed left-0 top-0'>
                        <IconMenu2 className='h-8 w-8' />
                    </button>
                    {showSidebar && (
                        <SidebarAdmin />
                    )}
                </div>

                <div className='w-3/4 p-4 flex flex-col items-center justify-center'>
                    <h2 className='text-white text-2xl md:text-4xl my-4'>Catálogo Urban Clothing</h2>
                    <div className="flex flex-row flex-wrap items-center w-full text-white mb-4">
                        {loadingTags ? (
                            <p>Cargando tags...</p>
                        ) : (
                            <div className='flex flex-col items-center w-full'>
                                <div className='grid grid-cols-3 md:grid-cols-5 items-center uppercase'>
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
                                            className={`text-xs md:text-base p-2 rounded-lg m-2 border-2 border-white ${filterSize === size ? 'bg-green-700' : ''}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className='text-white'>
                        <button
                            onClick={handleCreateClick}
                            className='text-4xl border-2 border-white rounded-lg py-2 px-10 text-center'>
                            <IconPlus stroke={2} />
                        </button>
                    </div>
                    </div>

                    <div className='flex flex-wrap items-center w-full justify-center'>
                        {loadingProducts ? (
                            <p>Cargando productos...</p>
                        ) : (
                            getFilteredProducts().map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onDelete={() => handleDelete(product.id)}
                                    onUpdate={handleUpdate}
                                />
                            ))
                        )}
                    </div>

                    {showCreateModal && (
                        <NewProductComponent
                            onSave={handleSaveCreate}
                            onCancel={handleCancelCreate}
                        />
                    )}
                </div>

                {
                    loadingTech
                    ?  <p>Cargando productos de tecnologia...</p>
                    : <TechProductsComponent loadingTech={loadingTech} techProducts={techProducts}/>

                }
            </div>

            {/* <ChatButton /> */}
        </div>
    );
};

export default Home;
