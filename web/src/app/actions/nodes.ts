'use server';

import { createClient } from '@/utils/supabase/server';
import { resend } from '@/lib/resend';
import { getProtocolUpdateHtml } from '@/lib/email-templates';

export async function getUsers() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Action: Error fetching users:', error);
    return [];
  }
  return data;
}

export async function updateUserRole(userId: string, newRole: string, userEmail: string, userName: string) {
  const supabase = await createClient();

  // 1. Atualizar no Banco de Dados
  const { error } = await supabase
    .from('profiles')
    .update({ role: newRole })
    .eq('id', userId);

  if (error) {
    console.error('Action: Error updating role:', error);
    return { success: false, message: 'Falha ao atualizar privilégios no banco.' };
  }

  // 2. Transmissão de Protocolo via E-mail
  try {
    const html = getProtocolUpdateHtml(userName || 'Operador', newRole);
    
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'SiteProx <protocolo@captasys.net>', // Em produção, precisa verificar o domínio no Resend
      to: [userEmail],
      subject: `[PROTOCOLO] Atualização de Acesso: ${newRole}`,
      html: html,
    });

    if (emailError) {
      console.warn('Action: Email delivery failed, but DB updated:', emailError);
      return { success: true, message: 'Acesso atualizado, mas houve erro no envio da notificação.' };
    }

    console.log('Action: Protocol email sent:', emailData);
    return { success: true, message: `Protocolo atualizado com sucesso. E-mail de notificação enviado para ${userEmail}.` };
  } catch (err) {
    console.error('Action: CRITICAL Email Failure:', err);
    return { success: true, message: 'Privilégios alterados. Falha crítica na central de e-mails.' };
  }
}
export async function updateProjectStatus(projectId: string, newStatus: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('site_projects')
    .update({ status: newStatus })
    .eq('id', projectId);

  if (error) {
    console.error('Action: Error updating project status:', error);
    return { success: false, message: 'Falha ao sincronizar status com o banco.' };
  }
  return { success: true };
}
