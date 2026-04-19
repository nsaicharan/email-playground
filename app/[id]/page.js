import { notFound } from 'next/navigation';
import { getTemplate } from '@/app/lib/db';
import EditorPage from '@/app/components/EditorPage';

export default async function SharedTemplatePage({ params }) {
  const { id } = await params;

  const template = await getTemplate(id);

  if (!template) {
    notFound();
  }

  return <EditorPage initialHtml={template.html} templateId={id} />;
}
