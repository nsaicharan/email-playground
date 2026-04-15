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
  let body;

  try {
    body = await request.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      return Response.json(
        { success: false, error: 'Malformed JSON payload' },
        { status: 400 },
      );
    }
    throw error;
  }

  try {
    if (!body.html || typeof body.html !== 'string') {
      return Response.json(
        { success: false, error: 'Missing or invalid "html" field.' },
        { status: 400 },
      );
    }

    const maxAttempts = 5;
    let lastError;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const id = generateId();

      try {
        await saveSnippet(id, body.html);
        return Response.json({ success: true, id });
      } catch (error) {
        lastError = error;

        // Check for duplicate key error (PostgreSQL error code 23505)
        const isDuplicateKey =
          error.code === '23505' ||
          (error.message && error.message.includes('duplicate key'));

        if (isDuplicateKey && attempt < maxAttempts - 1) {
          // Retry with a new id
          continue;
        }

        // Non-duplicate error or exhausted retries
        throw error;
      }
    }

    throw new Error('Failed to generate unique ID after multiple attempts');
  } catch (error) {
    console.error('Share failed:', error);

    return Response.json(
      { success: false, error: 'Failed to save snippet. Please try again.' },
      { status: 500 },
    );
  }
}