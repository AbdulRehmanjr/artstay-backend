type AccountTypeEnum =
  | "NONE"
  | "ARTISAN"
  | "SAFARI"
  | "FAIRS"
  | "BUSINESS"
  | "HOTEL"
  | "RESTAURANT"
  | "TRAVEL_PLANER"
  | "SUPERADMIN"
  | "ARTISAN_ADMIN"
  | "SAFARI_ADMIN"
  | "FAIRS_ADMIN"
  | "BUSINESS_ADMIN"
  | "HOTEL_ADMIN"
  | "RESTAURANT_ADMIN"
  | "TRAVEL_PLANER_ADMIN";

type AccountProps = {
  userId: string;
  email: string;
  password: string;
  accountType: AccountTypeEnum;
};

type LoginProps = {
  token: string;
  user: {
    id: string;
    email: string;
    accountType: string;
  };
};

type CraftProps = {
  craftId: string;
  createdAt: Date;
  craftName: string;
  craftSlug: string;
  updateAt: Date;
};

type SubCraftProps = {
  craftId: string;
  subCraftId: string;
  createdAt: Date;
  updatedAt: Date;
  subCraftName: string;
  subCraftSlug: string;
};

// * ARTISAN

type ArtisanCreationProps = {
  firstName: string;
  lastName: string;
  address: string;
  description: string;
  experience: string;
  education: string;
  training: string;
  certificate: string;
  recognition: string;
  craftId: string;
  subCraftId: string;
  dp: string;
  email: string;
  password: string;
};

type ArtisanUpdationProps = {
  accountId: string;
  firstName: string;
  lastName: string;
  address: string;
  description: string;
  experience: string;
  education: string;
  training: string;
  certificate: string;
  recognition: string;
  craftId: string;
  subCraftId: string;
  dp: string;
};

type PortfolioProps = {
  portfolioId: string;
  images: string[];
};

type ArtisanDetailProps = {
  artisanId: string;
  firstName: string;
  lastName: string;
  address: string;
  description: string;
  experience: string;
  education: string;
  training: string;
  certificate: string;
  recongnition: string;
  craftId: string;
  subCraftId: string;
  dp: string;
  isActive: boolean;
  craftId: string;
  subCraftId: string;
  accountId: string;
  subCraft: SubCraftProps;
  craft: CraftProps;
};

type ArtisanPortolioProps = {
  artisanId: string;
  firstName: string;
  lastName: string;
  address: string;
  description: string;
  experience: string;
  education: string;
  training: string;
  certificate: string;
  recongnition: string;
  craftId: string;
  subCraftId: string;
  dp: string;
  subCraft: SubCraftProps;
  craft: CraftProps;
  Portfolio: PortfolioProps | null;
  ArtisanPackage: ArtisanPackageProps[];
};

type ArtisanPackageRequestProps = {
  accountId: string;
  price: number;
  title: string;
  duration: number;
  features: string[];
  experience: string;
};

type ArtisanPackageUpdateProps = {
  packageId: string;
  price: number;
  title: string;
  duration: number;
  features: string[];
  experience: string;
};

type ArtisanPackageProps = {
  packageId: string;
  duration: number;
  features: string[];
  experience: string;
  price: number;
  title: string;
  artisanId: string;
  createdAt: Date;
  updatedAt: Date;
};

//* SAFARI
type SafariCreationProps = {
  firstName: string;
  lastName: string;
  address: string;
  description: string;
  dp: string;
  email: string;
  password: string;
};

type SafariUpdationProps = {
  accountId: string;
  firstName: string;
  lastName: string;
  address: string;
  description: string;
};

type SafariProps = {
  safariId: string;
  firstName: string;
  lastName: string;
  dp: string;
  address: string;
  isActive: boolean;
  description: string;
  accountId: string;
};

type SafariTourCreationProps = {
  title: string;
  duration: string;
  fee: number;
  operator: string;
  description: string;
  features: string[];
  accountId: string;
};

type SafariTourProps = {
  tourId: string;
  title: string;
  operator: string;
  description: string;
  duration: string;
  features: string[];
  fee: number;
  safariId: string;
  createdAt: Date;
  updatedAt: Date;
};

type SafariDetailProps = {
  safariId: string;
  firstName: string;
  lastName: string;
  dp: string;
  address: string;
  description: string;
  accountId: string;
  SafariTour: SafariTourProps[];
};

// * FAIR
type FairCreationProps = {
  firstName: string;
  lastName: string;
  address: string;
  description: string;
  dp: string;
  email: string;
  password: string;
};

