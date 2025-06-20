import { Spinner } from '@chakra-ui/react';

enum SpinnerSize {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
}

type LoaderProps = { color?: string; size?: SpinnerSize };

const Loader = ({ color = 'teal.500', size = SpinnerSize.LG }: LoaderProps) => {
  return <Spinner color={color} size={size} />;
};

export default Loader;
