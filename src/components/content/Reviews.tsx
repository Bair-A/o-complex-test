'use client';

import React, { useEffect, useState } from 'react';
import { REVIEWS_API_URL } from '@/configs/configs';
import { RawReview, ProcessedReview, Gender } from '@/types/types';
import { extractTextFromHtml } from '@/utils/utils';
import { Stack } from '@chakra-ui/react';
import ReviewCard from '@/components/content/ReviewCard';
import Loader from '@/components/common/Loader';
import { CenteredBox } from '@/components/common/CenteredBox';

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
            gender: Gender.Male,
            ...extractTextFromHtml(review.text),
          }),
        );
        setReviews(processedReviews);
      } catch (error) {
        console.error('Ошибка при загрузке отзывов:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <CenteredBox>
        <Loader />
      </CenteredBox>
    );
  }

  return (
    <Stack gap="4" direction="row" wrap="wrap" justify="center" align="center">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </Stack>
  );
};
export default Reviews;
