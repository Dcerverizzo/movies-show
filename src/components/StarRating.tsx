import React from 'react';

const StarRating = ({ rating }) => {
  const MAX_RATING = 10; 
  const MAX_STARS = 5;

  const fullStars = Math.floor(rating / 2);
  const halfStar = rating % 2 === 1;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, index) => (
        <svg
          key={index}
          className="w-8 h-8 text-yellow-500 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}

      {halfStar && (
        <svg
          className="w-8 h-8 text-yellow-500 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      )}

      {[...Array(MAX_STARS - fullStars - (halfStar ? 1 : 0))].map((_, index) => (
        <svg
          key={index}
          className="w-8 h-8 text-gray-300 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      <span className="text-gray-600 ml-5">{rating.toFixed(1)}</span>
    </div>
  );
};

export default StarRating;