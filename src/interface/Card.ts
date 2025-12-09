export default interface Card {
  _id?:string
  title: string;
  subtitle: string;
  description?: string;
  web: string;
  phone?: string;
  email: string;
  image: {
    url?: string;
    alt?: string;
  };
  address: {
    state: string;
    country?: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: number;
  };
likes?: string[];}
