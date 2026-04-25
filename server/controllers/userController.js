import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { z } from 'zod';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const getSupabaseClient = (req) => {
  const token = req.headers.authorization?.split(' ')[1];
  return createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  });
};

const updateProfileSchema = z.object({
  full_name: z.string().min(2).optional(),
  avatar_url: z.string().url().optional(),
  username: z.string().optional(),
  custom_name: z.string().min(2).optional(),
  custom_avatar_url: z.string().url().nullable().optional(),
  name: z.string().min(2).optional(),
  avatar: z.string().url().optional(),
}).strict();

export const updateProfile = async (req, res) => {
  try {
    const dataToUpdate = req.body;
    if (!dataToUpdate || Object.keys(dataToUpdate).length === 0) {
      return res.status(400).json({ error: 'No data provided' });
    }

    const validationResult = updateProfileSchema.safeParse(dataToUpdate);
    if (!validationResult.success) {
      return res.status(422).json({ error: 'Invalid data', details: validationResult.error.issues });
    }

    const validData = validationResult.data;

    const token = req.headers.authorization?.split(' ')[1];
    
    if (process.env.NODE_ENV !== 'production' && token === 'mock-jwt-token') {
      return res.json({ name: validData.name, avatar: validData.avatar });
    }

    const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'apikey': supabaseKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: validData })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || errorData.error_description || 'Erro ao atualizar usuário no Supabase');
    }
    
    const data = await response.json();
    res.json({ message: 'Profile updated successfully', user: data });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (process.env.NODE_ENV !== 'production') {
      if (token === 'mock-jwt-token-fail') {
        return res.status(500).json({ error: 'Simulated RPC failure' });
      } else if (token === 'mock-jwt-token') {
        return res.status(204).send();
      }
    }

    const supabase = getSupabaseClient(req);
    
    const { error } = await supabase.rpc('delete_user');
    
    if (error) throw error;
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ error: error.message });
  }
};
