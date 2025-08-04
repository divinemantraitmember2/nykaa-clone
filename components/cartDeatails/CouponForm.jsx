'use client';

import { useEffect, useState } from 'react';
import { AddCoupon, CouponRemove } from '../../utils/api/Httproutes';
import { toggleRefetchApplyCouponGetCart } from '../../slices/userSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export default function CouponForm({ appliedCoupon, onApply, onRemove }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (appliedCoupon?.code) {
      setValue(appliedCoupon.code);
    }
  }, [appliedCoupon]);

  const handleApply = async () => {
    if (!value.trim()) {
      setError('Coupon code is required');
      return;
    }

    setLoading(true);
    try {
      const response = await AddCoupon(JSON.stringify(value.trim()));
      if (response.status === 200) {
        const applied = response.data?.appliedCoupons?.[0];
        dispatch(toggleRefetchApplyCouponGetCart());
        setError('');
        toast.success('Successfully applied coupon');
        if (applied) onApply(applied);
      } else {
        setError('Invalid coupon code');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    if (!value.trim()) return;

    setLoading(true);
    try {
      const response = await CouponRemove(JSON.stringify(value.trim()));
      if (response.status === 200) {
        dispatch(toggleRefetchApplyCouponGetCart());
        toast.success('Coupon removed successfully');
        setValue('');
        setFocused(false);
        setError('');
        onRemove();
      } else {
        setError('Failed to remove coupon');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6 px-4">
      <label htmlFor="coupon" className="block mb-2 text-sm font-medium text-gray-700">
        Have a coupon?
      </label>

      <div className="relative">
        <input
          id="coupon"
          type="text"
          value={value}
          placeholder="Enter Coupon Code"
          onFocus={() => setFocused(true)}
          onBlur={() => !value && setFocused(false)}
          onChange={(e) => {
            setValue(e.target.value);
            setError('');
          }}
          className={`w-full border rounded-md py-2 px-4 pr-24 transition duration-300 text-sm ${
            error ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:border-blue-500`}
          disabled={loading || !!appliedCoupon}
        />

        {(focused || value || appliedCoupon) && (
          <div className="absolute top-1/2 right-2 transform -translate-y-1/2 flex space-x-2">
            {appliedCoupon ? (
              <button
                type="button"
                onClick={handleRemove}
                disabled={loading}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
              >
                Remove
              </button>
            ) : (
              <button
                type="button"
                onClick={handleApply}
                disabled={loading}
                className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:opacity-50"
              >
                Apply
              </button>
            )}
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
