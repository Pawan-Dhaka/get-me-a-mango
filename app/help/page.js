export default function Help() {
  const faqs = [
    {
      question: "What is Get-Me-A-Mango?",
      answer:
        "Get-Me-A-Mango is a crowdfunding platform where creators can receive support and donations from their followers and supporters. This website is made by Sir Pawan Dhaka."
    },
    {
      question: "How do I create my creator page?",
      answer:
        "Sign in to your account, visit the Dashboard, and complete your profile details. Your support page will be generated automatically."
    },
    {
      question: "How do supporters send donations?",
      answer:
        "Supporters can visit your public page and contribute using the available payment methods."
    },
    {
      question: "Why is my payment not showing?",
      answer:
        "Payments may take a few minutes to process. If the issue persists, contact support with your transaction details."
    },
    {
      question: "Can I edit my profile information?",
      answer:
        "Yes. You can update your name, profile picture, cover image, and other details anytime from your dashboard."
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes. We take security seriously and use industry-standard practices to protect user data and transactions."
    },
    {
      question: "Can I receive support from international users?",
      answer:
        "Yes, depending on the payment methods enabled on the platform."
    },
    {
      question: "How can I contact support?",
      answer:
        "You can reach us through email and we will respond as quickly as possible."
    }
  ];

  return (
    <div className="min-h-screen  bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] text-white">
      <div className="max-w-5xl mx-auto px-6 py-16">
        
        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold mb-4">
            Help & Support
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Welcome to the Get-Me-A-Mango support center. Find answers to
            common questions, learn how the platform works, and get help
            whenever you need it.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          <div className="bg-[#0f0f35] p-6 rounded-2xl">
            <h2 className="text-xl font-semibold mb-3">
              Account Help
            </h2>
            <p className="text-gray-300">
              Manage your profile, login issues, and account settings.
            </p>
          </div>

          <div className="bg-[#0f0f35] p-6 rounded-2xl">
            <h2 className="text-xl font-semibold mb-3">
              Payments
            </h2>
            <p className="text-gray-300">
              Learn about donations, payment processing, and transaction issues.
            </p>
          </div>

          <div className="bg-[#0f0f35] p-6 rounded-2xl">
            <h2 className="text-xl font-semibold mb-3">
              Creator Tools
            </h2>
            <p className="text-gray-300">
              Set up your creator page and grow your supporter community.
            </p>
          </div>
        </div>


        <div className="mb-14">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="bg-[#0f0f35] rounded-xl p-5 cursor-pointer"
              >
                <summary className="font-semibold text-lg">
                  {faq.question}
                </summary>

                <p className="mt-3 text-gray-300">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>

        <div className="bg-[#0f0f35] rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Still Need Help?
          </h2>

          <p className="text-gray-300 mb-6">
            If you couldn't find the answer you're looking for, we are ready to help.
          </p>

          <div className="space-y-2">
            <p>
              Email: pkjpk07@gmail.com
            </p>
            <p>
               Social Media : @arisepawan(Instagram)
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}


export const metadata = {
  title: 'Help and Support - Get me a mango',
  description: 'This is help and support page for get me a mango website',
}