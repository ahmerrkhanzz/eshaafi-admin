export interface AddDoctor {
  name: string;
  email: string;
  password: string;
  phone: string;
  city: string;
  country: string;
  address: string;
  pmdc: string;
  summary: string;
  language: object;
  speciality: object;
  gender: string;
  date_of_birth?: string;
  education: object;
  experience: object;
  award: object;
  services: object;
  faqs: object;
  video_consultation: object;
}