type FairUpdationProps = {
  accountId: string;
  firstName: string;
  lastName: string;
  address: string;
  description: string;
};

type FairProps = {
  fairId: string;
  firstName: string;
  lastName: string;
  dp: string;
  address: string;
  description: string;
  accountId: string;
};

type FairLocationEnum = "INTERNATIONAL" | "NATIONAL" | "LOCAL";
type FairTypeEnum = "FAIR" | "EXHIBITION" | "MUSEUM";
type FairEventCreationProps = {
  title: string;
  location: string;
  vanue: string;
  fairType: string;
  startDate: string;
  endDate: string;
  organizer: string;
  latitude: number;
  longitude: number;
  description: string;
  accountId: string;
};

type FairEventUpdationProps = {
  title: string;
  location: string;
  vanue: string;
  fairType: string;
  startDate: string;
  endDate: string;
  organizer: string;
  latitude: number;
  longitude: number;
  description: string;
  eventId: string;
};

type FairEventProps = {
  eventId: string;
  title: string;
  location: FairLocationEnum;
  vanue: string;
  startDate: string;
  endDate: string;
  organizer: string;
  fairType: FairTypeEnum;
  latitude: number;
  longitude: number;
  description: string;
  fairId: string;
  createdAt: Date;
  updatedAt: Date;
};

type FairDetailProps = {
  fairId: string;
  firstName: string;
  lastName: string;
  dp: string;
  address: string;
  description: string;
  accountId: string;
  FairEvent: FairEventProps[];
};

//* Shop
type ShopCreationProps = {
  email: string;
  password: string;
  accountId: string;
  businessName: string;
  shopName: string;
  vendorType: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  ownerName: string;
  phoneNumber: string;
  website: string;
  description: string;
  productCategories: string[];
  isGICertified: boolean;
  isHandmade: string;
  pickupOptions: string[];
  deliveryTime: string;
  deliveryFee: string;
  pricingStructure: string;
  orderProcessing: string;
  paymentMethods: string[];
  returnPolicy: string;
  stockAvailability: string;
  offersCustomization: boolean;
  packagingType: string;
  shopTiming: string;
  workingDays: string[];
  agreedToTerms: boolean;
  agreedToBlacklist: boolean;
  dp: string;
};

type ShopUpdationProps = {
  accountId: string;
  shopName: string;
  address: string;
  shopTiming: string;
  workingDays: string[];
  description: string;
  dp: string;
  isGICertified: boolean;
  isHandmade: string;
  pickupOptions: string[];
  deliveryTime: string;
  deliveryFee: string;
  pricingStructure: string;
  orderProcessing: string;
  paymentMethods: string[];
  returnPolicy: string;
  stockAvailability: string;
  offersCustomization: boolean;
  packagingType: string;
  shopTiming: string;
  workingDays: string[];
  agreedToTerms: boolean;
};

type ShopProps = {
  accountId: string;
  businessName: string;
  shopName: string;
  vendorType: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  ownerName: string;
  phoneNumber: string;
  website: string;
  description: string;
  productCategories: string[];
  isGICertified: boolean;
  isHandmade: string;
  pickupOptions: string[];
  deliveryTime: string;
  deliveryFee: string;
  pricingStructure: string;
  orderProcessing: string;
  paymentMethods: string[];
  returnPolicy: string;
  stockAvailability: string;
  offersCustomization: boolean;
  packagingType: string;
  shopTiming: string;
  workingDays: string[];
  agreedToTerms: boolean;
  agreedToBlacklist: boolean;
  dp: string;
};

type ProductCreationProps = {
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  material: string;
  dimensions: string;
  weight: number;
  stock: number;
  isAvailable: boolean;
  craftType: string;
  artisanMade: boolean;
  accountId: string;
};

type ProductUpdateProps = {
  productId: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  material: string;
  dimensions: string;
  weight: number;
  stock: number;
  isAvailable: boolean;
  craftType: string;
  artisanMade: boolean;
};

type ProductProps = {
  productId: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  material: string;
  dimensions: string | null;
  weight: number | null;
  stock: number;
  isAvailable: boolean;
  craftType: string;
  artisanMade: boolean;
  shopId: string;
  createdAt: Date;
  updatedAt: Date;
};

