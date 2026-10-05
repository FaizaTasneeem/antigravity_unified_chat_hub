import { DatabaseSync } from 'node:sqlite';
import { getConversationTitleFilePath } from '../utils.js';

export function getConversationTitle(conversationId) {
    try {
        const db = new DatabaseSync(getConversationTitleFilePath(conversationId), { readOnly: true });

        const row = db.prepare(`
            SELECT step_payload 
            FROM steps 
            WHERE step_type = 23 
            ORDER BY idx DESC 
            LIMIT 1
        `).get();

        db.close();

        if (!row || !row.step_payload) return null;

        const buf = Buffer.from(row.step_payload);

        const idx30 = buf.indexOf(Buffer.from([0xf2, 0x01]));
        if (idx30 === -1) return null;

        const chunk = buf.subarray(idx30, idx30 + 300);
        const idx4 = chunk.indexOf(0x22);
        if (idx4 === -1) return null;

        const length = chunk[idx4 + 1];
        const title = chunk.subarray(idx4 + 2, idx4 + 2 + length).toString('utf-8');

        return title;
    }
    catch (err) {
        console.error(`Failed to read title for ${conversationId}:`, err.message);
        return null;
    }
}