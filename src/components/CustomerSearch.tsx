import { useState } from 'react';
import { Search, User } from 'lucide-react';
import { searchCustomerByName } from '../services/customerService';
import { Customer } from '../types';
import { hairstyleSuggestions } from '../data/hairstyles';

interface CustomerSearchProps {
  onCustomerFound: (customer: Customer) => void;
}

const faceShapeNames: Record<string, string> = {
  Round: 'مستدير',
  Square: 'مربع',
  Oval: 'بيضاوي',
  Heart: 'قلب',
  Oblong: 'مستطيل',
  Diamond: 'ماسي',
};

export default function CustomerSearch({ onCustomerFound }: CustomerSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setSearching(true);
    setNotFound(false);
    setCustomer(null);

    try {
      const foundCustomer = await searchCustomerByName(searchQuery.trim());

      if (foundCustomer) {
        setCustomer(foundCustomer);
        onCustomerFound(foundCustomer);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          البحث عن زبون سابق
        </h3>

        <div className="flex gap-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="ابحث باسم الزبون"
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
            disabled={searching}
          />
          <button
            onClick={handleSearch}
            disabled={searching || !searchQuery.trim()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-all"
          >
            <Search className="w-5 h-5" />
            {searching ? 'جاري البحث...' : 'بحث'}
          </button>
        </div>

        {notFound && (
          <p className="mt-4 text-gray-600 text-center">
            لم يتم العثور على الزبون. يمكنك تحليل وجهه وحفظ البيانات.
          </p>
        )}

        {customer && (
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">تم العثور على الزبون:</p>
            <p className="text-xl font-bold text-gray-900">{customer.name}</p>
            <p className="text-lg text-blue-600">
              شكل الوجه: {faceShapeNames[customer.faceShape]}
            </p>
            <div className="mt-4">
              <p className="font-semibold text-gray-900 mb-2">التسريحات المقترحة:</p>
              <ul className="list-disc list-inside space-y-1">
                {hairstyleSuggestions[customer.faceShape]?.slice(0, 3).map((style, idx) => (
                  <li key={idx} className="text-gray-700">{style.name}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
