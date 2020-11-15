/* eslint-disable
  consistent-return,
  jsx-a11y/control-has-associated-label,
  jsx-a11y/interactive-supports-focus,
  jsx-a11y/click-events-have-key-events,
  jsx-a11y/no-static-element-interactions
*/

import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { Context } from '../context/Context';

function Image({ className, img }) {
  const [hovered, setHovered] = useState(false);
  const { toggleFavorite, addToCart, cartItems } = useContext(Context);

  function heartIcon() {
    if (img.isFavorite) return <i className="ri-heart-fill favorite" onClick={() => toggleFavorite(img.id)} />;
    if (hovered) return <i className="ri-heart-line favorite" onClick={() => toggleFavorite(img.id)} />;
  }

  function cartIcon() {
    const alreadyInCart = cartItems.some(item => item.id === img.id);

    if (alreadyInCart) return <i className="ri-shopping-cart-fill cart" />;
    if (hovered) return <i className="ri-add-circle-line cart" onClick={() => addToCart(img)} />;
  }

  return (
    <div
      className={`${className} image-container`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={img.url} className="image-grid" alt="alt" />
      {heartIcon()}
      {cartIcon()}
    </div>
  );
}

Image.defaultProps = {
  className: 'small',
};

Image.propTypes = {
  className: PropTypes.string,
  img: PropTypes.shape({
    id: PropTypes.string,
    url: PropTypes.string,
    isFavorite: PropTypes.bool,
  }).isRequired,
};

export default Image;
