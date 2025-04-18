import { supabaseClient } from '../supabase/supabaseClient';

const handleDownload = async (path: string, filename: string) => {
  try {
    const { data, error } = await supabaseClient.storage
      .from('storage')
      .download(path);

    if (error || !data) {
      console.error('Download error:', error);
      return;
    }

    const url = URL.createObjectURL(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Unexpected error:', err);
  }
};
export default handleDownload;
