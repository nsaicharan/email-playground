import { notFound } from 'next/navigation';
import { getSnippet } from '@/app/lib/db';
import EditorPage from '@/app/components/EditorPage';

export default async function SharedSnippetPage({ params }) {
  const { id } = await params;

  const snippet = await getSnippet(id);

  if (!snippet) {
    notFound();
  }

  return <EditorPage initialHtml={snippet.html} snippetId={id} />;
}
