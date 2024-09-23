import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface Props {
  rating: any, 
  iconSize: string | number
}

const StarsAv= ( {rating , iconSize}:Props ) => {
  const maxStars = 5;
  const filledStars = Math.round(rating);

  const starArray = Array.from({ length: maxStars }, (_, index) => {
    const starStyle = index < filledStars ? { color: 'gold' } : {};
    return <FontAwesomeIcon key={index}   icon={faStar}  style={{ ...starStyle, fontSize: iconSize }} />;
  });

  return <div>{starArray}</div>;
};

export default StarsAv;