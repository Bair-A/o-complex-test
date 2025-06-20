import { Avatar, Card } from '@chakra-ui/react';
import React from 'react';
import FemaleAvetar from '@/assets/icons/FemaleAvatar';

type ReviewCardProps = {
  width?: string;
  height?: string;
  review: {
    id: number;
    title: string;
    body: string;
  };
  bgColor?: string;
};

const ReviewCard = ({
  width = '468px',
  height = '611px',
  bgColor = 'gray.500',
  review,
}: ReviewCardProps) => {
  return (
    <Card.Root
      width={width}
      height={height}
      variant="elevated"
      p={'4'}
      bg={bgColor}
    >
      <Card.Body gap="2">
        <Avatar.Root size="lg" shape="rounded">
          <Avatar.Image as={FemaleAvetar} />
        </Avatar.Root>
        <Card.Title mb="2">{review.title}</Card.Title>
        <Card.Description>{review.body}</Card.Description>
      </Card.Body>
    </Card.Root>
  );
};
export default ReviewCard;
