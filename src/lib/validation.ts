import * as yup from 'yup'

export const registrationSchema = yup.object({
  firstName: yup.string().required('First name is required').min(2, 'Minimum 2 characters'),
  lastName: yup.string().required('Last name is required').min(2, 'Minimum 2 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone is required'),
  college: yup.string().required('College is required').min(3, 'Minimum 3 characters'),
  year: yup.number().min(1, 'Invalid year').max(4, 'Invalid year').required('Year is required'),
  department: yup.string().required('Department is required').min(2, 'Minimum 2 characters'),
  usn: yup.string().required('USN is required').min(5, 'Invalid USN format')
})