export type RawReview = {
  id: number;
  text: string;
};

export enum Gender {
  Male = 'male',
  Female = 'female',
}

export type ProcessedReview = {
  id: number;
  title: string;
  body: string;
  gender: Gender;
};

export type CartItem = { title: string; price: number; quantity: number };

export type Cart = { [id: number]: CartItem };
