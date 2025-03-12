
type AccountTypeEnum = "NONE" |
  "ARTISAN" |
  "SAFARI" |
  "FAIRS" |
  "BUSINESS" |
  "HOTEL" |
  "ALL" |
  "ADMIN" |
  "SUPERADMIN"


type AccountProps = {
  userId: string
  email: string
  password: string
  accountType: AccountTypeEnum
}

type LoginProps = {
  token: string
  user: {
    id: string
    email: string
    accountType: string
  }
}

type CraftProps = {
  craftId: string;
  createdAt: Date;
  craftName: string;
  craftSlug: string;
  updateAt: Date;
}

type SubCraftProps = {
  craftId: string;
  subCraftId: string;
  createdAt: Date;
  updatedAt: Date;
  subCraftName: string;
  subCraftSlug: string;
}

// * ARTISAN

type ArtisanCreationProps = {
  firstName: string
  lastName: string
  address: string
  description: string
  experience: string
  education: string
  training: string
  certificate: string
  recognition: string
  craftId: string
  subCraftId: string
  dp: string
  email: string
  password: string
}

type PortfolioProps = {
  portfolioId: string
  images: string[]
}

type ArtisanDetailProps = {
  artisanId: string
  firstName: string
  lastName: string
  address: string
  description: string
  experience: string
  education: string
  training: string
  certificate: string
  recongnition: string
  craftId: string
  subCraftId: string
  dp: string
  subCraft: SubCraftProps
  craft: CraftProps
}

type ArtisanPortolioProps = {
  artisanId: string
  firstName: string
  lastName: string
  address: string
  description: string
  experience: string
  education: string
  training: string
  certificate: string
  recongnition: string
  craftId: string
  subCraftId: string
  dp: string
  subCraft: SubCraftProps
  craft: CraftProps
  Portfolio: PortfolioProps
  ArtisanPackage: ArtisanPackageProps[]
}

type ArtisanPackageRequestProps = {
  accountId: string
  price: number
  title: string
  duration: number
  features: string[]
  experience: string
}

type ArtisanPackageUpdateProps = {
  packageId: string
  price: number
  title: string
  duration: number
  features: string[]
  experience: string
}

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
}

//* SAFARI
type SafariCreationProps = {
  firstName: string
  lastName: string
  address: string
  description: string
  dp: string
  email: string
  password: string
}

type SafariProps = {
  safariId: string
  firstName: string
  lastName: string
  dp: string
  address: string
  description: string
  accountId: string
}

type SafariTourCreationProps = {
  title: string
  duration: string
  fee: number
  operator: string
  description: string
  features: string[]
  accountId: string
}

type SafariTourProps = {
  tourId: string
  title: string
  operator: string
  description: string
  duration: string
  features: string[]
  fee: number
  safariId: string
  createdAt: Date
  updatedAt: Date
}

type SafariDetailProps = {
  safariId: string
  firstName: string
  lastName: string
  dp: string
  address: string
  description: string
  accountId: string
  SafariTour: SafariTourProps[]
}

// * FAIR
type FairCreationProps = {
  firstName: string
  lastName: string
  address: string
  description: string
  dp: string
  email: string
  password: string
}

type FairProps = {
  fairId: string
  firstName: string
  lastName: string
  dp: string
  address: string
  description: string
  accountId: string
}

type FairLocationEnum = "INTERNATIONAL" | "NATIONAL" | "LOCAL"
type FairTypeEnum = "FAIR" | "EXHIBITION" | "MUSEUM"
type FairEventCreationProps = {
  title: string
  location: string
  vanue: string
  fairType: string
  startDate: string
  endDate: string
  organizer: string
  latitude: number
  longitude: number
  description: string
  accountId: string
}

type FairEventUpdationProps = {
  title: string
  location: string
  vanue: string
  fairType: string
  startDate: string
  endDate: string
  organizer: string
  latitude: number
  longitude: number
  description: string
  eventId: string
}

type FairEventProps = {
  eventId: string
  title: string
  location: FairLocationEnum
  vanue: string
  startDate: string
  endDate: string
  organizer: string
  fairType: FairTypeEnum
  latitude: number
  longitude: number
  description: string
  fairId: string
  createdAt: Date
  updatedAt: Date
}

type FairDetailProps = {
  fairId: string
  firstName: string
  lastName: string
  dp: string
  address: string
  description: string
  accountId: string
  FairEvent : FairEventProps[]
}

//* Shop 
type ShopCreationProps = {
  shopName: string
  address: string
  shopTiming: string
  workingDays: string[]
  description: string
  dp: string
  email: string
  password: string
  accountId: string
}

type ShopProps = {
  shopId: string
  shopName: string
  address: string
  shopTiming: string
  workingDays: string[]
  description: string
  dp: string
  accountId: string
}

type ProductCreationProps = {
  name: string
  description: string
  price: number
  images: string[]
  category: string
  material: string
  dimensions: string
  weight: number
  stock: number
  isAvailable: boolean
  craftType: string
  artisanMade: boolean
  shopId: string
}