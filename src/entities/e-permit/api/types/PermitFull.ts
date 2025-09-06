export type PermitFull = {
  uuid: string
  country: string
  transit_country: string | null
  type_of_cargo: string
  departure_date: string
  return_date: string
  phone: string
  email: string
  city: string
  region: string
  license_number: string
  license_expire_date: string
  license_types: string[]
  licenses: string[]
  is_legal: boolean
  status: number
  users?: {
    name: string
    surname: string
    patronymic: string
    patent_number: string
    patent_expire_date: string
  }
  client_legal?: {
    company_name: string
    address: string
    yegrpo_number: string
    yegrpo_expire_date: string
    certificate_number: string
    bank_details: string
    account_number: string
    number_of_cars: string
  }
  driver: {
    name: string
    surname: string
    patronymic: string
    driving_license_number: string
    driving_license_expired_date: string
  }
  transport: {
    brand: string[]
    type: number[]
    card_number: string[]
    card_start_date: string[]
    card_expire_date: string[]
    plate_number: string[]
    foreign_plate_number: string[]
  }
  container_number: number
  issued_for: string
  permit_type: number
  auth_id: string
  auth_name: string
  deposit_legal: number
  deposit_individual: number
  is_paid: boolean
}