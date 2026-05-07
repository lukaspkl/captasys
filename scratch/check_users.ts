
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mirxfdnoxnmbaigekhas.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pcnhmZG5veG5tYmFpZ2VraGFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4MDAxOTcsImV4cCI6MjA4OTM3NjE5N30._u39J1YCtEwb3A6OeiKxOeyZrGKc7fC2uWPoG7ViHEY'
const supabase = createClient(supabaseUrl, supabaseKey)

async function getUsers() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
  
  if (error) {
    console.error('Error:', error)
    return
  }
  console.log('Users:', JSON.stringify(data, null, 2))
}

getUsers()
