import React from 'react';

interface RatingStarsProps {
  rating?: number | null;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
  // If rating is not present or is 0, default to 1
  const displayRating = rating && rating > 0 ? Math.round(rating) : 1;
  return (
    <span>
      {[...Array(5)].map((_, i) =>
        i < displayRating ? (
          <span key={i} style={{ color: '#FFD700', fontSize: '1.4em' }}>★</span>
        ) : (
          <span key={i} style={{ color: '#CCCCCC', fontSize: '1.4em' }}>☆</span>
        )
      )}
    </span>
  );
};

export default RatingStars;