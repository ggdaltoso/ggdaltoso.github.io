import sharedContacts from '../../contacts-shared';

// The switch lives in contacts-shared.js so the sidebar and the build
// (llms.txt) resolve a contact to the same URL. Kept as a module of its own
// because components import it through the @utils alias.
const getContactHref = sharedContacts.getContactHref;

export default getContactHref;
