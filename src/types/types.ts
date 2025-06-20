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
