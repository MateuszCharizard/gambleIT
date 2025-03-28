import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hawjgysofnwidxanykrr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhhd2pneXNvZm53aWR4YW55a3JyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNTQ2MzQsImV4cCI6MjA1ODczMDYzNH0.o9Sb14acr7EJNdt7BLgw1566A5pEg5ZEfCiDuDqiAhI';
export const supabase = createClient(supabaseUrl, supabaseKey);