type ShopDetailProps = {
  accountId: string;
  businessName: string;
  shopName: string;
  vendorType: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  ownerName: string;
  phoneNumber: string;
  website: string;
  description: string;
  productCategories: string[];
  isGICertified: boolean;
  isHandmade: string;
  pickupOptions: string[];
  deliveryTime: string;
  deliveryFee: string;
  pricingStructure: string;
  orderProcessing: string;
  paymentMethods: string[];
  returnPolicy: string;
  stockAvailability: string;
  offersCustomization: boolean;
  packagingType: string;
  shopTiming: string;
  workingDays: string[];
  agreedToTerms: boolean;
  agreedToBlacklist: boolean;
  dp: string;
  createdAt: Date;
  updatedAt: Date;
  products: ProductProps[];
};

//* Restaurant
type RestaurantCreationProps = {
  name: string;
  description: string;
  location: string;
  cuisine: string[];
  priceRange: string;
  image: string;
  email: string;
  password: string;
};

type RestaurantUpdationProps = {
  restaurantId: string;
  name: string;
  description: string;
  location: string;
  cuisine: string[];
  priceRange: string;
  image: string;
};

type RestaurantProps = {
  restaurantId: string;
  accountId: string;
  name: string;
  description: string;
  location: string;
  cuisine: string[];
  priceRange: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};

type RestaurantMenuProps = {
  menuItemId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  restaurantId: string;
  createdAt: Date;
  updatedAt: Date;
};

type RestaurantDetailProps = {
  restaurantId: string;
  name: string;
  description: string;
  location: string;
  cuisine: string[];
  priceRange: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  menu: RestaurantMenuProps[];
};

type RestaurantDetailByAccountIdProps = {
  restaurantId: string;
  name: string;
  description: string;
  location: string;
  cuisine: string[];
  priceRange: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};

type MenuCategory = "STARTER" | "MAIN_COURSE" | "DESSERT" | "BEVERAGE";

type MenuItemProps = {
  menuItemId: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  spicyLevel: number;
  image: string;
  restaurantId: string;
  createdAt: Date;
  updatedAt: Date;
};

type MenuItemCreationProps = {
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  spicyLevel: number;
  image: string;
  accountId: string;
};

type MenuItemUpdateProps = {
  menuItemId: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  spicyLevel: number;
  image: string;
};

// * Travel Planer
type TravelPlanerCreationProps = {
  name: string;
  description: string;
  location: string;
  priceRange: string;
  language: string[];
  speciality: string[];
  email: string;
  password: string;
  accountId: string;
  dp: string;
};

type TravelPlanerUpdationProps = {
  travelPlanerId: string;
  name: string;
  description: string;
  location: string;
  priceRange: string;
  language: string[];
  speciality: string[];
  dp: string;
  accountId: string;
};

type TravelPlanerProps = {
  travelPlanerId: string;
  name: string;
  description: string;
  location: string;
  priceRange: string;
  language: string[];
  speciality: string[];
  dp: string;
  accountId: string;
};

type TravelTourCreationProps = {
  title: string;
  description: string;
  image: string;
  duration: number;
  isPricePerPerson: boolean;
  maxGroupSize: number;
  price: number;
  languages: string[];
  features: string[];
  isActive: boolean;
  accountId: string;
};

type TravelTourProps = {
  tourId: string;
  title: string;
  description: string;
  image: string;
  duration: number;
  isPricePerPerson: boolean;
  maxGroupSize: number;
  price: number;
  languages: string[];
  features: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type TravelTourUpdateProps = {
  tourId: string;
  title: string;
  description: string;
  image: string;
  duration: number;
  isPricePerPerson: boolean;
  maxGroupSize: number;
  price: number;
  languages: string[];
  features: string[];
  isActive: boolean;
};

type HotelProps = {
  hotelId: string;
  code: string;
  name: string;
  address: string;
  longitude: number;
  latitude: number;
  description: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  createdAt: Date;
  updatedAt: Date;
  accountId: string;
};

type HotelCreationProps = {
  name: string;
  address: string;
  longitude: number;
  latitude: number;
  description: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  images: string[];
  accountId: string;
};

type HotelUpdateProps = {
  hotelId: string;
  name: string;
  address: string;
  longitude: number;
  latitude: number;
  description: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  images: string[];
};

type RoomProps = {
  roomId: string;
  code: string;
  name: string;
  capacity: number;
  area: number;
  features: string[];
  description: string;
  dp: string;
  beds: number;
  quantity: number;
  price: number;
  isActive: boolean;
  minimumstay: number;
  images: string[];
  hotelId: string;
};

type ArtisanBookingCreationProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  additionalNote: string;
  startDate: string;
  endDate: string;
  amount: number;
  artisanId: string;
  packageId: string;
};
