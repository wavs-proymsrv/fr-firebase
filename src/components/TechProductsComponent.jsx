/* eslint-disable react/prop-types */
import { useState } from 'react';
const BASE_URL = import.meta.env.VITE_BACK_URL

const TechProductsComponent = ({ loadingTech, techProducts }) => {
  const [showCreateTechModal, setShowCreateTechModal] = useState(false);
  const [techProductToEdit, setTechProductToEdit] = useState(null);
  const [techProductsList, setTechProductsList] = useState(techProducts);

  
    const handleCreateTechClick = () => {
    setTechProductToEdit(null); // Reset for creating new product
    setShowCreateTechModal(true);
  };

  const handleEditTechClick = (techProduct) => {
    setTechProductToEdit(techProduct); // Set product to edit
    setShowCreateTechModal(true);
  };

  const handleSaveTech = async (techProduct) => {
    try {
      const headers = {
        'Content-Type': 'application/json'
      };

      if (techProductToEdit) {
        // Update existing tech product
        const {id, ...product} = techProduct
        const response = await fetch(`${BASE_URL}/techproducts/${id}`, {
          method: 'PATCH',
          headers: headers,
          body: JSON.stringify(product),
        });
        const updatedTechProduct = await response.json();
        console.log(updatedTechProduct)
        setTechProductsList(prevProducts =>
          prevProducts.map(p =>
            p.id === updatedTechProduct.id ? updatedTechProduct : p
          )
        );
      } else {
        // Create new tech product
        const response = await fetch(`${BASE_URL}/techproducts`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(techProduct),
        });
        const newTechProduct = await response.json();
        setTechProductsList(prevProducts => [...prevProducts, newTechProduct]);
      }
    } catch (error) {
      console.error('Error saving tech product:', error);
    }
    setShowCreateTechModal(false);
  };

  const handleDeleteTech = async (id) => {
    try {
      const headers = {
        'Content-Type': 'application/json'
      };
      await fetch(`${BASE_URL}/techproducts/${id}`, {
        method: 'DELETE',
        headers
      });
      setTechProductsList(prevProducts => prevProducts.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting tech product:', error);
    }
  };

  const TechProductModal = ({ techProduct, onSave, onCancel }) => {
    const [name, setName] = useState(techProduct ? techProduct.name : '');
    const [price, setPrice] = useState(techProduct ? techProduct.price : '');

    const handleSubmit = () => {
      onSave({
        id: techProduct ? techProduct.id : undefined,
        name,
        price
      });
    };

    return (
      <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
        <div className='bg-white p-4 rounded-lg'>
          <h2 className='text-xl mb-4'>{techProduct ? 'Update Tech Product' : 'Create Tech Product'}</h2>
          <input
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='Name'
            className='border p-2 mb-2 w-full'
          />
          <input
            type='number'
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder='Price'
            className='border p-2 mb-2 w-full'
          />
          <div className='flex justify-end'>
            <button
              onClick={handleSubmit}
              className='bg-blue-500 text-white p-2 rounded-lg mr-2'>
              Save
            </button>
            <button
              onClick={onCancel}
              className='bg-gray-500 text-white p-2 rounded-lg'>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='w-1/4 p-4 bg-gray-200'>
      <h2 className='text-2xl mb-4'>Productos de Tecnología</h2>
      <button
        onClick={handleCreateTechClick}
        className='text-4xl border-2 border-gray-700 rounded-lg py-2 px-10 text-center mb-4'>
        +
      </button>
      {loadingTech ? (
        <p>Cargando productos de tecnología...</p>
      ) : (
        techProductsList.map(techProduct => (
          <div key={techProduct.id} className='border p-2 mb-2'>
            <h3 className='font-bold'>{techProduct.name}</h3>
            <p>{techProduct.description}</p>
            <p>Price: ${techProduct.price}</p>
            <button
              onClick={() => handleEditTechClick(techProduct)}
              className='bg-yellow-500 text-white p-2 rounded-lg'>
              Edit
            </button>
            <button
              onClick={() => handleDeleteTech(techProduct.id)}
              className='bg-red-500 text-white p-2 rounded-lg ml-2'>
              Delete
            </button>
          </div>
        ))
      )}
      {showCreateTechModal && (
        <TechProductModal
          techProduct={techProductToEdit}
          onSave={handleSaveTech}
          onCancel={() => setShowCreateTechModal(false)}
        />
      )}
    </div>
  );
};

export default TechProductsComponent;
