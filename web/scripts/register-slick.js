const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function registerTemplate() {
  const { data, error } = await supabase
    .from("site_templates")
    .upsert({
      name: "Mecânica Slick Cyber",
      segment: "mecanica",
      theme_id: "mecanica_slick_v2",
      preview_url: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=400",
      description: "Tema futurista e dark para oficinas de alta performance.",
      is_active: true
    }, { onConflict: 'theme_id' });

  if (error) {
    console.error("ERRO AO REGISTRAR TEMPLATE:", error);
    process.exit(1);
  } else {
    console.log("TEMPLATE 'Mecânica Slick Cyber' REGISTRADO COM SUCESSO!");
    process.exit(0);
  }
}

registerTemplate();
