import React, { useState } from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Frame, Fieldset, Input, Button } from '@react95/core';

const JoinForm = ({
  ready,
  onSubmitNickname,
  onSignInWithGoogle,
  onSignInWithGithub,
  error,
}) => {
  const { t } = useTranslation();
  const [nickname, setNickname] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!nickname.trim()) return;
    onSubmitNickname(nickname);
  };

  return (
    <Fieldset
      legend={t('Choose a nickname to join the chat')}
      mt="var(--typographic-leading)"
    >
      <form onSubmit={handleSubmit}>
        <Frame display="flex" gap="$4" flexWrap="wrap" alignItems="center">
          <Input
            type="text"
            placeholder={t('Nickname')}
            value={nickname}
            disabled={!ready}
            onChange={({ target }) => setNickname(target.value)}
            maxLength={40}
          />
          <Button type="submit" disabled={!ready || !nickname.trim()}>
            {t('Join chat')}
          </Button>
        </Frame>
        <Frame display="flex" gap="$4" mt="$4" flexWrap="wrap">
          <Button type="button" disabled={!ready} onClick={onSignInWithGoogle}>
            {t('Continue with Google')}
          </Button>
          <Button type="button" disabled={!ready} onClick={onSignInWithGithub}>
            {t('Continue with GitHub')}
          </Button>
        </Frame>
        {error && (
          <Frame
            as="p"
            m="var(--typographic-leading) 0 0"
            color="#c0392b"
            fontSize="var(--typographic-small-font-size)"
          >
            {t(error)}
          </Frame>
        )}
      </form>
    </Fieldset>
  );
};

export default JoinForm;
