import Image from 'next/image';
import Form from './components/main-form';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-8 md:px-8 lg:px-12 bg-gradient-to-br from-stone-50 to-stone-100">
      {/* Header */}
      <div className="w-full max-w-4xl mb-8 text-center">
        <div className="mb-4">
          <p className="text-lg md:text-xl font-medium text-stone-700 mb-2">
            Send positive thoughts to your friends..&nbsp;
            <span className="font-bold text-stone-800">why wait?</span>
          </p>
        </div>
        <div className="flex justify-center items-center gap-2 text-sm text-stone-500">
          <span>By</span>
          <Image
            src="/goodrabbit_logo.png"
            alt="Good Rabbit Logo"
            className="dark:invert"
            width={80}
            height={20}
            priority
          />
        </div>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-md">
        <Form />
      </div>

    </main>
  )
}
