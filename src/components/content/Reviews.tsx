'use client';

import React, { useEffect, useState } from 'react';
import { REVIEWS_API_URL } from '@/configs/configs';
import { RawReview, ProcessedReview } from '@/types/types';
import { extractTextFromHtml } from '@/utils/utils';
import MaleAvatar from '@/assets/icons/MaleAvatar';

const Reviews = () => {
  const [reviews, setReviews] = useState<ProcessedReview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch(REVIEWS_API_URL);
        const rawReviews = await response.json();
        const processedReviews: ProcessedReview[] = rawReviews.map(
          (review: RawReview) => ({
            id: review.id,
            ...extractTextFromHtml(review.text),
          }),
        );
        setReviews(processedReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Отзывы</h1>
      <div style={{ display: 'grid', gap: '16px' }}>
        {reviews.map((review) => (
          <div
            key={review.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <MaleAvatar />
            <h1>{review.title}</h1>
            <p>{review.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Reviews;
