import { supabase } from '../lib/supabase';
import { Customer, FaceShape } from '../types';

export const saveCustomer = async (
  name: string,
  faceShape: FaceShape,
  confidence: number,
  photoUrl?: string
): Promise<Customer | null> => {
  try {
    const { data, error } = await supabase
      .from('customers')
      .insert({
        name,
        face_shape: faceShape,
        confidence,
        photo_url: photoUrl,
      })
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error saving customer:', error);
      return null;
    }

    return data as Customer;
  } catch (error) {
    console.error('Error saving customer:', error);
    return null;
  }
};

export const searchCustomerByName = async (
  name: string
): Promise<Customer | null> => {
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .ilike('name', `%${name}%`)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error searching customer:', error);
      return null;
    }

    return data as Customer;
  } catch (error) {
    console.error('Error searching customer:', error);
    return null;
  }
};

export const getAllCustomers = async (): Promise<Customer[]> => {
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching customers:', error);
      return [];
    }

    return (data as Customer[]) || [];
  } catch (error) {
    console.error('Error fetching customers:', error);
    return [];
  }
};

export const updateCustomer = async (
  id: string,
  updates: Partial<Omit<Customer, 'id' | 'createdAt'>>
): Promise<Customer | null> => {
  try {
    const { data, error } = await supabase
      .from('customers')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error updating customer:', error);
      return null;
    }

    return data as Customer;
  } catch (error) {
    console.error('Error updating customer:', error);
    return null;
  }
};
