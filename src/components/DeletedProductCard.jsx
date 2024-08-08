/* eslint-disable react/prop-types */
import placeHolderImage from '../assets/Logo.png';
import { Icon360 } from '@tabler/icons-react';

const DeletedProductCard = ({ product, handleRetrieve }) => {
    return (
        <div className="border flex w-auto lg:flex-row flex-col items-center p-4 rounded-lg shadow-lg md:w-3/4 m-5 bg-white">
            <img
                src={placeHolderImage}
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
                <button
                    alt={product.title}
                    onClick={() => handleRetrieve(product.id)}
                    className='rounded-lg p-1 text-slate-600 hover:text-green-600 hover:bg-green-100'>
                    <Icon360 stroke={2} className='h-8 w-8' />
                </button>
            </div>


        </div>
    );
};

export default DeletedProductCard;
