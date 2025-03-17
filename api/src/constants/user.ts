// eslint-disable-next-line import/prefer-default-export
export enum User {
  id = '_id',
  name = 'name',
  firstName = 'first_name',
  lastName = 'last_name',
  phoneNumber = 'phone_number',
  email = 'email',
  password = 'password',
  emailCode = 'email_code',
  mobileCode = 'mobile_code',
  status = 'status',
  lastLoginDate = 'last_login_date',
  userType = 'user_type',
  role = 'role',
  shortCode = 'short_code',
  producer = 'producer',
  cooperative = 'cooperative',
  permitions = 'permitions',
  province = 'province',
  county = 'county',
  imageUrl = 'image_url',
  token = 'token',
}

export enum UserRole {
  Producer = 'producer',
  Cooperative = 'cooperative',
  Technician = 'technician',
  Admin = 'admin',
  SuperAdmin = 'root',
  GeneralAnalitic = 'analitic',
}
