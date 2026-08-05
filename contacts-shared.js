// Single source of truth for turning a `config.author.contacts` entry into a
// link. Shared so the build (llms.txt) and the browser side agree on what a
// contact is and where it points.
//
// The map doubles as the allow list: a key without a label here is not a
// contact and is skipped by consumers that iterate the object, which is how
// `rss` stays out of the contact line.
const CONTACT_LABELS = {
  email: 'email',
  bluesky: 'Bluesky',
  github: 'GitHub',
  linkedin: 'LinkedIn',
  telegram: 'Telegram',
  vkontakte: 'VK',
};

const getContactHref = (name, contact) => {
  switch (name) {
    case 'bluesky':
      return contact.startsWith('http')
        ? contact
        : `https://bsky.app/profile/${contact}`;
    case 'github':
      return `https://github.com/${contact}`;
    case 'linkedin':
      return `https://www.linkedin.com/in/${contact}`;
    case 'vkontakte':
      return `https://vk.com/${contact}`;
    case 'telegram':
      return `telegram:${contact}`;
    case 'email':
      return `mailto:${contact}`;
    default:
      return contact;
  }
};

// Only the keys the label map knows about, in the order they appear in the
// config, as `{ name, label, value, href }`.
const listContacts = (contacts = {}) =>
  Object.keys(contacts)
    .filter((name) => CONTACT_LABELS[name] && contacts[name])
    .map((name) => ({
      name,
      label: CONTACT_LABELS[name],
      value: contacts[name],
      href: getContactHref(name, contacts[name]),
    }));

module.exports = { CONTACT_LABELS, getContactHref, listContacts };
