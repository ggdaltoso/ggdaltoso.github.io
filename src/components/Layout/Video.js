import React from 'react';
import { Video } from '@react95/core';
import * as styles from './Video.module.scss';

// O React95 desenha o player em cima de medidas fixas em pixel e conta com a
// tipografia padrão do navegador. O blog define font-size e line-height
// próprios, que descem por herança e estouram a caixa do contador. Os dois
// valores abaixo devolvem ao componente o que ele espera.
const GGVideo = ({ width = '320px', ...props }) => (
  <div className={styles.video}>
    <Video
      width={width}
      fontSize="12px"
      lineHeight="normal"
      {...props}
    />
  </div>
);

export default GGVideo;
