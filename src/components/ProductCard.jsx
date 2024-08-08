/* eslint-disable react/prop-types */
import { useState } from 'react';
import placeHolderImage from '../assets/Logo.png';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import ProductFormModal from './ProductFormModal'; // Importar el nuevo componente

const ProductCard = ({ product, handleDelete, handleUpdate }) => {
    const [showEditModal, setShowEditModal] = useState(false);

    const handleEditClick = () => {
        setShowEditModal(true);
    };

    const handleSaveEdit = async (updatedProduct) => {
        try {
            handleUpdate(updatedProduct);
        } catch (error) {
            console.error('Error updating product:', error);
        }
        setShowEditModal(false);
    };

    const handleCancelEdit = () => {
        setShowEditModal(false);
    };

    return (
        <div className="w-auto border flex lg:flex-row flex-col items-center p-4 rounded-lg shadow-lg md:w-3/4 m-5 bg-white">
            <img
                src={product.images && product.images.length > 0 ? product.images[0] : placeHolderImage}
                alt={product.title}
                className="h-60 w-60 object-cover rounded"
            />
            <div className='w-full h-full'>
                <div className='flex items-center justify-between pb-3'>
                    <h3 className="text-2xl font-bold">{product.title}</h3>
                    <p className="text-cyan-600 text-2xl font-bold mr-5">${product.price}</p>
                </div>
                <p className="text-gray-500 mt-1">{product.description}</p>
                <p className="text-gray-600 mt-1"><b>Stock:</b> {product.stock}</p>
                <p className="text-gray-600 mt-1"><b>Sizes:</b> {product.sizes.join(', ')}</p>
                <p className="text-gray-600 mt-1"><b>Gender:</b> {product.gender}</p>
                <div className="mt-3">
                    {product.tags.map(tag => (
                        <span
                            key={tag}
                            className="inline-block bg-cyan-100 text-gray-800 text-xs px-2 py-1 rounded mr-2"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <div className='flex flex-row lg:flex-col self-end order-first lg:order-last lg:self-start'>
                <button className='rounded-lg p-1 text-slate-600 hover:text-green-700 hover:bg-green-100' onClick={handleEditClick}>
                    <IconEdit stroke={2} className='h-8 w-8' />
                </button>
                <button
                    onClick={() => handleDelete(product.id)}
                    className='rounded-lg p-1 text-slate-600 hover:text-red-600 hover:bg-red-100'>
                    <IconTrash stroke={2} className='h-8 w-8' />
                </button>
            </div>

            {/* Modal de Edición/Creación */}
            {showEditModal && (
                <ProductFormModal
                    product={product}
                    onSave={handleSaveEdit}
                    onCancel={handleCancelEdit}
                    isNew={false}
                />
            )}
        </div>
    );
};

export default ProductCard;
