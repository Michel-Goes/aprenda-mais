import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

// Função auxiliar para criar um cliente do Supabase no contexto do usuário
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

export const updateProfile = async (req, res) => {
  try {
    const dataToUpdate = req.body;
    if (!dataToUpdate || Object.keys(dataToUpdate).length === 0) {
      return res.status(400).json({ error: 'No data provided' });
    }

    const supabase = getSupabaseClient(req);
    const { data, error } = await supabase.auth.updateUser({
      data: dataToUpdate
    });

    if (error) throw error;
    res.json({ message: 'Profile updated successfully', user: data.user });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const supabase = getSupabaseClient(req);
    
    // Chama a RPC que o banco já possui para deletar o usuário de forma segura
    const { error } = await supabase.rpc('delete_user');
    
    if (error) throw error;
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ error: error.message });
  }
};
