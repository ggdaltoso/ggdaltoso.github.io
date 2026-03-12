const getContactHref = (name, contact) => {
  let href;

  switch (name) {
    case 'bluesky':
      href = contact.startsWith('http')
        ? contact
        : `https://bsky.app/profile/${contact}`;
      break;
    case 'github':
      href = `https://github.com/${contact}`;
      break;
    case 'vkontakte':
      href = `https://vk.com/${contact}`;
      break;
    case 'telegram':
      href = `telegram:${contact}`;
      break;
    case 'email':
      href = `mailto:${contact}`;
      break;
    default:
      href = contact;
      break;
  }

  return href;
};

export default getContactHref;
