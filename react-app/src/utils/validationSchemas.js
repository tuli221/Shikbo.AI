import * as yup from 'yup'

// Login schema
export const loginSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

// Registration schema
export const registerSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  role: yup
    .string()
    .oneOf(['student', 'instructor'], 'Invalid role')
    .required('Role is required'),
})

// Profile update schema
export const profileSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: yup
    .string()
    .matches(/^[0-9]{10,15}$/, 'Phone number must be 10-15 digits')
    .nullable(),
  bio: yup
    .string()
    .max(500, 'Bio must be less than 500 characters')
    .nullable(),
})

// Course creation schema
export const courseSchema = yup.object({
  title: yup
    .string()
    .min(5, 'Title must be at least 5 characters')
    .required('Course title is required'),
  description: yup
    .string()
    .min(20, 'Description must be at least 20 characters')
    .required('Description is required'),
  category: yup
    .string()
    .required('Category is required'),
  level: yup
    .string()
    .oneOf(['beginner', 'intermediate', 'advanced'], 'Invalid level')
    .required('Level is required'),
  price: yup
    .number()
    .min(0, 'Price must be a positive number')
    .required('Price is required'),
  duration: yup
    .string()
    .required('Duration is required'),
})

// Payment schema
export const paymentSchema = yup.object({
  amount: yup
    .number()
    .min(1, 'Amount must be greater than 0')
    .required('Amount is required'),
  method: yup
    .string()
    .oneOf(['bkash', 'nagad', 'card'], 'Invalid payment method')
    .required('Payment method is required'),
  phoneNumber: yup
    .string()
    .when('method', {
      is: (method) => ['bkash', 'nagad'].includes(method),
      then: (schema) => schema
        .matches(/^01[3-9]\d{8}$/, 'Invalid phone number')
        .required('Phone number is required'),
      otherwise: (schema) => schema.nullable(),
    }),
})

// Contact form schema
export const contactSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  subject: yup
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .required('Subject is required'),
  message: yup
    .string()
    .min(10, 'Message must be at least 10 characters')
    .required('Message is required'),
})
