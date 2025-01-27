
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

