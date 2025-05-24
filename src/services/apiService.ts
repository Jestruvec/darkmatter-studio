import { supabase } from "@/utils";

interface ApiService {
  fetchRecords: <T>(tableName: string, params: string) => Promise<T[]>;
  fetchRecordById: <T>(
    tableName: string,
    id: string,
    params: string
  ) => Promise<T>;
  postRecord: <T>(tableName: string, record: T) => Promise<T>;
  putRecord: <T>(tableName: string, id: string, updates: T) => Promise<T>;
  deleteRecord: (tableName: string, id: string) => Promise<void>;
}

let instance: ApiService;

export const apiService = () => {
  if (instance) return instance;

  const fetchRecords = async <T>(
    tableName: string,
    params: string = "*"
  ): Promise<T[]> => {
    const { data, error } = await supabase.from(tableName).select(params);
    if (error) throw error;

    return data as T[];
  };

  const fetchRecordById = async <T>(
    tableName: string,
    id: string,
    params: string = "*"
  ): Promise<T> => {
    const { data, error } = await supabase
      .from(tableName)
      .select(params)
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as T;
  };

  const postRecord = async <T>(tableName: string, record: T): Promise<T> => {
    const { data, error } = await supabase
      .from(tableName)
      .insert([record])
      .select();

    if (error) throw error;
    if (!data || !data.length) {
      console.warn("Insert exitoso, pero no se devolvieron datos.");
      return record;
    }

    return data[0] as T;
  };

  const putRecord = async <T>(
    tableName: string,
    id: string,
    updates: T
  ): Promise<T> => {
    const { data, error } = await supabase
      .from(tableName)
      .update(updates)
      .eq("id", id)
      .select();

    if (error) throw error;
    if (!data || !data.length) {
      console.warn("Update exitoso, pero no se devolvieron datos.");
      return updates;
    }

    return data[0] as T;
  };

  const deleteRecord = async (tableName: string, id: string): Promise<void> => {
    const { error } = await supabase.from(tableName).delete().eq("id", id);
    if (error) throw error;
  };

  instance = {
    fetchRecords,
    fetchRecordById,
    postRecord,
    putRecord,
    deleteRecord,
  };

  return instance;
};
