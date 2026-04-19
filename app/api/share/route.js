/**
 * POST /api/share
 *
 * Accepts JSON body with:
 *   - html: string (the HTML email content)
 *
 * Returns:
 *   - 200: { success: true, id }
 *   - 400: { success: false, error } for validation errors
 *   - 500: { success: false, error } for server errors
 */
import { customAlphabet } from 'nanoid';
import { saveSnippet } from '@/app/lib/db';

const generateId = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  10,
);

const MAX_HTML_LENGTH = 250000; // 250,000 characters limit

export async function POST(request) {
  try {
    const body = await request.json();
    const html = body.html;

    if (typeof html !== 'string') {
      return Response.json(
        { success: false, error: 'Missing or invalid "html" field.' },
        { status: 400 },
      );
    }

    if (html.length > MAX_HTML_LENGTH) {
      return Response.json(
        { success: false, error: 'Email template is too large (max 250,000 characters).' },
        { status: 413 },
      );
    }

    if (!html.trim()) {
      return Response.json(
        { success: false, error: 'Email content cannot be empty.' },
        { status: 400 },
      );
    }

    const id = generateId();
    await saveSnippet(id, html);

    return Response.json({ success: true, id });
  } catch (error) {
    console.error('Share failed:', error);

    return Response.json(
      { success: false, error: 'Failed to create shareable link.' },
      { status: 500 },
    );
  }
}
