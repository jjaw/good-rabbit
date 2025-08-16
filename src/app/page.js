import Image from 'next/image';
import Form from './components/main-form';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-8 md:px-8 lg:px-12 bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header */}
      <div className="w-full max-w-4xl mb-8 text-center">
        <div className="mb-4">
          <p className="text-lg md:text-xl font-medium text-slate-200 mb-2">
            Send positive thoughts to your friends..&nbsp;
            <span className="font-bold text-orange-300">why wait?</span>
          </p>
        </div>
        <div className="flex justify-center items-center gap-2 text-sm text-slate-400">
          <span>By</span>
          <Image
            src="/goodrabbit_logo.png"
            alt="Good Rabbit Logo"
            className=""
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
