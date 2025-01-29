
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


type ArtisanProps = {
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
  accountId:string
}