import RegistrationForm from '@/components/RegistrationForm'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Event Registration</h1>
          <RegistrationForm />
        </div>
      </div>
    </div>
  )
}