export interface Participant {
    id?: string
    first_name: string
    last_name: string
    email: string
    phone: string
    college: string
    year: number
    department: string
    usn: string
    created_at?: string
  }
  
  export interface RegistrationFormData {
    firstName: string
    lastName: string
    email: string
    phone: string
    college: string
    year: number
    department: string
    usn: string
  }