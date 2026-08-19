import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?q=80&w=400", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?q=80&w=400", description: "Filters toxins effectively.", cost: "$12" },
        { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?q=80&w=400", description: "Removes mold spores.", cost: "$18" },
        { name: "Boston Fern", image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?q=80&w=400", description: "Adds humidity inside.", cost: "$14" },
        { name: "Rubber Plant", image: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?q=80&w=400", description: "Cleans indoor toxins.", cost: "$22" },
        { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?q=80&w=400", description: "Purifies air & heals skin.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?q=80&w=400", description: "Calming scent.", cost: "$20" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729808998-315188843924?q=80&w=400", description: "Sweet floral scent.", cost: "$18" },
        { name: "Rosemary", image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662?q=80&w=400", description: "Invigorating herb aroma.", cost: "$15" },
        { name: "Mint", image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?q=80&w=400", description: "Crisp, fresh aroma.", cost: "$10" },
        { name: "Eucalyptus", image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=400", description: "Refreshing pine scent.", cost: "$25" },
        { name: "Lemon Balm", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=400", description: "Citrusy relaxing herb.", cost: "$12" }
      ]
    },
    {
      category: "Medicinal Plants",
      plants: [
        { name: "Chamomile", image: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?q=80&w=400", description: "Relieves stress.", cost: "$12" },
        { name: "Peppermint", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=400", description: "Aids digestion.", cost: "$14" },
        { name: "Echinacea", image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=400", description: "Boosts immunity.", cost: "$16" },
        { name: "Calendula", image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=400", description: "Heals skin cuts.", cost: "$11" },
        { name: "Holy Basil (Tulsi)", image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=400", description: "Reduces stress levels.", cost: "$15" },
        { name: "Thyme", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?q=80&w=400", description: "Natural antimicrobial.", cost: "$13" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-logo" onClick={onHomeClick}>
          <h2>Paradise Nursery</h2>
        </div>
        <div className="nav-links">
          <button onClick={() => setShowCart(false)}>Plants</button>
          <button onClick={() => setShowCart(true)} className="cart-icon-btn">
            🛒 <span className="cart-badge">{totalQuantity}</span>
          </button>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="product-container">
          {plantsArray.map((categoryObj, cIndex) => (
            <div key={cIndex} className="category-section">
              <h2 className="category-title">{categoryObj.category}</h2>
              <div className="plant-grid">
                {categoryObj.plants.map((plant, pIndex) => {
                  const isAdded = cartItems.some(item => item.name === plant.name);
                  return (
                    <div className="plant-card" key={pIndex}>
                      <img src={plant.image} alt={plant.name} className="plant-image" />
                      <h3>{plant.name}</h3>
                      <p>{plant.description}</p>
                      <p className="plant-cost">{plant.cost}</p>
                      <button
                        className="add-to-cart-btn"
                        disabled={isAdded}
                        onClick={() => handleAddToCart(plant)}
                      >
                        {isAdded ? "Added to Cart" : "Add to Cart"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
