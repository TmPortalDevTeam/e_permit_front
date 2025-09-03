export type EPermit = {
  auth_id: string
  auth_name: string
  body: null
  city: string
  clientIndividual: {
    name: string
    patent_expire_date: string
    patent_number: string
    patronymic: string
    surname: string
  }[]
  client_legal: {
    account_number: string
    address: string
    bank_details: string
    certificate_number: string
    company_name: string
    number_of_cars: number
    yegrpo_expire_date: string
    yegrpo_number: string
  }[]
  container_number: number
  country: string
  created_at: string
  departure_date: string
  deposit_individual: number
  deposit_legal: number
  driver: {
    driving_license_expired_date: string
    driving_license_number: string
    name: string
    patronymic: string
    surname: string
  }[]
  email: string
  email_sent: number
  is_legal: boolean
  is_paid: boolean
  issued_for: string
  license_expire_date: string
  license_number: string
  license_types: string[]
  licenses: string[]
  permit_type: number
  phone: string
  region: string
  return_date: string
  status: 1 | 2 | 3 | 4 | 5 | 6
  sum: number | null
  transit_country: string
  transport: {
    brand: string[]
    card_expire_date: string[]
    card_number: string[]
    card_start_date: string[]
    foreign_plate_number: string[]
    plate_number: string[]
    type: number[]
  }[]
  type_of_cargo: string
  uuid: string
  views_count: number
}