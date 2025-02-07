
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
  token: string,
  user: {
    id: string,
    email: string,
    accountType: string
  }
}


type ArtisanCreationProps = {
  firstName: string,
  lastName: string,
  address: string,
  description: string,
  experience: string,
  education: string,
  training: string,
  certificate: string,
  recognition: string,
  craftId: string,
  subCraftId: string,
  dp: string,
  email: string
  password: string
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

type PortfolioProps = {
  portfolioId: string
  images: string[]
}

type ArtisanDetailProps = {
  artisanId: string
  firstName: string,
  lastName: string,
  address: string,
  description: string,
  experience: string,
  education: string,
  training: string,
  certificate: string,
  recongnition: string,
  craftId: string,
  subCraftId: string,
  dp: string,
  subCraft: SubCraftProps
  craft: CraftProps
}

type ArtisanPortolioProps = {
  artisanId: string
  firstName: string,
  lastName: string,
  address: string,
  description: string,
  experience: string,
  education: string,
  training: string,
  certificate: string,
  recongnition: string,
  craftId: string,
  subCraftId: string,
  dp: string,
  subCraft: SubCraftProps
  craft: CraftProps
  Portfolio:PortfolioProps
}