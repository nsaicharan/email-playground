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

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.html || typeof body.html !== 'string') {
      return Response.json(
        { success: false, error: 'Missing or invalid "html" field.' },
        { status: 400 },
      );
    }

    const id = generateId();
    await saveSnippet(id, body.html);

    return Response.json({ success: true, id });
  } catch (error) {
    console.error('Share failed:', error);

    return Response.json(
      { success: false, error: 'Failed to save snippet. Please try again.' },
      { status: 500 },
    );
  }
}
