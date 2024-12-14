export interface PinI {
  title: string;
  image: string;
  collaborators: string[];
  privacy: 'Public' | 'Private';
}