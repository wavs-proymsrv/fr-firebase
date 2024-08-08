/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

const ProductFormModal = ({ product, onSave, onCancel, isNew }) => {
    const [editedProduct, setEditedProduct] = useState({ ...product, images: [] });

    useEffect(() => {
        setEditedProduct({ ...product, images: [] }); // Resetear el formulario cuando cambia el producto
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct(prevProduct => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSizeChange = (size) => {
        const updatedSizes = editedProduct.sizes.includes(size)
            ? editedProduct.sizes.filter(s => s !== size)
            : [...editedProduct.sizes, size];

        setEditedProduct(prevProduct => ({
            ...prevProduct,
            sizes: updatedSizes,
        }));
    };

    const handleImageChange = (e) => {
        const { value } = e.target;
        setEditedProduct(prevProduct => ({
            ...prevProduct,
            images: [value], // Agregar el URL como un elemento en el arreglo images
        }));
    };

    const handleSave = () => {
        onSave(editedProduct);
    };

    const handleCancel = () => {
        onCancel();
    };
    

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg w-1/3">
                <h2 className="text-2xl font-bold mb-4 text-cyan-800">{isNew ? 'Crear Producto' : 'Editar Producto'}</h2>
                <form>
                    <div className='flex gap-3'>
                        <div className="mb-4 w-1/2">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
                            <input type="text" id="title" name="title" value={editedProduct.title} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div className="mb-4 w-1/2">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio</label>
                            <input type="number" id="price" min="0" name="price" value={editedProduct.price} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
                        <textarea id="description" name="description" value={editedProduct.description} onChange={handleChange} className="mt-1 block w-full h-28 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div className='flex gap-3'>
                        <div className="mb-4 w-1/3">
                            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
                            <input type="number" id="stock" min="0" name="stock" value={editedProduct.stock} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div className="mb-4 w-1/3">
                            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">URL de la Imagen</label>
                            <input type="text" id="imageUrl" name="imageUrl" value={editedProduct.imageUrl} onChange={handleImageChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div className="mb-4 w-1/3">
                                <label className="block text-sm font-medium text-gray-700">Sizes</label>
                                <div className='flex gap-3'>
                                    <div className='w-1/2'>
                                        <div className="flex items-center">
                                            <input type="checkbox" id="sizeXS" name="sizeXS" checked={isNew ? false : editedProduct.sizes.includes('XS')} onChange={() => handleSizeChange('XS')} className="mr-1 rounded text-cyan-700" />
                                            <label htmlFor="sizeXS" className="text-sm text-gray-700">XS</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="checkbox" id="sizeS" name="sizeS" checked={isNew ? false : editedProduct.sizes.includes('S')} onChange={() => handleSizeChange('S')} className="mr-1 rounded text-cyan-700" />
                                            <label htmlFor="sizeS" className="text-sm text-gray-700">S</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="checkbox" id="sizeM" name="sizeM" checked={isNew ? false : editedProduct.sizes.includes('M')} onChange={() => handleSizeChange('M')} className="mr-1 rounded text-cyan-700" />
                                            <label htmlFor="sizeM" className="text-sm text-gray-700">M</label>
                                        </div>
                                    </div>
                                    <div className='w-1/2'>
                                        <div className="flex items-center">
                                            <input type="checkbox" id="sizeL" name="sizeL" checked={isNew ? false : editedProduct.sizes.includes('L')} onChange={() => handleSizeChange('L')} className="mr-1 rounded text-cyan-700" />
                                            <label htmlFor="sizeL" className="text-sm text-gray-700">L</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="checkbox" id="sizeXL" name="sizeXL" checked={isNew ? false : editedProduct.sizes.includes('XL')} onChange={() => handleSizeChange('XL')} className="mr-1 rounded text-cyan-700" />
                                            <label htmlFor="sizeXL" className="text-sm text-gray-700">XL</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="checkbox" id="sizeXXL" name="sizeXXL" checked={isNew ? false : editedProduct.sizes.includes('XXL')} onChange={() => handleSizeChange('XXL')} className="mr-1 rounded text-cyan-700" />
                                            <label htmlFor="sizeXXL" className="text-sm text-gray-700">XXL</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div className="mb-4 w-1/3">
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Género</label>
                            <select id="gender" name="gender" value={editedProduct.gender} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option value="kid">Niño</option>
                                <option value="men">Hombre</option>
                                <option value="women">Mujer</option>
                                <option value="unisex">Unisex</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button type="button" className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500 mr-2" onClick={handleCancel}>Cancelar</button>
                        <button type="button" className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-cyan-700 border border-transparent rounded-md hover:bg-cyan-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500" onClick={handleSave}>{isNew ? 'Crear Producto' : 'Guardar Cambios'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductFormModal;
