import { useState } from 'react';
import { Save, Check } from 'lucide-react';
import { FaceAnalysisResult } from '../types';
import { saveCustomer } from '../services/customerService';

interface SaveCustomerProps {
  result: FaceAnalysisResult;
}

export default function SaveCustomer({ result }: SaveCustomerProps) {
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!name.trim()) {
      setError('يرجى إدخال اسم الزبون');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const customer = await saveCustomer(
        name.trim(),
        result.shape,
        result.confidence
      );

      if (customer) {
        setSaved(true);
        setTimeout(() => {
          setSaved(false);
          setName('');
        }, 3000);
      } else {
        setError('فشل حفظ بيانات الزبون');
      }
    } catch (err) {
      setError('حدث خطأ أثناء الحفظ');
      console.error('Save error:', err);
    } finally {
      setSaving(false);
    }
  };

  if (saved) {
    return (
      <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 flex items-center gap-3">
        <Check className="w-6 h-6 text-green-600" />
        <p className="text-green-700 font-semibold">تم حفظ بيانات الزبون بنجاح!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">حفظ بيانات الزبون</h3>

      <div className="flex gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="اسم الزبون"
          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
          disabled={saving}
        />
        <button
          onClick={handleSave}
          disabled={saving || !name.trim()}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-all"
        >
          <Save className="w-5 h-5" />
          {saving ? 'جاري الحفظ...' : 'حفظ'}
        </button>
      </div>

      {error && (
        <p className="mt-3 text-red-600 text-sm">{error}</p>
      )}
    </div>
  );
}
